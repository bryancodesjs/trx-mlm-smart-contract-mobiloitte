import React from 'react'
import { FaFileDownload } from "react-icons/fa";

function Faq(props) {
    let lang = props.lang
    const faqDetails = (summaryTxt, pTxt) => {
        return (
            <details>
                <summary>{summaryTxt}</summary>
                <p className="text">{pTxt}</p>
            </details>
        )
    }
    return (
        <div>
            <div className="faqBox mt-5">
                <h2 className="text-center ctatext">
                    {lang === 'English' ? "FREQUENTLY ASKED QUESTIONS" : "PREGUNTAS FRECUENTES"}

                </h2>
                <div className="faqs">
                    {
                        lang === 'English' ?
                            faqDetails(
                                'What is XTRON?',
                                'XTRON is the first 100% descentralized smart contract based on Tron (TRX) which operates automatically and without human intervention.')
                            :
                            faqDetails(
                                '¿Qué es XTRON?',
                                'XTRON es el primer contrato inteligente 100% decentralizado basado en Tron (TRX) el cual opera de forma automática y sin intervención humana.')

                    }
                    {
                        lang === 'English' ?
                            faqDetails('Who runs the platform?', 'After being activated, a smart contract operates automatically and independently. This quality eliminates human error in the routine operations of the contract.')
                            :
                            faqDetails('¿Quién maneja la plataforma?', 'Luego de ser activado, un contrato inteligente opera de forma automática e independiente. Esta cualidad elimina el error humano en las operaciones rutinarias del contrato.')
                    }
                    {
                        lang === 'English' ?
                            faqDetails('Who created XTRON?', 'XTRON is an open source platform developed by various smart contract programmers and enthusiasts.')
                            :
                            faqDetails('¿Quién creó XTRON?', 'XTRON es una plataforma de código abierto desarrollada por diversos programadores y entusiastas de los contratos inteligentes.')}
                    {
                        lang === 'English' ?
                            faqDetails('What is Tron (TRX)?', 'Tron is a cryptocurrency with a capitalization that exceeds $ 1.8 Billion dollars.')
                            :
                            faqDetails('¿Qué es Tron (TRX)?', 'Tron es una criptomoneda con una capitalización que supera $1.8 Billones de dólares.')
                    }
                    {
                        lang === 'English' ?
                            faqDetails('What is a Smart Contract?', 'A smart contract is a computer program that executes registered agreements between two or more parties in an automatic and unalterable way.')
                            :
                            faqDetails('¿Qué es un Contrato Inteligente?', 'Un contrato inteligente es un programa informático que ejecuta acuerdos registrados entre dos o más partes de forma automática e inalterable.')
                    }
                    {
                        lang === 'English' ?
                            faqDetails('When can I withdraw my profits', 'Your payments are processed immediately on the Tron Blockchain. Your profits are sent to your wallet in about 10 seconds.')
                            :
                            faqDetails('¿Cuándo puedo retirar mis beneficios?', 'Tus pagos son procesados inmediatamente por la blockhain de Tron. Tus beneficios son enviados a tu wallet en menos de 10 segundos.')
                    }
                    <details>
                        {
                            lang === 'English' ?
                                <summary>What do I need to be part of XTRON?</summary>
                                :
                                <summary>¿Qué necesito para formar parte de XTRON?</summary>
                        }

                        {
                            lang === 'English' ?
                                <p className="text">To be part of the XTRON community you only need to install a wallet on your smartphone, tablet or PC.
                                <br /><br />
                                For mobile Android devices: <a rel="noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=com.tronlinkpro.wallet">Tronlink Android</a>
                                <br />
                                For mobile iOS devices: <a rel="noreferrer" target="_blank" href="https://apps.apple.com/us/app/tronlink-trx-btt-wallet/id1453530188">Tronlink iOS</a>
                                <br />
                                For PC (Chrome Extension): <a rel="noreferrer" target="_blank" href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec/related">Tronlink Chrome</a></p>
                                :
                                <p className="text">Para formar parte de la comunidad de XTRON solo necesitas instalar una wallet en tu smartphone, tablet o PC.
                                <br /><br />
                                Para móviles Android: <a rel="noreferrer" target="_blank" href="https://play.google.com/store/apps/details?id=com.tronlinkpro.wallet">Tronlink Android</a>
                                <br />
                                Para móviles iOS: <a rel="noreferrer" target="_blank" href="https://apps.apple.com/us/app/tronlink-trx-btt-wallet/id1453530188">Tronlink iOS</a>
                                <br />
                                Para PC (Chrome Extension): <a rel="noreferrer" target="_blank" href="https://chrome.google.com/webstore/detail/tronlink%EF%BC%88%E6%B3%A2%E5%AE%9D%E9%92%B1%E5%8C%85%EF%BC%89/ibnejdfjmmkpcnlpebklmnkoeoihofec/related">Tronlink Chrome</a></p>
                        }
                    </details>
                   
                    <details>
                        {
                            lang === 'English' ?
                                <summary>I forgot/lost my ID, What can I do?</summary>
                                :
                                <summary>Perdí/Olvidé mi ID, ¿Que puedo hacer?</summary>
                        }
                        {
                            lang === 'English' ?
                            <p className="text">For more convenience, you can now login using your TRX wallet address.</p>
                            :
                            <p className="text">Para mayor conveniencia, ya puedes loguearte utilizando tu dirección de wallet de TRX.</p>
                        }
                    </details>
                </div>
            
                
            </div>
            <div className="faqBox d-flex flex-column align-items-center justify-content-center">
                <h2 className="text-center ctatext">
                    {lang === 'English' ? "RESOURCES" : "RECURSOS"}
                </h2>

                <h2 className="whitext heading-sub-title text-center">
                {
                lang === 'English' ?
                "Download our .PDF presentation"
                :
                "Descarga nuestra presentación en .PDF"
                }
            </h2>
                {
                    lang === 'English' ?
                    <a className="btn btn-success custombtn" rel="noreferrer" target="_blank" href="https://xtron-resources.s3.us-east-2.amazonaws.com/xtronEnPresentation.pdf">Download Now <FaFileDownload/></a>
                    :
                    <a className="btn btn-success custombtn" rel="noreferrer" target="_blank" href="https://xtron-resources.s3.us-east-2.amazonaws.com/xtronEsPresentation.pdf">Descargar <FaFileDownload/></a>
                }
                
                    
            </div>
            
        </div>
    )
}

export default Faq
