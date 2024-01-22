
export default function Validation(value) {
 const error={};
 const emailPattern = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
 const passwordPattern = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

 if(value.UserName===""){
    error.UserName="Name is required";
 }
   if(value.ProductName===""){
     error.ProductName="ProductName is requird";
  }
  else if (value.ProductName===value.ProductName) {
    error.ProductName = "Duplicate value not allowed";
  }
  if(value.roleName===""){
     error.roleName="Role is required";
  }
  if(value.Email===""){
     error.Email="Email is required";
     }
 else if(!emailPattern.test(value.Email)){
    error.Email="Email did not match";
 }
   if(value.Password===""){
    error.Password="Password is required";
  }
 else if(!passwordPattern.test(value.Password)){
    error.Password="Password did not match";
 }
 if(value.ConfirmPassword===""){
    error.ConfirmPassword="ConfirmPassword is required";
 }

  
 return error;
}
