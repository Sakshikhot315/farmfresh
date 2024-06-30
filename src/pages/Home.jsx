import React from 'react'
import Navbar from '../components/Navbar'
import Data from '../components/Data';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './Main.css';
import Main from '../components/Main';
import Footer from '../components/Footer';
import Service from '../components/Service';
const Home = () => {
  const [itemData, setItemData] = useState([])
  const [selectCategory, setSelectCategory] = useState('Fruit')
  const [filteredData, setFilteredData] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const categories = [
    {
      name:'Fruit',
      imageurl:'https://img.freepik.com/free-photo/vibrant-collection-healthy-fruit-vegetables-generated-by-ai_24640-80425.jpg'
    },
    {
      name:'Vegetable',
      imageurl:'https://img.freepik.com/free-photo/healthy-vegetables-wooden-table_1150-38014.jpg'
    },
    {
      name:'Meat',
      imageurl:'https://media.istockphoto.com/id/1200498591/photo/various-types-of-fresh-meat-pork-beef-turkey-and-chicken-top-view.jpg?s=612x612&w=0&k=20&c=yseJrNrUK6G5KkxJ9_Ck-NRbMDZOo-9jAt986xG7Lik='
    },
    {
      name:'Dairy',
      imageurl:'data:image/jpeg;base64,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'
    }
  ]

   
    const getItem = () => {
        axios
            .get('https://posbackend-9ih0.onrender.com/api/items/get-items')
            .then((res) => {
                setItemData(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        getItem();
    }, []);

    const filterData = () => {
      let filtered = itemData;
  
      if (searchKey) {
        filtered = filtered.filter(transaction =>
          transaction.name.toLowerCase().includes(searchKey.toLowerCase())
        );
      }
      setFilteredData(filtered);
    };
  
    useEffect(() => {
      filterData();
    }, [searchKey, itemData]);
  return (

    <>
    <Navbar/>
<Main/>
    <div className="categoryflex">
        {categories.map((category)=>{
          return <div className="categorybox">
           
            <img src={category.imageurl}  />
            
            <h2 onClick={() => setSelectCategory(category.name)} className={`name ${selectCategory === category.name && 'selected'}`}>{category.name} </h2>
          </div>
        })}
      </div>

      <div className="d-flex mt-4 mainsearch">
        <div className="container mx-auto">
          <input type="text" placeholder='Search Here' value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            className='search' />
        </div>
      </div>

    <div className='mains'>
      {filteredData.filter((i) => i.category === selectCategory).map((data) => (
        <div key={data._id} >
          <Data data={data} />
        </div>
      ))}
    </div>
<Service/>
    <Footer/>
    </>
  )
}

export default Home