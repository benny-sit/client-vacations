import { Container } from "@mui/material";
import Box from "@mui/material/Box";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import SideNav from "./SideNav";
import Vacations from "./Vacations/Vacations";
import styles from "./dash.module.css";
import CssBaseline from "@mui/material/CssBaseline";

export default function Dash() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#F6FBF1",
        background: "url(/vacationBg.png) center top no-repeat, #F6FBF1",
      }}
    >
      <CssBaseline />
      <NavBar />
      {/* <Box sx={{
        position: 'absolute',
        placeSelf: 'center',
        overflow: 'hidden',
        width: '100%',
      }}>
        <img src='/vacationBg.png'/>
        </Box> */}
      <Container
        maxWidth="xl"
        sx={{
          display: "flex",
          flexGrow: 1,
          bgcolor: "rgba(255,255,255,0.5)",
          backdropFilter: "blur(20px)",
          boxShadow: "0px 0px 21px 7px rgba(255, 255, 255, 0.4)",
        }}
        disableGutters
      >
        <SideNav />
        <Outlet />
      </Container>
    </Box>
  );
}
