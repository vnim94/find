import { request } from '../profile/user.api';

const getJobsRequest = `
    query jobs($title: String, $company: ID, $city: String, $suburb: String, $industry: [ID], $profession: [ID], $workType: String, $payBase: Int, $payCeiling: Int) {
        jobs(title: $title, company: $company, city: $city, suburb: $String, industry: $industry, profession: $profession, workType: $workType, payBase: $payBase, payCeiling: $payCeiling) {
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

export const getAllJobs = async (vars) => {
    return await request(getJobsRequest, vars);
}

export const getAllIndustries = async () => {
    return await request(getAllIndustriesRequest);
}