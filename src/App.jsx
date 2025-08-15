import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/auth/Login'
import SignUp from './components/auth/SignUp'
import Home from './components/Home'
import Navbar from './components/shared/Navbar'
import { Toaster } from 'react-hot-toast'
import Jobs from './components/Jobs'
import Browser from './components/Browser'
import Profile from './components/Profile'
import JobDetails from './components/JobDetails'
import Company from './components/admin/Company'
import CreateCompany from './components/admin/CreateCompany'
import EditCompany from './components/admin/EditCompany'
import AdminJobs from './components/admin/AdminJobs'
import CreateJob from './components/admin/CreateJob'
import Application from './components/admin/Application'
import ProtectedRout from './components/admin/protectedRout'


const App = () => {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/jobs' element={<Jobs />} />
        <Route path='details/:id' element={<JobDetails />} />
        <Route path='/browse' element={<Browser />} />
        <Route path='/profile' element={<Profile />} />
        {/* admin  */}
        <Route path='/admin/company' element={<ProtectedRout><Company /></ProtectedRout>} />
        <Route path='/admin/job' element={<ProtectedRout><AdminJobs /></ProtectedRout>} />
        <Route path='/admin/job/application/:id' element={<ProtectedRout><Application /></ProtectedRout>} />
        <Route path='/admin/job/create' element={<ProtectedRout><CreateJob /></ProtectedRout>} />
        <Route path='/admin/company/create' element={<ProtectedRout><CreateCompany /></ProtectedRout>} />
        <Route path='/admin/company/:id' element={<ProtectedRout><EditCompany /></ProtectedRout>} />

      </Routes>
    </BrowserRouter>
  )
}

export default App