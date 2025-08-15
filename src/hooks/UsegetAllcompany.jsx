import context from '@/context/AppContext'
import { API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useContext, useEffect } from 'react'

const UsegetAllcompany = () => {
    const { setAllCompany } = useContext(context)
    useEffect(() => {
        const fatchAllCompany = async () => {
            try {
                const res = await axios.get(`${API_END_POINT}/company/mycompany`, { withCredentials: true })
                if (res.data.success) {
                    setAllCompany(res.data.companies)
                }

            } catch (error) {
                console.log(error?.response?.data?.message);
            }
        }
        fatchAllCompany()
    }, [])
}

export default UsegetAllcompany