import logo from './logo.svg';
import './App.css';
import Navbar from './Componend/Navbar';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Home from './Componend/Home';
import About from './Componend/About';
import ProductState from './Context/Product/ProductState';
import AddProduct from './Componend/AddProduct';
import UpdateProduct from './Componend/UpdateProduct';
import Login from './Componend/Login';
import Regiter from './Componend/Register';
import Alert from './Componend/Alert';
import { useState } from 'react';
import Role from './Componend/Role';
import getCookie from './hooks/getcookies';
import { Navigate } from 'react-router-dom';

function App() {

  const[alert,setalert]=useState(null)
  const showalert=(message,type)=>{
    setalert({
      message:message,
      type:type,
    })
    setTimeout(() => {
      setalert(null)   
    },3000);
  }
const[color,setcolor]=useState("dark")

const handlecolor =()=>{
  if(color==='dark'){
    setcolor('light')
  }
  else{
    setcolor('dark');
  }
}
  return (

    <ProductState>
    <Router>
      <>
      <Navbar mode={color} handlebutton={handlecolor}/>
        <Alert alert={alert}/>
        <div className='container'>
        <Routes>
          <Route exact path="/home" element={<Home showalert={showalert} mode={color}/>}/>
          <Route exact path="/about" element={<About />} />
          <Route exact path="/add" element={<AddProduct showalert={showalert} mode={color}/>} />
          <Route exact path="/update/:ProductId" element={<UpdateProduct showalert={showalert} mode={color}/>}/>
          <Route exact path="/login" element={<Login showalert={showalert} mode={color}/>} />
          <Route exact path="/signup" element={<Regiter showalert={showalert} mode={color}/>} />
          <Route exact path="/role" element={<Role showalert={showalert} mode={color}/>} />
        </Routes>

        </div>
      </>
    </Router>
</ProductState>
  );
}

export default App;
