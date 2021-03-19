import React, { useState, useEffect, useContext } from 'react';
import { BackofficeContext } from './BackOfficeMain'
import { toast } from 'react-toastify';
import ToastContainerCust from '../../Common/ToastContainerCust'
import TronWeb from 'tronweb'
import Utils from '../../Utils/Utils'
import Loader from '../../Common/Loader'
import { MyClockLoader } from '../../Common/Loader'
import { toHex, fromHex } from 'tron-format-address'


let toggleLevel = true
let activeleLevel = 1

function SubPart12X({ level, ammount, lang }) {
    const [numberOfActiveLevels, setnumberOfActiveLevels] = useState(0);
    const [numberOfSubActiveLevels, setnumberOfSubActiveLevels] = useState(0)
    const [userX5MatrixGroup1, setUserX5MatrixDetailGroup1] = useState([]);
    const [userX5MatrixGroup2, setUserX5MatrixDetailGroup2] = useState([]);
    const [userX5MatrixGroup3, setUserX5MatrixDetailGroup3] = useState([]);

    const [userDataFirstLevel,setUserDataFirstLevel] = useState([]);
    
    const [userData, setUserData] = useState([]);
    const [userDataReferrals, setUserDataReferrals] = useState([]);

    const [userX5MatrixReferralFirstLevelGroup1, setUserX5MatrixDetailReferralFirstLevelGroup1] = useState([]);
    const [userX5MatrixReferralFirstLevelGroup2, setUserX5MatrixDetailReferralFirstLevelGroup2] = useState([]);
    const [userX5MatrixReferralFirstLevelGroup3, setUserX5MatrixDetailReferralFirstLevelGroup3] = useState([]);


    const [isBuyVisible, setIsBuyVisible] = useState(false);
    const [isBuyEnable, setIsBuyEnable] = useState(false)
    const [userCurrentlevel,setUserCurrentlevel] = useState(1);
    const [buyLevelLoader, setbuyLevelLoader] = useState(false)
    const [tronWeb, settronWeb] = useState({
        installed: false,
        loggedIn: false
    })
    const backofficeContextL = useContext(BackofficeContext)
    const [isModalOpen, SetisModalOpen] = useState(false)

    function getFlooredFixed(v, d) {
        return (Math.floor(v * Math.pow(10, d)) / Math.pow(10, d)).toFixed(d);
    }
    useEffect(() => {
        (async function () {
            await new Promise(resolve => {
                const tronWebState = {
                    installed: !!window.tronWeb,
                    loggedIn: window.tronWeb && window.tronWeb.ready
                };

                if (tronWebState.installed) {
                    settronWeb(tronWebState)
                    return resolve();
                }
                let tries = 0;
                const timer = setInterval(() => {
                    if (tries >= 10) {
                        const TRONGRID_API = process.env.REACT_APP_NETWORK;
                        window.tronWeb = new TronWeb(
                            TRONGRID_API,
                            TRONGRID_API,
                            TRONGRID_API
                        );

                        settronWeb({
                            installed: false,
                            loggedIn: false
                        });

                        clearInterval(timer);
                        return resolve();
                    }
                    tronWebState.installed = !!window.tronWeb;
                    tronWebState.loggedIn = window.tronWeb && window.tronWeb.ready;
                    if (!tronWebState.installed)
                        return tries++;
                    settronWeb(tronWebState)
                    resolve();
                }, 100);
            })
            await Utils.setTronWeb(window.tronWeb);
            showLevelDetails()
        })()
    }, [])

    const FunBuyLevel = async (level, ammount) => {
        let warnmsg = "Please do not refresh the page and wait while we are processing your payment. This can take a few minutes."

        if (lang !== 'English') {
            warnmsg = "No actualice la página y espere mientras procesamos su pago. Esto puede tardar unos minutos."
        }
        if (localStorage.getItem('backOfficeID') === null || localStorage.getItem('backOfficeID') === window.tronWeb.defaultAddress.base58) {
            try {
                setbuyLevelLoader(true)
                toast.warn(warnmsg, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                });
                await Utils.contract.buyNewLevel(2, level).send({
                    feeLimit: 300000000,
                    callValue: (ammount * 1000000) + ((ammount * 1000000) * 0.10),
                    shouldPollResponse: true
                });
                setbuyLevelLoader(false)
                window.location.reload(false);
            } catch (error) {
                console.log(error);
                setbuyLevelLoader(false)
                toast.error("error");
            }
        }
        else {
            if (lang === 'English') {
                toast.error("Purchase in preview mode is not available! Please please Register with your Tron wallet.");
            }
            else {
                toast.error("¡La compra en modo de vista previa no está disponible! Regístrese con su billetera Tron.");
            }
        }
    }

    const showLevelDetails = async () => {
        const { toHex, fromHex } = require('tron-format-address'); 
        let userAddress = window.tronWeb.defaultAddress.base58        
        
        if (localStorage.getItem('backOfficeID') !== null && localStorage.getItem('accessToken') === 'Login') {
            userAddress = localStorage.getItem('backOfficeID')
        }
        
        try {
            
            SetisModalOpen(true)            
            const userCurrentlevelLocal = await Utils.contract.usersactiveM2Level(userAddress).call();
            setUserCurrentlevel(userCurrentlevelLocal);

            const lastlavel = await Utils.contract.usersactiveM2Levels(userAddress, level).call();
            if (lastlavel) {
                setIsBuyEnable(false)
                setIsBuyVisible(false)
                activeleLevel = level;                
            }
            else {
                setIsBuyVisible(true)
                if (activeleLevel >= (level - 1)) {
                    setIsBuyEnable(true)                
                }
                else {
                    setIsBuyEnable(false)
                }
            }
    
    
            const userX5Matrix = await Utils.contract.usersm2Matrix(userAddress, level).call();       
            try {
                //var userX5MatrixDetails01 = await Utils.contract.usersm2MatrixDetailsDirects(userAddress, level, 0).call();
                var userX5MatrixDetails01Local = await Utils.contract.getUserDataM2(userAddress, level).call();
                var userX5MatrixDetails01 = []
                for (var entry of userX5MatrixDetails01Local[4]) {
                    var user = await Utils.contract.getUserDataM2(fromHex(entry), level).call();
                    if (fromHex(user[1]) === userAddress){
                        userX5MatrixDetails01.push(entry);
                    }
                }

            } catch (error) {
            }
            try {
                var userX5MatrixDetails02 = await Utils.contract.getUserDataM2(userAddress, level, 1).call();
            } catch (error) {
            }
            try {
                var userX5MatrixDetails03 = await Utils.contract.getUserDataM2(userAddress, level, 2).call();
            } catch (error) {
            }

            try {
                var userX5MatrixDetailsReferralFirstLevel01 = await Utils.contract.usersm2MatrixDetailsReferralFirstLevel(userAddress, level, 0).call();
            } catch (error) {
            }
            try {
                var userX5MatrixDetailsReferralFirstLevel02 = await Utils.contract.usersm2MatrixDetailsReferralFirstLevel(userAddress, level, 1).call();
            } catch (error) {
            }
            try {
                var userX5MatrixDetailsReferralFirstLevel03 = await Utils.contract.usersm2MatrixDetailsReferralFirstLevel(userAddress, level, 2).call();
            } catch (error) {
            }
            
           const userDataM1 = await Utils.contract.getUserDataM1(userAddress, level).call();
           const userDataM2 = await Utils.contract.getUserDataM2(userAddress, level).call();
           setUserData([userDataM1],[userDataM2]);
       
            
            var userDataM2User01 = null;
            var userDataM2User02 = null;
            var userDataM2User03 = null;

            var DataM2 = {};
            var setUserDataReferralsLocal = []
            try {
                userDataM2User01 = await Utils.contract.getUserDataM2(fromHex(userDataM2[3][0]), level).call();
                DataM2[userDataM2[3][0]] = userDataM2User01[1]
                setUserDataReferralsLocal.push(userDataM2User01)


            } catch (error) {                
            }

            try {
                userDataM2User02 = await Utils.contract.getUserDataM2(fromHex(userDataM2[3][1]), level).call();
                DataM2[userDataM2[3][1]] = userDataM2User02[1]
                setUserDataReferralsLocal.push(userDataM2User02)
            } catch (error) {
            }

            try {
                userDataM2User03 = await Utils.contract.getUserDataM2(fromHex(userDataM2[3][2]), level).call();
                DataM2[userDataM2[3][2]] = userDataM2User03[1]
                setUserDataReferralsLocal.push(userDataM2User03)
            } catch (error) {
            }
            
            setUserDataReferrals(setUserDataReferralsLocal)

    
            const userDataFirstLevelColors = []
            for (var entry of userDataM2[3]) {
              if (entry === null){
                    userDataFirstLevelColors.push(null)  
             } else if (fromHex(DataM2[entry]) === userAddress) {   
                    userDataFirstLevelColors.push('green')
             }else{
                    userDataFirstLevelColors.push('blue')
             }
            }

            if (userDataFirstLevelColors.length === 0) { userDataFirstLevelColors.push(null); userDataFirstLevelColors.push(null); userDataFirstLevelColors.push(null);}
            if (userDataFirstLevelColors.length === 1) { userDataFirstLevelColors.push(null); userDataFirstLevelColors.push(null); }
            if (userDataFirstLevelColors.length === 2) { userDataFirstLevelColors.push(null); }
              
            setUserDataFirstLevel(userDataFirstLevelColors)

    
            try { setUserX5MatrixDetailGroup1([userX5MatrixDetails01]) } catch (error) {}
            try { setUserX5MatrixDetailGroup2([userX5MatrixDetails02]) } catch (error) {}
            try { setUserX5MatrixDetailGroup3([userX5MatrixDetails03]) } catch (error) {}

            try { setUserX5MatrixDetailReferralFirstLevelGroup1(userX5MatrixDetailsReferralFirstLevel01[2]) } catch (error) { }
            try { setUserX5MatrixDetailReferralFirstLevelGroup2(userX5MatrixDetailsReferralFirstLevel02[2]) } catch (error) { }
            try { setUserX5MatrixDetailReferralFirstLevelGroup3(userX5MatrixDetailsReferralFirstLevel03[2]) } catch (error) { }

            if (userX5Matrix.length > 0) {
                setnumberOfActiveLevels(userX5Matrix[1].length)
                setnumberOfSubActiveLevels(userX5Matrix[2].length)
                

                let sum = 0;
                if (userX5Matrix[1].length > 0 && lastlavel) {
                    sum = userX5Matrix[1].length + userX5Matrix[2].length
                    backofficeContextL.dispatchM({ type: 'partnerCountM2', payload: sum })
                }
            }
            else {
                if (lang === 'English') {
                    toast.warn("Error")
                }
                else {
                    toast.warn("Error")
                }
            }
            SetisModalOpen(false)
        }
        catch (err) {
            console.log(err)
            SetisModalOpen(false)
        }
    }

    const getActiveLevels = [...Array(numberOfActiveLevels)].map((e, i) => <div key={i} className="position position_active"></div>)
    const getActiveLevelsV2 = userDataFirstLevel.map((e, i) => <div key={i} id={e} className={ e === null ? 'position' : e === 'blue' ? 'position position_active_referral' : 'position position_active' }></div>)
    
    if (userX5MatrixReferralFirstLevelGroup1.length === 0) { userX5MatrixReferralFirstLevelGroup1.push(null); userX5MatrixReferralFirstLevelGroup1.push(null);  userX5MatrixReferralFirstLevelGroup1.push(null); }
    if (userX5MatrixReferralFirstLevelGroup1.length === 1) { userX5MatrixReferralFirstLevelGroup1.push(null); userX5MatrixReferralFirstLevelGroup1.push(null); }
    if (userX5MatrixReferralFirstLevelGroup1.length === 2) { userX5MatrixReferralFirstLevelGroup1.push(null); }

    if (userX5MatrixReferralFirstLevelGroup2.length === 0) { userX5MatrixReferralFirstLevelGroup2.push(null); userX5MatrixReferralFirstLevelGroup2.push(null);  userX5MatrixReferralFirstLevelGroup2.push(null); }
    if (userX5MatrixReferralFirstLevelGroup2.length === 1) { userX5MatrixReferralFirstLevelGroup2.push(null); userX5MatrixReferralFirstLevelGroup2.push(null); }
    if (userX5MatrixReferralFirstLevelGroup2.length === 2) { userX5MatrixReferralFirstLevelGroup2.push(null); }

    if (userX5MatrixReferralFirstLevelGroup3.length === 0) { userX5MatrixReferralFirstLevelGroup3.push(null); userX5MatrixReferralFirstLevelGroup3.push(null);  userX5MatrixReferralFirstLevelGroup3.push(null); }
    if (userX5MatrixReferralFirstLevelGroup3.length === 1) { userX5MatrixReferralFirstLevelGroup3.push(null); userX5MatrixReferralFirstLevelGroup3.push(null); }
    if (userX5MatrixReferralFirstLevelGroup3.length === 2) { userX5MatrixReferralFirstLevelGroup3.push(null); }

