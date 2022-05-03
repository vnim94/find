import './Search.css';
import Dropdown, { Classification, Item } from './Dropdown';
import Options from './Options';
import { useEffect, useState, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setTitle, clearIndustries, setLocation } from '../job.slice';
import { getAllIndustries, getAllLocations } from '../job.api';

function Search(props) {

    const navigate  = useNavigate();
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    
    const [classificationDropdown, setClassificationDropdown] = useState(false);
    const [locationDropdown, setLocationDropdown] = useState(false);
    const [expanded, setExpanded] = useState(props.expanded);

    const title = useSelector(state => state.jobSearch.title);
    const selectedIndustries = useSelector(state => state.jobSearch.industries);
    const selectedProfessions = useSelector(state => state.jobSearch.professions);
    const selectedWorkTypes = useSelector(state => state.jobSearch.workTypes);
    const selectedPayBase = useSelector(state => state.jobSearch.payBase);
    const selectedPayCeiling = useSelector(state => state.jobSearch.payCeiling);
    const selectedTimeElapsed = useSelector(state => state.jobSearch.timeElapsed);
    const selectedLocation = useSelector(state => state.jobSearch.location);

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (searchParams.get('title')) searchParams.delete('title');
        if (searchParams.get('location')) searchParams.delete('location');
        if (searchParams.get('industry')) searchParams.delete('industry');
        if (searchParams.get('profession')) searchParams.delete('profession');
        if (searchParams.get('workType')) searchParams.delete('workType');
        if (searchParams.get('payBase')) searchParams.delete('payBase');
        if (searchParams.get('payCeiling')) searchParams.delete('payCeiling');
        if (searchParams.get('added')) searchParams.delete('added');

        if (title !== '') searchParams.set('title', title);
        if (selectedLocation !== '') allLocations.filter(loc => 
            loc.city.toLowerCase().match(selectedLocation.toLowerCase()) !== null || 
            loc.suburb.toLowerCase().match(selectedLocation.toLowerCase()) !== null || 
            selectedLocation === `${loc.city} ${loc.suburb}`
        ).forEach(loc => searchParams.append('location', loc.id));
        if (selectedIndustries.length > 0) selectedIndustries.forEach(industry => searchParams.append('industry', industry.id)) 
        if (selectedProfessions.length > 0) selectedProfessions.forEach(profession => searchParams.append('profession', profession.id)); 
        if (selectedWorkTypes.length > 0) selectedWorkTypes.forEach(workType => searchParams.append('workType', workType));
        if (selectedPayBase) searchParams.set('payBase', selectedPayBase);
        if (selectedPayCeiling) searchParams.set('payCeiling', selectedPayCeiling);
        if (selectedTimeElapsed) searchParams.set('added', selectedTimeElapsed); 
        searchParams.set('page', 1);
        searchParams.set('sortByDate', false);

        setSearchParams(searchParams);
        setClassificationDropdown(false);
        setLocationDropdown(false);

        navigate({
            pathname: '/jobs',
            search: searchParams.toString()
        })
    }

    const [displayedLocations, setDisplayedLocations] = useState();

    const handleChange = (event) => {
        if (locationDropdown === false) setLocationDropdown(true);
        let searchTerms = event.target.value;
        dispatch(setLocation(searchTerms));

        let filteredLocations;
        if (searchTerms === '') { 
            filteredLocations = allLocations
        } else {
            filteredLocations = allLocations.filter(loc => loc.city.toLowerCase().match(searchTerms.toLowerCase()) !== null || loc.suburb.toLowerCase().match(searchTerms.toLowerCase()) !== null)
        }

        setDisplayedLocations(filteredLocations);
    }

    const [allIndustries, setAllIndustries] = useState();
    const [allLocations, setAllLocations] = useState();

    useEffect(() => {
        async function fetchAllIndustries() {
            const response = await getAllIndustries();
            if (response.data.allIndustries) setAllIndustries(response.data.allIndustries);
        }
        async function fetchAllLocations() {
            const response = await getAllLocations();
            if (response.data.allLocations) { setAllLocations(response.data.allLocations); setDisplayedLocations(response.data.allLocations) };
        }

        fetchAllIndustries();
        fetchAllLocations();
    },[])

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
        <section className="search flex flex-jc-c">
            <div className="page flex flex-col flex-jc-sb flex-ai-c">
                <div className="search-container">
                    <form className="flex flex-row flex-jc-sb" onSubmit={handleSubmit}>
                        <div className="what flex flex-col">
                            <label>What</label>
                            <div className="flex flex-row" ref={selectClassification}>
                                <input className="form-control" type="text" value={title} onChange={(e) => dispatch(setTitle(e.target.value))} placeholder="Enter Keywords"/>
                                <div className={`${title.length === 0 && 'hidden'} clear-what flex flex-ai-c`} onClick={() => { dispatch(setTitle('')) }}>
                                    <span className="medium material-icons-outlined">clear</span>
                                </div>
                                <div className={`classification form-control flex flex-ai-c flex-jc-sb ${classificationDropdown && 'outlined'}`} onClick={() => setClassificationDropdown(!classificationDropdown)}>
                                    <span className="dark-grey">
                                        {selectedIndustries.length === 0 ? 
                                            'Any classification' 
                                        : 
                                            selectedIndustries.length > 1 ? 
                                                `${selectedIndustries.length} classifications`
                                            : 
                                                selectedIndustries[0].name.length > 20 ? 
                                                    `${selectedIndustries[0].name.slice(0,20)} ...`
                                                :
                                                    selectedIndustries[0].name
                                        }
                                    </span>
                                    <div className={`${selectedIndustries.length > 0 && 'shrink'} list-action flex flex-ai-c`}>
                                        <span className={`${classificationDropdown && 'flip'} material-icons-outlined`}>expand_more</span>
                                        <div className={`${selectedIndustries.length === 0 && 'hidden'} clear flex flex-ai-c`} onClick={() => dispatch(clearIndustries())}>
                                            <span className="medium material-icons-outlined">clear</span>
                                        </div>
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
                        <div className="where flex flex-col" ref={where}>
                            <label>Where</label>
                            <input className="form-control" type="search" value={selectedLocation.length > 15 ? selectedLocation.slice(0, 25) + '...' : selectedLocation} onChange={handleChange} placeholder="Enter suburb, city, or region" onFocus={() => setLocationDropdown(!locationDropdown)}/>
                            <div className={`${selectedLocation === '' && 'hidden'} clear-where flex flex-ai-c`} onClick={() => { dispatch(setLocation('')); setLocationDropdown(false); }}>
                                <span className="medium material-icons-outlined">clear</span>
                            </div>
                            {locationDropdown && displayedLocations.length > 0 && <Dropdown>
                                {displayedLocations && displayedLocations.map((location, index) => {
                                    return <Item key={index} text={`${location.city} ${location.suburb}`} toggleList={setLocationDropdown}/>
                                })}
                            </Dropdown>}
                        </div>
                        <div className="find flex flex-ai-fe">
                            <button className="bg-black white btn" type="submit">Find</button>
                        </div>
                    </form>
                    {!expanded && <div className="flex flex-jc-fe">
                        <div className="more flex flex-ai-c" onClick={() => setExpanded(!expanded)}>
                            <span className="small underlined">More options</span>
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