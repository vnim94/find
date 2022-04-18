const Job = require('../../src/job/job.model');
const Industry = require('../../src/job/industry.model');
const Profession = require('../../src/job/profession.model');
const database = require('../../util/memoryDatabase');
const Company = require('../../src/company/company.model');
const { typeDefs, resolvers } = require('../../src/api/schema');
const EasyGraphQLTester = require('easygraphql-tester');
const tester = new EasyGraphQLTester(typeDefs, resolvers);

let context;
let company;
let job;
let industry;
let industryB;
let profession;

beforeAll(async () => {
    await database.connect();
    await database.seed();
    company = await Company.findOne();
    job = await Job.findOne({ title: 'burger flipper' });
    industry = await Industry.findOne({ code: '0001' })
        .populate('jobs')
        .populate('jobCount')
        .populate({
            path: 'professions',
            populate: { path: 'jobCount' }
        });
    industryB = await Industry.findOne({ code: '0000' })
        .populate('jobs')
        .populate('jobCount')
        .populate({
            path: 'professions',
            populate: { path: 'jobCount' }
        });
    profession = await Profession.findOne({ code: '0001' })
        .populate('jobs')
        .populate('jobCount');
    context = { user: 'abc' };
});

afterAll(async () => { await database.disconnect() });

describe('models', () => {

    describe('job model', () => {
        test('added should be current date', () => {
            expect(job.added.toDateString()).toBe(new Date().toDateString());
        })
    
        test('closing should be current date + 30 days', () => {
            const today = new Date();
            const expiry = new Date();
            expiry.setDate(today.getDate() + 30)
            expect(job.closing.toDateString()).toBe(expiry.toDateString())
        })
        
        test('payCeiling should be payBase if not provided', () => {
            expect(job.payBase).toBe(35000);
            expect(job.payCeiling).toBe(job.payBase);
        })
    })
   
    describe('industry model', () => {
        test('code must be 4-digits', () => {
            const industry = new Industry({
                name: 'Accounting',
                code: '000'
            })
            industry.validate((err) => {
                expect(err).toBeTruthy();
                expect(err.errors['code'].message).toBe('Must be a 4-digit code');
            })
        })

        test('jobs returns all jobs for the industry', () => {
            expect(industry.jobs).toBeTruthy();
            expect(industry.jobs.length).toBe(1);
        })
    
        test('jobCount returns number of jobs for the industry', () => {
            expect(industry.jobCount).toBe(1);
        })
    
        test('professions returns all professions for the industry', () => {
            expect(industry.professions).toBeTruthy();
            expect(industry.professions.length).toBe(1);
            expect(industry.professions[0].jobCount).toBe(1);
        })
    })

    describe('profession model', () => {
        test('code must be 4-digits', () => {
            const profession = new Profession({
                name: 'Account Clerk',
                code: '000'
            })
            profession.validate((err) => {
                expect(err).toBeTruthy();
                expect(err.errors['code'].message).toBe('Must be a 4-digit code');
            })
        })

        test('jobs return all jobs for the profession', () => {
            expect(profession.jobs).toBeTruthy();
            expect(profession.jobs.length).toBe(1);
        })

        test('jobCount returns number of jobs for the profession', () => {
            expect(profession.jobCount).toBe(1);
        })
    })
   
})

