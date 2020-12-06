import React from 'react';
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {makeStyles} from "@material-ui/core/styles";



const useStyles = makeStyles({
    add: {
        width: '100%',
        marginBottom: 10
    },
    media: {
        height: 140
    }
})

function CardVideosPreview() {

    const classes = useStyles();

    return (
        <div>
            <Card className={classes.add}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="https://static-cse.canva.com/blob/241536/%D0%9E%D1%81%D0%B5%D0%BD%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B1%D0%BE%D0%B8-%D0%BD%D0%B0-%D1%80%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9-%D1%81%D1%82%D0%BE%D0%BB-%D0%BE%D1%82%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5.png"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
            <Card className={classes.add}>
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image="https://static-cse.canva.com/blob/241536/%D0%9E%D1%81%D0%B5%D0%BD%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B1%D0%BE%D0%B8-%D0%BD%D0%B0-%D1%80%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9-%D1%81%D1%82%D0%BE%D0%BB-%D0%BE%D1%82%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5.png"
                        title="Contemplative Reptile"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card><Card className={classes.add}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://static-cse.canva.com/blob/241536/%D0%9E%D1%81%D0%B5%D0%BD%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B1%D0%BE%D0%B8-%D0%BD%D0%B0-%D1%80%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9-%D1%81%D1%82%D0%BE%D0%BB-%D0%BE%D1%82%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5.png"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card><Card className={classes.add}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="https://static-cse.canva.com/blob/241536/%D0%9E%D1%81%D0%B5%D0%BD%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B1%D0%BE%D0%B8-%D0%BD%D0%B0-%D1%80%D0%B0%D0%B1%D0%BE%D1%87%D0%B8%D0%B9-%D1%81%D1%82%D0%BE%D0%BB-%D0%BE%D1%82%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5.png"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        Lizard
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </div>
    )
}

export default CardVideosPreview;