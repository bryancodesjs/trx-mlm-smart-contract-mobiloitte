import React, { useContext, useEffect, useState } from 'react'
import xtronLogo from '../../assets/img/xtronlong.png'
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'
// import TronWeb from 'tronweb'
import { FaSignInAlt } from "react-icons/fa";
import { toast } from 'react-toastify';
import ToastContainerCust from '../../Common/ToastContainerCust'
import TronWeb from 'tronweb'
import Utils from '../../Utils/Utils'
import ReactGA from 'react-ga';
//ReactGA.initialize('G-6MQ8JWRM63'); /*Unique Google Analytics ID*/
//ReactGA.pageview(window.location.pathname + window.location.search);
import mixpanel from 'mixpanel-browser';
import { MixpanelProvider, MixpanelConsumer } from 'react-mixpanel';
mixpanel.init("70333a3349b80fceba9aecae1a0ee1ee");



const WEBSTORE_URL = 'https://chrome.google.com/webstore/detail/ibnejdfjmmkpcnlpebklmnkoeoihofec/';

function switchTo1() {
    
    document.getElementById('method1btn').classList.add('switchbtn-active');
    document.getElementById('method2btn').classList.remove('switchbtn-active');
    document.getElementById('method1wrap').classList.remove('hide');
    document.getElementById('method2wrap').classList.add('hide');
}

function switchTo2() {
    
    document.getElementById('method1btn').classList.remove('switchbtn-active');
    document.getElementById('method2btn').classList.add('switchbtn-active');
    document.getElementById('method1wrap').classList.add('hide');
    document.getElementById('method2wrap').classList.remove('hide');
}

