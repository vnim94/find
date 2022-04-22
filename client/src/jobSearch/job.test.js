import jobSlice, {
    setLocation, 
    addIndustry, 
    removeIndustry, 
    addProfession, 
    removeProfession, 
    setJobs, 
    clearIndustries,
    addWorkType,
    removeWorkType
} from './job.slice';

describe('job slice', () => {

    let initialState;
    const industry = { name: 'Accounting', code: '0000' };
    const profession = { name: 'Bookkeeper', code: '0000' };
    const location = { city: 'Melbourne', suburb: 'CBD' };

    beforeEach(() => {
        initialState = {
            jobs: [], 
            location: '',
            industries: [], 
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null,
            timeElapsed: null
        }
    })

    test('should return the initial state', () => {
        expect(jobSlice(undefined, {})).toEqual(initialState)
    })

    test('setLocation should set a location in state', () => {
        expect(jobSlice(initialState, setLocation(location))).toEqual({
            jobs: [],
            location: location,
            industries: [],
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null,
            timeElapsed: null
        })
    })

    test('addIndustry should add an industry to industries array in state', () => {
        expect(jobSlice(initialState, addIndustry(industry))).toEqual({
            jobs: [],
            location: '',
            industries: [industry],
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null,
            timeElapsed: null
        })
    })

    test('removeIndustry should remove an industry from the industries array in state', () => {
        initialState.industries.push(industry);
        expect(jobSlice(initialState, removeIndustry(industry))).toEqual({
            jobs: [], 
            location: '',
            industries: [], 
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null,
            timeElapsed: null
        })
    })

    test('addIndustry should handle an industry being added to an existing list', () => {
        initialState.industries = [industry];
        const newIndustry = { name: 'Retail', code: '0001' }
        expect(jobSlice(initialState, addIndustry(newIndustry))).toEqual({
            jobs: [],
            location: '',
            industries: [industry, newIndustry],
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null,
            timeElapsed: null
        })
    })

    test('clearIndustries should remove all industries from industries array in state', () => {
        initialState.industries.push(industry);
        expect(jobSlice(initialState, clearIndustries())).toEqual({
            jobs: [], 
            location: '',
            industries: [], 
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null,
            timeElapsed: null
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
            location: '',
            industries: [],
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null,
            timeElapsed: null
        })
    })

    test('addProfession should add a profession to the professions array in state', () => {
        expect(jobSlice(initialState, addProfession(profession))).toEqual({
            jobs: [], 
            location: '',
            industries: [], 
            professions: [profession],
            workTypes: [],
            payBase: null,
            payCeiling: null,
            timeElapsed: null
        })
    })

    test('removeProfession should remove a profession from the professions array in state', () => {
        initialState.professions.push(profession);
        expect(jobSlice(initialState, removeProfession(profession))).toEqual({
            jobs: [], 
            location: '',
            industries: [], 
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null,
            timeElapsed: null
        })
    })

    test('addWorkType should add a workType to the workTypes array in state', () => {
        expect(jobSlice(initialState, addWorkType('Full time'))).toEqual({
            jobs: [], 
            location: '',
            industries: [], 
            professions: [],
            workTypes: ['Full time'],
            payBase: null,
            payCeiling: null,
            timeElapsed: null
        })
    })

    test('remove workType should remove the workType from the workTypes array in state', () => {
        initialState.workTypes = ['Full time'];
        expect(jobSlice(initialState, removeWorkType('Full time'))).toEqual({
            jobs: [], 
            location: '',
            industries: [], 
            professions: [],
            workTypes: [],
            payBase: null,
            payCeiling: null,
            timeElapsed: null
        })
    })

})
