import React from 'react'
import m1img from '../../assets/img/m1-mt.svg'
import m2img from '../../assets/img/m2-mt.svg'
import m1logo from '../../assets/img/m1.png'
import m2logo from '../../assets/img/m2.png'
function Matrix(props) {
    let lang = props.lang
    return (
        <div className="container mt-5" id="matrix">
            <div className="matrix_title text-center">
                <h2 className="ctatext">
                    {lang === 'English' ? "COMMISSIONS SYSTEM" : "SISTEMA DE COMISIONES"}
                </h2>
                <h2 className="whitext heading-title">
                    {lang === 'English' ? "KNOW THE M1 AND M2 MATRICES" : "CONOCE LAS MATRICES M1 Y M2"}
                </h2>
            </div>
            <div className="matrix_boxes mt-5">
                <div className="show-matrix" id="boxone">
                    <div className="show-wrap">
                        <img className="show-matrix-label" src={m1logo} alt="xtron M1 matrix logo"></img>
                        <img className="show-img" src={m1img} alt="xtron M1 matrix graphic"></img>
                        <div className="show-text">
                            <h4> {lang === 'English' ? "You earn 100% commission for every user you refer to the M1 Matrix." : "Ganas una comisión de un 100% por cada usuario que refieras a tu matríz M1."}</h4>
                        </div>
                        
                    </div>
                    
                </div>
                <div className="show-matrix" id="boxtwo">
                    <div className="show-wrap">
                        <img className="show-matrix-label" src={m2logo} alt="xtron M2 matrix logo"></img>
                        <img className="show-img" src={m2img} alt="xtron M2 matrix graphic"></img>
                        <div className="show-text">
                        <h4> {lang === 'English' ? "You earn 20% commission from 5 levels for every user you and your friends refer to the M2 Matrix." : "Ganas un 20% por 5 niveles por cada usuario directo o indirecto que se encuentre en tu matríz M2."}</h4>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Matrix
