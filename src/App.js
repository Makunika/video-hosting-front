import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import grey from "@material-ui/core/colors/grey";
import React from "react";
import {Link, Route, Switch} from "react-router-dom";
import Video from "./view/video";

const theme = createMuiTheme({
  palette: {
    primary: orange,
    secondary: grey
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



function App() {

  return (
      <ThemeProvider theme={theme}>
        <Link to="/video/f6d7692a-c4a8-4489-a408-b93b9ad75e39">Первое видео</Link>
        <Switch>
          <Route path="/video/:videoToken" children={<Video />} />
        </Switch>
      </ThemeProvider>
  );
}

export default App;
