import React from 'react';
import "../OrganizationProfile/JobPage.scss";
import JobForm from "../JobForm/index";
import Brands from "./Brands";
import Footer from "../Footer"


export default function JobPage() {

    return (


        <div className='Job_Page'> 

            {/* <div className='employer_heading'><h2>Are You a Employer?</h2></div> */}
            <div className="employerbox">
                <h2>Are You a Employer?</h2>
                <ul>
                    <li><span>1</span>Decentralized Verification</li>
                    <li><span>2</span>Job Posting</li>
                    <li><span>3</span>Enhance Engagement</li>
                    <li><span>4</span>Less Paper Work</li>
                    <li><span>5</span>Choose the Best</li>
                </ul>
            </div>

            <h1 className='job_heading'>Recruit Your Dream Team...</h1>

            <div className='JobForm_button'>
                <JobForm />
            </div>
            <div className='Jobpage_Brands'>
                <Brands />
            </div>

            <div className='jobpage_footer'>
                <Footer />
            </div>
        </div>

    )
}

// JobPage()
