import React from "react";
import Popup from "./Modal.js";
import { Box, Container } from "@mui/material";

const App = () => {
  return (
    <Container
      maxWidth="lg"
      sx={{ paddingLeft: "0px !important", paddingRight: "0px !important" }}
    >
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Popup />
      </Box>
    </Container>
  );
};

export default App;
