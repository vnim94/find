import Dropdown, { Classification, Item } from './Dropdown';
import Options from './Options';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllIndustries, clearIndustries, setAllLocations } from '../job.slice';
import { getAllIndustries, getAllLocations } from '../job.api';

function Search(props) {

    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const allIndustries = useSelector(state => state.jobSearch.allIndustries);
    const allLocations = useSelector(state => state.jobSearch.allLocations);

    const title = searchParams.get('title') || '';
    const location = searchParams.get('location') || '';
    const selectedIndustries = useSelector(state => state.jobSearch.industries);
    const selectedWorkTypes = searchParams.getAll('workType');
    const selectedPayBase = searchParams.get('payBase');
    const selectedPayCeiling = searchParams.get('payCeiling');
    const selectedTimeElapsed = searchParams.get('added');

    const [classificationDropdown, setClassificationDropdown] = useState(false);
    const [locationDropdown, setLocationDropdown] = useState(false);
    const [displayedLocations, setDisplayedLocations] = useState();
    const [expanded, setExpanded] = useState(props.expanded || selectedWorkTypes.length > 0 || selectedPayBase || selectedPayCeiling || selectedTimeElapsed);

    const updateParam = (param, value) => {
        searchParams.set(param, value);
        setSearchParams(searchParams);
    }

    const removeParam = (param) => {
        searchParams.delete(param);
        setSearchParams(searchParams);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        searchParams.set('page', 1);
        if (!searchParams.get('sortByDate')) searchParams.set('sortByDate', false);

        setSearchParams(searchParams);
        setClassificationDropdown(false);
        setLocationDropdown(false);

        navigate({
            pathname: '/jobs',
            search: searchParams.toString()
        })
    }

    const handleChangeWhat = (event) => {
        if (event.target.value.length > 0) {
            updateParam('title', event.target.value);
        } else {
            removeParam('title');
        }
    }

    const handleChangeWhere = (event) => {
        if (locationDropdown === false) setLocationDropdown(true);

        let searchTerms = event.target.value.toLowerCase();
        let filteredLocations;

        if (searchTerms === '') { 
            removeParam('location');
            filteredLocations = allLocations
        } else {
            updateParam('location', searchTerms);
            filteredLocations = allLocations.filter(loc => loc.city.toLowerCase().match(searchTerms.toLowerCase()) !== null || loc.suburb.toLowerCase().match(searchTerms.toLowerCase()) !== null)
        }

        setDisplayedLocations(filteredLocations);
    }

    useEffect(() => {
        async function fetchAllIndustries() {
            const response = await getAllIndustries();
            if (response.data.allIndustries) dispatch(setAllIndustries(response.data.allIndustries));
        }
        async function fetchAllLocations() {
            const response = await getAllLocations();
            if (response.data.allLocations) { dispatch(setAllLocations(response.data.allLocations)); setDisplayedLocations(response.data.allLocations) };
        }
        fetchAllIndustries();
        fetchAllLocations();
    },[dispatch])

    const selectClassification = useRef();
    const where = useRef();

    useEffect(() => {
        const clickOutside = (event) => {
            if (classificationDropdown && selectClassification.current && !selectClassification.current.contains(event.target)) {
                setClassificationDropdown(false);
            }
            if (locationDropdown && where.current && !where.current.contains(event.target)) {
                setLocationDropdown(false);
            }
        }

        document.addEventListener('mousedown', clickOutside);

        return () => {
            document.removeEventListener('mousedown', clickOutside);
        }

    },[classificationDropdown, locationDropdown])

    return (
        <>
        <section className="bg-green-3 flex flex-row justify-center">
            <div className="py-10 flex flex-col justify-between items-center">
                <div className="min-w-[992px] flex flex-col">
                    <form className="flex flex-row items-center justify-between space-x-2" onSubmit={handleSubmit}>
                        <div className="w-full flex flex-row space-x-2">
                            <div className="w-2/3 flex flex-col flex-grow">
                                <label className="font-bold">What</label>
                                <div className="flex flex-row space-x-2">
                                    <div className="relative w-full">
                                        <input className="w-full p-3 rounded-md outline-hidden focus:outline outline-[3px]" type="text" value={title} onChange={handleChangeWhat} placeholder="Enter Keywords"/>
                                        <div className={`${title.length === 0 && 'invisible'} absolute top-2 right-2 px-2 py-1 rounded-full hover:bg-green-1 hover:cursor-pointer`} onClick={() => removeParam('title')}>
                                            <span className="text-base material-icons-outlined">clear</span>
                                        </div>
                                    </div>
                                    <div className={`relative w-full bg-white p-3 rounded-md flex items-center justify-between hover:cursor-pointer ${classificationDropdown && 'outline'}`} 
                                        onClick={() => allIndustries && setClassificationDropdown(!classificationDropdown)}
                                        ref={selectClassification}
                                    >
                                        <span className="text-grey-3">
                                            {selectedIndustries.length === 0 ? 
                                                'Any classification' 
                                            : 
                                                selectedIndustries.length > 1 ? 
                                                    `${selectedIndustries.length} classifications`
                                                : 
                                                    selectedIndustries[0].length > 20 ? 
                                                        `${selectedIndustries[0].slice(0,20)} ...`
                                                    :
                                                        selectedIndustries[0]
                                            }
                                        </span>
                                        <div className={`${selectedIndustries.length > 0 ? 'right-0' : '-right-10'} h-full absolute flex items-center`}>
                                            <span className={`${classificationDropdown && 'rotate-180'} transition material-icons-outlined`}>expand_more</span>
                                            <div className={`${selectedIndustries.length === 0 && 'invisible'} h-full ml-3 mr-1.5 border border-grey-2`}></div>
                                            <div className={`${selectedIndustries.length === 0 && 'invisible'} flex mr-1.5 px-2 py-1 rounded-full hover:bg-green-1 hover:cursor-pointer`} onClick={() => { removeParam('industry'); dispatch(clearIndustries()) }}>
                                                <span className="text-base material-icons-outlined">clear</span>
                                            </div>
                                        </div>
                                        {classificationDropdown && <Dropdown>
                                            {allIndustries && allIndustries.map((industry,index) => { 
                                                return <Classification 
                                                    key={index} 
                                                    industry={industry} 
                                                    jobCount={industry.jobCount}
                                                    professions={industry.professions}
                                                />
                                            })}    
                                        </Dropdown>}
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/3 flex flex-col flex-grow z-10" ref={where}>
                                <label className="font-bold">Where</label>
                                <input className="p-3 rounded-md flex flex-grow outline-none" type="search" value={location.length > 15 ? location.slice(0, 25) + '...' : location} onChange={handleChangeWhere} placeholder="Enter suburb, city, or region" onFocus={() => setLocationDropdown(!locationDropdown)}/>
                                <div className={`${location === '' && 'hidden'} clear-where flex flex-ai-c`} onClick={() => { removeParam('location'); setLocationDropdown(false); }}>
                                    <span className="medium material-icons-outlined">clear</span>
                                </div>
                                {locationDropdown && displayedLocations.length > 0 && <Dropdown>
                                    {displayedLocations && displayedLocations.map((location, index) => {
                                        return <Item key={index} text={`${location.city} ${location.suburb}`} toggleList={setLocationDropdown}/>
                                    })}
                                </Dropdown>}
                            </div>
                        </div>
                        <div className="h-full flex flex-col justify-end">
                            <button className="px-7 py-3 bg-black-2 text-white text-base rounded-md hover:bg-black-1" type="submit">Find</button>
                        </div>
                    </form>
                    {!expanded && <div className="flex justify-end">
                        <div className="mt-5 text-sm flex items-center hover:cursor-pointer" onClick={() => setExpanded(!expanded)}>
                            <span>More options</span>
                            <span className="material-icons-outlined">expand_more</span>
                        </div>
                    </div>}
                </div>
            </div>
        </section>
        {expanded && <Options />}
        </>
    )
}

export default Search;