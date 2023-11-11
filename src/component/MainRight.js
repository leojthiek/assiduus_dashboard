import {
  AppBar,
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material"
import React from "react"
import SimpleLineChart from "./LineChar"
import BarChart from "./BarChart"
import TableChart from "./TableChart"
import CashFlowChart from "./CashFlowChart"
import CreateNewInvoice from "./CreateNewInvoice"

const monthList = [
  { month: "January" },
  { month: "February" },
  { month: "March" },
  { month: "April" },
  { month: "May" },
  { month: "June" },
  { month: "July" },
  { month: "August" },
  { month: "September" },
  { month: "October" },
  { month: "November" },
  { month: "December" },
]

const manageList = [
  { name: "Profit", value: "profit" },
  { name: "Expense", value: "expense" },
  { name: "Income", value: "income" },
]

export default function MainRight() {
  const [manage, setManage] = React.useState("profit")
  const [selectedMonth, setSelectedMonth] = React.useState("January")
  const [open,setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true);
  };

  

  return (
    <>
      <Box sx={{ paddingTop: "40px", paddingBottom: "30px" }}>
        <Grid
          container
          sx={{ display: "flex", justifyContent: "space-evenly", rowGap: 4 }}
        >
          <Grid
            item
            md={5.5}
            sm={12}
            xs={12}
            sx={{ height: "400px", backgroundColor: "white" }}
          >
            <AppBar sx={{ backgroundColor: "white", position: "static" }}>
              <Toolbar
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <Typography sx={{ color: "black", fontWeight: "700" }}>
                    Checking account
                  </Typography>
                </Box>
                <Box>
                  <FormControl sx={{ m: 1, minWidth: 40 }}>
                    <Select
                      value={manage}
                      displayEmpty
                      onChange={(e) => setManage(e.target.value)}
                      sx={{
                        fontSize: "12px",
                        height: "35px",
                        fontWeight: "600",
                      }}
                    >
                      {manageList.map((data, index) => (
                        <MenuItem key={index} value={data.value}>
                          {data.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ m: 1, minWidth: 40 }}>
                    <Select
                      value={selectedMonth}
                      displayEmpty
                      onChange={(e) => setSelectedMonth(e.target.value)}
                      sx={{
                        fontSize: "12px",
                        height: "35px",
                        fontWeight: "600",
                      }}
                    >
                      {monthList.map((data, index) => (
                        <MenuItem key={index} value={data.month}>
                          {data.month}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </Toolbar>
            </AppBar>
            <Box sx={{ paddingTop: "40px" }}>
              <SimpleLineChart selectedMonth={selectedMonth} manage={manage}/>
            </Box>
          </Grid>
          <Grid item md={5.5} sm={12} xs={12} sx={{ backgroundColor: "white" }}>
            <AppBar position='static' sx={{ backgroundColor: "white" }}>
              <Toolbar
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <Typography sx={{ color: "black", fontWeight: "700" }}>
                    Invoices owed to you
                  </Typography>
                </Box>
                <Box>
                  <Button
                    sx={{
                      backgroundColor: "rgba(169, 169, 169, 0.5)",
                      fontFamily: "sans-serif",
                      fontSize: "12px",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                      color: "green",
                    }}
                    onClick={handleClickOpen}
                  >
                    New Sales Invoices
                  </Button>
                </Box>
              </Toolbar>
            </AppBar>
            <Box sx={{ paddingTop: "30px" }}>
              <BarChart selectedMonth={selectedMonth}/>
            </Box>
          </Grid>
          <Grid item md={5.5} sm={12} xs={12} sx={{ backgroundColor: "white" }}>
            <AppBar position='static' sx={{ backgroundColor: "white" }}>
              <Toolbar
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <Typography sx={{ color: "black", fontWeight: "700" }}>
                    Total cash flow
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "15px" }}>
                  <Box sx={{ display: "flex", gap: "8px", alignItems:"center"}}>
                    <Box
                      sx={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: "blue",
                        borderRadius: "5px",
                      }}
                    ></Box>
                    <Typography sx={{ color: "black", fontSize:"12px",fontWeight:"600" }}>In</Typography>
                  </Box>
                  <Box sx={{ display: "flex", gap: "8px",alignItems:"center" }}>
                    <Box
                      sx={{
                        width: "16px",
                        height: "16px",
                        backgroundColor: "green",
                        borderRadius: "5px",
                      }}
                    ></Box>
                    <Typography sx={{ color: "black", fontSize:"12px",fontWeight:"600" }}>Out</Typography>
                  </Box>
                </Box>
              </Toolbar>
            </AppBar>
            <Box sx={{ paddingTop: "30px" }}>
              <CashFlowChart  selectedMonth={selectedMonth}/>
            </Box>
          </Grid>
          <Grid
            item
            md={5.5}
            sm={12}
            xs={12}
            sx={{ backgroundColor: "white", position: "static" }}
          >
            <AppBar position='static' sx={{ backgroundColor: "white" }}>
              <Toolbar
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Box>
                  <Typography sx={{ color: "black", fontWeight: "700" }}>
                    Account watchlist
                  </Typography>
                </Box>
              </Toolbar>
            </AppBar>
            <Box sx={{ paddingTop: "10px" }}>
              <TableChart selectedMonth={selectedMonth}/>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
         {open ? <CreateNewInvoice setOpen={setOpen} open={open}/> : ""}
      </Box>
    </>
  )
}
