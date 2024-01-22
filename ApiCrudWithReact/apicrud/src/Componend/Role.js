import React, { useState } from 'react'
import { useContext } from 'react';
import ProductContext from '../Context/Product/ProductContext';
import {useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { SchemeRole } from '../Schemayup';
export default function Role(props) {
    const {showalert}=props;
    const navigate=useNavigate();
  const context = useContext(ProductContext);
  const {CreateRole}=context;
  const[role,setrole]=useState({roleName:""})
   const[error,seterror]=useState({});
  const productChange = (e) => {
    setrole({ ...role, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    console.log(validateForm());  
    e.preventDefault();
    if (validateForm(role)){
      try{
       await SchemeRole.validate(role,{abortEarly:false})
      CreateRole(role.roleName);
      props.showalert("Role added successfully", "success");
      navigate("/home");
      setrole({roleName:""});
    }catch(validationError){
      console.log("validation error",validationError);
      const errors = {};
      validationError.inner.forEach((error)=>{
        errors[error.path]=error.message;  
      });
      seterror(errors);
    }
    }
  };
  const validateForm=()=>{
    let formIsValid = true;  
    // let error={}
    if (!role["roleName"]) {
      formIsValid = false;
      error["roleName"] = "*Please enter your roleName.";
    }

    if (typeof role["roleName"] !== "undefined") {
      if (!role["roleName"].match(/^[a-zA-Z ]*$/)) {
        formIsValid = false;
        error["roleName"] = "*Please enter alphabet characters only.";
      }
    }
    setrole({
      error: error
    });
    return formIsValid; 
  }
  return (
    <div className='container'>
    <h1>CraeteRole</h1>
    <form className="mb-3" onSubmit={handleSubmit }>
      <div className="my-4">
        <label htmlFor="roleName" className="form-label">RoleName</label>
        <input type="text" className="form-control" id="roleName" name="roleName" value={role.roleName} onChange={productChange} placeholder='Enter Role'/>
        {error.roleName && <p className='text-danger'>{error.roleName}</p>}  

      </div>
      <button type="submit" className={`btn btn-${props.mode==='dark' ?'dark':'primary'}`}>CraeteRole</button>
    </form>
  </div>
  )
}
