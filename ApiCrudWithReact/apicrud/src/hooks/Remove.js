import Cookies from "js-cookie";


const RemoveCookie=(cookiesname)=>{
 Cookies.remove(cookiesname);
}
export default RemoveCookie;