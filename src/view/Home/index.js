import Container from "@material-ui/core/Container";
import React, {useEffect} from "react";
import CardVideos from "../../components/Home/CardVideos";
import PrimarySearchAppBar from "../../components/Other/AppBar";
import {useAuthDispatch, useAuthState} from "../../Context";
import {checkAuth} from "../../Context/actions";





function HomePage() {
    const dispatch = useAuthDispatch();
    useEffect(() => checkAuth(dispatch), []);
    return (
        <CardVideos />
    )
}

export default HomePage;