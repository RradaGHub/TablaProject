import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import SmartButtonIcon from "@mui/icons-material/SmartButton";

// import Page1 from "./Page1";

export const App = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleClickOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid>
        <Grid display="flex" justifyContent="center" alignItems="center">
          <Stack spacing={2}>
            <Page1 open={openModal} handleClose={handleCloseModal} />
            <Button variant="contained" onClick={handleClickOpenModal}>
              Ver Tabla
            </Button>
          </Stack>
        </Grid>
      </Grid>
        
    </Box>
  );
};
