import React from 'react'
import SubPart12X from './SubPart12X'
import x12matrix from '../../assets/img/m2.png'
import Delayed from '../../Common/Delayed';
import {BrowserView, MobileView, isMobile} from 'react-device-detect';


function showLevel2PC(props){
return( <>
        <SubPart12X level={1} ammount={"200"}   lang={props.lang && props.lang} />
        <SubPart12X level={2} ammount={"400"}   lang={props.lang && props.lang} />
        <SubPart12X level={3} ammount={"800"}   lang={props.lang && props.lang} />
        <SubPart12X level={4} ammount={"1600"}  lang={props.lang && props.lang} />
        <SubPart12X level={5} ammount={"3200"}  lang={props.lang && props.lang} />
        <SubPart12X level={6} ammount={"6400"}  lang={props.lang && props.lang} />
        <Delayed waitBeforeShow={5000}>
            <SubPart12X level={7} ammount={"12800"} lang={props.lang && props.lang} />
            <SubPart12X level={8} ammount={"25600"} lang={props.lang && props.lang} />
            <SubPart12X level={9} ammount={"51200"} lang={props.lang && props.lang} />
            <SubPart12X level={10} ammount={"102400"} lang={props.lang && props.lang} />
            <SubPart12X level={11} ammount={"204800"} lang={props.lang && props.lang} />
            <SubPart12X level={12} ammount={"409600"} lang={props.lang && props.lang} />)
        </Delayed>
    </>
    );
}

function showLevel2Mobile(props){
 return ( <>
            <Delayed waitBeforeShow={100}>
                <SubPart12X level={1} ammount={"200"}   lang={props.lang && props.lang} />
                <Delayed waitBeforeShow={6000}>
                    <SubPart12X level={2} ammount={"400"}   lang={props.lang && props.lang} />
                    <Delayed waitBeforeShow={3500}>
                        <SubPart12X level={3} ammount={"800"}   lang={props.lang && props.lang} />
                        <Delayed waitBeforeShow={3500}>
                            <SubPart12X level={4} ammount={"1600"}  lang={props.lang && props.lang} />
                            <Delayed waitBeforeShow={3500}>
                                <SubPart12X level={5} ammount={"3200"}  lang={props.lang && props.lang} />
                                <Delayed waitBeforeShow={1500}>
                                    <SubPart12X level={6} ammount={"6400"}  lang={props.lang && props.lang} />
                                    <Delayed waitBeforeShow={1500}>
                                        <SubPart12X level={7} ammount={"12800"} lang={props.lang && props.lang} />
                                        <Delayed waitBeforeShow={1500}>
                                            <SubPart12X level={8} ammount={"25600"} lang={props.lang && props.lang} />
                                            <Delayed waitBeforeShow={1500}>
                                                <SubPart12X level={9} ammount={"51200"} lang={props.lang && props.lang} />
                                                <Delayed waitBeforeShow={1500}>
                                                    <SubPart12X level={10} ammount={"102400"} lang={props.lang && props.lang} />
                                                    <Delayed waitBeforeShow={1500}>
                                                        <SubPart12X level={11} ammount={"204800"} lang={props.lang && props.lang} />
                                                        <Delayed waitBeforeShow={1500}>
                                                            <SubPart12X level={12} ammount={"409600"} lang={props.lang && props.lang} />
                                                        </Delayed>
                                                    </Delayed>
                                                </Delayed>
                                            </Delayed>
                                        </Delayed>
                                    </Delayed>
                                </Delayed>
                            </Delayed>
                        </Delayed>
                    </Delayed>
                </Delayed>
            </Delayed>
        </>
        );
}

function BackOfficeStatusFor12x(props) {
    return (
        <>
        <div className="xwrap">
            <div className="title_container">
                <img src={x12matrix} id="title_container_img" alt="x12matrix" />
                <div className="boxes_wraper_x12">
                    {/* <!-- this wraps all the matrix boxes-->  */}

                    { !(isMobile) ? showLevel2PC(props) : showLevel2Mobile(props) }
            
                    {/*
                    <SubPart12X level={1} ammount={"200"}   lang={props.lang && props.lang} />
                    <SubPart12X level={2} ammount={"400"}   lang={props.lang && props.lang} />
                    <SubPart12X level={3} ammount={"800"}   lang={props.lang && props.lang} />
                    <SubPart12X level={4} ammount={"1600"}  lang={props.lang && props.lang} />
                    <SubPart12X level={5} ammount={"3200"}  lang={props.lang && props.lang} />
                    
                    <SubPart12X level={6} ammount={"6400"}  lang={props.lang && props.lang} />
                    <SubPart12X level={7} ammount={"12800"} lang={props.lang && props.lang} />
                    <SubPart12X level={8} ammount={"25600"} lang={props.lang && props.lang} />
                    <SubPart12X level={9} ammount={"51200"} lang={props.lang && props.lang} />
                    <SubPart12X level={10} ammount={"102400"} lang={props.lang && props.lang} />
                    <SubPart12X level={11} ammount={"204800"} lang={props.lang && props.lang} />
                    <SubPart12X level={12} ammount={"409600"} lang={props.lang && props.lang} />
                    */}
                </div>
            </div>
        </div>
        </>
    )
}

export default React.memo(BackOfficeStatusFor12x)
