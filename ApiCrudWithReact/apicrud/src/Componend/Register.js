import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import ProductContext from '../Context/Product/ProductContext';
import { useNavigate } from 'react-router-dom';
import getCookie from '../hooks/getcookies';
import axios from 'axios';
import * as Yup from 'yup';
import { YupSchema } from '../Schemayup';
export default function Register(props) {  
  let navigate=useNavigate();
    const context = useContext(ProductContext);
    const {GetRole,role,register}=context;
    const {showalert}=props;
    const[user,setuser]=useState({UserName:"",Email:"",Password:"",ConfirmPassword:"",Name:""})
    const [error,seterror]=useState({})
    const[fields,setfields]=useState({})

  
    const productChange=(event)=>{
      
   setuser({...user,[event.target.name]:event.target.value})
}
 const roleChange=(e)=>{
    setuser({...user,[e.target.name]:e.target.value})}

    const onsubmit=async(e)=>{
      console.log(validateForm());  
      e.preventDefault();
      if (validateForm()) {
          console.log(user); 
          try{
          await YupSchema.validate(user,{abortEarly:false})
          register(user.UserName,user.Email,user.Password, user.ConfirmPassword, user.Name);
          navigate("/home");
          setuser({ UserName:"",Email:"", Password:"",ConfirmPassword:"", Name:""});
          console.log(user);
          // alert("Form submitted");
          props.showalert("User Register successfully", "success");

         }catch(validationError){
          console.log("validation error",validationError);
        const errors = {};
        validationError.inner.forEach((error)=>{
          errors[error.path]=error.message;  
        });
        seterror(errors);

    }

  }
}
    const validateForm=()=>{
        let formIsValid = true;  
        // let error={}
        if (!user["UserName"]) {
          formIsValid = false;
          error["UserName"] = "*Please enter your username.";
        }
  
        if (typeof user["UserName"] !== "undefined") {
          if (!user["UserName"].match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            error["UserName"] = "*Please enter alphabet characters only.";
          }
        }
  
        if (!user["Email"]) {
          formIsValid = false;
          error["Email"] = "*Please enter your email.";
        }
  
        else if (typeof user["Email"] !=="undefined") {
          var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
          if (!pattern.test(user["Email"])) {
            formIsValid = false;
            error["Email"]= "*Please enter valid email-ID.";
          }
         }     
          if (!user["Password"]) {
            formIsValid = false;
            error["Password"] = "*Please enter your password.";
          }
       else if (typeof user["Password"] !== "undefined") {
          if (!user["Password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            formIsValid = false;
            error["Password"] = "*Please enter secure and strong password.";
          }
        }
        if (!user["ConfirmPassword"]) {
          formIsValid = false;
          error["ConfirmPassword"] = "*Please enter your ConfirmPassword.";
        }
       else if (typeof user["ConfirmPassword"] !== 'Password') {
          if (!user["ConfirmPassword"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
            formIsValid = false;
            error["ConfirmPassword"] = "*password is not match.";
          }
        }

        if (!user["Name"]) {
          formIsValid = false;
          error["Name"] = "*Please enter you Role.";
        }

        setuser({
          error: error
        });
        return formIsValid;
} 
    useEffect(()=>{
        GetRole();
},[])
  return (
    <div className='container'>
    <h1>Add User</h1>
    <form method='post' className="mb-3"  onSubmit={onsubmit}>
      <div className="my-4">
        <label htmlFor="UserName" className="form-label">Name</label>
        <input type="text" className="form-control" id="UserName" name="UserName" value={user.UserName} onChange={productChange} placeholder='Enter UserName'/>
         {error.UserName && <p className='text-danger'>{error.UserName}</p>} 

      </div>
      <div className="my-4">
        <label htmlFor="Email" className="form-label">Email</label>
        <input type="text" className="form-control" id="Email" name="Email" value={user.Email} onChange={productChange} placeholder='Enter Email'/>
        {error.Email  && <p className='text-danger'>{error.Email}</p>}
      </div>
      <div className="my-4">
        <label htmlFor="Password" className="form-label">Password</label>
        <input type="password" className="form-control" id="Password" name="Password" value={user.Password} onChange={productChange} placeholder='Enter Password'/>
         <p className='text-danger'>{error.Password}</p>

      </div>
      <div className="my-4">
        <label htmlFor="ConfirmPassword" className="form-label">ConformPassword</label>
        <input type="password" className="form-control" id="ConfirmPassword" name="ConfirmPassword" value={user.ConfirmPassword} onChange={productChange} placeholder='Enter ConfirmPassword'/>
         {error.ConfirmPassword && <p className='text-danger'>{error.ConfirmPassword}</p>} 

       </div>
      <div className="my-4">
        <label htmlFor="Name" className="form-label">CreateRole</label>
        <select className='form-control' id="Name" name="Name" onChange={roleChange} value={user.Name}>
        {role.map((pro) => (
              <option key={pro.Id} value={pro.Name}>{pro.Name}</option>
            ))}
        </select>
        {error.Name && <p className='text-danger'>{error.Name}</p>}
      </div>
      <button type="submit" className={`btn btn-${props.mode==='dark' ?'dark':'primary'}`}>Add User</button>
    </form>
  </div>
  )
}
