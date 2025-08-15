import React, { useContext } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import context from '@/context/AppContext'
import { API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import toast from 'react-hot-toast'


const ApplicantsTable = () => {
    let status = ["Accepted", 'Rejected']
    const { allApplicants } = useContext(context)

    const handleStatus = async (status, id) => {
        try {
            axios.defaults.withCredentials = true
            const res = await axios.post(`${API_END_POINT}/application/update/${id}`, { status }, { withCredentials: true })
            
            if (res.data.success) {
                toast.success(res.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Table className={' border-2 rounded-md overflow-hidden'}>
                <TableCaption>List of applicants</TableCaption>
                <TableHeader>
                    <TableRow className={' bg-gray-100'}>
                        <TableHead className={'text-left font-medium'}>Full Name</TableHead>
                        <TableHead className={' text-center font-medium'}>Email</TableHead>
                        <TableHead className={' text-center font-medium'}>Contact</TableHead>
                        <TableHead className={' text-center font-medium'}>Reasume</TableHead>
                        <TableHead className={'text-right font-medium'}>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        allApplicants?.applications?.map((item) =>
                            <TableRow key={item._id}>
                                <TableCell>{item?.applicant?.fullName}</TableCell>
                                <TableCell className={'text-center'}>{item?.applicant?.email}</TableCell>
                                <TableCell className={'text-center'}>{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell className={'text-center'}>{!item?.applicant?.profile?.reasume ? 'No Reasume' : (<a className='text-blue-500 hover:underline' href={item?.applicant?.profile?.reasume}>{item?.applicant?.profile?.reasumeName}</a>)} </TableCell>
                                <TableCell className={'text-right'}>
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className=' cursor-pointer' />
                                        </PopoverTrigger>
                                        <PopoverContent className={'w-28 cursor-pointer flex flex-col gap-2'}>
                                            {
                                                status.map((st, index) =>
                                                    <div onClick={()=>handleStatus(st,item?._id)} key={index}>
                                                        <span className='my-5 hover:text-orange-500'>{st}</span>
                                                    </div>
                                                )
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>

                        )
                    }

                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable