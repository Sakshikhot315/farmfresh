import React from 'react'
import './Navbar.css';
import { Button, Layout, Menu, theme, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
const Navbar = () => {
  const navigate = useNavigate()
  const cartItems = useSelector((state) => state.cart.cartItems);
  return (
    <>
      <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
          <a class="navbar-brand" href="/home">Farm<span>Fresh</span> </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          
            <div class="navbar-nav">
              
            <a class="nav-link"  onClick={()=>navigate('/cart')}><ShoppingCartOutlined />{cartItems.length} Cart</a>

            <a class="nav-link" href='/bills'><CopyOutlined /> Bills</a>

              <a class="nav-link" href='/item'><UnorderedListOutlined /> Add Items</a>
             
            
              <a onClick={() => {
                localStorage.removeItem('pos-user')
                message.success('Logged out successfully');
                navigate('/')
              }} class="nav-link"><LogoutOutlined/> Logout</a>

            </div>
          </div>
        </div>
      </nav>



    </>
  )
}

export default Navbar