import React, { useMemo, useState } from 'react';
import "../Pages/Home";
import { getCurrentUser } from '../api/FirestoreAPI';
import Home from '../Pages/Home';
import Topbar from '../components/common/Topbar';
import "../Sass/HomeLayout.scss";
import ad from "../assets/ad.jpg";
import jobAd2 from "../assets/jobAd2.jpg";
import jobAd3 from "../assets/jobAd3.jpg";
import Footer from '../components/common/Footer';

export default function HomeLayout() {
    const [currentUser, setCurrentUser] = useState({});
    useMemo(() => {
        getCurrentUser(setCurrentUser)
    }, [])
    return (
        <div className='background-div'>
            <Topbar />
            <div className='home-page-cards'>
                <div className='home-page-col-one'>
                    <div className='col-one-card-one-home'>
                        <p className="col-one-card-name">
                            {Object.values(currentUser).length === 0
                                ? currentUser.name
                                : currentUser?.name}
                        </p>
                        <p className="col-one-card-headline">
                            {Object.values(currentUser).length === 0
                                ? currentUser.headline
                                : currentUser?.headline} at {Object.values(currentUser).length === 0
                                    ? currentUser.company
                                    : currentUser?.company}
                        </p>
                        <p className="col-one-card-aboutme">
                            <b>Bio: </b>
                            {Object.values(currentUser).length === 0
                                ? currentUser.aboutMe
                                : currentUser?.aboutMe}
                        </p>
                        <p className="col-one-card-info"> <b>Address:</b>{" "}
                            {Object.values(currentUser).length === 0
                                ? currentUser.city
                                : currentUser?.city}, {Object.values(currentUser).length === 0
                                    ? currentUser.country
                                    : currentUser?.country}
                        </p>
                        <p className="col-one-card-info"> <b>College:</b>{" "}
                            {Object.values(currentUser).length === 0
                                ? currentUser.college
                                : currentUser?.college}
                        </p>
                        <p className="col-one-card-info"><b>Skills:</b>{" "}
                            {Object.values(currentUser).length === 0
                                ? currentUser.skills
                                : currentUser?.skills}
                        </p>
                        <p className="col-one-card-info">
                            {currentUser.website ? (
                                <a
                                    className="website"
                                    href={
                                        currentUser.website.startsWith("http")
                                            ? currentUser.website
                                            : "https://" + currentUser.website
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    
                                    <b>Website:</b> {currentUser.website}
                                </a>
                            ) : (
                                <></>
                            )}
                        </p>

                    </div>
                </div>
                <div className='home-page-col-two'>
                    <Home currentUser={currentUser} />
                </div>
                <div className='home-page-col-three'>
                    <div className='col-three-card-one'>
                        <img className='ad-img' src={ad} alt="Logo" />
                    </div>

                    <div className='col-three-card-one'>
                        <img className='ad-img' src={jobAd2} alt="Logo" />
                    </div>
                    <div className='col-three-card-one'>
                        <img className='ad-img' src={jobAd3} alt="Logo" />
                    </div>

                </div>
            </div>
            <Footer />
        </div>
    )
}
