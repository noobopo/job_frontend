import React, { useContext, useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Edit, Eye, MoreHorizontal } from 'lucide-react'
import context from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
// import { Popover, PopoverContent } from '@radix-ui/react-popover'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'

const JobTable = () => {
    const { adminJobs, jobSearchText } = useContext(context)
    const [filterJobs, setFilterJobs] = useState(adminJobs)
    const navigate = useNavigate()

    useEffect(() => {
        if (!adminJobs) return
        const searchTerm = jobSearchText?.toLowerCase() || ''
        const filtered = adminJobs.filter(job => {
            const companyName = job?.companyId?.name?.toLowerCase() || ''
            const jobTitle = job?.title?.toLowerCase() || ''
            return !searchTerm || companyName.includes(searchTerm) || jobTitle.includes(searchTerm)
        })

        setFilterJobs(filtered)
    }, [adminJobs, jobSearchText])

    return (
        <div>
            <Table>
                <TableCaption>List of your Posted Jobs</TableCaption>
                <TableHeader>
                    <TableRow className={'bg-amber-100'}>
                        <TableHead >Company</TableHead>
                        <TableHead >Role</TableHead>
                        <TableHead className={'text-center'}>Date</TableHead>
                        <TableHead className={'text-right'}>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterJobs?.length > 0 ? (
                        filterJobs.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item?.companyId?.name}</TableCell>
                                <TableCell>{item?.title}</TableCell>
                                <TableCell className='text-center'>{new Date(item.createdAt).toUTCString().slice(0, 16)}</TableCell>
                                <TableCell className='text-right' >
                                    <Popover>
                                        <PopoverTrigger>
                                        <MoreHorizontal />
                                        </PopoverTrigger>
                                            <PopoverContent className='w-42'>
                                                <Button variant='link' className={'hover:text-orange-500 text-lg flex items-center gap-2'}><Edit /> <span>Edit</span></Button>
                                                <Button variant='link' className={'hover:text-orange-500 flex gap-2 text-lg items-center'} onClick={() => navigate(`/admin/job/application/${item._id}`)} >
                                                    <Eye className="cursor-pointer" />
                                                    <span>Applicants</span>
                                                </Button>
                                            </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No Job found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default JobTable
