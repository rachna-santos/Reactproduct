import { useState} from "react";
import ProductContext from "./ProductContext";
import React from 'react'
import { useContext } from "react";
import getCookie from "../../hooks/getcookies";
export default function ProductState(props) {

  const Product = []
  const [products, setproduct] = useState(Product);
  const [Category, setCategory] = useState([]);
  const [Supplier, setSupplier] = useState([]);
  const [role, setrole] = useState([]);
  // const [jwtToken, setJwtToken] = useState(token)
  
  //     const setToken = (token) => {
  //       setJwtToken(token);
  //     };

  //       const GetToken = () => {
  //       return jwtToken;
  //   };
  //   const DeleteToken=()=>{
  //    setJwtToken(null);
  //     return true;
  //   }
      const Getproduct = async () => {
      const jwtToken = getCookie("token");
      try {
      const response = await fetch('https://localhost:7118/api/Product/GetProducts', {
        method: 'GET',
        headers: {
           "Content-Type": "application/json",
           'Authorization': `Bearer ${jwtToken}`,
          },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
       console.log(json);
       setproduct(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }

  }

  // get supplier
  const GetSupplier = async () => {
    const token=getCookie("token");

    try {
      const response = await fetch('https://localhost:7118/api/Product/getsupplier', {

        method: "Get",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,

        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      setSupplier(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  // get category
  const GetCategory = async () => {
    const token=getCookie("token");
    try {
      const response = await fetch('https://localhost:7118/api/Product/getcategory', {
        method: "Get",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`,

        }

      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      console.log(json);
      setCategory(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  // add product
  const AddProduct = async (formData) => {
    const token=getCookie("token");
    const response = await fetch('https://localhost:7118/api/Product/CreateProduct', {
      method: "POST",
      body: formData,
         headers:{
          'Authorization': `Bearer ${token}`

      },
      //  body: JSON.stringify(formData),

    });
    const json = await response.json();
    console.log(json);
  }

  // GetUpdateproduct
  const GetUpdateproduct = async (ProductId) => {
     const token=getCookie("token");
    try {
      const response = await fetch(`https://localhost:7118/api/Product/GetUpdateProduct?id=${ProductId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
           'Authorization': `Bearer ${token}`, 
        },
      });

      const productData = await response.json();
      console.log(productData);
      return productData;
    } catch (error) {
      console.error("Error fetching or parsing data:", error);
    }
  }
  // Update product
  const UpdateProduct = async (formData) => {
    const token=getCookie("token");
    try{
    const response = await fetch('https://localhost:7118/api/Product/UpdateProduct', {     
      method: "PUT",
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`, 
      },
    });
    const json = await response.json();
    console.log(json);
  }catch(error) {
    console.error('Error fetching data:', error);
  }
  }

  // CreateRole
  const CreateRole = async (roleName) => {
    const response = await fetch('https://localhost:7118/api/Admin', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({roleName}),

    });
    const json = await response.json();
    console.log(json);

  }
  //  roleget
  const GetRole = async () => {
    const response = await fetch('https://localhost:7118/api/Admin/role',{
      method: "GET",
      headers: {
         "Content-Type": "application/json",
      }
    });
    const json = await response.json();
    setrole(json)
  }
  const register = async (UserName, Email, Password, ConfirmPassword, Name) => {
    const response = await fetch('https://localhost:7118/api/Account/register', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({UserName,Email,Password,ConfirmPassword,Name}),

    });
    const json = await response.json();
    console.log(json)
  }
  
  return (
    <div>
      <ProductContext.Provider value={{ products, Category, Supplier, role, setSupplier, setCategory, setproduct, AddProduct, GetCategory, GetSupplier, UpdateProduct, GetUpdateproduct, CreateRole, GetRole, register, Getproduct}}>
        {props.children}
      </ProductContext.Provider>
    </div>
  )
}  
