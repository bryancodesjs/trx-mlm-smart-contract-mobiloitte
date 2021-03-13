import React from 'react'
import SubPart12X from './SubPart12X'
import x12matrix from '../../assets/img/m2.png'

function BackOfficeStatusFor12x(props) {
    return (
        <div className="xwrap">
            <div className="title_container">
                <img src={x12matrix} id="title_container_img" alt="x12matrix" />
                <div className="boxes_wraper_x12">
                    {/* <!-- this wraps all the matrix boxes--> */}
                    <SubPart12X level={1} ammount={"200"} lang={props.lang && props.lang} />
                    <SubPart12X level={2} ammount={"400"} lang={props.lang && props.lang} />
                    <SubPart12X level={3} ammount={"800"} lang={props.lang && props.lang} />
                    <SubPart12X level={4} ammount={"1600"} lang={props.lang && props.lang} />
                    <SubPart12X level={5} ammount={"3200"} lang={props.lang && props.lang} />
                    <SubPart12X level={6} ammount={"6400"} lang={props.lang && props.lang} />
                    <SubPart12X level={7} ammount={"12800"} lang={props.lang && props.lang} />
                    <SubPart12X level={8} ammount={"25600"} lang={props.lang && props.lang} />
                    <SubPart12X level={9} ammount={"51200"} lang={props.lang && props.lang} />
                    <SubPart12X level={10} ammount={"102400"} lang={props.lang && props.lang} />
                    <SubPart12X level={11} ammount={"204800"} lang={props.lang && props.lang} />
                    <SubPart12X level={12} ammount={"409600"} lang={props.lang && props.lang} />
                </div>
            </div>
        </div>
    )
}

export default BackOfficeStatusFor12x
