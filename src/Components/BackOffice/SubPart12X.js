import React, { useState, useEffect, useContext } from 'react';
import { BackofficeContext } from './BackOfficeMain'
import { toast } from 'react-toastify';
import ToastContainerCust from '../../Common/ToastContainerCust'
import TronWeb from 'tronweb'
import Utils from '../../Utils/Utils'
import Loader from '../../Common/Loader'
import { MyClockLoader } from '../../Common/Loader'

let toggleLevel = true

function SubPart12X({ level, ammount, lang }) {
    const [numberOfActiveLevels, setnumberOfActiveLevels] = useState(0);
    const [numberOfSubActiveLevels, setnumberOfSubActiveLevels] = useState(0)
    const [isBuyVisible, setIsBuyVisible] = useState(false);
    const [isBuyEnable, setIsBuyEnable] = useState(false)
    const [buyLevelLoader, setbuyLevelLoader] = useState(false)
    const [tronWeb, settronWeb] = useState({
        installed: false,
        loggedIn: false
    })
    const backofficeContextL = useContext(BackofficeContext)
    const [isModalOpen, SetisModalOpen] = useState(false)

    function getFlooredFixed(v, d) {
        return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
    }
    useEffect(() => {
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
                    if (!tronWebState.installed)
                        return tries++;
                    settronWeb(tronWebState)
                    resolve();
                }, 100);
            })
            await Utils.setTronWeb(window.tronWeb);
            showLevelDetails()
        })()
    }, [])

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
                await Utils.contract.buyNewLevel(2, level).send({
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
                toast.error("¡La compra en modo de vista previa no está disponible! Regístrese con su billetera Tron.");
            }
        }
    }

    const showLevelDetails = async () => {
        let userAddress = window.tronWeb.defaultAddress.base58
        if (localStorage.getItem('backOfficeID') !== null && localStorage.getItem('accessToken') === 'Login') {
            userAddress = localStorage.getItem('backOfficeID')
        }
        try {
            SetisModalOpen(true)
            const lastlavel = await Utils.contract.usersactiveX12Levels(userAddress, level).call();
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
            const userX5Matrix = await Utils.contract.usersx12Matrix(userAddress, level).call();
            if (userX5Matrix.length > 0) {
                setnumberOfActiveLevels(userX5Matrix[1].length)
                setnumberOfSubActiveLevels(userX5Matrix[2].length)
                console.log("userX5Matrix[1].length", userX5Matrix[1].length)
                console.log("userX5Matrix[2].length", userX5Matrix[2].length)
                let sum = 0;
                if (userX5Matrix[1].length > 0 && lastlavel) {
                    // sum = parseFloat(ammount) + (parseFloat(userX5Matrix[1].length) * parseFloat(parseFloat(ammount) / 2) + (parseFloat(userX5Matrix[2].length) * (parseFloat(parseFloat(ammount) / 4))))
                    // backofficeContextL.dispatchM({ type: 'change12x', payload: getFlooredFixed(sum, 3) })

                    sum = userX5Matrix[1].length + userX5Matrix[2].length
                    backofficeContextL.dispatchM({ type: 'partnerCountM2', payload: sum })
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

    const getActiveLevels = [...Array(numberOfActiveLevels)].map((e, i) => <div key={i} className="position position_active"></div>)
    const getNonActiveLevels = [...Array(3 - numberOfActiveLevels)].map((e, i) => <div key={i} className="position"></div>)
    const getSubActiveLevels = [...Array(numberOfSubActiveLevels)].map((e, i) => <div key={i} className="subposition position_active"></div>)
    const getNonSubActiveLevels = [...Array(8 - numberOfSubActiveLevels)].map((e, i) => <div key={i} className="subposition"></div>)
    const getBuyIcon = isBuyEnable ?
        <i className="buy-iconX12 buy-icon" alt="buyIcon" onClick={() => FunBuyLevel(level, ammount)} ></i> :
        <i className="buy-iconX12" alt="buyIcon"></i>

    return (
        <div className="matrix_box_x12">
            <ToastContainerCust />
            <Loader active={isModalOpen} />
            <MyClockLoader active={buyLevelLoader} />
            {/* <!--single matrix box--> */}
            <div className="box_basket" style={{ position: "relative" }}>
                <div className="box_number_x12" id="box_number_x12">{level}</div>
                {isBuyVisible ? getBuyIcon : null}
                <button className="btn btn-info basket_btn basket_active">{ammount} trx</button>
            </div>
            <div className="box_positions_x12">
                {getActiveLevels}
                {getNonActiveLevels}
            </div>
            <div className="box_subpositions">
                {getSubActiveLevels}
                {getNonSubActiveLevels}
                <div className="subposition_refresh"></div>
            </div>
            <div className="flow_lines">
                <div className="flow_line line_one_x12"></div>
                <div className="flow_line line_two_x12"></div>
                <div className="flow_line line_three_x12"></div>
                <div className="flow_line line_four_x12"></div>
                <div className="flow_line line_five_x12"></div>
                <div className="flow_line line_six_x12"></div>
                <div className="flow_line line_seven_x12"></div>
                <div className="flow_line line_eight_x12"></div>
                <div className="flow_line line_nine_x12"></div>
                <div className="flow_line line_ten_x12"></div>
                <div className="flow_line line_eleven_x12"></div>
                <div className="flow_line line_twelve_x12"></div>
                <div className="flow_line line_thirteen_x12"></div>
            </div>
        </div>
    )
}

export default SubPart12X
