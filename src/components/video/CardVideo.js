import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import {CardContent} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import API from "../../utils/API";
import Loading from "../Other/Loading";

const useStyles = makeStyles({
    video: {
        width: '100%',
        outline: 'none'
    }
})

function CardVideo(props) {

    const videoToken = props.videoToken;

    const classes = useStyles();

    const [isLoaded, setIsLoaded] = useState(false);
    const [videoData, setVideoData] = useState({
        id: 0,
        video: 'unknow',
        user: {
            id: 0,
            name: 'name',
            img: 'img'
        }
    })
    const [token, setToken] = useState(videoToken);


    useEffect(() => {
        API.get('/videos/' + token)
            .then((res) => {
                console.log(res.data.data);
                setVideoData(res.data.data);
                setIsLoaded(true);
            })
            .catch(() => {
                console.log('WOOOOW');
            });
    }, []);

    const Video = (
        <Card>
            <CardMedia>
                <video className={classes.video} controls>
                    <source src={"http://localhost:8080/file/videos/" + videoData.video} type="video/mp4"/>
                </video>
            </CardMedia>
            <CardHeader title="Название видео" subheader="1 декабря 2020"/>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        R
                    </Avatar>
                }
                title={videoData.user.name}/>
            <CardContent>
                <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                </Typography>
            </CardContent>
        </Card>
    );

    return !isLoaded ? <Loading /> : Video;

}

export default CardVideo;