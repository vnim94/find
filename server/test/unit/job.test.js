const Job = require('../../src/job/job.model');
const Location = require('../../src/job/location.model');
const Industry = require('../../src/job/industry.model');
const Profession = require('../../src/job/profession.model');
const database = require('../../util/memoryDatabase');
const Company = require('../../src/company/company.model');
const { typeDefs, resolvers } = require('../../src/api/schema');
const EasyGraphQLTester = require('easygraphql-tester');
const tester = new EasyGraphQLTester(typeDefs, resolvers);

let context;
let location;
let locationB;
let company;
let job;
let jobB;
let industry;
let industryB;
let profession;
let professionB;

beforeAll(async () => {
    await database.connect();
    await database.seed();
    location = await Location.findOne({ city: 'Melbourne' });
    locationB = await Location.findOne({ city: 'Sydney' });
    company = await Company.findOne();
    job = await Job.findOne({ title: 'burger flipper' });
    jobB = await Job.findOne({ title: 'manager' });
    industry = await Industry.findOne({ code: '0001' }).populate('jobs jobCount')
        .populate({
            path: 'professions',
            populate: { path: 'jobCount' }
        });
    industryB = await Industry.findOne({ code: '0000' }).populate('jobs jobCount')
        .populate({
            path: 'professions',
            populate: { path: 'jobCount' }
        });
    profession = await Profession.findOne({ code: '0001' }).populate('jobs jobCount');
    professionB = await Profession.findOne({ code: '0000' }).populate('jobs jobCount');
    context = { user: 'abc' };
});

afterAll(async () => { await database.disconnect() });

