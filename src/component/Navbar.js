import React, { useState } from "react"
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Container,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  styled,
} from "@mui/material"
import NotificationsIcon from "@mui/icons-material/Notifications"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown"
import SearchIcon from "@mui/icons-material/Search"
import MenuIcon from "@mui/icons-material/Menu"

const Firstbox = styled(Box)(({ theme }) => ({
  width: "190px",

  [theme.breakpoints.down("sm")]: {
    width: "140px",
  },
}))

const SecondBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "30px",
  alignItems: "center",
  position: "relative",

  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}))

const MenuBar = styled(Box)(({ theme }) => ({
  display: "none",

  [theme.breakpoints.down("md")]: {
    display: "block",
  },
}))

export default function Navbar() {
  const [openRightDrawer, setOpenRightDrawer] = useState(false)

  const handleRightDrawer = () => {
    setOpenRightDrawer(!openRightDrawer)
  }

  const list = (
    <Box sx={{ width: 270, paddingTop: "40px" }} role='presentation'>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "0 16px",
          marginBottom: "16px",
        }}
      >
        <SearchIcon sx={{ marginRight: "8px", color: "black" }} />
        <InputBase
          sx={{
            paddingLeft: "40px",
            width: "100%",
            backgroundColor: "#f0e5e4",
          }} 
          placeholder='Search'
        />
      </Box>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Badge color='secondary' variant='dot'>
                <NotificationsIcon />
              </Badge>
            </ListItemIcon>
            <ListItemText primary='Notifications' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Avatar
                src='manager.jpg'
                sx={{ width: "28px", height: "28px" }}
              />
            </ListItemIcon>
            <ListItemText primary='Profile' />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <>
      <AppBar
        sx={{ bgcolor: "white" }}
        position='sticky'
      >
        <Container maxWidth={"xxl"}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Firstbox>
              <img
                src='https://www.assiduusglobal.com/images/assiduus-logo-dark.webp'
                style={{ width: "100%" }}
                alt='Assiduus Logo'
              />
            </Firstbox>
            <SecondBox>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "5px",
                  background: "#f0e5e4",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <IconButton sx={{ position: "absolute", left: 5 }}>
                  <SearchIcon />
                </IconButton>
                <InputBase style={{ paddingLeft: "40px", width: "100%" }} />
              </Box>
              <Box>
                <Badge color='primary' variant='dot'>
                  <NotificationsIcon sx={{ color: "black" }} />
                </Badge>
              </Box>
              <Avatar src='manager.jpg' />
              <IconButton>
                <ArrowDropDownIcon sx={{ color: "black" }} />
              </IconButton>
            </SecondBox>
            <MenuBar>
              <IconButton onClick={handleRightDrawer}>
                <MenuIcon sx={{ color: "black" }} />
              </IconButton>
            </MenuBar>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer anchor='right' open={openRightDrawer} onClose={handleRightDrawer}>
        {list}
      </Drawer>
    </>
  )
}
