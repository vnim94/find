import { request } from '../profile/user.api';

const getJobsRequest = `
    query jobs($title: String, $company: ID, $location: ID, $industry: [ID], $profession: [ID], $workType: [String], $payBase: Int, $payCeiling: Int, $added: Date) {
        jobs(title: $title, company: $company, location: $location, industry: $industry, profession: $profession, workType: $workType, payBase: $payBase, payCeiling: $payCeiling, added: $added) {
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

const getAllLocationsRequest = `
    {
        allLocations {
            suburb
            city
            state
            region
        }
    }
`

export const getJobs = async (vars) => {
    return await request(getJobsRequest, vars);
}

export const getAllIndustries = async () => {
    return await request(getAllIndustriesRequest);
}

export const getAllLocations = async () => {
    return await request(getAllLocationsRequest);
}
