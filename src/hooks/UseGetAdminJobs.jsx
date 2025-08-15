import context from '@/context/AppContext'
import { API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useContext, useEffect } from 'react'

const UseGetAdminJobs = () => {
    const { setAdminJobs } = useContext(context)
    useEffect(() => {
        const fatchAllJobs = async () => {
            try {
                const res = await axios.get(`${API_END_POINT}/job/admin`, { withCredentials: true })
                if (res.data.success) {
                    setAdminJobs(res.data.jobs)
                }

            } catch (error) {
                console.log(error?.response?.data?.message);
            }
        }
        fatchAllJobs()
    }, [])
}

export default UseGetAdminJobs