import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { Link } from 'react-router-dom'

const AppliedJobs = ({ applications }) => {
  return (
    <div>
      <Table className="border-2">
        <TableCaption>Your Recent Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-bold">Date</TableHead>
            <TableHead className="font-bold">Job Role</TableHead>
            <TableHead className="font-bold">Company Name</TableHead>
            <TableHead className="font-bold">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.map((item) => (
            <TableRow key={item?._id || item?.job?._id}>
              <TableCell>
                {new Date(item?.createdAt).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
              </TableCell>
              <TableCell>
                <Link to={`/details/${item?.job?._id}`} className="text-blue-600 hover:underline">
                  {item?.job?.title}
                </Link>
              </TableCell>
              <TableCell>{item?.job?.companyId?.name}</TableCell>
              <TableCell>
                <Badge
                  className={
                    item?.status === 'accepted'
                      ? 'bg-green-600'
                      : item?.status === 'rejected'
                      ? 'bg-red-600'
                      : 'bg-gray-500'
                  }
                >
                  {item?.status?.charAt(0).toUpperCase() + item?.status?.slice(1)}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default AppliedJobs
