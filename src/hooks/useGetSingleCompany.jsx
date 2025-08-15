import context from '@/context/AppContext'
import { API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { useContext, useEffect } from 'react'

const useGetSingleCompany = (id) => {
  const { setsingleCompany } = useContext(context)

  useEffect(() => {
    if (!id) return

    const fetchSingleCompany = async () => {
      try {
        const res = await axios.get(`${API_END_POINT}/company/${id}`, { withCredentials: true })
        if (res.data.success) {
          setsingleCompany(res.data.company)
        }
      } catch (error) {
        console.error(error?.response?.data?.message || 'Error fetching company')
      }
    }

    fetchSingleCompany()
  }, [id, setsingleCompany])
}

export default useGetSingleCompany
