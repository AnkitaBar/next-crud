"use client";
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText
} from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";


const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }
    setIsDrawerOpen(open);
  };

  const drawerList = (
    <Box
      sx={{
        width: "100vw",
        maxWidth: "100vw",
        paddingTop: "10px",
        paddingBottom: "10px",
        boxSizing: "border-box",
        overflowX: "hidden"
      }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem>
          <Link href="/home" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemText primary="Home" />
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="/about"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemText primary="About" />
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="/cms/all-blogs"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemText primary="Blogs" />
          </Link>
        </ListItem>
        <ListItem>
          <Link
            href="/contact"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemText primary="Contact" />
          </Link>
        </ListItem>
        <ListItem>
          <Link href="/auth/login" style={{ textDecoration: "none", color: "inherit" }}>
            <ListItemText primary="LogIn" />
          </Link>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#5b636a" }}>
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <LocalLibraryIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            FrontEnd PathSala
          </Typography> */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Link
              href="/"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button color="inherit">Home</Button>
            </Link>
            <Link
              href="/about"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button color="inherit">About</Button>
            </Link>
            <Link
              href="/cms/all-blogs"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button color="inherit">Blogs</Button>
            </Link>
            <Link
              href="/contact"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <Button color="inherit">Contact</Button>
            </Link>
            <Link href="/auth/login" style={{ textDecoration: "none", color: "inherit" }}>
              <Button color="inherit">LogIn</Button>
            </Link>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={isDrawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  width: "100vw",
                  margin: 0,
                  padding: 0,
                  overflowX: "hidden"
                }
              }}
            >
              {drawerList}
            </Drawer>
          </Box>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <LocalLibraryIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            FrontEnd PathSala
          </Typography> */}
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;