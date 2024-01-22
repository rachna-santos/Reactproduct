import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import ProductContext from '../Context/Product/ProductContext';
import { useNavigate } from 'react-router-dom';
import getCookie from '../hooks/getcookies';
import * as Yup from 'yup';
import { YupAdd } from '../Schemayup';
import axios from 'axios';


export default function AddProduct(props) {
  const {showalert}=props;
   let navigate=useNavigate();
  const context = useContext(ProductContext);
  const { AddProduct, Category, Supplier, GetCategory, GetSupplier,GetToken}=context;
  const [error,seterror]=useState({})
  const [product, setProduct] = useState({
    ProductId:0,
    ProductName:"",
    CategoryId:0,
    Category:[],
    SupplierId:0,
    Supplier:[],
    ImageFiles:[],
  });
  const checkProductNameUniqueness = async (productName) => {
    try {
      const token = getCookie("token");
      const response = await axios.post(
        `https://localhost:7118/api/Product/CreateProduct?ProductName=${productName}`,null,
     
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      return response.data.isUnique;
    } catch (error) {
    //  console.error("Error checking product name uniqueness:", error);
    seterror({ ...error, ProductName: "Product name must be unique." });
      return false;
    }
  };
  
  const productChange = (e) => {
    setProduct({...product, [e.target.name]: e.target.value });
   };
 
  const handleChange = (e) => {
    const selectedCategoryId = e.target.value;
    setProduct({...product, CategoryId: selectedCategoryId });
  };

  const supChange = (e) => {
    const selectedSupplierId = e.target.value;
    setProduct({...product, SupplierId: selectedSupplierId});
  };

  const onFileChange = (e) => {
  const files = Array.from(e.target.files);
  setProduct({...product, ImageFiles: files });

  };
  const token=getCookie('token');
  const handleSubmit =async(e) => {
    console.log(validateForm());  
    e.preventDefault(); 
    if (validateForm()) {  
      const isProductNameUnique = await checkProductNameUniqueness(product.ProductName);

      if (isProductNameUnique) {
        seterror({ ...error, ProductName: "Product name must be unique." });
        return;
      }
  
      seterror({ ...error, ProductName: "" });

      const formData = new FormData();
      formData.append("ProductId",parseInt(product.ProductId));
      formData.append("ProductName", product.ProductName);
      formData.append("CategoryId", parseInt(product.CategoryId));
      formData.append("SupplierId",parseInt(product.SupplierId)); 
      for(var i = 0; i<product.ImageFiles.length; i++)
      formData.append('ImageFiles', product.ImageFiles[i]);
       const apiResponse = await AddProduct(formData, token);
       if (apiResponse && apiResponse.data) {
         setProduct({ ...product, ProductId: apiResponse.data.newProductId });
       }
      props.showalert("product add succefully","success");
      navigate("/home");
      setProduct({ProductName:"",CategoryId:"",Category:[],Supplier:[], SupplierId:"", ImageFiles:[]});
    
  }
  
  }
const validateForm=()=>{
  let formIsValid = true;  
  if (!product["ProductName"]) {
    formIsValid = false;
    error["ProductName"] = "*Please enter your ProductName.";
  } 
   if (typeof product["ProductName"] !== "undefined") {
    if (!product["ProductName"].match(/^[a-zA-Z ]*$/)) {
      formIsValid = false;
      error["ProductName"] = "*Please enter alphabet characters only.";
    }
  }
  if (!product["CategoryId"]) {
    formIsValid = false;
    error["CategoryId"] = "*Please enter your CategoryName.";
  }
  if (!product["SupplierId"]) {
    formIsValid = false;
    error["SupplierId"] = "*Please enter your SupplierName.";
  }
  setProduct({
    error: error
  });
  return formIsValid;

}

   useEffect(() => {
    // const token=getCookie("token")
     GetCategory();
   },[]);

   useEffect(() => {
    // const token=getCookie("token")
     GetSupplier();
   },[]);

  return (
    <>
    <h1>Add Product with Category</h1>
    <div className='container'>
      <form method='post' className="mb-3 my-5" onSubmit={handleSubmit}>
        <div className="my-4">
          <label htmlFor="ProductName" className="form-label">Product Name</label>
         <input type="text" className="form-control" id="ProductName" name="ProductName" value={product.ProductName} onChange={productChange} placeholder="Enter productname" />
         {error.ProductName && <p className='text-danger'>{error.ProductName}</p>}  
        </div>
        <div className="my-4">
          <label className="form-label">Category</label>
          <select className='form-control' onChange={handleChange} name="CategoryId" value={product.CategoryId} placeholder='CategoryName'>
            {Category.map((pro) => (
              <option key={pro.CategoryId} value={pro.CategoryId}>{pro.CategoryName}</option>
            )
            )}
          </select>
           {error.CategoryId && <p className='text-danger'>{error.CategoryId}</p>}  
          </div>
        <div className="my-4">
          <label  className="form-label">Supplier</label>
          <select className='form-control' name='SupplierId' onChange={supChange} value={product.SupplierId}>
            {Supplier.map((pro) => (
              <option key={pro.SupplierId} value={pro.SupplierId}>{pro.SupplierName}</option>
            ))}
          </select>
           {error.SupplierId && <p className='text-danger'>{error.SupplierId}</p>}  
        </div> 
        <div className="my-4">
          <label  className="form-label">Image</label><br />
          <input type="file" id="ImageFiles" onChange={onFileChange} multiple />
        </div> 
        <button type="submit" className={`btn btn-${props.mode==='dark'?'dark':'primary'}`}>AddProduct</button>
      </form> 
    </div>
    </>
  );
}
