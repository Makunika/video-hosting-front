import {useAuthDispatch} from "../../Context";
import React, {useEffect} from "react";
import {checkAuth} from "../../Context/actions";
import {Button, ButtonGroup, Container, Grid, makeStyles, Typography} from "@material-ui/core";
import CssBaseline from "@material-ui/core/CssBaseline";
import EnhancedTable from "../../components/Profile/TableVideos";
import EditProfile from "../../components/Profile/EditProfile";
import {useHistory} from "react-router";


const useStyle = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2)
    },
    headers: {
        marginBottom: theme.spacing(2)
    },
    addVideo: {
        marginBottom: theme.spacing(2),
        display: 'flex',
        alignItems: "center",
        justifyContent: 'space-between'
    }
}));

export default function Profile() {
    const classes = useStyle();
    const dispatch = useAuthDispatch();
    const history = useHistory();
    useEffect(() => checkAuth(dispatch), []);

    const handleEditProfile = () => {

    }

    return (
        <Container maxWidth="lg">
            <CssBaseline />
            <Grid container className={classes.paper} spacing={4}>
                <Grid item xs={12}>
                    <Typography variant="h4" className={classes.headers}>
                        Ваш профиль
                    </Typography>
                    <EditProfile />
                </Grid>
                <Grid item xs={12}>
                    <div className={classes.addVideo}>
                        <Typography variant="h4">
                            Ваши видео
                        </Typography>
                        <Button color="primary" variant="text" onClick={() => history.push("/new")}>Добавить видео</Button>
                    </div>
                    <EnhancedTable />
                </Grid>
            </Grid>
        </Container>
    )
}