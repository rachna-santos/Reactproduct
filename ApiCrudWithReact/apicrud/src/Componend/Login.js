import React, { useState,useReducer } from 'react'
 import { useContext } from 'react';
 import ProductContext from '../Context/Product/ProductContext';
import { useNavigate } from 'react-router-dom';
import SetCookie from '../hooks/Setcookis';

  export default function Login(props) {
  let navigate = useNavigate();
  const context = useContext(ProductContext);
  const{setToken,jwtToken}=context
  const { showalert} = props;
  const [user, setuser] = useState({Email:"",Password:"",RememberMe:false});
  const [error,seterror]=useState({})
  const [token,settoken]=useState({})

  const productChange = (e) => {
    setuser({...user,[e.target.name]: e.target.value })
  }
  const onsubmit=async(e) => {
    console.log(validateForm());  
    e.preventDefault();
    if (validateForm()) {
    const response = await fetch("https://localhost:7118/api/Account/Login",{
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({Email:user.Email,Password:user.Password,RememberMe:user.RememberMe})
  });
  const json=await response.json();
  SetCookie("token",json.token);
  
    navigate("/home");
  props.showalert("user logged successfully register","success");   
}  
}
const validateForm=()=>{
  let formIsValid = true;  
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
      error["Password"] = "*Please enter correct password.";
    }
  }
  setuser({
    error: error
  });
  return formIsValid;
}

  return (
    <>
    <div className='container'>
      <h1>Login User</h1>
      <form method='post' className="mb-3" onSubmit={onsubmit}>
        <div className=" my-4">
          <label htmlFor="Email" className="form-label">Email</label>
          <input type="text" className="form-control" id="Email" name="Email" value={user.Email} onChange={productChange} placeholder='Enter Email'/>
            {error.Email && <p className='text-danger'>{error.Email}</p>}  
        </div>
        <div className="my-4">
          <label htmlFor="Password" className="form-label">Password</label>
          <input type="password" className="form-control" id="Password" name="Password" value={user.Password} onChange={productChange} placeholder='Enter Password'/>
           {error.Password && <p className='text-danger'>{error.Password}</p>} 
        </div>
        <div>
        <label htmlFor="RememberMe" className="form-check-label">
      <input  type="checkbox" className="form-check-input" id="RememberMe" name="RememberMe" checked={user.RememberMe} onChange={() => setuser({ ...user, RememberMe: !user.RememberMe })} /> Messageme
    </label>
    </div>
    <br/><br/>
        <button type="submit" className={`btn btn-${props.mode==='dark' ?'dark':'primary'}`}>LoginUser</button>
      </form>
    </div>
     
    </>
  )
}
