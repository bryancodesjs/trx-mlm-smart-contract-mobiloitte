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
import axios from 'axios';
import { FiRefreshCcw } from "react-icons/fi";


function copyAffiliateLink() {
    var copyText = document.getElementById("refLink");
    copyText.select();
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
    const [x12People, setPeople] = useState(0)
    const [x12Ciclado,setCiclado] = useState(0)
    const [tronWeb, settronWeb] = useState({
        installed: false,
        loggedIn: false
    })


    useEffect(async () => {
        axios.get(`https://api.coinlore.com/api/ticker/?id=2713`)
            .then(res => {
                backofficeContextL.dispatchM({ type: 'SetusdValue', payload: res.data[0].price_usd })
            })
            .catch(err => {
                console.log(err)
                backofficeContextL.dispatchM({ type: 'SetusdValue', payload: '0' })
                //window.location.reload(false);
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
                const lastlavel  = await Utils.contract.users(localStorage.getItem('backOfficeID')).call();
                const x12balance = await Utils.contract.m2balance(localStorage.getItem('backOfficeID')).call();
                
                var x12balanceTotal = (parseInt(x12balance._hex) / 1000000);
                 if (localStorage.getItem('backOfficeID') =='TALDXeZ7pPGDhnir9wwb9uvACujHjtdVN1'){
                    x12balanceTotal += 200;
                 } else if (localStorage.getItem('backOfficeID') =='TB3TFKmDyWD626kuwU1Vr2q7ipMxc7ryu3'){
                    x12balanceTotal += 40;
                 } else if (localStorage.getItem('backOfficeID') =='TDeTagQFqZg1THDUB8Wdqk3iuKNggHNNWu'){
                    x12balanceTotal += 40;
                 } else if (localStorage.getItem('backOfficeID') =='TDiiS3EdLpu8h8utUMkyqN9tFZckhqnjHu'){
                    x12balanceTotal += 520;
                 } else if (localStorage.getItem('backOfficeID') =='TGMRxFfgVp1z5Hwi9mjmwxSUpEZBpB5d9Z'){
                    x12balanceTotal += 40;
                 } else if (localStorage.getItem('backOfficeID') =='THzLAH5Lt19ysaT4TgLaGJcqg8VJUTnPQj'){
                    x12balanceTotal += 40;
                 } else if (localStorage.getItem('backOfficeID') =='TJSmU8fXyNiQKWNTuXVFgneTeDFGEWGBpR'){
                    x12balanceTotal += 1280;
                 } else if (localStorage.getItem('backOfficeID') =='TKnV6AXRyd2d9bKXhzqVk3A2gJMeWccs4M'){
                    x12balanceTotal += 1120;
                 } else if (localStorage.getItem('backOfficeID') =='TLRVbDq9Ckm5rRJtCqhtgzVLVHgphrBzjP'){
                    x12balanceTotal += 160;
                 } else if (localStorage.getItem('backOfficeID') =='TNbYPokoBg1KYBTmdBT2SZ8c4H5s1f9ev9'){
                    x12balanceTotal += 200;
                 } else if (localStorage.getItem('backOfficeID') =='TTs6byuSGzsPjhhmiXzRYXVRqWKQBRZvwn'){
                    x12balanceTotal += 280;
                 } else if (localStorage.getItem('backOfficeID') =='TUSobCLwVjFRwoP9SXJ81grNhZ1PPHikKh'){
                    x12balanceTotal += 80;
                 } else if (localStorage.getItem('backOfficeID') =='TUTSLi8RV8vbFzcfDj8bD4SD2NaiqaXa6Q'){
                    x12balanceTotal += 80;
                 } else if (localStorage.getItem('backOfficeID') =='TWYRJhBVJRsrPHiW7iaeMT7haVuJW823Lb'){
                    x12balanceTotal += 80;
                 } else if (localStorage.getItem('backOfficeID') =='TXLh65CFs1CvAuxAPo2XTG7BviDL1pvrqY'){
                    x12balanceTotal += 120;
                 } else if (localStorage.getItem('backOfficeID') =='TXvWqEEDsQxGHADqwExtWVoW38RqHVcg2S'){
                    x12balanceTotal += 400;
                 } else if (localStorage.getItem('backOfficeID') =='TYseSMSCjHJid5V1e25MfqqXcd43uoQhBw'){
                    x12balanceTotal += 120;
                 } else if (localStorage.getItem('backOfficeID') =='TYyi6KVer7sXUH7pEVsezMZqL22vqALmbd'){
                    x12balanceTotal += 1280;
                 }   

                setx12balanceTRX(x12balanceTotal);
                console.log("x12balance", x12balanceTotal)
                setUserId(lastlavel.id._hex)
                setpartnersCount(lastlavel.partnersCount._hex)



                const x12Members = await Utils.contract.usersm2Matrix(localStorage.getItem('backOfficeID'),1).call();

                const x12CurrentMembers = (x12Members[1].length + x12Members[2].length)
                
                if (x12CurrentMembers == 12){
                    setPeople(parseInt(x12Members[5]._hex) * 12);
                }else{

                    setPeople((parseInt(x12Members[5]._hex) * 12)+x12CurrentMembers);
                }

                setCiclado(parseInt(x12Members[5]._hex));
            

                backofficeContextL.dispatchM({ type: 'partnerCount', payload: lastlavel.partnersCount._hex })
            }
            catch (error) {
                //debugger;
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
                            lang === "English"
                                ? 
                                <h3 className="whitext">MY ID: <span className="ctatext">{parseInt(UserId)}</span></h3>
                                :
                                <h3 className="whitext">MI ID: <span className="ctatext">{parseInt(UserId)}</span></h3>
                        }

                    </div>
                    {/* <div className="userinfo text-right">
                        <h4 className="whitext">{parseInt(partnersCount)} <FaUsers color="#35FF69" /></h4>
                    </div> */}
                </div>
                {
                        lang === 'English' ?
                            <h3 className="whitext">Total Earnings</h3>
                            :
                            <h3 className="whitext">Ganancias Totales</h3>
                    }
                <h2 className="text-left ctatext">
                    $ {getFlooredFixed(((backofficeContextL.backofficeDataM.total5x + x12balanceTRX) * backofficeContextL.backofficeDataM.usdValue), 2)} USD
                </h2>
                <h2 className="subtext earning_amount text-left">{backofficeContextL.backofficeDataM.total5x + x12balanceTRX} TRX <img src={tron32x} className="tron_currency" alt="tron32x" /></h2>
                <hr className="custom_hr" />
                <div className="matrix_earnings" style={{ paddingTop: "0" }}>
                    {/* <img className="matrix_logo" src={x5matrix} alt="x5matrix" /> */}
                    <div style={{ display: "flex" }}>
                        <img className="matrix_logo" src={x5matrix} alt="x5matrix" />
                        <div className="userinfo text-right" style={{ marginTop: "20%" }}>
                            <h3 className="whitext">{parseInt(partnersCount)} <FaUsers color="#35FF69" /></h3>
                        </div>
                    </div>

                    {
                        lang === 'English' ?
                            <h3 className="whitext">Earnings</h3>
                            :
                            <h3 className="whitext">Ganancias</h3>
                    }

                    <div className="earning_amount_container">
                        <h2 className="ctatext earning_amount">$ {getFlooredFixed((backofficeContextL.backofficeDataM.total5x * backofficeContextL.backofficeDataM.usdValue), 2)} USD</h2>
                    </div>

                    <h2 className="earning_amount_trx subtext">{backofficeContextL.backofficeDataM.total5x} TRX  <img src={tron32x} className="tron_currency" alt="tron32x" /></h2>
                </div>
                <hr className="custom_hr" />
                <div className="matrix_earnings" style={{ paddingTop: "0" }}>
                    {/* <img className="matrix_logo" src={x12matrix} alt="x12matrix" /> */}
                    <div style={{ display: "flex" }}>
                        <img className="matrix_logo" src={x12matrix} alt="x12matrix" />
                        <div className="userinfo text-right" style={{ marginTop: "20%" }}>
                            <h3 className="whitext">{ x12People } <FaUsers color="#35FF69" />
                            </h3>
                            { (x12Ciclado > 0) ? <h3 className="whitext">{ x12Ciclado } <FiRefreshCcw color="#35FF69" /></h3> : null }
                        </div>
                    </div>
                    {
                        lang === 'English' ?
                            <h3 className="whitext">Earnings</h3>
                            :
                            <h3 className="whitext">Ganancias</h3>
                    }

                    <div className="earning_amount_container">
                        <h2 className="ctatext earning_amount">$ {getFlooredFixed((x12balanceTRX * backofficeContextL.backofficeDataM.usdValue), 2)} USD</h2>
                    }
                    </div>
                    <h2 className="earning_amount_trx subtext">{x12balanceTRX} TRX  <img src={tron32x} className="tron_currency" alt="tron32x" /></h2>
                </div>
            </div>
            <div className="affiliate_wrap xwrap">
                <div className="affiliate_heading">
                    {
                        lang === 'English' ?
                            <h3 className="ctatext">Affiliate Link</h3>
                            :
                            <h3 className="ctatext">Enlace de afiliado</h3>
                    }

                    <h3 className="whitext">{parseInt(partnersCount)} <FaUsers color="#35FF69" /></h3>
                </div>
                <div className="link_container">
                    {/* <input type="text" value={`${process.env.REACT_APP_URL}/#/registration/${parseInt(UserId)}`} id="refLink" readOnly /> */}
                    <input type="text" value={`https://xtron.online/#/registration/${parseInt(UserId)}`} id="refLink" readOnly />
                    <FaRegCopy className="ctatext" onClick={copyAffiliateLink} />
                </div>
            </div>
            <div className="wallet_wrap xwrap">
                {
                    lang === 'English' ?
                        <h3 className="ctatext">My Wallet:</h3>
                        :
                        <h3 className="ctatext">Mi billetera:</h3>
                }
                <p className="whitext">{tronAccount}</p>
            </div>
            <div className="contract_wrap xwrap">
                {
                    lang === 'English' ?
                        <h3 className="ctatext">Contract Address :</h3>
                        :
                        <h3 className="ctatext">Dirección del contrato:</h3>
                }
                <a href={`https://tronscan.org/#/contract/TNABUPeKLdYse99szJDzmBcCRV99VgGsdJ/transactions`} rel="noreferrer" target="_blank"> <p className="whitext">TNABUPeKLdYse99szJDzmBcCRV99VgGsdJ</p></a>
                {/*<a href={`https://shasta.tronscan.org/#/contract/${process.env.REACT_APP_CONTRACT_ADDRESS}/code`} target="_blank"> <p className="whitext">{process.env.REACT_APP_CONTRACT_ADDRESS}</p></a>*/}
            </div>
        </>
    )
}

export default BackOfficeSideDashboard
