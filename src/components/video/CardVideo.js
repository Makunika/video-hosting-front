import CardMedia from "@material-ui/core/CardMedia";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import {CardContent, IconButton} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import React, {useEffect, useState} from "react";
import {makeStyles} from "@material-ui/core/styles";
import API from "../../utils/API";
import Loading from "../Other/Loading";
import {ThumbDown, ThumbUp} from "@material-ui/icons";
import {useAuthState} from "../../Context";

const useStyles = makeStyles({
    video: {
        width: '100%',
        outline: 'none'
    }
})

function CardVideo(props) {

    const videoToken = props.videoToken;
    const userDetails = useAuthState();
    const auth = userDetails.token !== '';
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
    const [like, setLike] = useState(0);
    const [token, setToken] = useState(videoToken);


    useEffect(() => {
        API.get('/videos/' + token)
            .then((res) => {
                console.log(res.data.data);
                setVideoData(res.data.data);
                setIsLoaded(true);
            },
                (error) => {
                })
            .catch(() => {
            });
    }, []);

    function handleLike() {
        if (like === 1) {
            setLike(0);
        }
        else {
            setLike(1);
        }
    }

    function handleDislike() {
        if (like === -1) {
            setLike(0);
        }
        else {
            setLike(-1);
        }
    }

    const Video = (
        <Card>
            <CardMedia>
                <video className={classes.video} controls>
                    <source src={"http://localhost:8080/api/file/videos/" + videoData.video} type="video/mp4"/>
                </video>
            </CardMedia>
            <CardHeader
                title={videoData.name}
                subheader={
                    <React.Fragment>
                        {videoData.views + " просмотров"}
                        <Typography
                            variant="subtitle2"
                        >
                            {new Date(videoData.createDate).toLocaleDateString()}
                        </Typography>
                    </React.Fragment>
                }
                action={
                    <React.Fragment>
                        <IconButton
                            color={like === 1 ? "primary" : "default"}
                            disabled={!auth}
                            onClick={handleLike}
                        >
                            <ThumbUp />
                        </IconButton>
                        <Typography
                            variant="subtitle2"
                            style={{display: 'inline'}}
                            color="textSecondary"
                        >
                            1000
                        </Typography>
                        <IconButton
                            color={like === -1 ? "primary" : "default"}
                            disabled={!auth}
                            onClick={handleDislike}
                        >
                            <ThumbDown />
                        </IconButton>
                        <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            style={{display: 'inline'}}
                        >
                            1000
                        </Typography>
                    </React.Fragment>
                }
            />
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe">
                        R
                    </Avatar>
                }
                title={videoData.user.name}/>
            <CardContent>
                <Typography>
                    {videoData.about}
                </Typography>
            </CardContent>
        </Card>
    );

    return !isLoaded ? <Loading /> : Video;

}

export default CardVideo;