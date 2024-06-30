import React from 'react'
import './Data.css';
import { FaCarSide } from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";
import { FaArrowRightArrowLeft } from "react-icons/fa6";
import { FaUserFriends } from "react-icons/fa";
import { BsHandThumbsUpFill } from "react-icons/bs";
import { IoCall } from "react-icons/io5";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { RiProductHuntLine } from "react-icons/ri";
import Img1 from '../img/img1.png'
import Img2 from '../img/img2.jpg'

const Main = () => {
    return (
        <>
            <div class="container-fluid py-5 mb-5 header">
                <div class="container py-5">
                    <div class="row g-2 align-items-center">
                        <div class="col-md-12 col-lg-7">
                            <h4 class="mb-3 heading-1">100% Organic Foods</h4>
                            <h1 class="mb-5 display-3  heading-2">Organic Veggies Fruits and more..</h1>

                        </div>
                        <div class="col-md-12 col-lg-5">
                            <div id="carouselId" class="carousel slide" data-bs-ride="carousel">
                                <div class="carousel-inner" role="listbox">
                                    <div class="carousel-item active rounded">
                                        <img src={Img1} class="img-fluid w-100 h-100 bg-secondary rounded" alt="First slide" />
                                        <a href="#" class="btn">Fruits</a>
                                    </div>
                                    <div class="carousel-item rounded">
                                        <img src={Img2} class="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                        <a href="#" class="btn">Vegitables</a>
                                    </div>
                                    <div class="carousel-item rounded">
                                        <img src='https://media.istockphoto.com/id/544807136/photo/various-fresh-dairy-products.jpg?s=612x612&w=0&k=20&c=U5T70bi24itoTDive1CVonJbJ97ChyL2Pz1I2kOoSRo=' class="img-fluid w-100 h-100 rounded" alt="Second slide" />
                                        <a href="#" class="btn">Dairy Products</a>
                                    </div>
                                </div>
                                <button class="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>
                                <button class="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex">



                <div class="box">


                    <div class="content">
                        <i className='icons'><FaCarSide /></i>
                        <h1>Free Shipping</h1>
                        <p>Free on order over $300 </p>

                    </div>
                </div>

                <div class="box">

                    <div class="content">
                        <i className='icons'><FaUserShield /></i>
                        <h1>Security Payment</h1>
                        <p>100% security payment </p>

                    </div>
                </div>


                <div class="box">

                    <div class="content">
                        <i className='icons'><FaArrowRightArrowLeft /></i>
                        <h1>30 Day Return</h1>
                        <p>30 day money guarantee </p>

                    </div>
                </div>


                <div class="box">

                    <div class="content">
                        <i className='icons'><IoCall /></i>
                        <h1>24/7 Support</h1>
                        <p>Support every time fast </p>

                    </div>
                </div>

            </div>
          

          

        
        </>
    )
}

export default Main