const m2group1 = [];
const m2group2 = [];
const m2group3 = [];
var positionCicladoIfRequired = 'subposition';

 var userX5MatrixReferralFirstLevelGroup1Local = [];
 var userX5MatrixReferralFirstLevelGroup2Local = [];
 var userX5MatrixReferralFirstLevelGroup3Local = [];

if (userDataReferrals.length !== -1 && userX5MatrixGroup1[0] !== undefined )
{
    try {
    userX5MatrixReferralFirstLevelGroup1Local = userDataReferrals[0][3];
    }catch(error)
    {
    }

    try {
    userX5MatrixReferralFirstLevelGroup2Local = userDataReferrals[1][3];
    }catch(error)
    {
    }

    try {
    userX5MatrixReferralFirstLevelGroup3Local = userDataReferrals[2][3];    
    }catch(error)
    {
        
        userX5MatrixReferralFirstLevelGroup3Local = [];
    }
    


if (userX5MatrixReferralFirstLevelGroup1Local.length === 0) { userX5MatrixReferralFirstLevelGroup1Local.push(null); userX5MatrixReferralFirstLevelGroup1Local.push(null); userX5MatrixReferralFirstLevelGroup1Local.push(null); }
if (userX5MatrixReferralFirstLevelGroup1Local.length === 1) { userX5MatrixReferralFirstLevelGroup1Local.push(null); userX5MatrixReferralFirstLevelGroup1Local.push(null); }
if (userX5MatrixReferralFirstLevelGroup1Local.length === 2) { userX5MatrixReferralFirstLevelGroup1Local.push(null); }

if (userX5MatrixReferralFirstLevelGroup2Local.length === 0) { userX5MatrixReferralFirstLevelGroup2Local.push(null); userX5MatrixReferralFirstLevelGroup2Local.push(null); userX5MatrixReferralFirstLevelGroup2Local.push(null); }
if (userX5MatrixReferralFirstLevelGroup2Local.length === 1) { userX5MatrixReferralFirstLevelGroup2Local.push(null); userX5MatrixReferralFirstLevelGroup2Local.push(null); }
if (userX5MatrixReferralFirstLevelGroup2Local.length === 2) { userX5MatrixReferralFirstLevelGroup2Local.push(null); }

if (userX5MatrixReferralFirstLevelGroup3Local.length === 0) { userX5MatrixReferralFirstLevelGroup3Local.push(null); userX5MatrixReferralFirstLevelGroup3Local.push(null); userX5MatrixReferralFirstLevelGroup3Local.push(null); }
if (userX5MatrixReferralFirstLevelGroup3Local.length === 1) { userX5MatrixReferralFirstLevelGroup3Local.push(null); userX5MatrixReferralFirstLevelGroup3Local.push(null); }
if (userX5MatrixReferralFirstLevelGroup3Local.length === 2) { userX5MatrixReferralFirstLevelGroup3Local.push(null); }


for (var entry of userX5MatrixReferralFirstLevelGroup1Local) {
  if (entry === null) {
        m2group1.push(null)
} else if (userX5MatrixGroup1[0].includes(entry)){
        m2group1.push('lightblue')
 }else{                
        m2group2.push('green')
 }
}

for (var entry of userX5MatrixReferralFirstLevelGroup2Local) {
 if (entry === null){
        m2group2.push(null)
} else if (userX5MatrixGroup1[0].includes(entry)){        
        m2group2.push('lightblue')
 }else{
        m2group2.push('green')
 }
}


for (var entry of userX5MatrixReferralFirstLevelGroup3Local) {
if (entry === null){
        m2group3.push(null)
} else if (userX5MatrixGroup1[0].includes(entry)){
        
        m2group3.push('lightblue')
 }else{
        m2group3.push('green')
 }
}


try {
   var positionCicladoIfRequired = ((m2group1.filter(x => x !== null).length + m2group2.filter(x => x !== null).length + m2group3.filter(x => x !== null).length) === 8) ? 'subposition reset-bg' : 'subposition'
}   catch (err) {
}
 
}


    const getSubActiveLevelsGroup1 = m2group1.map((e, i) => <div key={i} id={e} className={ e === null ? positionCicladoIfRequired : e === 'lightblue' ? 'subposition position_active_referral' : 'subposition position_active' }></div>)
    const getSubActiveLevelsGroup2 = m2group2.map((e, i) => <div key={i} id={e} className={ e === null ? positionCicladoIfRequired : e === 'lightblue' ? 'subposition position_active_referral' : 'subposition position_active' }></div>)
    const getSubActiveLevelsGroup3 = m2group3.map((e, i) => <div key={i} id={e} className={ e === null ? positionCicladoIfRequired : e === 'lightblue' ? 'subposition position_active_referral' : 'subposition position_active' }></div>)



    const getNonActiveLevels = [...Array(3 - numberOfActiveLevels)].map((e, i) => <div key={i} className="position"></div>)
    const getNonSubActiveLevels = [...Array(9)].map((e, i) => <div key={i} className="subposition"></div>)   
 
    var getBuyIconM2 = <i className="buy-icon12XDisabled" alt="buyIcon"></i>
            
    if ((userCurrentlevel + 1) >= level ){
        getBuyIconM2 = <i className="buy-icon12X buy-icon" alt="buyIcon" onClick={() => FunBuyLevel(level, ammount)} ></i>
    }
    
    return (
        <div className="matrix_box_x12">
            <ToastContainerCust />
            <Loader active={isModalOpen} />
            <MyClockLoader active={buyLevelLoader} />
            {/* <!--single matrix box--> */}
            <div className="box_basket" style={{ position: "relative" }}>
                <div className="box_number_x12" id="box_number_x12">{level}</div>
                {isBuyVisible ? getBuyIconM2 : null}
                <button className="btn btn-info basket_btn basket_active">{ammount} trx</button>
            </div>
            <div className="box_positions_x12">                
                {getActiveLevelsV2}
                {/*getActiveLevels*/}
                {/*getNonActiveLevels*/}
            </div>
            <div className="box_subpositions">
                {getSubActiveLevelsGroup1}
                {getSubActiveLevelsGroup2}
                {getSubActiveLevelsGroup3}
                {/*getSubActiveLevels*/}
                {/*getNonSubActiveLevels*/}
                {/* TODO: This claass should be the last slot reset-bg */}
               
            </div>
            <div className="flow_lines">
                <div className="flow_line line_one_x12"></div>
                <div className="flow_line line_two_x12"></div>
                <div className="flow_line line_three_x12"></div>
                <div className="flow_line line_four_x12"></div>
                <div className="flow_line line_five_x12"></div>
                <div className="flow_line line_six_x12"></div>
                <div className="flow_line line_seven_x12"></div>
                <div className="flow_line line_eight_x12"></div>
                <div className="flow_line line_nine_x12"></div>
                <div className="flow_line line_ten_x12"></div>
                <div className="flow_line line_eleven_x12"></div>
                <div className="flow_line line_twelve_x12"></div>
                <div className="flow_line line_thirteen_x12"></div>
            </div>
        </div>
    )
}

export default SubPart12X
