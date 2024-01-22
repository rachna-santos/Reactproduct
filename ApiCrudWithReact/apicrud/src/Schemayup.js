import axios from 'axios';
import * as Yup from 'yup';
import getCookie from './hooks/getcookies';



export const YupSchema = Yup.object().shape({
  Email: Yup.string().test('unique-Email', 'Email is already Exists', async function (email,ProductState) {  
    try {
      const response = await axios.post('https://localhost:7118/api/Account/register', {
        Email: email,
        UserName: ProductState.parent.UserName,
        Password: ProductState.parent.Password,
        ConfirmPassword: ProductState.parent.ConfirmPassword,
        Name: ProductState.parent.Name,
      });
      console.log(response);
      return response.data && !response.data.exists;
    } catch (error) {
      return false;
    }
  })
})
const authToken ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiZmFraGlyQGdtYWlsLmNvbSIsImp0aSI6ImMyOGVjOTkwLWE1MWUtNGU0MS05ZGNlLWEyNmIyNGEyM2JmMSIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluIiwiZXhwIjoxNzA0MDQ5NTY4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjcxMTgiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjcxMTgifQ.BPIbMqtzIzfhj1crbg806DFXWkKXoMsLQ8Ju2Cf1leg"

export const YupAdd = Yup.object().shape({
  ProductName: Yup.string().test('unique-ProductName', 'ProductName is already exists', async function (productname,formValues,) {
   
    try {
      console.log('CategoryId:', formValues.CategoryId);
      console.log('FormValues:', formValues);

      const formData = new FormData();
      formData.append('ProductName', productname);
      formData.append('CategoryId', formValues.CategoryId);
      formData.append('SupplierId', parseInt(formValues.SupplierId, 10));
      if (Array.isArray(formValues.ImageFiles) && formValues.ImageFiles.length > 0) {
        for (let i = 0; i < formValues.ImageFiles.length; i++) {
          formData.append(`ImageFiles[${i}]`, formValues.ImageFiles[i]);
        }
      }

      console.log('FormData:', formData);


      const response = await axios.post('https://localhost:7118/api/Product/CreateProduct', formData, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
        },
      });

      console.log('Response:', response);

      if (response.data && response.data.exists) {
        // Product already exists, set the error message
        throw new Yup.ValidationError('ProductName is already exists', productname, 'ProductName');
      }

      // Product doesn't exist, return true to allow form submission
      return true;
    } catch (error) {
      console.error('Error from server:', error.response ? error.response.data : error.message);

      // Handle the error, including displaying error messages to the user
      return false;
    }
  }),
});


// export const Schemeyup=Yup.object({
//     Email:Yup.string().matches(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Incorrect email").required("Email is required"),
//     Password:Yup.string()
//     .matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[^\w\s]).{8,}$/,"Incorrect password").required("password is required"),
// })
// export const Schemeproduct=Yup.object({
//     ProductName:Yup.string().matches(/^[a-zA-Z '.-]*$/,"only alphabet character").test('unique-Product', 'ProductName is already Exists', async function (ProductName, ProductState) {
   
//       if (!ProductName) {
//           return true; 
//         }
//         try {
//           const response = await axios.post('https://localhost:7118/api/Product/CreateProduct', {
//             ProductName: ProductName,
//             CategoryId: ProductState.parent.CategoryId,
//             SupplierId: ProductState.parent.SupplierId,
//             ImageFiles: ProductState.parent.ImageFiles,
//           });
//           console.log(response);
//           return response.data && !response.data.exists;
//         } catch (error) {
//           return false;
//         }
//       })
//       .required("ProductName is required"),
//     CategoryName:Yup.string().required("Select list is required"),
//     SupplierName:Yup.string().required("Select list is required"),
// })


 export const SchemeRole=Yup.object({
  
 roleName:Yup.string().test('unique-Role', 'Role is already Exists', async function (role) {
     try {
       const response = await axios.post('https://localhost:7118/api/Admin', {
         roleName: role,
       });
       console.log(response);
       return response.data && !response.data.exists;
     } catch (error) {
       return false;
     }
   })
 })

