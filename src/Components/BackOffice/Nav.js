import React, { useEffect, useReducer } from 'react'
import xtronLogo from '../../assets/img/xtronlong.png'
import { Link } from 'react-router-dom';
import { FaPowerOff, FaRegFileAlt, FaTelegramPlane, FaDollarSign } from "react-icons/fa";

function MyNav(lang) {
    return (
        <div className="navig d-flex justify-content-center shadow">
                    <div className="container d-flex justify-content-between align-items-center">
                    

                    <Link to={{
                        pathname: "/",
                        state: lang
                    }} className="logo-payment-link">
                        <img className="logo-payment-nav" src={xtronLogo} alt="logo xtron" />
                    </Link>
                    
                    
                    <div className="action-links">
                    <Link to={{
                        pathname: "/back-office-main",
                        state: lang
                    }} className="navicon">
                        <FaDollarSign size={30} /> <span className="naviconTXT">Dashboard</span>
                    </Link>

                    {/*<a rel="noreferrer" target="_blank" className="navicon" href="https://t.me/xtronoficial"><FaTelegramPlane size={30} /> <span className="naviconTXT">News</span></a>*/}
                        
                    

                    <Link to={{
                        pathname: "/tutorial",
                        state: lang
                    }} className="navicon">
                        <FaRegFileAlt size={30} /> <span className="naviconTXT">Tutorial</span>
                    </Link>

                    

                    <Link to={{
                        pathname: "/",
                        state: lang
                    }} className="logo-payment-link">
                        <FaPowerOff size={30} color={'#f33f3f'}/>
                    </Link>


                    </div>
                    </div>
                </div>
    )
}

export default MyNav