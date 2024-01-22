import React, { useState, useRef,useEffect } from 'react';
import { useContext } from 'react';
import ProductContext from '../Context/Product/ProductContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import getCookie from '../hooks/getcookies';
export default function UpdateProduct(props) {
  const {showalert}=props;
let navigate=useNavigate();
const context = useContext(ProductContext);
const {UpdateProduct,Category,GetUpdateproduct, Supplier,GetCategory,GetSupplier}=context;
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
   const { ProductId } = useParams();
   const token=getCookie("token");
   useEffect(()=>{
   const fetchData = async () => {
      const updateProductData =await GetUpdateproduct(ProductId);
         setProduct({
         ProductId: updateProductData.ProductId,
         ProductName: updateProductData.ProductName,
         CategoryId: updateProductData.CategoryId,
         SupplierId:updateProductData.SupplierId,
         ImageFiles:updateProductData.ImageFiles,
      })
     }
 fetchData(token);
},[ProductId])

  const productChange = (e) => {
     setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const handleChange = (e) => {
    const selectedCategoryId = e.target.value;
    setProduct({ ...product, CategoryId: selectedCategoryId });
  };
  const supChange = (e) => {
    const selectedSupplierId = e.target.value;
    setProduct({ ...product, SupplierId: selectedSupplierId});
  };

  const onFileChange = (e) => {
  const files = Array.from(e.target.files);
  setProduct({ ...product, ImageFiles: files });
   GetUpdateproduct(ProductId);
  console.log(files);
  };
  const handleClick=async(e) => {
    const token=getCookie("token");
    e.preventDefault();
    const formData = new FormData();
      formData.append("ProductId",parseInt(product.ProductId));
       formData.append("ProductName", product.ProductName);
      formData.append("CategoryId", parseInt(product.CategoryId));
      formData.append("SupplierId",parseInt(product.SupplierId)); 
        for(var i = 0; i<product.ImageFiles.length; i++)
        formData.append('ImageFiles', product.ImageFiles[i]);
        await UpdateProduct(formData,token);
        props.showalert("product add succefully","success");
        navigate("/home");
        setProduct({ProductName:"",CategoryId:"",Category:[],Supplier:[], SupplierId:"", ImageFiles:[]});
        }

   useEffect(() => {
    //  const token=getCookie("token");
     GetCategory(ProductId);
        // GetUpdateproduct(ProductId);

   },[]);

   useEffect(() => {
    //  const token=getCookie("token");
      GetSupplier(ProductId);
   },[]);
  return (
    <>
    <h1>Update Product with Category</h1>
    <div className='container'>
      <form className="mb-3 my-5" onSubmit={handleClick}>
        <div className="mb-3">
          <label className="form-label">Product Name</label>
          <input type="text" className="form-control" id="ProductName" name="ProductName" value={product.ProductName} onChange={productChange} />
           {error.ProductName && <p className='text-danger'>{error.ProductName}</p>} 

        </div>
         <div className="mb-3">
          <label className="form-label">Category</label>
          <select className='form-control' onChange={handleChange} name="CategoryId" value={product.CategoryId}>
            {Category.map((pro) => (
              <option key={pro.CategoryId} value={pro.CategoryId}>{pro.CategoryName}</option>
            )
            )}

          </select>
           {error.CategoryName && <p className='text-danger'>{error.CategoryName}</p>} 

          </div>
        <div className="mb-3">
          <label  className="form-label">Supplier</label>
          <select className='form-control' onChange={supChange} name='SupplierId' value={product.SupplierId}>
            {Supplier.map((pro) => (
              <option key={pro.SupplierId} value={pro.SupplierId}>{pro.SupplierName}</option>
            ))}
          </select>
           {error.SupplierName && <p className='text-danger'>{error.SupplierName}</p>}  

        </div> 
        <div className="mb-3">
          <label  className="form-label">Image</label><br />
          <input type="file" id="ImageFiles"  onChange={onFileChange} multiple />
        </div> 
        <button type="submit" className={`btn btn-${props.mode==='dark' ?'dark':'primary'}`}>UpdateProduct</button>
      </form>
    </div>
</>
  )
}
