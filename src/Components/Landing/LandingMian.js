import React, { useEffect, useState } from 'react'
/*import Counter from './Counter'*/
import Faq from './Faq'
import Features from './Features'
import Matrix from './Matrix'
import logo_banner from '../../assets/img/xtronlong.png'
import tron32x from '../../assets/img/tron32x.png'
import { useHistory } from 'react-router-dom';
import { FaExternalLinkAlt } from "react-icons/fa";
import mixpanel from 'mixpanel-browser';
import { MixpanelProvider, MixpanelConsumer } from 'react-mixpanel';
mixpanel.init("70333a3349b80fceba9aecae1a0ee1ee");


function LandingMian(props) {
    const propslang = props.location && props.location.state
    useEffect(() => {
        document.title = "XTRON"
    }, []);

    const [lang, setLang] = useState(propslang === "Spanish" ? "Spanish" : "English")
    const history = useHistory();
    const navigateTo = (url) => {
        history.push({
            pathname: url,
            state: lang
        })
    }

    try{
        if (window.tronWeb.defaultAddress.base58) {
            mixpanel.identify(window.tronWeb.defaultAddress.base58);
            mixpanel.track("Visitor",  { "nickname": window.tronWeb.defaultAddress.name});
        }else{
            mixpanel.track("Visitor",  { });
        }
    }catch(err){
        
    }

    return (
        <>
            {/* <Heading /> */}
            <div className="container text-center">
                <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "5px" }}>
                    <select name="lang" id="lang" value={lang} onChange={(e) => setLang(e.target.value)}>
                        <option value="English">English</option>
                        <option value="Spanish">Spanish</option>
                    </select>
                </div>
                
                <div className="heading-content text-center">
                    <img src={logo_banner} id="logohead" className="mt-5" alt="logo_banner" />
                    <br />
                    <img src={tron32x} className="tron_currency-2" alt="tron32x" />
                    <h1 className="mt-5 whitext heading-title"><strong>
                        {lang === 'English' ? "HYBRID MARKETING SMART CONTRACT" : "CONTRATO INTELIGENTE DE MARKETING HÍBRIDO"}</strong></h1>
                    <h2 className="whitext lightweight">
                        {lang === 'English' ? "100% decentralized and independent" : "100% decentralizado e independiente"}</h2>
                    <div className="mt-5">
                        <button className="btn btn-success custombtn" onClick={() => navigateTo('/registration')}>
                            {lang === 'English' ? "REGISTER" : "REGISTRO"}</button>
                        <button className="btn btn-light custombtn" onClick={() => navigateTo('/tutorial')}>
                            {lang === 'English' ? "TUTORIAL" : "TUTORIAL"}</button>
                        <button className="btn btn-info custombtn" onClick={() => navigateTo('/login')}>
                            {lang === 'English' ? "LOGIN" : "LOGIN"}
                        </button>
                    </div>
                </div>
            </div>
            <Features lang={lang} />
            {/*<Counter lang={lang} />*/}
            <br /><br /><br />
            <Matrix lang={lang} />
            <Faq lang={lang} />
                    <p className="text-center" id="address">
                    {lang === 'English' ? "Support" : "Soporte"} : <a rel="noreferrer" target="_blank" href="mailto:support@xtron.online">support@xtron.online <FaExternalLinkAlt /></a>
                    </p>
                    <p className="text-center" id="address">
                    {lang === 'English' ? "Contract address" : "Direccion del contrato"} : <a rel="noreferrer" target="_blank" href={`https://tronscan.org/#/contract/TNABUPeKLdYse99szJDzmBcCRV99VgGsdJ/transactions`}>TNABUPeKLdYse99szJDzmBcCRV99VgGsdJ<FaExternalLinkAlt /></a>
                    </p>
            <h4 className="text-center pb-5 signature">XTRON GLOBAL 2021 V20200318.01</h4>
        </>
    )
}


export default LandingMian
