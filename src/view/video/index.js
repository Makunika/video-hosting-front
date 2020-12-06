import React from 'react';
import 'fontsource-roboto';
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import CardVideo from "../../components/video/CardVideo";
import CardComments from "../../components/video/CardComments";
import CardVideosPreview from "../../components/video/CardVideosPreview";
import {useParams} from "react-router-dom";
import PrimarySearchAppBar from "../../components/Other/AppBar";



function Video() {
    const { videoToken } = useParams();

    return (
        <Grid container spacing={4} justify="center">
            <Grid item lg={11} md={9} xs={12}>
                <CardVideo videoToken={videoToken} />
            </Grid>
            <Grid item xs={12} md={6} lg={7} sm={7}>
                <CardComments />
            </Grid>
            <Grid item xs={10} md={3} lg={4} sm={5}>
                <CardVideosPreview />
            </Grid>
        </Grid>
    );
}

export default Video;