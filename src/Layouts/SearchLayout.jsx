import React, { useState, useEffect } from 'react';
import Topbar from '../components/common/Topbar';
import "../Sass/SearchLayout.scss";
import Footer from '../components/common/Footer';
import JobCard from '../components/common/JobCard';
import { getJobs } from "../api/FirestoreAPI";

export default function SearchLayout() {
    const [jobs, setJobs] = useState([]);
    const [searchCity, setSearchCity] = useState('');
    const [searchTitle, setSearchTitle] = useState('');
    const [searchOrganization, setSearchOrganization] = useState('');


    // useEffect(() => {
    //     const fetchJobs = async () => {
    //         const fetchedJobs = await getJobs();
    //         setJobs(fetchedJobs);
    //     };
    //     fetchJobs();
    // }, []);
    useEffect(() => {
        const fetchJobs = async () => {
            const fetchedJobs = await getJobs();
            // Sort jobs by datePosted in descending order
            fetchedJobs.sort((a, b) => b.datePosted - a.datePosted);
            setJobs(fetchedJobs);
        };
        fetchJobs();
    }, []);


    // Filter jobs based on search input
    const filteredJobs = jobs.filter(job => {
        const cityMatch = searchCity === '' || job.city.toLowerCase().includes(searchCity.toLowerCase());
        const titleMatch = searchTitle === '' || job.jobTitle.toLowerCase().includes(searchTitle.toLowerCase());
        const organizationMatch = searchOrganization === '' || job.organization.toLowerCase().includes(searchOrganization.toLowerCase());
        return cityMatch && titleMatch && organizationMatch;
    
    });

    // sort jobs by datePosted in descending order
    // so that the job that are posted recently will come first
    const sortedJobs = filteredJobs.slice().sort((a, b) => new Date(b.datePosted) - new Date(a.datePosted));

    return (
        <div>
            <Topbar />
            <div className='search-page-cards'>
                <div className='search-page-col-one'>
                    <div className='col-one-card-one'>
                        <div className='search-box'>
                            <p className='label'>Job Title: <input type='text' placeholder='Search by Job Title' value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)} /></p>
                            <p className='label'>Location: <input type='text' placeholder='Search by City' value={searchCity} onChange={(e) => setSearchCity(e.target.value)} /></p>
                            <p className='label'>Organization: <input type='text' placeholder='Search by Organization' value={searchOrganization} onChange={(e) => setSearchOrganization(e.target.value)} /></p>

                            <button>Search</button>
                        </div>
                    </div>
                </div>
                <div className='search-page-col-two'>
                    {sortedJobs.map(job => (
                        <JobCard
                            key={job.id}
                            title={job.jobTitle}
                            organization={job.organization}
                            description={job.jobDescription}
                            datePosted={job.datePosted}
                            salary={job.salary}
                            city={job.city}
                            experienceRequired={job.experience}
                            skillsRequired={job.skills.join(", ")}
                            lastDateToApply={job.lastDate}
                            link={job.joblink}
                        />
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}
