import jobSlice, { 
    addIndustry, 
    removeIndustry, 
    addProfession, 
    removeProfession, 
    setJobs, 
    clearIndustries
} from './job.slice';

describe('job slice', () => {

    let initialState;

    beforeEach(() => {
        initialState = {
            jobs: [], 
            industries: [], 
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null
        }
    })

    test('should return the initial state', () => {
        expect(jobSlice(undefined, {})).toEqual(initialState)
    })

    test('addIndustry should add an industry to industries array in state', () => {
        expect(jobSlice(initialState, addIndustry('Accounting'))).toEqual({
            jobs: [],
            industries: ['Accounting'],
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null
        })
    })

    test('removeIndustry should remove an industry from the industries array in state', () => {
        initialState.industries.push('industryA');
        expect(jobSlice(initialState, removeIndustry('industryA'))).toEqual({
            jobs: [], 
            industries: [], 
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null
        })
    })

    test('addIndustry should handle an industry being added to an existing list', () => {
        initialState.industries = ['Accounting'];
        expect(jobSlice(initialState, addIndustry('Retail'))).toEqual({
            jobs: [],
            industries: ['Accounting', 'Retail'],
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null
        })
    })

    test('clearIndustries should remove all industries from industries array in state', () => {
        initialState.industries.push('industryA');
        expect(jobSlice(initialState, clearIndustries())).toEqual({
            jobs: [], 
            industries: [], 
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null
        });
    })

    test('setJobs should set jobs data', () => {
        const jobs = [
            {
                title: 'burger flipper',
                headliner: 'great opportunity to flip stuff',
                summary: 'this is a job for flipping burgers',
                description: 'flip stuff',
            },{
                title: 'manager',
                headliner: 'manage stuff',
                summary: 'this is a job to manage things',
                description: 'manage things',
            }
        ]
        expect(jobSlice(initialState, setJobs(jobs))).toEqual({
            jobs: jobs,
            industries: [],
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null
        })
    })

    test('addProfession should add a profession to the professions array in state', () => {
        expect(jobSlice(initialState, addProfession('professionA'))).toEqual({
            jobs: [], 
            industries: [], 
            professions: ['professionA'],
            workTypes: [],
            payBase: null,
            payCeiling: null
        })
    })

    test('removeProfession should remove a profession from the professions array in state', () => {
        initialState.professions.push('professionA');
        expect(jobSlice(initialState, removeProfession('professionA'))).toEqual({
            jobs: [], 
            industries: [], 
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null
        })
    })

})