function Login(props) {
    const lang = props.location && props.location.state
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [backOfficeID, SetBackOfficeID] = useState('')
    const [loggedIn, setLoggedIn] = useState(false)

    const [tronWeb, settronWeb] = useState({
        installed: false,
        loggedIn: false
    })


    

    useEffect(async () => {
        (async function () {
            await new Promise(resolve => {
                const tronWebState = {
                    installed: !!window.tronWeb,
                    loggedIn: window.tronWeb && window.tronWeb.ready
                };
                if (tronWebState.installed) {
                    settronWeb(tronWebState)
                    return resolve();
                }
                let tries = 0;
                const timer = setInterval(() => {
                    if (tries >= 10) {
                        const TRONGRID_API = process.env.REACT_APP_NETWORK;
                        window.tronWeb = new TronWeb(
                            TRONGRID_API,
                            TRONGRID_API,
                            TRONGRID_API
                        );
                        settronWeb({
                            installed: false,
                            loggedIn: false
                        });
                        clearInterval(timer);
                        return resolve();
                    }
                    tronWebState.installed = !!window.tronWeb;
                    tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;
                    if (!tronWebState.installed) {
                        return tries++;
                    }
                    else {
                        clearInterval(timer);
                    }
                    settronWeb(tronWebState)
                    resolve();
                }, 100);
            })
            await Utils.setTronWeb(window.tronWeb);
            setLoggedIn(true)
        })();
    }, []);

    const CustomToastWithLink = () => (
        <p>
            {lang === 'English'
                ?
                <span>To access XTRON you must install TronLink.</span>
                :
                <span>Para acceder a XTRON debe instalar TronLink.</span>
            }

        </p>
    );

    const loginSubmit = async () => {
        if (backOfficeID !== '') {
            if (loggedIn) {
                try {
                    const idToAddress = await Utils.contract.idToAddress(backOfficeID).call();
                    auth.userLogIn(true, 'Login');
                    localStorage.removeItem('backOfficeID')
                    localStorage.setItem('backOfficeID', TronWeb.address.fromHex(idToAddress));
                    history.push({
                        pathname: "/back-office-main",
                        state: { lang: lang }
                    })

                        try{
                            if (localStorage.getItem('backOfficeID') === window.tronWeb.defaultAddress.base58) {
                                mixpanel.identify(window.tronWeb.defaultAddress.base58);
                                mixpanel.track("LoginOwner",  {"backOfficeID":  backOfficeID, "owner": true, "nickname": window.tronWeb.defaultAddress.name});
                            }else{
                                mixpanel.identify(window.tronWeb.defaultAddress.base58);
                                mixpanel.track("loginVisitor", {"backOfficeID": backOfficeID, "owner": false, "nickname": window.tronWeb.defaultAddress.name });
                            }
                        }catch(err){
                            
                        }
                        
                    
                    window.location.reload(false);
                }
                catch (error) {
                    toast.error("Error")
                    console.log(error)
                }
            }
            else {
                toast.error(CustomToastWithLink)
            }
        }
        else {
            if (lang === 'English') {
                toast.warn("Enter your ID")
            }
            else {
                toast.warn("Introduzca su ID")
            }

        }
    }

    const loginSubmit2 = async () => {
        if (backOfficeID !== '') {
            if (loggedIn) {
                if (backOfficeID.length > 33) {
                    try {
                
                        try {
                            auth.userLogIn(true, 'Login');
                            localStorage.removeItem('backOfficeID')
                            localStorage.setItem('backOfficeID', backOfficeID);
                            history.push({
                             pathname: "/back-office-main",
                              state: { lang: lang }
                            })
                            ReactGA.event({
                            category: 'User',
                            action: 'Successful Login'
                            });
                            
                            try{
                            if (localStorage.getItem('backOfficeID') === window.tronWeb.defaultAddress.base58) {
                                mixpanel.identify(window.tronWeb.defaultAddress.base58);
                                mixpanel.track("LoginOwner",  { "auth":  'wallet', "wallet":  backOfficeID, "owner": true, "nickname": window.tronWeb.defaultAddress.name});
                            }else{
                                mixpanel.identify(window.tronWeb.defaultAddress.base58);
                                mixpanel.track("loginVisitor", {"auth":  'wallet',"wallet": backOfficeID, "owner": false, "nickname": window.tronWeb.defaultAddress.name });
                            }
                            }catch(err){
                                
                            }
                            window.location.reload(false);
                            }
                        catch (error) {
                            toast.error("Error")
                            console.log(error)
                        }
                
                    } catch (error) {
                        alert.show("Wallet Error")
                        
                        }
                } else {
                    toast.error("Wallet invalida")
                }
            }
            else {
                toast.error(CustomToastWithLink)
            }
        }
        else {
            if (lang === 'English') {
                toast.warn("Enter your ID")
            }
            else {
                toast.warn("Introduzca su ID")
            }

        }
    }
    return (
        <div className="" id="backofficewrap">
            <ToastContainerCust />
            <div className="container">
                <div className="text-center logo-payment-wrap">
                    <Link to={{
                        pathname: "/",
                        state: lang
                    }} className="logo-payment-link">
                        <img className="logo-payment" src={xtronLogo} alt="logo xtron" />
                    </Link>
                </div>
                <div className="row " id="">
                    <div className="" style={{ width: "100%" }}>
                        <div className="xwrap">
                            <div className="text-center registration-items">
                                {
                                    lang === 'English' ?
                                        <h2>Login Area</h2>
                                        :
                                        <h2>Área de inicio de sesión</h2>
                                }
                                {
                                    lang === 'English' ?
                                        <h4>Enter your ID/Wallet to access your backoffice</h4>
                                        :
                                        <h4>Ingrese su ID/Wallet para acceder a su backoffice</h4>
                                }
                                <div className="login-switch-wrap">
                                    <button id="method1btn" className="switchbtn switchbtn-active" onClick={() => switchTo1()}>ID</button>
                                    <button id="method2btn" className="switchbtn" onClick={() => switchTo2()}> TRX Wallet</button>
                                </div>
                                <div id="method1wrap" className="login-method-1">
                                    <div className="registration-input">
                                        <input id="customInput" name="customInputName" type="text" value={backOfficeID} className="sponsor-input-box text-center" onChange={(e) => SetBackOfficeID(e.target.value)} />
                                    </div>
                                    <div className="registration-btn">
                                        <button id='btn-login-id' className="btn btn-success custombtn" onClick={() => loginSubmit()} >LOGIN</button>
                                    </div>
                                    
                                </div>

                                <div id="method2wrap" className="login-method-2 hide">
                                    <div className="registration-input">
                                        <input id="customInput" name="customInputName" type="text" value={backOfficeID} className="sponsor-input-box text-center" onChange={(e) => SetBackOfficeID(e.target.value)} />
                                    </div>
                                    <div className="registration-btn">
                                        <button id='btn-login-wallet' className="btn btn-success custombtn" onClick={() => loginSubmit2()} >LOGIN</button>
                                    </div>
                                    
                                </div>
                                
                                <div className="h20"></div>
                                {
                                    lang === 'English' ?
                                        <h4>Don't have an account yet?</h4>
                                        :
                                        <h4>¿Aún no tienes una cuenta?</h4>
                                }
                                {
                                    lang === 'English' ?
                                        <Link to={{ pathname: "/registration", state: lang }}><h4><FaSignInAlt />  Register</h4></Link>
                                        :
                                        <Link to={{ pathname: "/registration", state: lang }}><h4><FaSignInAlt />  REGISTRO</h4></Link>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
