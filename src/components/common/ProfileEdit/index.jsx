import React, { useState, useEffect } from "react";
import './index.scss';
import { editProfile, getAllUsers, getUserByCompany, addNotification, getJobsByCompanyAndTitle } from "../../../api/FirestoreAPI";
import { AiOutlineClose } from 'react-icons/ai';
import plus from "../../../assets/plus.png";
import remove from "../../../assets/minus.png";

 import Select from 'react-select';


export default function ProfileEdit({ onEdit, currentUser }) {

    // const [editInputs, setEditInputs] = useState(currentUser);
    const [editInputs, setEditInputs] = useState({ ...currentUser, country: '' }); // Add country field to editInputs state

    const [inputValue, setInputValue] = useState('');
    const [jobs, setJob] = useState([{ title: '', company: '' }]);
    const [companySuggestions, setCompanySuggestions] = useState([]);
    const [oldTitles, setOldTitles] = useState([]);
    const [oldCompanies, setOldCompanies] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState(null);



    const countryOptions = [
        { value: 'PK', label: 'Pakistan' },
        { value: 'USA', label: 'United States' },
        { value: 'UK', label: 'United Kingdom' },
        { value: 'PK', label: 'Pakistan' },
        { value: 'CA', label: 'Canada' },
        { value: 'AU', label: 'Australia' },
        { value: 'DE', label: 'Germany' },
        { value: 'FR', label: 'France' },
        { value: 'JP', label: 'Japan' },
        { value: 'BR', label: 'Brazil' },
        { value: 'RU', label: 'Russia' },
        { value: 'CN', label: 'China' },
        { value: 'IN', label: 'India' },
        { value: 'MX', label: 'Mexico' },
        { value: 'NG', label: 'Nigeria' },
        { value: 'ZA', label: 'South Africa' },
        { value: 'SA', label: 'Saudi Arabia' },
        { value: 'AE', label: 'United Arab Emirates (UAE)' },
        { value: 'SG', label: 'Singapore' },
        { value: 'MY', label: 'Malaysia' },
        { value: 'KR', label: 'South Korea' },
        { value: 'TH', label: 'Thailand' },
        { value: 'ID', label: 'Indonesia' },
        { value: 'PH', label: 'Philippines' },
        { value: 'HK', label: 'Hong Kong' },
        { value: 'KW', label: 'Kuwait' },
        { value: 'QA', label: 'Qatar' },
        { value: 'BH', label: 'Bahrain' },
        { value: 'OM', label: 'Oman' },
        { value: 'LB', label: 'Lebanon' },
        { value: 'JO', label: 'Jordan' },
        { value: 'EG', label: 'Egypt' },
    ];

    const handleCountryChange = (selectedOption) => {
        setSelectedCountry(selectedOption);
        setEditInputs({ ...editInputs, country: selectedOption ? selectedOption.label : '' }); // Update country field in editInputs state

    };



    useEffect(() => {
        if (currentUser && currentUser.pastExperience) {
            setJob(currentUser.pastExperience);
            // Logging and saving old titles and companies
            const titles = currentUser.pastExperience.map(job => job.title);
            const companies = currentUser.pastExperience.map(job => job.company);
            setOldTitles(titles);
            setOldCompanies(companies);
            console.log("Old Titles:", titles);
            console.log("Old Companies:", companies);
        }
    }, [currentUser]);

    useEffect(() => {
        getAllUsers(users => {
            const companyNames = users.map(user => ({ name: user.name, id: user.id })).filter(Boolean); // Filter out undefined/null values
            setCompanySuggestions(companyNames);
        });
    }, []);



    const getInput = (event) => {
        const { name, value } = event.target;

        if (name === 'name') {
            const words = value.trim().split(/\s+/);
            const wordLimit = 3;
            if (words.length > wordLimit) {
                setNameError(`Name should not exceed ${wordLimit} words.`);
                return;
            } else {
                // Clear error message if within limit
                setNameError('');
            }
        } else if (name === 'headline') {
            const words = value.trim().split(/\s+/);
            const wordLimit = 6;
            if (words.length > wordLimit) {

                setHeadlineError(`Headline should not exceed ${wordLimit} words.`);
                return;
            } else {
                setHeadlineError('');
            }
        } else if (name === 'city') {
            const words = value.trim().split(/\s+/);
            const wordLimit = 5;
            if (words.length > wordLimit) {
                setCityError(`City should not exceed ${wordLimit} words.`);
                return;
            } else {
                setCityError('');
            }
        } else if (name === 'company') {
            const words = value.trim().split(/\s+/);
            const wordLimit = 6; // Set your desired word limit
            if (words.length > wordLimit) {
                setCompanyError(`Company should not exceed ${wordLimit} words.`);
                return;
            } else {
                setCompanyError('');
            }
        }
        else if (name === 'website') {
            // Word limit validation for website
            const words = value.trim().split(/\s+/);
            const wordLimit = 15;

            if (words.length > wordLimit) {
                setWebsiteError(`Website should not exceed ${wordLimit} words.`);
                return; // Return here to prevent further validation if word limit is exceeded
            } else {
                setWebsiteError('');
            }

            // URL format validation
            if (!value.trim()) {
                setEditInputs({ ...editInputs, [name]: '' });
                setWebsiteError('');
            } else {
                const isValidUrl = /^[^ "]+\.(com|org|edu|pk)(\/.*)?$/.test(value);

                if (!isValidUrl) {
                    setWebsiteError('Invalid URL format');
                } else {
                    setWebsiteError(''); // Clear the error message if URL format is valid
                }
            }
        }
        else if (name === 'industry') {
            const words = value.trim().split(/\s+/);
            const wordLimit = 8; // Set your desired word limit
            if (words.length > wordLimit) {
                setIndustryError(`Industry should not exceed ${wordLimit} words.`);
                return;
            } else {
                setIndustryError('');
            }
        } else if (name === 'college') {
            const words = value.trim().split(/\s+/);
            const wordLimit = 8; // Set your desired word limit
            if (words.length > wordLimit) {
                setCollegeError(`College should not exceed ${wordLimit} words.`);
                return;
            } else {
                setCollegeError('');
            }
        }
        else if (name === 'skills') {
            const words = value.trim().split(/\s+/);
            const wordLimit = 14; // Set your desired word limit
            if (words.length > wordLimit) {
                setSkillsError(`Skills should not exceed ${wordLimit} words.`);
                return;
            } else {
                setSkillsError('');
            }
        } else if (name === 'aboutMe') {
            const words = value.trim().split(/\s+/);
            const wordLimit = 16; // Set your desired word limit
            if (words.length > wordLimit) {
                setAboutError(`About Me should not exceed ${wordLimit} words.`);
                return;
            } else {
                setAboutError('');
            }
        } else if (name === 'vision') {
            const words = value.trim().split(/\s+/);
            const wordLimit = 15; // Set your desired word limit
            if (words.length > wordLimit) {
                setVisionError(`Vision should not exceed ${wordLimit} words.`);
                return;
            } else {
                setVisionError('');
            }
        } else if (name === 'mission') {
            const words = value.trim().split(/\s+/);
            const wordLimit = 15; // Set your desired word limit
            if (words.length > wordLimit) {
                setMissionError(`Mission should not exceed ${wordLimit} words.`);
                return;
            } else {
                setMissionError('');
            }
        }




        setInputValue(value);
        setEditInputs({ ...editInputs, [name]: value });
    };


    const getJobTitle = (index) => {
        return jobs[index] ? jobs[index].title : '';
    };


    const handlePastExperienceChange = (index, fieldName, value) => {
        const updatedJobs = [...jobs];
        updatedJobs[index][fieldName] = value;
        setJob(updatedJobs);
    };

    const addPastJob = () => {
        setJob([...jobs, { title: '', company: '', status: 'unverified' }]);
    };
    const removePastJob = () => {
        if (jobs.length > 1) {
            const updatedJobs = [...jobs];
            updatedJobs.pop();
            setJob(updatedJobs);
        }
    };
    const updateProfileData = async () => {
        try {
            //   // Log the total number of notifications before performing any other actions
            //   const totalNotifs = await totalNotifications();
            //   console.log("Total Notifications:", totalNotifs);

            // Update profile data
            const updatedInputs = { ...editInputs, pastExperience: jobs };
            await editProfile(currentUser?.userID, updatedInputs);
            await onEdit();

            // Add notifications if necessary
            if (jobs.length > 0) {
                console.log("Companies from Past Experience:");
                jobs.forEach(async (job, index) => {
                    const existingJob = await getJobsByCompanyAndTitle(currentUser.userID, job.company, job.title);
                    if (!existingJob) {
                        const user = await getUserByCompany(job.company);
                        if (user) {
                            const isTitleChanged = job.title !== oldTitles[index];
                            const isCompanyChanged = job.company !== oldCompanies[index];
                            if (isTitleChanged || isCompanyChanged) {
                                await addNotification(user.userID, user.name, getJobTitle(index), currentUser.userID, currentUser.name, currentUser.imageLink);
                            }
                        } else {
                            console.log("No user found for company:", job.company);
                        }
                    }
                });
            }
        } catch (error) {
            console.error("Error updating profile data:", error);
        }
    };

    const [nameError, setNameError] = useState('');
    const [headlineError, setHeadlineError] = useState('');
    const [cityError, setCityError] = useState('');
    const [companyError, setCompanyError] = useState('');
    const [industryError, setIndustryError] = useState('');
    const [collegeError, setCollegeError] = useState('');
    const [skillsError, setSkillsError] = useState('');
    const [aboutError, setAboutError] = useState('');
    const [visionError, setVisionError] = useState('');
    const [missionError, setMissionError] = useState('');
    const [websiteError, setWebsiteError] = useState('');


    return (
        <div className='profile-form'>
            <div className="edit-btn" >
                <AiOutlineClose className="close-icon" onClick={onEdit} size={25} />
            </div>
            <div className="profile-edit-inputs">
                <label>Name</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="Name"
                    name="name"
                    value={editInputs.name}
                    autoComplete="off"
                />
                {nameError && <div className="error error-red">{nameError}</div>}

                <label>Headline</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="Headline"
                    value={editInputs.headline}
                    name="headline"
                    autoComplete="off"
                />
                {headlineError && <div className="error error-red" >{headlineError}</div>}

                <label>Country</label>
                <Select
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    options={countryOptions}
                    placeholder="Select country..."
                />


                <label>City</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="City"
                    name="city"
                    value={editInputs.city}
                    autoComplete="off"
                />
                {cityError && <div className="error error-red">{cityError}</div>}

                <label>Company</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="Company"
                    value={editInputs.company}
                    name="company"
                    autoComplete="off"
                />
                {companyError && <div className="error error-red">{companyError}</div>}

                <label>Past Experience </label>
                {jobs.map((job, index) => (
                    <div key={index}>
                        <label>Job {index + 1} </label>
                        <label htmlFor={`job${index}Title`}>Title</label>
                        <div>
                            <input
                                type="text"
                                className="common-input"
                                id={`job${index}Title`}
                                placeholder="Enter Title..."
                                value={job.title}
                                onChange={(e) => handlePastExperienceChange(index, 'title', e.target.value)}
                            />
                        </div>
                        <label htmlFor={`job${index}Company`}>Company</label>
                        <div>
                            <input
                                className="common-input"
                                id={`job${index}Company`}
                                placeholder="Enter Company..."
                                value={job.company}
                                onChange={(e) => handlePastExperienceChange(index, 'company', e.target.value)}
                                list={`companySuggestions${index}`}
                            />

                            <datalist id={`companySuggestions${index}`}>
                                {companySuggestions.map((company, idx) => (
                                    <option key={idx} value={company.name} />
                                ))}
                            </datalist>
                        </div>
                        <label htmlFor={`job${index}Status`}>Status: {job.status}</label>
                    </div>
                ))}
                <span>
                    <button type="button" className='add-remove' onClick={addPastJob}>
                        <img className='img-style' src={plus} alt="plus" />
                    </button>
                    <button type="button" className='add-remove' onClick={removePastJob}>
                        <img className='img-style' src={remove} alt="remove" />
                    </button>
                </span>

                <label>Industry </label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="Industry"
                    name="industry"
                    value={editInputs.industry}
                    autoComplete="off"
                />
                {industryError && <div className="error error-red">{industryError}</div>}

                <label>College</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="College"
                    name="college"
                    value={editInputs.college}
                    autoComplete="off"
                />

                <label>Website</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="Website"
                    name="website"
                    value={editInputs.website}
                    autoComplete="off"
                />
                {websiteError && <div className="error error-red">{websiteError}</div>}
                <label>About</label>
                <textarea
                    placeholder="About Me"
                    className="common-textArea"
                    onChange={getInput}
                    rows={5}
                    name="aboutMe"
                    value={editInputs.aboutMe}
                    autoComplete="off"
                />
                {aboutError && <div className="error error-red">{aboutError}</div>}

                <label>Skills</label>
                <input
                    onChange={getInput}
                    className="common-input"
                    placeholder="Skill"
                    name="skills"
                    value={editInputs.skills}
                    autoComplete="off"
                />
                {skillsError && <div className="error error-red">{skillsError}</div>}

                <label>Vision</label>
                <textarea
                    placeholder="Vision"
                    className="common-textArea"
                    onChange={getInput}
                    rows={5}
                    name="vision"
                    value={editInputs.vision}
                    autoComplete="off"
                />
                {visionError && <div className="error error-red">{visionError}</div>}

                <label>Mission</label>
                <textarea
                    placeholder="Mission"
                    className="common-textArea"
                    onChange={getInput}
                    rows={5}
                    name="mission"
                    value={editInputs.mission}
                    autoComplete="off"
                />
                {missionError && <div className="error error-red">{missionError}</div>}

            </div>

            <div className="save-container">
                <button className="save-btn" onClick={updateProfileData}>
                    Save
                </button>
            </div>
        </div>
    )
}