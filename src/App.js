import {createMuiTheme, ThemeProvider} from "@material-ui/core/styles";
import orange from "@material-ui/core/colors/orange";
import grey from "@material-ui/core/colors/grey";
import React from "react";
import {Route, Switch} from "react-router-dom";
import Video from "./view/video";
import HomePage from "./view/Home";
import PrimarySearchAppBar from "./components/Other/AppBar";
import withStyles from "@material-ui/core/styles/withStyles";
import Container from "@material-ui/core/Container";
import AuthPage from "./view/Auth";
import NotFound from "./view/404/NotFound";
import {AuthProvider, useAuthState} from "./Context";
import {SnackbarProvider} from "notistack";
import Reset from "./view/Reset";
import Profile from "./view/Profile";
import * as locales from '@material-ui/core/locale';
import NewVideo from "./view/NewVideo";

const theme = createMuiTheme({
  palette: {
      primary: orange,
      secondary: grey,
      info: grey,
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
}, locales['ruRU']);

const StyledContainer = withStyles({
    root: {
        marginTop: 12
    }
})(Container);


function Routing() {
    const userDetails = useAuthState();
    const auth = userDetails.token !== '';

    return (
        <Switch>
            <Route path="/video/:videoToken" children={<Video />} />
            <Route exact path="/" children={<HomePage />} />
            {
                !auth && <Route path="/auth" children={<AuthPage />} />
            }
            {
                !auth && <Route path="/reset" children={<Reset />} />
            }
            {
                auth && <Route path="/profile" children={<Profile />} />
            }
            {
                auth && <Route path="/new" children={<NewVideo />} />
            }
            <Route children={<NotFound />} />
        </Switch>
    )
}


function App() {

    return (
        <AuthProvider>
            <ThemeProvider theme={theme}>
                <SnackbarProvider maxSnack={3}>
                    <PrimarySearchAppBar />
                    <StyledContainer maxWidth="lg">
                        <Routing />
                    </StyledContainer>
                </SnackbarProvider>
            </ThemeProvider>
        </AuthProvider>
    );
}

export default App;
