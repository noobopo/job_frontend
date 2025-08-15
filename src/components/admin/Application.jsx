import React, { useContext, useEffect } from 'react'
import ApplicantsTable from './ApplicantsTable'
import { API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import context from '@/context/AppContext'

const Application = () => {
    const { setAllApplicants,allApplicants } = useContext(context)
    const { id } = useParams()
    useEffect(() => {
        const fatchAllApplicant = async () => {
            try {
                const res = await axios.get(`${API_END_POINT}/application/applicant/${id}`, { withCredentials: true })
                if (res.data.success) {
                    setAllApplicants(res.data.job)
                }

            } catch (error) {
                console.log(error);
            }
        }
        fatchAllApplicant()
    }, [])
    return (
        <div className=' w-full p-2 md:p-3 lg:max-w-7xl mx-auto my-10'>
            <h1 className=' text-xl font-bold'>Total Applicants ({allApplicants?.applications?.length})</h1>
            <div className=' my-5'>
                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Application