import Cookies from "js-cookie";

const SetCookie=(cookiesname,token)=>{
Cookies.set(cookiesname,token,{
expires:1,
secure:true,
sameSite:'strict',
path:'/'
});

}
export default SetCookie;