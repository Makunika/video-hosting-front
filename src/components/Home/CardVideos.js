import Card from "@material-ui/core/Card";
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActionArea from "@material-ui/core/CardActionArea";
import API from "../../utils/API";
import Grid from "@material-ui/core/Grid";
import Loading from "../Other/Loading";
import { useHistory } from 'react-router-dom';


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
                            {props.item.user.name}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}



function CardVideos() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [videosData, setVideosData] = useState([]);

    useEffect(() => {
        API.get('/videos')
            .then((res) => {
                console.log(res.data.content);
                setVideosData(res.data.content);
                setIsLoaded(true);
            },
                (error) => {
                    const response = error.response
                    console.log(response)
                })
            .catch(() => {
                console.log('WOOOOW');
            });
    }, []);



    const Videos = (
            <Grid container spacing={4} justify="center">
                {
                    Array.prototype.map.call(videosData, function (item) {
                        return <CardVideo item={item} />;
                    })
                }
            </Grid>
    );

    return !isLoaded ? <Loading />  : Videos;
}

export default CardVideos;