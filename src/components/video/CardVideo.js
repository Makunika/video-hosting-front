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
import {useSnackbar} from "notistack";
import Divider from "@material-ui/core/Divider";

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
    const { enqueueSnackbar } = useSnackbar();

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
    const [mark, setMark] = useState({
        likes: 0,
        dislikes: 0
    })
    const [like, setLike] = useState(0);
    const [token, setToken] = useState(videoToken);
    const [markLoad, setMarkLoad] = useState(false);


    function loadMarks() {
        setMarkLoad(true);
        if (auth) {
            API.get(`/marks/${videoToken}/user/${userDetails.user.id}`)
                .then((response) => {
                        const mark = response.data.data;
                        setMarkLoad(false);
                        setMark({
                            likes: mark.likes,
                            dislikes: mark.dislikes
                        });
                        setLike(mark.markOwner);
                    },
                    (error) => {
                        enqueueSnackbar("Произошла ошибка при загрузке лайков", { variant: "error"})
                    })
        } else {
            API.get(`/marks/${videoToken}`)
                .then((response) => {
                        const mark = response.data.data;
                        setMarkLoad(false);
                        setMark({
                            likes: mark.likes,
                            dislikes: mark.dislikes
                        });
                        setLike(0);
                    },
                    (error) => {
                        enqueueSnackbar("Произошла ошибка при загрузке лайков", { variant: "error"})
                    })
        }
    }

    function changeMark(mark) {
        setMarkLoad(true);
        const data = {
            videoId: videoToken,
            userId: userDetails.user.id,
            mark: mark
        }
        API.post('/marks/', data)
            .then((response) => {
                    const mark = response.data.data;
                    setMarkLoad(false);
                    setMark({
                        likes: mark.likes,
                        dislikes: mark.dislikes
                    });
                    setLike(mark.markOwner);
            },
                (error) => {
                    enqueueSnackbar("Произошла ошибка при установки лайка", { variant: "error"})
                    setMarkLoad(false);
                    setLike(0);
                    setMarkLoad(false);
                });
    }


    useEffect(() => {
        API.get('/videos/' + token)
            .then((res) => {
                console.log(res.data.data);
                setVideoData(res.data.data);
                setIsLoaded(true);
                loadMarks();
            },
                (error) => {
                    enqueueSnackbar("Произошла ошибка", { variant: "error"})
                })
            .catch(() => {
            });
    }, []);

    function handleLike() {
        if (like === 1) {
            changeMark(0);
        }
        else {
            changeMark(1);
        }
    }

    function handleDislike() {
        if (like === -1) {
            changeMark(0);
        }
        else {
            changeMark(-1);
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
                        <Typography
                            gutterBottom
                            variant="subtitle1"
                        >
                            {videoData.views + " просмотров"}
                        </Typography>
                        <Typography
                            variant="subtitle2"
                        >
                            {new Date(videoData.createDate).toLocaleDateString()}
                        </Typography>
                        {videoData.isPrivate &&
                        <Typography
                            variant="subtitle2"
                        >
                            {"Это приватное видео"}
                        </Typography>
                        }
                    </React.Fragment>
                }
                action={
                    <React.Fragment>
                        <IconButton
                            color={like === 1 ? "primary" : "default"}
                            disabled={!auth || markLoad}
                            onClick={handleLike}
                        >
                            <ThumbUp />
                        </IconButton>
                        <Typography
                            variant="subtitle2"
                            style={{display: 'inline'}}
                            color="textSecondary"
                        >
                            {mark.likes}
                        </Typography>
                        <IconButton
                            color={like === -1 ? "primary" : "default"}
                            disabled={!auth || markLoad}
                            onClick={handleDislike}
                        >
                            <ThumbDown />
                        </IconButton>
                        <Typography
                            variant="subtitle2"
                            color="textSecondary"
                            style={{display: 'inline'}}
                        >
                            {mark.dislikes}
                        </Typography>
                    </React.Fragment>
                }
            />
            <Divider variant="middle" />
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