import React from 'react'

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
                <div className="matrix_box" id="boxone">
                </div>
                <div className="matrix_box" id="boxtwo">
                </div>
            </div>
        </div>
    )
}

export default Matrix