describe('job query resolvers', () => {

    const jobsQuery = `
            query jobs($title: String, $company: ID, $city: String, $suburb: String, $industry: [ID], $profession: [ID], $workType: String, $payBase: Int, $payCeiling: Int) {
                jobs(title: $title, company: $company, city: $city, suburb: $suburb, industry: $industry, profession: $profession, workType: $workType, payBase: $payBase, payCeiling: $payCeiling) {
                    id
                    title
                    headliner
                    summary
                    description
                    company {
                        name
                    }
                    city
                    suburb
                    industry {
                        name
                        code
                    }
                    profession {
                        name
                        code
                    }
                    workType
                    added
                }
            }
        `

    test('job', async () => {
        const query = `
            {
                job(id: "${job._id.toString()}") {
                    ... on Job {
                        title
                        headliner
                        description
                        company {
                            name
                        }
                    }
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.job.title).toBe('burger flipper');
        expect(result.data.job.headliner).toBe('great opportunity to flip stuff');
        expect(result.data.job.description).toBe('flip stuff');
        expect(result.data.job.company.name).toBe('McDonalds');
    })

    test('job not found', async () => {
        const query = `
            {
                job(id: "6242943990b42b3aa078d5d2") {
                    ... on NotFound {
                        message
                        id
                    }
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.job.message).toBe('Job not found');
        expect(result.data.job.id).toBeTruthy();
    })

    test('jobs', async () => {
        const query = `
            {
                jobs {
                    title
                    description
                    company {
                        name
                    }
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.jobs).toBeTruthy();
        expect(result.data.jobs[0].title).toBe('burger flipper');
        expect(result.data.jobs[0].company.name).toBe('McDonalds');
    })

    test('jobs with multiple parameters', async () => {
        const result = await tester.graphql(jobsQuery, {}, {}, {
            company: `${company._id.toString()}`,
            industry: `${industryB._id.toString()}`
        });
        expect(result.data.jobs).toBeTruthy();
        expect(result.data.jobs[0].title).toBe('burger flipper');
        expect(result.data.jobs[0].company.name).toBe('McDonalds');
        expect(result.data.jobs[0].industry.name).toBe('Hospitality & Tourism');
        expect(result.data.jobs[0].industry.code).toBe('0000');
        expect(result.data.jobs[0].profession.name).toBe('Chefs/Cooks');
    })

    test('jobs query for multiple industries returns jobs for those industries', async () => {
        const result = await tester.graphql(jobsQuery, {}, {} ,{
            industry: [`${industry._id.toString()}`,`${industryB._id.toString()}`]    
        });
        expect(result.data.jobs).toBeTruthy();
        expect(result.data.jobs.length).toBe(2);
    })

    test('jobs query for multiple professions for those professions', async () => {
        const result = await tester.graphql(jobsQuery, {}, {} ,{
            profession: `${profession._id.toString()}`
        });
        expect(result.data.jobs).toBeTruthy();
        expect(result.data.jobs.length).toBe(1);
        expect(result.data.jobs[0].title).toBe('manager');
    })

    test('allIndustries return all industries and their professions', async () => {
        const query = `
            {
                allIndustries {
                    name
                    code
                    jobCount
                    professions {
                        name
                        jobCount
                    }
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.allIndustries).toBeTruthy();
        expect(result.data.allIndustries.length).toBe(2);
        expect(result.data.allIndustries[0].jobCount).toBe(1);
        expect(result.data.allIndustries[0].professions[0].jobCount).toBe(1);
    })

    test('allProfessions returns all professions', async () => {
        const query = `
            {
                allProfessions {
                    name
                    code
                    industry {
                        name
                    }
                    jobCount
                }
            }
        
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.allProfessions).toBeTruthy();
        expect(result.data.allProfessions.length).toBe(2);
        expect(result.data.allProfessions[0].jobCount).toBe(1);
    })

})

describe('job mutation resolvers', () => {
    test('createJob', async () => {
        const createJob = `
            mutation {
                createJob(title: "manager", headliner: "great chance to manage", description: "manage stuff", company: "${company._id.toString()}", city: "Melbourne", industry: "${job.industry._id}", profession: "${job.profession._id}", workType: "Full time") {
                    ... on Job {
                        id
                        title
                        headliner
                        description
                        company {
                            name
                        }
                    }
                }
            }
        `
        const result = await tester.graphql(createJob, {}, context, {});
        expect(result.data.createJob.title).toBe('manager');
        expect(result.data.createJob.company.name).toBe('McDonalds');

        const newJob = await Job.findById(result.data.createJob.id);
        expect(newJob).toBeTruthy();
    })

    test('createJob input errors', async () => {
        const createJob = `
            mutation {
                createJob(title: "", headliner: "", description: "", company: "${company._id.toString()}", city: "", industry: "", profession: "", workType: "") {
                    ... on InvalidJobInput {
                        message
                        errors {
                            title
                            headliner
                            description
                            city
                            industry
                            profession
                            workType
                        }
                    }
                }
            }
        `
        const result = await tester.graphql(createJob, {}, context, {});
        expect(result.data.createJob.message).toBe('Invalid input');
        expect(result.data.createJob.errors).toBeTruthy();
    })

    test('updateJob', async () => {
        const updateJob = `
            mutation {
                updateJob(id: "${job._id.toString()}", title: "updated", headliner: "updated" description: "updated", city: "Sydney", industry: "${industry._id}", profession: "${profession._id}", workType: "Part time") {
                    ... on Job {
                        title
                        headliner
                        description
                        city
                        industry {
                            name
                        }
                        profession {
                            name
                        }
                        workType
                    }
                }
            }
        `
        const result = await tester.graphql(updateJob, {}, context, {});
        expect(result.data.updateJob.title).toBe('updated');
        expect(result.data.updateJob.description).toBe('updated');
        expect(result.data.updateJob.industry.name).toBe('Retail & Consumer Products');
        expect(result.data.updateJob.profession.name).toBe('Manager');

        const updatedJob = await Job.findById(job._id.toString());
        expect(updatedJob.title).toBe('updated');
    })

    test('updateJob input errors', async () => {

    })

    test('closeJob', async () => {
        const closeJob = `
            mutation {
                closeJob(id: "${job._id.toString()}") {
                    ... on Job {
                        id
                        closing
                    }
                }
            }
        `
        const result = await tester.graphql(closeJob, {}, context, {});
        expect(result.data.closeJob.id).toBe(job._id.toString());
        expect(result.data.closeJob.closing).toBeLessThan(Date.now());

        const closedJob = await Job.findById(job._id.toString());
        expect(closedJob.closing.getTime()).toBeLessThan(job.closing.getTime());
    })

    test('closeJob not found', async () => {

    })

    test('deleteJob', async () => {
        const deleteJob = `
            mutation {
                deleteJob(id: "${job._id.toString()}") {
                    ... on Job {
                        id
                    }
                }
            }
        `
        const result = await tester.graphql(deleteJob, {}, context, {});
        expect(result.data.deleteJob.id).toBe(job._id.toString());

        const deletedJob = await Job.findById(job._id.toString());
        expect(deletedJob).toBeFalsy();
    })

    test('deleteJob not found', async () => {
        
    })
})