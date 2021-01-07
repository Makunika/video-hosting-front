import React, {useEffect, useState} from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";
import {useHistory} from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import API from "../../utils/API";
import Loading from "../Other/Loading";



const useStyles = makeStyles({
    add: {
        width: '100%',
        marginBottom: 10
    },
    media: {
        height: 140
    }
})

function CardVideo(props) {
    const classes = useStyles();
    const history = useHistory();


    return (
        <Card className={classes.add}>
            <CardActionArea onClick={() => history.push("/video/" + props.item.id)} >
                <CardContent>
                    <Typography gutterBottom variant="subtitle1">
                        {props.item.name}
                    </Typography>
                    <Typography gutterBottom variant="body2">
                        {props.item.about}
                    </Typography>
                    <Typography variant="subtitle2">
                        {props.item.user.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

function CardVideosPreview() {

    const [isLoaded, setIsLoaded] = useState(false);
    const [videosData, setVideosData] = useState([]);

    useEffect(() => {
        API.get('/videos?size=5&sort=name,asc')
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
        <div>
            <Typography gutterBottom variant="subtitle1" color="textSecondary">
                {"Другие видео"}
            </Typography>
            {
                Array.prototype.map.call(videosData, function (item) {
                    return <CardVideo item={item} />;
                })
            }
        </div>
    );

    return !isLoaded ? <Loading />  : Videos;
}

export default CardVideosPreview;