import React, { useContext, useEffect,useReducer} from 'react'
import ProductContext from '../Context/Product/ProductContext'
import { Link } from 'react-router-dom';
import {useNavigate } from 'react-router-dom';
import {Route } from 'react-router-dom';
import Login from './Login';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import getCookie from '../hooks/getcookies';

export default function Home(props) {
    const {showalert}=props;
    const navigate=useNavigate();
    const context = useContext(ProductContext)
    const {products,Getproduct} = context;
  
    // const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

    const token=getCookie("token");
    const location = useLocation()
    useEffect(() => {    
       if (token) {
        Getproduct();
       }
       else{
         navigate("/login")
       }    
    //   forceUpdate();
    },[]);
  
    const DeleteNote =async (id) => {
        const token=getCookie("token");
        const response = await fetch(`https://localhost:7118/api/Product/`+id ,{
        // call Api
          method: "Delete", 
           headers: {
             "Content-Type": "application/json",
             'Authorization': `Bearer ${token}`
              },
        });
            Getproduct(token);
        } 
    const handleUpdateClick = (productId) => {
    navigate(`/update/${productId}`);
  };

    return (
  
        <>
        <h1>Get Product</h1>

       <Link to="/add"><i className="fa fa-thumbs-up my-5" style={{ color:'Green',}}></i></Link>

        <div className="conatiner">
            <table className="table table-borderd">
                <thead>
                    <tr>
                        <th scope="col">Id</th>
                        <th scope="col">ProducctName</th>
                        <th scope="col">CategoryName</th>
                        <th scope="col">SupplierName</th>
                        <th scope="col">Image</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((pro) =>
                        <tr key={pro.ProductId}>
                            <td>{pro.ProductId}</td>
                            <td>{pro.ProductName}</td>
                            <td>{pro.CategoryName}</td>
                            <td>{pro.SupplierName}</td>
                            <td>
                                {pro.ImageFiles.length > 0 && (
                                    <img
                                        src={`https://localhost:7118/projectimage/Image/${pro.ImageFiles[0].ImagePath}`}
                                        alt={pro.ImageFiles[0].ImagePath}
                                        style={{ width: '30px' }}
                                    />
                                )}

                            </td>
                          <td><i className="fa fa-trash" style={{ width:"100px", color:'red',}} onClick={() =>{if(window.confirm('Are you sure to delete this record?')){DeleteNote(pro.ProductId)}}}></i></td>
                          <td><i className="fa fa-pencil"  style={{ width:"100px",color:'green',}} onClick={() => handleUpdateClick(pro.ProductId)}></i></td>
                        </tr>
                    )}
                
                </tbody>
            </table>

        </div>
        </>
       
    )
}
