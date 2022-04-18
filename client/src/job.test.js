import jobSlice, { addIndustry, removeIndustry, addProfession, removeProfession } from './jobSearch/job.slice';

test('should return the initial state', () => {
    expect(jobSlice(undefined, {})).toEqual({
        industries: [], 
        professions: [] 
    })
})

test('should handle an industry being added', () => {
    const previousState = {
        industries: [], 
        professions: [] 
    }
    expect(jobSlice(previousState, addIndustry('Accounting'))).toEqual({
        industries: ['Accounting'],
        professions: []
    })
})

test('should handle an industry being added to an existing list', () => {
    const previousState = {
        industries: ['Accounting'],
        professions: []
    }
    expect(jobSlice(previousState, addIndustry('Retail'))).toEqual({
        industries: ['Accounting', 'Retail'],
        professions: []
    })
})