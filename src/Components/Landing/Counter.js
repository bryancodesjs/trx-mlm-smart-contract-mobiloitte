import React from 'react'

function Counter(props) {
    let lang = props.lang

    return (
         <div className="container mt-5" id="counter">
            <div className="counter_box">
                <h4>
                    {lang === 'English' ? "Users" : "Usuarios"}
                    Usuarios
                    </h4>
                <h2>162,498</h2>
            </div>

            <div className="counter_box">
                <h4>
                    {lang === 'English' ? "TRX earnings" : "Ganancias TRX"}

                </h4>
                <h2>8,900,240</h2>
            </div>

            <div className="counter_box">
                <h4>
                    {lang === 'English' ? "Earnings USD" : "Ganancias USD"}
                </h4>
                <h2>223,066</h2>
            </div>

        </div>
    )
}

export default Counter
