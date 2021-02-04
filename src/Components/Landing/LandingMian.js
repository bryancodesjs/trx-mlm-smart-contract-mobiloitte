import React, { useEffect, useState } from 'react'
import Counter from './Counter'
import Faq from './Faq'
import Features from './Features'
import Matrix from './Matrix'
import logo_banner from '../../assets/img/xtronlong.png'
import { useHistory } from 'react-router-dom';

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
                <p id="address">
                    {lang === 'English' ? "Contract address" : "Direccion del contrato"} : <a target="_blank" href={`https://shasta.tronscan.org/#/contract/${process.env.REACT_APP_CONTRACT_ADDRESS}/code`}>{process.env.REACT_APP_CONTRACT_ADDRESS}</a></p>
                <div className="heading-content text-center">
                    <img src={logo_banner} id="logohead" className="mt-5" alt="logo_banner" />
                    <h1 className="mt-5 whitext heading-title"><strong>
                        {lang === 'English' ? "THE FIRST SMART CONTRACT" : "EL PRIMER CONTRATO INTELIGENTE"}</strong></h1>
                    <h2 className="whitext lightweight">
                        {lang === 'English' ? "100% decentralized and independent" : "100% descentralizado e independiente"}</h2>
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
        </>
    )
}


export default LandingMian