describe('models', () => {

    describe('job model', () => {
        test('added should be current date', () => {
            expect(job.added.toDateString()).toBe(new Date().toDateString());
        })
    
        test('closing should be current date + 30 days', () => {
            const expiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
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
        query getJobsQuery($sortByDate: Boolean, $page: Int, $limit: Int, $title: String, $company: ID, $location: [ID], $industry: [ID], $profession: [ID], $workType: [String], $payBase: Int, $payCeiling: Int, $added: Date) {
            getJobs(sortByDate: $sortByDate, page: $page, limit: $limit, title: $title, company: $company, location: $location, industry: $industry, profession: $profession, workType: $workType, payBase: $payBase, payCeiling: $payCeiling, added: $added) {
                jobs {
                    id
                    title
                    headliner
                    summary
                    description
                    company {
                        name
                    }
                    location {
                        suburb
                        city
                        region
                    }
                    industry {
                        name
                        code
                    }
                    profession {
                        name
                        code
                    }
                    workType
                    payBase
                    payCeiling
                    added
                }
                totalJobs
            }
        }
    `
    test('job', async () => {
        const query = `
            {
                getJob(id: "${job._id.toString()}") {
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
        expect(result.data.getJob.title).toBe('burger flipper');
        expect(result.data.getJob.headliner).toBe('great opportunity to flip stuff');
        expect(result.data.getJob.description).toBe('flip stuff');
        expect(result.data.getJob.company.name).toBe('McDonalds');
    })

    test('job not found', async () => {
        const query = `
            {
                getJob(id: "6242943990b42b3aa078d5d2") {
                    ... on NotFound {
                        message
                        id
                    }
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.getJob.message).toBe('Job not found');
        expect(result.data.getJob.id).toBeTruthy();
    })

    test('jobs', async () => {
        const query = `
            {
                getJobs {
                    jobs {
                        title
                        description
                        company {
                            name
                        }
                    }
                    totalJobs
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.getJobs.jobs).toBeTruthy();
        expect(result.data.getJobs.jobs[0].title).toBe('burger flipper');
        expect(result.data.getJobs.jobs[0].company.name).toBe('McDonalds');
    })

    test('jobs pagination', async () => {
        const query = `
            {
                getJobs(page: 1, limit: 1) {
                    jobs {
                        title
                        description
                        company {
                            name
                        }
                    }
                    totalJobs
                }
            }
        `
        const result = await tester.graphql(query, {}, {}, {});
        expect(result.data.getJobs.jobs.length).toBe(1); 
        expect(result.data.getJobs.totalJobs).toBe(2);
    })

    test('jobs with multiple parameters', async () => {
        const result = await tester.graphql(jobsQuery, {}, {}, {
            company: `${company._id.toString()}`,
            industry: `${industryB._id.toString()}`
        });
        expect(result.data.getJobs.jobs).toBeTruthy();
        expect(result.data.getJobs.jobs[0].title).toBe('burger flipper');
        expect(result.data.getJobs.jobs[0].company.name).toBe('McDonalds');
        expect(result.data.getJobs.jobs[0].industry.name).toBe('Hospitality & Tourism');
        expect(result.data.getJobs.jobs[0].industry.code).toBe('0000');
        expect(result.data.getJobs.jobs[0].profession.name).toBe('Chefs/Cooks');
    })

    test('jobs query for job title returns jobs containing that title', async () => {
        const result = await tester.graphql(jobsQuery, {}, {} ,{
            title: 'burger'
        })
        expect(result.data.getJobs.jobs).toBeTruthy();
        expect(result.data.getJobs.jobs.length).toBe(1);
        expect(result.data.getJobs.jobs[0].title).toBe('burger flipper');
    })

    test('jobs query for location returns jobs for that locations', async () => {
        const result = await tester.graphql(jobsQuery, {}, {}, {
            location: [location._id.toString()]
        })
        expect(result.data.getJobs.jobs).toBeTruthy();
        expect(result.data.getJobs.jobs.length).toBe(1);
    })

    test('jobs query for multiple industries returns jobs for those industries', async () => {
        const result = await tester.graphql(jobsQuery, {}, {} ,{
            industry: [`${industry._id.toString()}`,`${industryB._id.toString()}`]    
        });
        expect(result.data.getJobs.jobs).toBeTruthy();
        expect(result.data.getJobs.jobs.length).toBe(2);
    })

    test('jobs query for multiple professions returns jobs for those professions', async () => {
        const result = await tester.graphql(jobsQuery, {}, {} ,{
            profession: [`${profession._id.toString()}`, `${professionB._id.toString()}`]
        });
        expect(result.data.getJobs.jobs).toBeTruthy();
        expect(result.data.getJobs.jobs.length).toBe(2);
    })

    test('jobs query for multiple work types returns jobs for those professions', async () => {
        const result = await tester.graphql(jobsQuery, {}, {}, {
            workTypes: ['Full time', 'Part time']
        });
        expect(result.data.getJobs.jobs).toBeTruthy();
        expect(result.data.getJobs.jobs.length).toBe(2);
    })

    test('jobs query for pay range', async () => {
        const result = await tester.graphql(jobsQuery, {}, {}, {
            payBase: 50000,
            payCeiling: 100000
        })
        expect(result.data.getJobs.jobs).toBeTruthy();
        expect(result.data.getJobs.jobs.length).toBe(1);
        expect(result.data.getJobs.jobs[0].payBase).toBe(70000);
    })

    test('jobs query for time elapsed', async () => {
        await Job.create({
            title: 'supervisor',
            headliner: 'supervise stuff',
            summary: 'this is a job to supervise things',
            description: 'supervise things',
            company: company._id,
            location: location._id,
            industry: industry._id,
            profession: profession._id,
            workType: 'Part time',
            payBase: 70000,
            payCeiling: 85000,
            added: Date.now() - 7 * 24 * 60 * 60 * 1000
        })
        const result = await tester.graphql(jobsQuery, {}, {}, {
            added: Date.now() - 6 * 24 * 60 * 60 * 1000
        })
        expect(result.data.getJobs.jobs).toBeTruthy();
        expect(result.data.getJobs.jobs.length).toBe(2);
    })

    test('jobs sort by date', async () => {
        await Job.create({
            title: 'Chief Executive Officer',
            headliner: 'the CEO',
            summary: 'this is a job to be CEO',
            description: 'Chief Executive Officer',
            company: company._id,
            location: location._id,
            industry: industry._id,
            profession: profession._id,
            workType: 'Part time',
            payBase: 70000,
            payCeiling: 85000,
            added: Date.now() - 6 * 24 * 60 * 60 * 1000
        })
        const result = await tester.graphql(jobsQuery, {}, {}, {
            sortByDate: true
        })
        expect(result.data.getJobs.jobs).toBeTruthy();
        expect(result.data.getJobs.jobs.length).toBe(4);
        expect(result.data.getJobs.jobs[2].title).toBe('Chief Executive Officer');
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
                createJob(title: "manager", headliner: "great chance to manage", description: "manage stuff", company: "${company._id}", location: "${location._id}", industry: "${job.industry._id}", profession: "${job.profession._id}", workType: "Full time") {
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
                createJob(title: "", headliner: "", description: "", company: "${company._id.toString()}", location: "", industry: "", profession: "", workType: "") {
                    ... on InvalidJobInput {
                        message
                        errors {
                            title
                            headliner
                            description
                            location 
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
                updateJob(id: "${job._id.toString()}", title: "updated", headliner: "updated" description: "updated", location: "${location._id}", industry: "${industry._id}", profession: "${profession._id}", workType: "Part time") {
                    ... on Job {
                        title
                        headliner
                        description
                        location {
                            suburb
                            city
                            region
                        }
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