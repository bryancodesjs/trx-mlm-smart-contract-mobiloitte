import React from 'react'
import x5matrix from '../../assets/img/m1.png'
import SubPart5X from './SubPart5X'
import { FaUsers } from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";

function BackOfficeStatusFor5x(props) {
    return (
        <>
            <div className="xwrap" style={{ paddingBottom: 45 }}>
                {/* <!--X5 MATRIX GROUP--> */}
                <div className="title_container">
                    <img src={x5matrix} id="title_container_img" alt="x5matrix" />
                </div>
                <div className="boxes_wraper">
                    <SubPart5X level={1} ammount={"200"} lang={props.lang && props.lang} />
                    <SubPart5X level={2} ammount={"400"} lang={props.lang && props.lang} />
                    <SubPart5X level={3} ammount={"800"} lang={props.lang && props.lang} />
                    <SubPart5X level={4} ammount={"1600"} lang={props.lang && props.lang} />
                    <SubPart5X level={5} ammount={"3200"} lang={props.lang && props.lang} />
                    <SubPart5X level={6} ammount={"6400"} lang={props.lang && props.lang} />
                    <SubPart5X level={7} ammount={"12800"} lang={props.lang && props.lang} />
                    <SubPart5X level={8} ammount={"25600"} lang={props.lang && props.lang} />
                    <SubPart5X level={9} ammount={"51200"} lang={props.lang && props.lang} />
                    <SubPart5X level={10} ammount={"102400"} lang={props.lang && props.lang} />
                    <SubPart5X level={11} ammount={"204800"} lang={props.lang && props.lang} />
                    <SubPart5X level={12} ammount={"409600"} lang={props.lang && props.lang} />
                </div>
                <div className="Tips">
                    <div className="d-flex align-items-center tip"><div className="mr10 position mini-position position_active" /> You have earned commission from this slot.</div>
                    <div className="d-flex align-items-center tip"><div className="mr10 position mini-position" /> Available slot.</div>
                    <div className="d-flex align-items-center tip"><div className="mr10 position mini-position position_reset" /> Once this position is filled, all slots will clear out.</div>
                    <div className="d-flex align-items-center tip"><FaUsers className="mr10" color="#35FF69" size={25} /> Users you have earned from.</div>
                    <div className="d-flex align-items-center tip"><FiRefreshCcw className="mr10" color="#35FF69" size={25} /> How many times you have cleared this slot.</div>
                </div>
            </div>
        </>
    )
}

export default React.memo(BackOfficeStatusFor5x)
