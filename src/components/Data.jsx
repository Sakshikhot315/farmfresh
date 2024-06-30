import React from 'react';
import { Link } from 'react-router-dom';
import './Data.css';
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slice';
import {

    ShoppingCartOutlined,
  } from '@ant-design/icons';
const Data = ({ data }) => {
    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(data));
      };
    return (
        <>


            <div className='main'>
                <div className='card'>
                    <div className="imagecon">
                    <img src={data.image} />
                    </div>
                    <h2 className='card-title'>{data.name}</h2>
                    <p className='dec'>{data.description.slice(0, 80) + (data.description.length > 80 ? '...' : '')}</p>
                    <div className="d-flex justify-content-around">
                    <p className='card-description'><b>Rs {data.price} /- </b></p>
                   
                   <button  onClick={handleAddToCart} className='read' ><ShoppingCartOutlined /> Add To Cart</button>
                    </div>
                   
                </div>
            </div>
        </>
    );
};

export default Data;
