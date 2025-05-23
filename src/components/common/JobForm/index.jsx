import React, { useState, useEffect } from 'react';
import './index.scss';
import minus from "../../../assets/minus.png";
import plus from "../../../assets/plus.png";
import { postJobForCurrentUser, getCurrentUser } from '../../../api/FirestoreAPI';
import DatePicker from 'react-datepicker'; // Import the date picker component
import 'react-datepicker/dist/react-datepicker.css'; // Import the date picker styles

const JobPostForm = () => {
    const [showForm, setShowForm] = useState(false);
    const [skills, setSkills] = useState(['']);
    const [jobData, setJobData] = useState({
        jobTitle: '',
        jobDescription: '',
        salary: '',
        experience: '',
        lastDate: new Date(),
        joblink: '',
        skills: [''],
        city: '',
        organization: '',
    });
    const [currentUser, setCurrentUser] = useState(null);
    const [currency, setCurrency] = useState('Rs'); // Default pay pk currency:)


    useEffect(() => {
        getCurrentUser(setCurrentUser);
    }, []);

    const addSkillField = () => {
        setSkills([...skills, '']);
    };

    const handleSkillChange = (index, value) => {

        const trimmedValue = value.trim(); 
        const wordLimit = 8; 
        const words = trimmedValue.split(/\s+/);
        if (words.length > wordLimit) {
          alert(`Skill cannot exceed ${wordLimit} words. .`);
          return;
        }

        const updatedSkills = [...skills];
        updatedSkills[index] = value;
        setSkills(updatedSkills);
    };

    const removeSkillField = (index) => {
        const updatedSkills = [...skills];
        updatedSkills.splice(index, 1);

        setSkills(updatedSkills);
    };

    // const handleChange = (e) => {
    //     const { id, value } = e.target;
    //     setJobData({ ...jobData, [id]: value });
    // };
    const handleChange = (e) => {
        const { id, value } = e.target;

        // Validate specific fields
        if (id === 'jobTitle' || id === 'city') {
            const words = value.trim().split(/\s+/);
            const wordLimit = 10;
            if (/\d/.test(value)) {
                setErrors({ ...errors, [id]: 'Field must not contain numeric characters' });
            }
            else if (words.length > wordLimit) {
                setErrors({ ...errors, [id]: `${id.charAt(0).toUpperCase() + id.slice(1)} should not exceed ${wordLimit} words.` });
            }
            else {
                setJobData({ ...jobData, [id]: value });
                if (errors[id] && !value.trim()) {
                    setErrors({ ...errors, [id]: '' });
                }
            }
        } else if (id === 'joblink') {
            // Word limit validation for job link
            const words = value.trim().split(/\s+/);
            const wordLimit = 15;

            if (words.length > wordLimit) {
                setErrors({ ...errors, [id]: `Job Link should not exceed ${wordLimit} words.` });
                return; // Return here to prevent further validation if word limit is exceeded
            } else {
                setErrors({ ...errors, [id]: '' });
            }

            // URL format validation
            if (!value.trim()) {
                setJobData({ ...jobData, [id]: '' });
                setErrors({ ...errors, [id]: '' });
            } else {
                const isValidUrl = /^[^ "]+\.(com|org|edu|pk)(\/.*)?$/.test(value);

                if (!isValidUrl) {
                    setErrors({ ...errors, [id]: 'Invalid URL format' });
                } else {
                    setErrors({ ...errors, [id]: '' }); // Clear the error message if URL format is valid
                }

                setJobData({ ...jobData, [id]: value });
            }
        }
        else if (id === 'jobDescription') {

            const words = value.trim().split(/\s+/);
            const wordLimit = 100;

            if (words.length > wordLimit) {
                setErrors({ ...errors, [id]: `Job Description should not exceed ${wordLimit} words.` });
            } else {
                setErrors({ ...errors, [id]: '' });
                setJobData({ ...jobData, [id]: value });
            }
        }
        else if (id === 'organization') {

            const words = value.trim().split(/\s+/);
            const wordLimit = 10;

            if (words.length > wordLimit) {
                setErrors({ ...errors, [id]: `Organization name should not exceed ${wordLimit} words.` });
            } else {
                setErrors({ ...errors, [id]: '' });
                setJobData({ ...jobData, [id]: value });
            }
        }
        else if (id === 'salary') {
            const numericValue = value.replace(/\D/g, ''); // Remove non-numeric characters
            if (numericValue.length > 8) {
                setErrors({ ...errors, [id]: 'Salary cannot exceed 8 digits' });
            } else {
                setErrors({ ...errors, [id]: '' }); // Clear error if within limit
                setJobData({ ...jobData, [id]: numericValue }); // Update job data with the numeric value
            }
            return; 
        }

        else {
            setJobData({ ...jobData, [id]: value });
        }
    };

    const handleDateChange = (date) => {

        const selectedDate = new Date(date.setHours(0, 0, 0, 0));
        const formattedDate = selectedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit'
        });
        setJobData({ ...jobData, lastDate: formattedDate });
    };

    const handleSubmit = () => {
        if (!validateForm()) {
            console.error("Form validation failed.");
            return;
        }
        if (!currentUser) {
            console.error("No current user found.");
            return;
        }

        // Filter out empty skills
        const filteredSkills = skills.filter(skill => skill.trim() !== '');

        // default values for empty fields
        const defaultValues = {
            jobTitle: '',
            jobDescription: '',
            salary: '',
            experience: '',
            lastDate: '',
            joblink: '',
            city: '',
            organization: '',
        };

        // Capture the current date
        // const currentDate = new Date(); 

        // Now Construct: job data with updated skills and default values
        const updatedJobData = {
            ...defaultValues,
            ...jobData,
            skills: filteredSkills,
            datePosted: new Date(), // Add the current date to the job data
        };
        postJobForCurrentUser(updatedJobData, currentUser.userID)
            .then(() => {
                setJobData({
                    jobTitle: '',
                    jobDescription: '',
                    salary: '',
                    experience: '',
                    lastDate: '',
                    joblink: '',
                    skills: [''],
                    city: '',
                    organization: '',

                });
                setShowForm(false);
            })
            .catch((error) => {
                console.error("Error posting job:", error);
            });
    };



    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!jobData.jobTitle.trim()) {
            errors.jobTitle = 'Job Title is required';
        }
        if (!jobData.jobDescription.trim()) {
            errors.jobDescription = 'Job Description is required';
        }
        if (!jobData.salary.trim()) {
            errors.salary = 'Salary is required';
        }
        if (!jobData.organization.trim()) {
            errors.organization = 'Organization Name is required';
        }
        if (!jobData.joblink.trim()) {
            errors.joblink = 'Job Link is required';
        }
        // we can add more validations if required for other fields as well 

        setErrors(errors);
        return Object.keys(errors).length === 0;
    };


    return (
        <div>
            <button className='open_jobform' onClick={() => setShowForm(true)}>Post a Job</button>
            <div className={`job-post-form ${showForm ? 'visible' : ''}`}>
                <div className="close-button" onClick={() => setShowForm(false)}>X</div>
                <div className="form-field">
                    <label htmlFor="jobTitle">Job Title:</label>
                    <input type="text" id="jobTitle" autoComplete="off" value={jobData.jobTitle} onChange={handleChange} placeholder="Enter Job Title" />
                    {errors.jobTitle && <div className="error error-red">{errors.jobTitle}</div>}
                </div>
                <div className="form-field">
                    <label htmlFor="jobDescription" >Job Description:</label>
                    <textarea id="jobDescription" autoComplete="off" value={jobData.jobDescription} onChange={handleChange} placeholder="Enter Job Description..."></textarea>
                    {errors.jobDescription && <div className="error error-red">{errors.jobDescription}</div>}
                </div>
                {/* <div className="form-field">
                    <label htmlFor="salary">Salary:</label>
                    <input type="text" id="salary" value={jobData.salary} onChange={handleChange} placeholder="Enter salary..." />
                    {errors.salary && <div className="error error-red">{errors.salary}</div>}
                </div> */}
                <div className="form-field">
                    <label htmlFor="salary">Salary:</label>
                    <div className="salary-input">
                        <input type="number" id="salary" autoComplete="off" value={jobData.salary} onChange={handleChange} placeholder="Enter Salary" />
                        <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="currency-select">
                            <option value="PKR">Rs</option>
                            <option value="USD">$</option>
                        </select>
                    </div>
                    {errors.salary && <div className="error error-red">{errors.salary}</div>}
                </div>

                <div className="form-field">
                    <label htmlFor="experience">Experience Required:</label>
                    <select id="experience" value={jobData.experience} className='jobform-dropdown' onChange={handleChange}>
                        <option value="">Select Experience</option>
                        <option value="Fresher">Fresher</option>
                        <option value="0-1 year">0-1 year</option>
                        <option value="1-3 years">1-3 years</option>
                        <option value="3-5 years">3-5 years</option>
                        <option value="5+ years">5+ years</option>
   
                    </select>
                </div>
                <div className="form-field">
                    <label htmlFor="city">City:</label>
                    <input type="text" id="city" autoComplete="off"
                        value={jobData.city} onChange={handleChange} placeholder="Enter City" />
                </div>
                <div className="form-field">
                    <label htmlFor="lastDate">Last Date to Apply:</label>
                    <DatePicker
                        selected={jobData.lastDate}
                        onChange={handleDateChange}
                        dateFormat="MM/dd/yyyy"
                        minDate={new Date()} // Restrict selection to today and future dates
                        placeholderText="Select last date to apply..."
                        showTimeSelect={false} // Set showTimeSelect prop to false to hide the time picker
                    />

                </div>
                <div className="form-field">
                    <label htmlFor="organization">Organization</label>
                    <input type="text" id="organization" autoComplete="off" value={jobData.organization} onChange={handleChange} placeholder="Enter Organization Name" />
                    {errors.organization && <div className="error error-red">{errors.organization}</div>}
                </div>
                <div className="form-field">
                    <label htmlFor="lastDate">Job Link:</label>
                    <input type="text" id="joblink" autoComplete="off" value={jobData.joblink} onChange={handleChange} placeholder="Job Link" />
                    {errors.joblink && <div className="error error-red">{errors.joblink}</div>}
                </div>
                {skills.map((skill, index) => (
                    <div className="form-field" key={index}>
                        <label htmlFor={`skill${index}`}>Skill:</label>
                        <div className="skill-input">
                            <input
                                autoComplete='off'
                                type="text"
                                // id={`skill${index}`}
                                placeholder="Enter skills"
                                value={skill}
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                            />
                            {index > 0 && (
                                <span>
                                    <button className="minus" onClick={() => removeSkillField(index)}>
                                        <img className='img-style' src={minus} alt="minus" />
                                    </button>
                                </span>
                            )}
                        </div>
                    </div>
                ))}
                <button type="button" className='add' onClick={addSkillField}>
                    <img className='img-style' src={plus} alt="plus" />
                </button>
                <div className="form-field">
                    <button className='post-button' type="button" onClick={handleSubmit}>Post</button>
                </div>
            </div>
        </div>
    );
};

export default JobPostForm;
