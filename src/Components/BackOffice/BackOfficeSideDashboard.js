import React, { useEffect, useContext } from 'react'
import tron32x from '../../assets/img/tron32x.png'
import x5matrix from '../../assets/img/m1.png'
import x12matrix from '../../assets/img/m2.png'
import { useState } from 'react'
import { FaUsers, FaRegCopy } from "react-icons/fa";
import { BackofficeContext } from './BackOfficeMain'
import TronWeb from 'tronweb'
import Utils from '../../Utils/Utils'
import TostContainer from '../../Common/ToastContainerCust'
import { toast } from 'react-toastify';
import axios from 'axios'

function copyAffiliateLink() {
    var copyText = document.getElementById("refLink");
    copyText.select();
    // copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    document.execCommand("copy");
    toast.success("Copied")
}

function BackOfficeSideDashboard(props) {

    const lang = props.lang
    const backofficeContextL = useContext(BackofficeContext)

    const [UserId, setUserId] = useState(0)
    const [partnersCount, setpartnersCount] = useState(0)
    const [tronAccount, setTronAccount] = useState("")
    const [x12balanceTRX, setx12balanceTRX] = useState(0)
    const [tronWeb, settronWeb] = useState({
        installed: false,
        loggedIn: false
    })


    useEffect(async () => {
        axios.get(`https://api.coinlore.net/api/ticker/?id=2713`)
            .then(res => {
                backofficeContextL.dispatchM({ type: 'SetusdValue', payload: res.data[0].price_usd })
            })
            .catch(err => {
                console.log(err)
                window.location.reload(false);
            })

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
        if (localStorage.getItem('backOfficeID') !== null && localStorage.getItem('accessToken') === 'Login') {
            setTronAccount(localStorage.getItem('backOfficeID'))
            try {
                const lastlavel = await Utils.contract.users(localStorage.getItem('backOfficeID')).call();
                const x12balance = await Utils.contract.x12balance(localStorage.getItem('backOfficeID')).call();
                setx12balanceTRX((parseInt(x12balance._hex) / 1000000));
                console.log("x12balance", (parseInt(x12balance._hex) / 1000000))
                setUserId(lastlavel.id._hex)
                setpartnersCount(lastlavel.partnersCount._hex)
                backofficeContextL.dispatchM({ type: 'partnerCount', payload: lastlavel.partnersCount._hex })
            }
            catch (error) {
                console.log(error)
            }
        }
        else {
            setTronAccount(window.tronWeb.defaultAddress.base58)
            try {
                const lastlavel = await Utils.contract.users(window.tronWeb.defaultAddress.base58).call();
                setUserId(lastlavel.id._hex)
                setpartnersCount(lastlavel.partnersCount._hex)
                backofficeContextL.dispatchM({ type: 'partnerCount', payload: lastlavel.partnersCount._hex })
            }
            catch (error) {
                console.log(error)
            }
        }
    }, []);

    function getFlooredFixed(v, d) {
        return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
    }

    return (
        <>
            <div className="userdef xwrap">
                <TostContainer />
                <div className="userdefinition">
                    <div className="paymentlogo">
                        {
                            lang === 'English'
                                ?
                                <h4 className="whitext">USER {parseInt(UserId)}</h4>
                                :
                                <h4 className="whitext">USUARIA {parseInt(UserId)}</h4>
                        }

                    </div>
                    {/* <div className="userinfo text-right">
                        <h4 className="whitext">{parseInt(partnersCount)} <FaUsers color="#35FF69" /></h4>
                    </div> */}
                </div>
                <h2 className="text-left ctatext">
                    $ {getFlooredFixed(((backofficeContextL.backofficeDataM.total5x + x12balanceTRX) * backofficeContextL.backofficeDataM.usdValue), 2)} USD
                </h2>
                <h4 className="subtext earning_amount text-left">${backofficeContextL.backofficeDataM.total5x + x12balanceTRX} TRX <img src={tron32x} className="tron_currency" alt="tron32x" /></h4>
                <hr className="custom_hr" />
                <div className="matrix_earnings" style={{ paddingTop: "0" }}>
                    {/* <img className="matrix_logo" src={x5matrix} alt="x5matrix" /> */}
                    <div style={{ display: "flex" }}>
                        <img className="matrix_logo" src={x5matrix} alt="x5matrix" />
                        <div className="userinfo text-right" style={{ marginTop: "20%" }}>
                            <h4 className="whitext">{parseInt(partnersCount)} <FaUsers color="#35FF69" /></h4>
                        </div>
                    </div>

                    {
                        lang === 'English' ?
                            <h4 className="whitext">Earnings</h4>
                            :
                            <h4 className="whitext">Ganancias</h4>
                    }

                    <div className="earning_amount_container">
                        <h5 className="ctatext earning_amount">$ {getFlooredFixed((backofficeContextL.backofficeDataM.total5x * backofficeContextL.backofficeDataM.usdValue), 2)} USD</h5>
                    </div>
                    <h5 className="earning_amount_trx subtext">{backofficeContextL.backofficeDataM.total5x} TRX  <img src={tron32x} className="tron_currency" alt="tron32x" /></h5>
                </div>
                <hr className="custom_hr" />
                <div className="matrix_earnings" style={{ paddingTop: "0" }}>
                    {/* <img className="matrix_logo" src={x12matrix} alt="x12matrix" /> */}
                    <div style={{ display: "flex" }}>
                        <img className="matrix_logo" src={x12matrix} alt="x12matrix" />
                        <div className="userinfo text-right" style={{ marginTop: "20%" }}>
                            <h4 className="whitext">{parseInt(backofficeContextL.backofficeDataM.partnerCountM2)} <FaUsers color="#35FF69" /></h4>
                        </div>
                    </div>
                    {
                        lang === 'English' ?
                            <h4 className="whitext">Earnings</h4>
                            :
                            <h4 className="whitext">Ganancias</h4>
                    }

                    <div className="earning_amount_container">
                        <h5 className="ctatext earning_amount">$ {getFlooredFixed((x12balanceTRX * backofficeContextL.backofficeDataM.usdValue), 2)} USD</h5>
                    </div>
                    <h5 className="earning_amount_trx subtext">{x12balanceTRX} TRX  <img src={tron32x} className="tron_currency" alt="tron32x" /></h5>
                </div>
            </div>
            <div className="affiliate_wrap xwrap">
                <div className="affiliate_heading">
                    {
                        lang === 'English' ?
                            <h4 className="ctatext">Affiliate Link</h4>
                            :
                            <h4 className="ctatext">Enlace de afiliado</h4>
                    }

                    <h4 className="whitext">{parseInt(partnersCount)} <FaUsers color="#35FF69" /></h4>
                </div>
                <div className="link_container">
                    {/* <input type="text" value={`${process.env.REACT_APP_URL}/#/registration/${parseInt(UserId)}`} id="refLink" readOnly /> */}
                    <input type="text" value={`${process.env.REACT_APP_URL}/#/registration/${parseInt(UserId)}`} id="refLink" readOnly />
                    <FaRegCopy className="ctatext" onClick={copyAffiliateLink} />
                </div>
            </div>
            <div className="wallet_wrap xwrap">
                {
                    lang === 'English' ?
                        <h5 className="ctatext">Your TRX Wallet:</h5>
                        :
                        <h5 className="ctatext">Su billetera TRX:</h5>
                }
                <p className="whitext">{tronAccount}</p>
            </div>
            <div className="contract_wrap xwrap">
                {
                    lang === 'English' ?
                        <h5 className="ctatext">Smart Contract Address :</h5>
                        :
                        <h5 className="ctatext">Dirección de contrato inteligente:</h5>
                }
                <a href={`https://shasta.tronscan.org/#/contract/${process.env.REACT_APP_CONTRACT_ADDRESS}/code`} target="_blank"> <p className="whitext">{process.env.REACT_APP_CONTRACT_ADDRESS}</p></a>
            </div>
        </>
    )
}

export default BackOfficeSideDashboard
