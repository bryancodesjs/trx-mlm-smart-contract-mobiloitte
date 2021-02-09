import React, { useState, useContext, useEffect } from 'react';
import { toast } from 'react-toastify';
import { BackofficeContext } from './BackOfficeMain'
import ToastContainerCust from '../../Common/ToastContainerCust'
import TronWeb from 'tronweb'
import Utils from '../../Utils/Utils'
import Loader from '../../Common/Loader'
import { MyClockLoader } from '../../Common/Loader'
import { FaUsers } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";


let toggleLevel = true

function SubPart5X({ level, ammount, lang }) {
    const [numberOfActiveLevels, setnumberOfActiveLevels] = useState(0);
    const backofficeContextL = useContext(BackofficeContext)
    const [isModalOpen, SetisModalOpen] = useState(false)
    const [isBuyVisible, setIsBuyVisible] = useState(false);
    const [isBuyEnable, setIsBuyEnable] = useState(false)
    const [buyLevelLoader, setbuyLevelLoader] = useState(false)
    const [reinvestCount, setReinvestCount] = useState(0)
    const [tronWeb, settronWeb] = useState({
        installed: false,
        loggedIn: false
    })

    function getFlooredFixed(v, d) {
        return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
    }

    useEffect(async () => {
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
        showLevelDetails()
    }, []);

    const showLevelDetails = async () => {
        let userAddress = window.tronWeb.defaultAddress.base58
        if (localStorage.getItem('backOfficeID') != null && localStorage.getItem('accessToken') == 'Login') {
            userAddress = localStorage.getItem('backOfficeID')
        }
        try {
            SetisModalOpen(true)
            const lastlavel = await Utils.contract.usersactiveX5Levels(userAddress, level).call();
            if (lastlavel) {
                setIsBuyEnable(false)
                setIsBuyVisible(false)
            }
            else {
                setIsBuyVisible(true)
                if (toggleLevel) {
                    setIsBuyEnable(true)
                    toggleLevel = false
                }
                else {
                    setIsBuyEnable(false)
                }
            }
            const userX5Matrix = await Utils.contract.usersx5Matrix(userAddress, level).call();
            setReinvestCount(parseInt(userX5Matrix[3]._hex))
            const reinvestCountL = parseInt(userX5Matrix[3]._hex);
            if (userX5Matrix.length > 0) {
                setnumberOfActiveLevels(userX5Matrix[1].length)
                let sum = 0;
                if (userX5Matrix[1].length > 0 && lastlavel) {
                    sum = ((5 * reinvestCountL) + userX5Matrix[1].length) * parseFloat(parseFloat(ammount))
                    backofficeContextL.dispatchM({ type: 'chnage5x', payload: getFlooredFixed(sum, 3) })
                }
            }
            else {
                if (lang === 'English') {
                    toast.warn("Error")
                }
                else {
                    toast.warn("Error")
                }
            }
            SetisModalOpen(false)
        }
        catch (err) {
            console.log(err)
            SetisModalOpen(false)
        }
    }

    const FunBuyLevel = async (level, ammount) => {
        let warnmsg = "Please do not refresh the page and wait while we are processing your payment. This can take a few minutes."

        if (lang !== 'English') {
            warnmsg = "No actualice la página y espere mientras procesamos su pago. Esto puede tardar unos minutos."
        }
        if (localStorage.getItem('backOfficeID') === null || localStorage.getItem('backOfficeID') === window.tronWeb.defaultAddress.base58) {
            try {
                setbuyLevelLoader(true)
                toast.warn(warnmsg, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                await Utils.contract.buyNewLevel(1, level).send({
                    feeLimit: 100000000,
                    callValue: (ammount * 1000000) + ((ammount * 1000000) * 0.10),
                    shouldPollResponse: true

                });
                setbuyLevelLoader(false)
                window.location.reload(false);

            } catch (error) {
                console.log(error);
                setbuyLevelLoader(false)
                toast.error("error");
            }
        }
        else {
            if (lang === 'English') {
                toast.error("Purchase in preview mode is not available! Please please Register with your Tron wallet.");
            }
            else {
                toast.error("¡La compra en modo de vista previa no está disponible! Regístrese con su billetera de Tron.");
            }
        }
    }

    const getActiveLevels = [...Array(numberOfActiveLevels)].map((e, i) => <div key={i} className="position position_active"></div>)
    const getNonActiveLevels = [...Array(4 - numberOfActiveLevels)].map((e, i) => <div key={i} className="position"></div>)
    const getBuyIcon = (level) => {
        if (isBuyEnable) {
            return (<i className="buy-icon5X buy-icon" alt="buyIcon" onClick={() => FunBuyLevel(level, ammount)} ></i>)
        }
        else {
            return (<i className="buy-icon5X" alt="buyIcon"></i>)
        }
    }

    return (
        <>
            <div className="matrix_box">
                <Loader active={isModalOpen} />
                <MyClockLoader active={buyLevelLoader} />
                <ToastContainerCust />
                <div className={isBuyVisible ? "box_basket" : "box_basket activeLevel"} style={{ position: "relative" }}>
                    <div className="box_number" id="box_number">{level}</div>
                    {isBuyVisible ? getBuyIcon(level) : null}
                    <button className="btn btn-info basket_btn basket_active">{ammount} trx</button>
                </div>
                <div className="box_positions">
                    {getActiveLevels}
                    {getNonActiveLevels}
                    <div className="position position_reset" />
                </div>
                <div className="flow_lines">
                    <div className="flow_line line_one"></div>
                    <div className="flow_line line_two"></div>
                    <div className="flow_line line_three"></div>
                    <div className="flow_line line_four"></div>
                    <div className="flow_line line_five"></div>
                    <div className="flow_line line_six"></div>
                </div>
                {!isBuyVisible ?
                    <div className="reload-data">
                        <div>
                            <span style={{ color: "white", fontSize: "20px", paddingRight: 5 }}>{(5 * reinvestCount) + numberOfActiveLevels}</span>
                            <FaUsers color="#35FF69" size={25} />
                        </div>
                        <div>
                            <span style={{ color: "white", fontSize: "20px", paddingRight: 5 }}>{reinvestCount}</span>
                            <FiRefreshCcw color="#35FF69" size={25} />
                        </div>

                    </div>
                    : null
                }

            </div>

        </>
    )
}

export default React.memo(SubPart5X)
