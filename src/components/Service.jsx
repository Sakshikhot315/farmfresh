import React from 'react'
import './Data.css';

import { FaUserFriends } from "react-icons/fa";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { RiProductHuntLine } from "react-icons/ri";
const Service = () => {
  return (
   <>
     <div className="sermain">
                <div className="service">

                    <div className="boxrow">
                        <div className="conrow">
                            <i className='icons'><FaUserFriends /></i>
                            <h1>Satisfied Customers</h1>
                            <p>2000+</p>
                        </div>
                    </div>

                    <div className="boxrow">
                        <div className="conrow">
                            <i className='icons'><BsHandThumbsUpFill /></i>
                            <h1>Quality Of Service</h1>
                            <p>100%</p>
                        </div>
                    </div>

                    <div className="boxrow">
                        <div className="conrow">
                            <i className='icons'><AiOutlineSafetyCertificate /></i>
                            <h1>Quality Certificates</h1>
                            <p>20</p>
                        </div>
                    </div>

                    <div className="boxrow">
                        <div className="conrow">
                            <i className='icons'><RiProductHuntLine /></i>
                            <h1>Available Products</h1>
                            <p>500+</p>
                        </div>
                    </div>


                </div>
            </div>
   </>
  )
}

export default Service