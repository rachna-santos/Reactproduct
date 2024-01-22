import Cookies from "js-cookie";

const getCookie=(cookiesname)=>{
return Cookies.get(cookiesname);
}
export default getCookie;