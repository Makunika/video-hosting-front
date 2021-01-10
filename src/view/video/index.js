import React, {useEffect} from 'react';
import 'fontsource-roboto';
import Grid from "@material-ui/core/Grid";
import CardVideo from "../../components/video/CardVideo";
import CardComments from "../../components/video/CardComments";
import CardVideosPreview from "../../components/video/CardVideosPreview";
import {useParams} from "react-router-dom";
import {useAuthDispatch, useAuthState} from "../../Context";
import {checkAuth} from "../../Context/actions";


function Video() {
    const { videoToken } = useParams();
    const dispatch = useAuthDispatch();
    const userDetails = useAuthState();
    const auth = userDetails.token !== '';
    useEffect(() => checkAuth(dispatch), []);
    return (
        <Grid container spacing={4} justify="center">
            <Grid item lg={11} md={9} xs={12}>
                <CardVideo videoToken={videoToken} />
            </Grid>
            <Grid item xs={12} md={6} lg={7} sm={7}>
                <CardComments isAdmin={userDetails.user.isAdmin === true} videoId={videoToken} userId={userDetails.user.id} auth={auth} />
            </Grid>
            <Grid item xs={10} md={3} lg={4} sm={5}>
                <CardVideosPreview />
            </Grid>
        </Grid>
    );
}

export default Video;