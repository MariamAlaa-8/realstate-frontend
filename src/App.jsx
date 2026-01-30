import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Main from './Layouts/Main'
import Auth from './Layouts/Auth'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Requestrealestate from './Pages/Requestrealestate'
import Services from './Pages/Services'
import SearchRealEstate from './Pages/SearchRealEstate'
import ContractForm from './Pages/ContractFrom'
import SendContract from './Pages/SendContract'
import SecondPartyForm from './Pages/SecondPartyForm'
import NotFound from './Pages/NotFound'
import OptionalWill from './Pages/OptionalWill'
import Verification from './Pages/Verification'
import RealEstate from './Pages/RealEstate'
import PaymentPage from './Pages/PaymentPage'
import ForgotPassword from './Pages/ForgotPassword'


const router = createBrowserRouter([
  {
    path: '', element: <Main />, children: [
      { index: true, element: <Home /> },
      { path: 'profile', element: <Profile /> },
        { path: 'services', element: <Services/> },
      { path: 'requestrealestate', element: <Requestrealestate /> },
      { path: 'sarchRealEstate', element: <SearchRealEstate/> },
       { path: 'contractForm', element: <ContractForm/> },
        { path: 'sendContract', element: <SendContract/> },
         { path: 'secondPartyForm', element: <SecondPartyForm/>},
         { path: 'optionalWill', element: <OptionalWill/>},
          { path: 'login/verification', element: <Verification/>},
           { path: 'realEstate', element: <RealEstate/>},
            { path: 'paymentPage', element: <PaymentPage/>},
       { path: 'forgotPassword', element: <ForgotPassword/>},

    ]
  },
  {
    path: '', element: <Auth />, children: [
      { path: 'register', element: <Register /> },
      { path: 'login', element: <Login /> },
    ]
  },
   {
    path: '*',
    element: <NotFound/>
  }
])

export default function App() {
  return <>
    <RouterProvider router={router} />
  </>
}
