import React, { useContext, useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Edit } from 'lucide-react'
import context from '@/context/AppContext'
import { useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const CompanyTable = () => {
    const { allCompany, CompanySearch } = useContext(context)
    const [filterCompany, setFilterCompany] = useState(allCompany)
    const navigate = useNavigate()

    useEffect(() => {
        if (!allCompany) return

        const searchTerm = CompanySearch?.toLowerCase() || ''
        const filtered = allCompany.filter(company =>
            !searchTerm || company?.name?.toLowerCase().includes(searchTerm)
        )

        setFilterCompany(filtered)
    }, [CompanySearch, allCompany])

    return (
        <div>
            <Table>
                <TableCaption>List of your registered companies</TableCaption>
                <TableHeader className={'bg-gray-50'}>
                    <TableRow>
                        <TableHead className={'text-left'}>Logo</TableHead>
                        <TableHead className={'text-center'}>Name</TableHead>
                        <TableHead className={'text-center'}>Date</TableHead>
                        <TableHead className={'text-right'}>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.length > 0 ? (
                        filterCompany.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={item.logo || 'https://www.designyourway.net/blog/wp-content/uploads/2019/03/HP-logo.jpg'} />
                                    </Avatar>
                                </TableCell>
                                <TableCell className='text-center' >{item.name}</TableCell>
                                <TableCell className='text-center' >{new Date(item.createdAt).toUTCString().slice(0, 16)}</TableCell>
                                <TableCell className='text-right' >
                                <Button onClick={()=>navigate(`/admin/company/${item._id}`)} >
                                    <Edit className="cursor-pointer" />
                                </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                No company found
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default CompanyTable
