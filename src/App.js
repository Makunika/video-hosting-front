import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import grey from "@material-ui/core/colors/grey";
import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import Video from "./view/video";
import HomePage from "./view/Home";
import PrimarySearchAppBar from "./components/Other/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";

const theme = createMuiTheme({
  palette: {
      primary: orange,
      secondary: grey,
      type: 'dark'
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920
    },
  }
});

const StyledContainer = withStyles({
    root: {
        marginTop: 12
    }
})(Container);



function App() {

  return (
      <ThemeProvider theme={theme}>
          <PrimarySearchAppBar />
          <StyledContainer maxWidth="lg">
              <Switch>
                  <Route path="/video/:videoToken" children={<Video />} />
                  <Route path="/" children={<HomePage />} />
              </Switch>
          </StyledContainer>
      </ThemeProvider>
  );
}

export default App;
