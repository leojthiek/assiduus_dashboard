import { Chip, Grid, Stack, styled } from "@mui/material"
import React, { useState } from "react"
import MainLeft from "./MainLeft"
import DashboardIcon from "@mui/icons-material/Dashboard"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet"
import DescriptionIcon from "@mui/icons-material/Description"
import PersonIcon from "@mui/icons-material/Person"
import ContactsIcon from "@mui/icons-material/Contacts"
import MainRight from "./MainRight"

const LeftGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}))

const MenuItem = styled(Grid)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "10px",
    paddingBottom: "10px",
  },
}))

const menuItems = [
  { icon: <DashboardIcon />, text: "Dashboard" },
  { icon: <AttachMoneyIcon />, text: "Payroll" },
  { icon: <AccountBalanceWalletIcon />, text: "Account" },
  { icon: <DescriptionIcon />, text: "Reports" },
  { icon: <PersonIcon />, text: "Advisor" },
  { icon: <ContactsIcon />, text: "Contacts" },
]

export default function Main() {
  const [selectedItem, setSelectedItem] = useState(0) 

  const handleItemClick = (index) => {
    setSelectedItem(index)
  }

  return (
    <Grid container>
      <MenuItem>
        <Stack
          direction='row'
          sx={{ flexWrap: "wrap", display: "flex", gap: "10px" }}
        >
          {menuItems.map((item, index) => (
            <Chip
              key={index}
              label={item.text}
              onClick={() => handleItemClick(index)}
              sx={{
                backgroundColor:
                  selectedItem === index ? "lightblue" : "transparent",
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                paddingBottom: "2px",
              }}
            />
          ))}
        </Stack>
      </MenuItem>
      <LeftGrid item md={2} sx={{ backgroundColor: "white" }}>
        <MainLeft
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          menuItems={menuItems}
        />
      </LeftGrid>
      <Grid item xs={12} sm={12} md={10} sx={{ backgroundColor: "#f0e5e4" }}>
         <MainRight/>
      </Grid>
    </Grid>
  )
}
