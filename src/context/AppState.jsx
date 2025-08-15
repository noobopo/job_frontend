import React, { useEffect, useState } from 'react'
import AppContext from './AppContext'

const AppState = ({ children }) => {
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("user")) || null
        } catch {
            return null
        }
    })

    const [allJobs, setAllJobs] = useState([])
    const [singleJob, setsingleJob] = useState({})
    const [singleCompany, setsingleCompany] = useState({})
    const [allCompany, setAllCompany] = useState([]);
    const [adminJobs, setAdminJobs] = useState([]);
    const [CompanySearch, setCompanySearch] = useState('');
    const [jobSearchText, setJobSearchText] = useState('');
    const [allApplicants, setAllApplicants] = useState([]);
    const [normalSearch, setNormalSearch] = useState('');

    
    
    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user))
        } else {
            localStorage.removeItem("user")
        }
    }, [user])

    return (
        <AppContext.Provider
            value={{ loading,allApplicants,normalSearch, setNormalSearch, setAllApplicants, setLoading, user, setUser, allJobs,adminJobs,jobSearchText, setJobSearchText, setAdminJobs, setAllJobs, singleJob,allCompany,CompanySearch, setCompanySearch, setAllCompany, setsingleJob, singleCompany, setsingleCompany }}
        >
            {children}
        </AppContext.Provider>
    )
}

export default AppState
