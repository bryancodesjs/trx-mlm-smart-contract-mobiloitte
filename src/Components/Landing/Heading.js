import React from 'react'
import logo_banner from '../../assets/img/logo_banner.png'
import { useHistory } from 'react-router-dom';

function Heading() {
    const history = useHistory();
    const navigateTo = (url) => {
        history.push(url)
    }

    return (
        <div className="container text-center">
            <p id="address">Direccion del contrato: <a href="https://etherscan.io/address/0x5acc84a3e955Bdd76467d3348077d003f00fFB97">0x5acc84a3e955Bdd76467d3348077d003f00fFB97</a></p>
            <div className="heading-content text-center">
                <img src={logo_banner} id="logohead" className="mt-5" alt="logo_banner" />
                <h4 className="mt-5 whitext heading-title"><strong>EL PRIMER CONTRATO INTELIGENTE</strong></h4>
                <h4 className="whitext lightweight">100% descentralizado e independiente</h4>
                <div className="mt-5">
                    <button className="btn btn-success custombtn" onClick={() => navigateTo('/registration')}>REGISTRO</button>
                    <button className="btn btn-light custombtn" onClick={() => navigateTo('/tutorial')}>Tutorial</button>
                    <button className="btn btn-info custombtn" onClick={() => navigateTo('/login')}>LOGIN</button>
                </div>
            </div>
        </div>
    )
}

export default Heading
