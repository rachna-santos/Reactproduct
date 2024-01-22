import React, {useContext,useEffect} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import ProductContext from '../Context/Product/ProductContext'
import { useLocation } from 'react-router-dom'
import getCookie from '../hooks/getcookies'
import RemoveCookie from '../hooks/Remove'
export default function Navbar(props) {
let navigate=useNavigate()
let location = useLocation();
const context = useContext(ProductContext);
//  const{DeleteToken,GetToken}=context;
const Handlelogout =()=> {
  RemoveCookie("token"); 
   navigate('/login');  
  };
  useEffect(()=>{
   console.log(location.pathname);

  },[location])
  return (
    <div>
      <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" href="#">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/home'?'active':''}`} aria-current="page" to="/home">Home</Link>
        </li>
         <li className="nav-item">
          <Link className={`nav-link ${location.pathname==='/role'?'active':''}`} to="/role">AddRole</Link>
        </li>  
      </ul>
      {!getCookie()?<form className="d-flex">
      <Link className={`btn btn-${props.mode} mx-1`} to="/login" role="button">Login</Link>
      <Link className={`btn btn-${props.mode} mx-2`} to="/signup" role="button">Signup</Link>
       </form>:<button className={`btn btn-${props.mode}`} onClick={Handlelogout}>LogOut</button>}
       <div className={`form-check form-switch text-${props.mode==='dark'?'dark':'primary'}`}>
      <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={props.handlebutton}/>
    </div>
    </div>
  </div>
</nav>
</div>
  )
}
