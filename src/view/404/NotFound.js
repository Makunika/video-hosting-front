import {Grid, Typography} from "@material-ui/core";
import React, {useEffect} from "react";
import Container from "@material-ui/core/Container";
import {makeStyles} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {useAuthDispatch, useAuthState} from "../../Context";
import {checkAuth} from "../../Context/actions";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    font: {
        fontSize: 50
    }
}));

function NotFound() {
    const classes = useStyles();
    const dispatch = useAuthDispatch();
    const userDetails = useAuthState();
    const auth = userDetails.token !== '';
    useEffect(() => checkAuth(dispatch), []);
    return (
        <Container maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h1" className={classes.font}>
                    Страница не найдена
                </Typography>
            </div>
        </Container>

    )
}

export default NotFound;