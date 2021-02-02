import React from 'react'
import { ToastContainer } from 'react-toastify';


function ToastContainerCust({ autoClose = 3000 }) {
    return (
        <ToastContainer
            position="top-center"
            autoClose={autoClose}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
        />
    )
}

export default ToastContainerCust
