import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Paper,
  ThemeProvider,
  Container,
} from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme();

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <Paper
      elevation={0}
      style={{ padding: 0, margin: 0, backgroundColor: "#fafafa" }}
    >
      <AppBar color="primary" position="static" style={{ height: 64 }}>
        <Container>
          <Toolbar style={{ height: 64 }}>
            <Typography color="inherit">TODO LIST</Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>{children}</Container>
    </Paper>
  </ThemeProvider>
);

export default Layout;
