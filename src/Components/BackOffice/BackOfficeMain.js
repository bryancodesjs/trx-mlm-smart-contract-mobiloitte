import React, { useEffect, useReducer } from 'react'
import BackOfficeSideDashboard from './BackOfficeSideDashboard'
import BackOfficeStatusFor12x from './BackOfficeStatusFor12x'
import BackOfficeStatusFor5x from './BackOfficeStatusFor5x'
import MyNav from './Nav'
/*import xtronLogo from '../../assets/img/xtronlong.png'*/
/*import { Link } from 'react-router-dom';*/
import { FaCog } from "react-icons/fa";

const initialState = {
    total5x: 0,
    buyIcon5x: false,
    total12x: 0,
    buyIcon12x: false,
    loginUser: 0,
    total: 0,
    usdValue: 0,
    partnerCount: 0,
    lang: "English",
    partnerCountM2: 0
}

export const BackofficeContext = React.createContext(initialState)

const reducer = (state, action) => {
    switch (action.type) {
        case 'chnage5x':
            return {
                ...state,
                total: state.total + parseFloat(action.payload),
                total5x: parseFloat(state.total5x) + parseFloat(action.payload)
            };
        case 'change12x':
            return {
                ...state,
                total: state.total + parseFloat(action.payload),
                total12x: parseFloat(state.total12x) + parseFloat(action.payload)

            };
        case 'partnerCount':
            return {
                ...state,
                partnerCount: action.payload
            };
        case 'partnerCountM2':
            return {
                ...state,
                partnerCountM2: state.partnerCountM2 + action.payload
            };
        case 'lang':
            return {
                ...state,
                lang: action.payload
            };
        case 'SetusdValue':
            return { ...state, usdValue: action.payload };
        default:
            return state;
    }
}

function BackOfficeMain(props) {
    
    const [backofficeData, dispatch] = useReducer(reducer, initialState)
    let lang = props.location && props.location.state && props.location.state.lang
    lang = typeof lang === "undefined" ? "English" : "Spanish"

    useEffect(() => {
        (async function () {
            document.title = "XTRON"
            if (props.location.state && typeof props.location.state !== 'undefined') {
                dispatch({ type: 'setloginUser', payload: props.location.state.id })
            }
        })();
    }, []);

    function refresh(){
        localStorage.clear();
        document.getElementById('refreshCog').classList.add('rotate', 'refreshbtn-visited');
        
        /*window.location.reload(false);*/
    }
    return (
        <BackofficeContext.Provider value={{ backofficeDataM: backofficeData, dispatchM: dispatch }}>
            <div className="" id="backofficewrap">
                <MyNav />
                <h2 className="text-center whitext mt-5">Dashboard</h2>
                <div className="text-center logo-payment-wrap" style={{ marginTop: "0px" }}>
                    {/*<Link to={{
                        pathname: "/",
                        state: lang
                    }} className="logo-payment-link">
                        <img className="logo-payment" src={xtronLogo} alt="logo xtron" />
                    </Link>*/}
                </div>
                <div className="container">
                    <div className="row " id="backoffice_row">
                        <div className="col-lg-3">
                            <BackOfficeSideDashboard lang={lang} />
                        </div>
                        <div className="col-lg-9">
                            <BackOfficeStatusFor5x lang={lang} />
                            <BackOfficeStatusFor12x lang={lang} />
                        </div>
                    </div>
                    <div className="d-flex justify-content-center refresh-wrap">
                        <h3 className="whitext">App stuck or unresponsive?</h3>
                    <button id="refreshCog" className="refreshbtn" onClick={() => refresh()}>< FaCog/><span id="refresh1">Refresh</span></button>
                    </div>
                </div>
            </div>
        </BackofficeContext.Provider>
    )
}

export default BackOfficeMain
