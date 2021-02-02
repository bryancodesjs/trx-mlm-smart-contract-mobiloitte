import React from 'react'
import { FaBolt, FaUniversity, FaArrowsAlt } from "react-icons/fa";

function Features(props) {
    let lang = props.lang
    return (
        <div className="container text-center mt-5" id="features">
            <h4 className="whitext heading-sub-title">
                {lang === 'English' ? "International community" : "Comunidad Internacional"}
            </h4>
            <h4 className="ctatext heading-sub-title">
                {lang === 'English' ? "Decentralized Global Ecosystem" : "Ecosistema Global Descentralizado"}

            </h4>
            <p id="subtitle">
                {lang === 'English' ?
                    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab et minima explicabo dolorem, vero exercitationem doloremque aliquam inventore accusamus pariatur."
                    : "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab et minima explicabo dolorem, vero exercitationem doloremque aliquam inventore accusamus pariatur."
                }

            </p>
            <div className="features_wrap mt-5">
                <div className="features_box">
                    <FaBolt size={50} />
                    <br /><br />
                    <h4><strong>
                        {lang === 'English' ? "INSTANT" : "INSTANTANEO"}

                    </strong></h4>
                    <p className="text-justify">
                        {lang === 'English' ? "The contract delivers your benefits immediately and directly to your private wallet."
                            :
                            "El contrato te entrega tus beneficios de forma inmediata y directa en tu wallet privada."
                        }

                    </p>
                </div>
                <div className="features_box">
                    <FaUniversity size={50} />
                    <br /><br />
                    <h4><strong>
                        {lang === 'English' ? "UNALTERABLE" : "INALTERABLE"}

                    </strong></h4>
                    <p className="text-justify">
                        {lang === 'English' ?
                            "Once it has been deployed on the Tron blockchain, it is impossible to tamper with or tamper with."
                            :
                            "Una vez ha sido desplegado en la blockchain de Tron, es imposible de alterar o manipular."}

                    </p>
                </div>
                <div className="features_box">
                    <FaArrowsAlt size={50} />
                    <br /><br />
                    <h4><strong>
                        {lang === 'English' ? "DECENTRALIZED" : "DECENTRALIZADO"}

                    </strong></h4>
                    <p className="text-justify">
                        {lang === 'English' ?
                            "The contract does not require or permit a central authority; all participants have the same rights."
                            :
                            "El contrato no requiere ni permite una autoridad central; todos los participantes tienen los mismos derechos."
                        }
                    </p>
                </div>


            </div>

        </div>
    )
}

export default Features
