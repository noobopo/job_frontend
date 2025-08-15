import { useContext, useEffect } from "react"
import context from "@/context/AppContext"
import { useNavigate } from "react-router-dom"

const ProtectedRout = ({ children }) => {
    const { user } = useContext(context)
    const navigate = useNavigate()
    useEffect(() => {
        if (user === null || user.role !== 'recruiter') {
            navigate('/')
        }
    }, [])

    return (
        <>
            {children}
        </>
    )

}
export default ProtectedRout

