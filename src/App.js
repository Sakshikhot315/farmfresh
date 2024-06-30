
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Item from './pages/Item';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Bills from './pages/Bills';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>

          <Route path='/home' element={<Home />}></Route>
          <Route path='/item' element={<Item />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
          <Route path='/bills' element={<Bills />}></Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
