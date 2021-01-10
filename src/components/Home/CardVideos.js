import Card from "@material-ui/core/Card";
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import API from "../../utils/API";
import Grid from "@material-ui/core/Grid";
import Loading from "../Other/Loading";
import { useHistory } from 'react-router-dom';
import {useLocation} from "react-router";
import {Button} from "@material-ui/core";
import {ThumbDown, ThumbUp} from "@material-ui/icons";


const useStyles = makeStyles({
    card: {
        width: 355
    },
    card_img: {
        width: '100%',
        minHeight: 200,
        objectFit: 'contain'
    }
})


function CardVideo(props) {
    const classes = useStyles();
    const history = useHistory();


    return (
        <Grid item xs="auto">
            <Card className={classes.card}>
                <CardActionArea onClick={() => history.push("/video/" + props.item.id)} >
                    <CardContent>
                        <Typography gutterBottom variant="h5">
                            {props.item.name}
                        </Typography>
                        <Typography variant="subtitle2">
                            {"Автор: " + props.item.user.name}
                        </Typography>
                        <Grid container justify="flex-end" wrap="nowrap" alignItems="center" spacing={1}>
                            <Grid item>
                                <Typography variant="body2">{"Количество просмотров: " + props.item.views}</Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function CardVideos() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [videosData, setVideosData] = useState([]);
    const [page, setPage] = useState(0);
    const [next, setNext] = useState(false);
    const query = useQuery();
    const [name] = useState(query.get("name"))
    const [sort] = useState(query.get("sort"))

    useEffect(() => {
        const url = name ? `/videos?page=${page}&name=${name}` : (sort ? `/videos?page=${page}&sort=views,desc` : `/videos?page=${page}`);
        API.get(url)
            .then((res) => {
                    const v = videosData.slice();
                    Array.prototype.map.call(res.data.content, (item) => {
                        v.push(item);
                    })
                    setVideosData(v);
                    setIsLoaded(true);
                    setNext((page + 1) !== res.data.totalPages);
                },
                (error) => {
                    const response = error.response
                    console.log(response)
                })
            .catch(() => {
                console.log('WOOOOW');
            });
    }, [page]);


    const Videos = (
            <Grid container spacing={4} justify="flex-start" alignItems="center">
                {videosData.length === 0 &&
                <Grid container item xs={12} justify="center">
                    <Typography variant="h5" color="textPrimary">
                        Видео с таким названием не найдены
                    </Typography>
                </Grid>}
                {
                    videosData.length !== 0 &&
                        <React.Fragment>
                            {
                                Array.prototype.map.call(videosData, function (item) {
                                    return <CardVideo key={item.id} item={item} />;
                                })
                            }
                            {next &&
                            <Grid container item xs={12} justify="center">
                                <Button variant="outlined" onClick={() => { setPage(page + 1);}}>
                                    Показать еще
                                </Button>
                            </Grid>}
                        </React.Fragment>
                }
            </Grid>
    );

    return !isLoaded ? <Loading />  : Videos;
}

export default CardVideos;