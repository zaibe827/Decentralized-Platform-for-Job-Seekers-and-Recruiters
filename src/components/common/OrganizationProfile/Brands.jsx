import React from 'react';
import "./Brands.scss";
import googleImage from "../../../assets/google.png";
import slackImage from "../../../assets/slack.png";
import atlassianImage from "../../../assets/atlassian.png";
import dropboxImage from "../../../assets/dropbox.png";
import shopifyImage from "../../../assets/shopify.png";

const Brands = () => {
  return (
    <div>
      <h1 className='brand_heading'>Our Distinguished Registered Organizations</h1>
      <div className='jobportal__brand section'>

        <div className='brand-images-box'>
          <div className='slide'><img src={googleImage} alt="Google" />
          </div>
          <div className='slide'>
            <img src={slackImage} alt="Slack" />
          </div>
          <div className='slide'>
            <img src={atlassianImage} alt="Atlassian" />
          </div>
          <div className='slide'>
            <img src={dropboxImage} alt="Dropbox" />
          </div>
          <div className='slide'>
            <img src={shopifyImage} alt="Shopify" />
          </div>

          <div className='slide'><img src={googleImage} alt="Google" />
          </div>
          <div className='slide'>
            <img src={atlassianImage} alt="Atlassian" />
          </div>
          <div className='slide'>
            <img src={dropboxImage} alt="Dropbox" />
          </div>
          <div className='slide'>
            <img src={shopifyImage} alt="Shopify" />
          </div>
          <div className='slide'><img src={googleImage} alt="Google" />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Brands;
