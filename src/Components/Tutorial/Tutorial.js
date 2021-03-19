import React from 'react'
import tron32x from '../../assets/img/tron32x.png'
import x5matrix from '../../assets/img/m1.png'
import x12matrix from '../../assets/img/m2.png'
import m1dist from '../../assets/img/m1-dist.jpg'
import M2dist from '../../assets/img/M2-dist.jpg'
import reinvest from '../../assets/img/reinvest.jpg'
import upgrade from '../../assets/img/6th.jpg'
import Simult from '../../assets/img/SIMULT.jpg'
import { FaUsers, FaRegCopy } from "react-icons/fa";
//import xtronLogo from '../../assets/img/xtronlong.png'
import MyNav from '../BackOffice/Nav'
//import { Link } from 'react-router-dom';
import ReactGA from 'react-ga';
//ReactGA.initialize('GTM-WZM9SPD'); /*Unique Google Analytics ID*/
//ReactGA.pageview(window.location.pathname + window.location.search);


function Tutoril() {
    return (
        <div class="" id="backofficewrap">
            <MyNav />
            <h2 className="text-center whitext mt-5">Tutorial</h2>
            <div class="container">
                <div class="row " id="backoffice_row">
                    <div class="col-lg-3">
                        <div class="userdef xwrap">
                            <div class="userdefinition">
                                <div class="paymentlogo">
                                    {/* <!--    <img src="./assets/img/tron64x.png" alt="tron xtron logo" id="tronxlogo">  --> */}
                                    <h4 class="whitext">USER 01</h4>
                                </div>
                                <div class="userinfo text-right">
                                    <h4 class="whitext">#  <FaUsers color="#35FF69" /></h4>
                                </div>
                            </div>
                            <h2 class="text-left ctatext">$3,000 USD</h2>
                            <h4 class="subtext earning_amount text-left">$$$ TRX <img src={tron32x} alt="tron32x" class="tron_currency" /></h4>
                            {/* <!---  <button class="btn btn-success custom_btn" id="trx_amount"> TRX Amount</button> --> */}
                            <hr class="custom_hr" />
                            <div class="matrix_earnings">
                                <img class="matrix_logo" alt="tron32x" src={x5matrix} />
                                <h4 class="whitext">Earnings</h4>
                                <div class="earning_amount_container">
                                    <h5 class="ctatext earning_amount">$1,500 USD</h5>
                                </div>
                                <h5 class="earning_amount_trx subtext">22,000 TRX  <img src={tron32x} alt="tron32x" class="tron_currency" /></h5>
                            </div>
                            <hr class="custom_hr" />
                            <div class="matrix_earnings">
                                <img class="matrix_logo" src={x12matrix} alt="M2dist" />
                                <h4 class="whitext">Earnings</h4>
                                <div class="earning_amount_container">
                                    <h5 class="ctatext earning_amount">$1,500 USD</h5>
                                </div>
                                <h5 class="earning_amount_trx subtext">22,000 TRX  <img src={tron32x} alt="tron32x" class="tron_currency" /></h5>
                            </div>
                        </div>

                        <div class="affiliate_wrap xwrap">
                            <div class="affiliate_heading">
                                <h4 class="ctatext">Affiliate Link</h4>
                                <h4 class="whitext"># <FaUsers color="#35FF69" /></h4>
                            </div>
                            <div class="link_container">
                                <input type="text" value="https://xtron.io/" id="refLink" readonly />
                                <FaRegCopy className="ctatext" />
                            </div>
                            <hr class="custom_hr" />
                            
                        </div>

                        <div class="wallet_wrap xwrap">
                            <h5 class="ctatext">Your TRX Wallet:</h5>
                            <p class="whitext">00000000000000000000000000000000000000000000000</p>
                        </div>

                        <div class="contract_wrap xwrap">
                            <h5 class="ctatext">Smart Contract Address :</h5>
                            <p class="whitext">00000000000000000000000000000000000000000000000</p>
                        </div>
                    </div>
                    <div class="col-lg-9" >
                        <div class="xwrap">
                            <div class="title_container">
                                {/* <!--<img src="./assets/img/m1.png" id="title_container_img"> --> */}
                                
                                <h2 class="ctatext">How does xtron's hybrid marketing works?</h2>
                                <p class="whitext">XTRON hybrid marketing is a marketing system where you
                                buy slots once and can make money with them indefinitely.</p>

                                <p class="whitext">When you sign up, you get a referral link which is
                                tied to you and the person who invited you.</p>

                                <p class="whitext">Your first purchase (400 TRX) goes towards the first slots of the
                                M1 and M2 matrices simultaneously (200 each). After the first purchase, you can buy
                                any slot you wish</p>

                                <img class="first-payment-img" src={Simult} alt="xtron matrix first payment" />
                                <br />

                                <h2 class="ctatext">SLOTS</h2>
                                <p class="whitext">Each of these two matrices (M1 and M2) has 12 slots. Each subsequent slot is 2x
                                    more expensive than the previous one, and profits from each subsequent slot are 2x higher.</p>
                                <p class="whitext">After your first purchase, you can buy any additional slot from one matrix without having
                                to buy the same slot from the other matrix.
                                    </p>
                                <p class="text-center subtext quote-yellow"><i class="fa fa-lightbulb-o" aria-hidden="true"></i> Slots have no
                                        expiration date, so once you buy a slot, it's yours forever!</p>
                                <br />
                                <h4 class="ctatext">M1 Slots</h4>
                                <p class="whitext">In the M1 matrix, you can earn 100% the cost of a slot for every single person
                                        you refer to that slot</p>

                                <img class="first-payment-img" src={m1dist} alt="xtron m1 matrix payment distribution" />
                                <br />
                                <h4 class="ctatext">M2 Slots</h4>
                                <p class="whitext">In the M2 matrix, you can earn 20% of the transaction volume of up to 5 levels below
                                you in the referral chain.
                                    </p>
                                <img class="first-payment-img" src={M2dist} alt={"M2dist"} />
                                <br />

                                <h2 class="ctatext">Registration</h2>
                                <p class="whitext">The only requirement to be participate in the XTRON Smart Contract is to purchase the first
                                slots of each matrix. The first slots of each matrixx cost 200 TRX each and they are bought together. All further
                                    slots can be purchased separately so, for example, you can purchase the 4th slot of the M1 matrix without having to buy the 4th slot of the M2.</p>
                                <br />

                                <h2 class="ctatext">Reinvestments</h2>
                                <p class="whitext">A reinvestment clears the slot for you, so you can keep referring people and earning
                                money with your slots.
                                    </p>
                                <p class="whitext">Reinvestments happen automatically the moment you refer a new user into the last free
                                place of a slot. Also, you reappear in a free space of your sponsor everytime a reinvestment happens to you.
                                    </p>
                                <img class="first-payment-img" src={reinvest} alt="xtron reinvest payment img matrix" />
                                <br />

                                <h2 class="ctatext">Upgrade</h2>
                                <p class="whitext">An upgrade is the opening a higher slot. It is done once, and then that new slot is yours forever. Your
                                upgrade payment goes to the person who referred you.
                                    </p>
                                <h4 class="ctatext">Why should you upgrade your matrix?</h4>
                                <p class="whitext">Upgrading is optional, but your earning potential is multiplied with every additional slot
                                you buy. Let's look at it this way:
                                    </p>
                                <p class="subtext text-center">You can earn 6,400 TRX instantaneously for
                                every person you refer to the 6th slot of the M1 matrix. That's 25,600 TRX for every cycle!
                                    </p>
                                <img class="first-payment-img" src={upgrade} alt="xtron matrix payment 6th slot" />
                                <br />
                                <h2 class="ctatext">Terms and Definitions</h2>
                                <ul class="whitext">
                                    <li>Sponsor:    The person whose referral link you used to sign up.</li>
                                    <li>Referral:   A person who joins Xtron using your referral link.</li>
                                    <li>Upgrade: It's the purchase of a higher slot in any matrix.</li>
                                    <li>Reinvest:   It's an automatic re-opening of a slot to continue earning money from it.</li>
                                    <li>Lost Profit:    Payment which goes to a higher partner because it comes from a matrix slot you have not purchased yet.</li>
                                    <li>Extra Profit:   Payment which goes to you because a lower partner doesn't own a particular slot in their matrix.</li>
                                    <li>Residual Income: Income which comes from your first 5 referral levels on the M2 matrix automatically.</li>
                                </ul>
                            </div>
                        </div>
                        <div class="definitions">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Tutoril
