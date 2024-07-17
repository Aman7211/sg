import React from 'react';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Product from './pages/Product';
import Admin from './pages/Admin';
import Bill from './pages/Bill';
import Login from './pages/Login';
import CustomerHome from './pages/CustomerHome';
import Admindetail from './components/Admindetail';
import Productdetail from './components/Productdetail';
import Employeeregister from './components/Employeeregister';
import Adminregister from './components/Adminregister';
import Addproduct from './components/Addproduct';
import Employeedetail from './components/Employeedetail';
import Editemployee from './components/Editemployee';
import Editadmin from './components/Editadmin';
import Editproduct from './components/Editproduct'

function App() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  console.log(token);

  return (
    <div className="flex">
      <Sidebar />
      <div className="lg:ml-64 mt-3">
      <Routes>
        {token ? (
        <Route path='/' element={<Home/>}/>
      ):( <Route path='/' element={<CustomerHome/>} />)}

      {role==='admin' ? (
        <>
       <Route path='/employee/register' element={<Employeeregister/>} />
       <Route path='/admin/register' element={<Adminregister/>} />
       <Route path='/addproducts' element={<Addproduct/>} />
       <Route path="/employeeview/:id" element={<Employeedetail/>} />
       <Route path='/employeeedit/:id' element={<Editemployee/>} />
       <Route path='/adminview/:id' element={<Admindetail/>} />
       <Route path='/productview/:id' element={<Productdetail/>} />
       <Route path='/editadmin/:id' element={<Editadmin/>} />
       <Route path='/bill/preview' element={<Bill/>}/>
       <Route path='/editproduct/:id'  element={<Editproduct/>}/>
       <Route path='/products' element={<Product/>}/>
        <Route path='/bill' element={<Bill/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/services' element={<Services/>}/>
        <Route path='/admin' element={<Admin/>}/>
       </>

      ):(<> <Route path='/products' element={<Product/>}/>
        <Route path='/bill' element={<Bill/>}/>
        <Route path='/login' element={<Login/>}/>
        </>
      )}
       
        
      
        {/* <Route path='/contact' element={<Contact/>}/> */}

       </Routes>
      </div>
    </div>
  );
}

export default App;
