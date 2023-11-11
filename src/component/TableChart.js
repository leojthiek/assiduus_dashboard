import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { dummyData } from '../data/data'



export default function TableChart({selectedMonth}) {

const TableData = dummyData.find((e)=> e.month === selectedMonth)



const {account} = TableData


  return (
    <Box>
       <TableContainer  sx={{overflowX:"auto"}}>
         <Table>
            <TableHead>
                <TableRow>
                    <TableCell sx={{fontSize:"12px",fontWeight:"600",borderBottom:"none",color:"gray"}}>Account</TableCell>
                    <TableCell sx={{borderBottom:"none",fontSize:"12px",fontWeight:"600",color:"gray"}}>This Month</TableCell>
                    <TableCell sx={{borderBottom:"none",fontSize:"12px",fontWeight:"600",color:"gray"}}>YTD</TableCell>
                </TableRow>
            </TableHead>
            {account.map((data,index)=>(
            <TableBody key={index}>
              <TableRow>
                <TableCell sx={{borderBottom:"none",fontSize:"14px",color:"black", fontWeight:"600"}}>{data.name}</TableCell>
                <TableCell sx={{borderBottom:"none",fontSize:"14px",color:"black", fontWeight:"600"}}>{data.amount.toLocaleString()}</TableCell>
                <TableCell sx={{borderBottom:"none",fontSize:"14px",color:"black", fontWeight:"600"}}>{data.YTD.toLocaleString()}</TableCell>
             </TableRow>
            </TableBody>
            ))}
           
         </Table>
       </TableContainer>
    </Box>
  )
}
