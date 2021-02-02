import React from 'react'

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
            <div className="box mt-5">
                <h4 className="text-center ctatext">
                    {lang === 'English' ? "FREQUENT QUESTIONS" : "PREGUNTAS FRECUENTES"}

                </h4>
                <div className="faqs">
                    {
                        lang === 'English' ?
                            faqDetails(
                                'What is XTRON?',
                                'XTRON is the first 100% decentralized smart contract based on Tron (TRX) which operates automatically and without human intervention.')
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
                            faqDetails('What is a Smart Contract?', 'A smart contract (in English Smart contract) is a computer program that executes registered agreements between two or more parties in an automatic and unalterable way.')
                            :
                            faqDetails('¿Qué es un Contrato Inteligente?', 'Un contrato inteligente (en inglés Smart contract) es un programa informático que ejecuta acuerdos registrados entre dos o más partes de forma automática e inalterable.')
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
                                <p className="text">To be part of the XTRON community you only need to install a wallet on your smartphone, tablet or PC.<br /><br />For mobile devices we recommend <a href="https://wallet.coinbase.com">Coinbase</a><br />For computers we recommend <a href="https://metamask.io">Metamask</a></p>
                                :
                                <p className="text">Para formar parte de la comunidad de XTRON solo necesitas instalar una wallet en tu smartphone, tablet o PC.<br /><br />Para dispositivos moviles recomendamos <a href="https://wallet.coinbase.com">Coinbase</a><br />Para computadoras recomendamos <a href="https://metamask.io">Metamask</a></p>
                        }
                    </details>
                    {
                        lang === 'English' ?
                            faqDetails('What is a Smart Contract? ', 'A smart contract (in English Smart contract) is a computer program that executes registered agreements between two or more parties in an automatic and unalterable way.')
                            :
                            faqDetails('¿Qué es un Contrato Inteligente?', 'Un contrato inteligente (en inglés Smart contract) es un programa informático que ejecuta acuerdos registrados entre dos o más partes de forma automática e inalterable.')
                    }
                </div>
            </div>
        </div>
    )
}

export default Faq
