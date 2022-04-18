import { request } from '../profile/user.api';

const getAllJobsRequest = `
    {
        jobs {
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

const getAllIndustriesRequest = `
    {
        allIndustries {
            id
            name
            code
            jobCount
            professions {
                id
                name 
                code
                jobCount
            }
        }
    }
`

const getIndustryJobsRequest = (ids) => `
    {
        industryJobs(ids: [${ids}]) {
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

export const getAllJobs = async () => {
    return await request(getAllJobsRequest);
}

export const getAllIndustries = async () => {
    return await request(getAllIndustriesRequest);
}