"use client";
import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Button,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery,
  Switch,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import Link from "next/link";
import SearchTool from "../Tools/SearchTool";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const pages = [
    { id: 1, name: "Home", link: "/" },
    { id: 2, name: "Meal List", link: "/meals" },
  ];

  const authLink = user
    ? { id: 4, name: user.name, link: "/mypage" }
    : { id: 3, name: "Login", link: "/login" };

  const toggleDrawer = (state) => () => setOpen(state);

  return (
    <Box sx={{ height: "64px" }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          color: "#1a1a1a",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 8 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <RestaurantMenuIcon />
            <Typography variant="h6">Meal Sharing</Typography>
          </Box>

          {!isMobile ? (
            <Box
              sx={{
                display: "flex",
                gap: 2,
                alignItems: "center",
              }}
            >
              {[...pages, authLink].map((page) => (
                <Link key={page.id} href={page.link}>
                  <Button
                    sx={{
                      color: "#1a1a1a",
                      fontWeight: 500,
                      textTransform: "none",
                      "&:hover": {
                        color: "#5a8f75",
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {page.name}
                  </Button>
                </Link>
              ))}

              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                color="default"
              />
              <SearchTool />
            </Box>
          ) : (
            <>
              <IconButton color="inherit" onClick={toggleDrawer(true)}>
                <MenuIcon />
              </IconButton>
              <SwipeableDrawer
                anchor="top"
                open={open}
                onOpen={toggleDrawer(true)}
                onClose={toggleDrawer(false)}
                PaperProps={{
                  sx: {
                    zIndex: (theme) => theme.zIndex.appBar + 1,
                    paddingTop: "64px",
                  },
                }}
              >
                <List>
                  {[...pages, authLink].map((page) => (
                    <ListItem
                      key={page.id}
                      onClick={toggleDrawer(false)}
                      component="a"
                      href={page.link}
                      sx={{
                        color: "#1a1a1a",
                        fontWeight: 500,
                        "&:hover": { color: "#5a8f75" },
                      }}
                    >
                      <ListItemText primary={page.name} />
                    </ListItem>
                  ))}
                  <Divider />
                  <Box sx={{ px: 2, py: 1 }}>
                    <SearchTool showButton={true} />
                  </Box>
                  <ListItem>
                    <Typography variant="body2">Dark Mode</Typography>
                    <Switch
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                      color="default"
                    />
                  </ListItem>
                </List>
              </SwipeableDrawer>
            </>
          )}
        </Toolbar>
        <Divider sx={{ borderColor: "#e0e0e0", mt: 0 }} />
      </AppBar>
    </Box>
  );
}
