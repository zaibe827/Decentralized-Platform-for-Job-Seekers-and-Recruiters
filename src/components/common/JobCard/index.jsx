import React from 'react';
import './index.scss';

const JobCard = ({
  title,
  organization,
  description,
  datePosted,
  salary,
  city,
  experienceRequired,
  skillsRequired,
  lastDateToApply,
  link,
}) => {
  const handleApply = () => {
    window.location.href = link;
  };
  function formatDate(dateString) {
    if (dateString) {
      const dateObj = new Date(Date.parse(dateString)); // Parse the string
      return dateObj.toLocaleDateString(); // Or use Moment.js
    } else {
      return 'N/A';
    }
  }


  return (
    //I have modify the Jobcard code on 5-Febuary-2024

    <div className="job-card">
      <div className="title">Title:- {title}</div>
      {/* <div className="details">
        <span>Date Posted:</span> {new Date(datePosted.seconds * 1000).toLocaleDateString()}
      </div>   */}

      <div className="details">
        <span>Date Posted:</span> {datePosted && datePosted.seconds ? new Date(datePosted.seconds * 1000).toLocaleDateString() : 'N/A'}
      </div>


      {/* <div className="organization">Organization: {organization}</div> */}
      <div className="organization"><strong>Organization:</strong> {organization}</div>
      <div className="description"><strong>Description:</strong>{description}</div>
      <div className="details">
        <span><strong>City:</strong></span> {city}
      </div>
      {/* <div className="details">
        <span>Date Posted:</span> {datePosted.toDate().toLocaleDateString()} {/* Converting the Firebase Timestamp to Date *
      </div> */}



      <div className="details">
        <span><strong>Salary:</strong></span> {salary}
      </div>
      <div className="details">
        <span><strong>Experience Required:</strong></span> {experienceRequired}
      </div>
      <div className="details">
        <span><strong>Skills Required:</strong></span> {skillsRequired}
      </div>
      {/* <div className="details">
        <span><strong>Last Date to Apply:</strong></span> {lastDateToApply}
      </div> */}
      {/* <div className="details">
        <span><strong>Last Date to Apply:</strong></span> {lastDateToApply ? new Date(lastDateToApply.seconds * 1000).toLocaleDateString() : 'N/A'}
      </div> */}
      <div className="details">
        <span><strong> Last Date to Apply:</strong></span> {formatDate(lastDateToApply)}
      </div>

      <button className="apply-button" onClick={handleApply}>
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;