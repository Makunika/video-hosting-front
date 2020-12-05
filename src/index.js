import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button';
import 'fontsource-roboto';
import orange from "@material-ui/core/colors/orange";
import grey from "@material-ui/core/colors/grey";
import {ThemeProvider , createMuiTheme, makeStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Paper from "@material-ui/core/Paper";
import Container from "@material-ui/core/Container";
import CardMedia from "@material-ui/core/CardMedia";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import {CardContent} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";


const theme = createMuiTheme({
    palette: {
        primary: orange,
        secondary: grey
    }
});

const useStyles = makeStyles({
    primary: {
        backgroundColor: theme.palette.primary.main,
        color: 'black'
    }
})



function App() {
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justify="center">
                    <Grid item xs={12}>
                        <Card classes={classes.primary}>
                            <CardMedia>
                                <video width="100%" height="auto" controls>
                                    <source src="http://localhost:8080/file/videos/video.mp4" type="video/mp4"/>
                                </video>
                            </CardMedia>
                            <CardHeader title="Название видео" subheader="1 декабря 2020"/>
                            <CardHeader
                                avatar={
                                    <Avatar aria-label="recipe">
                                        R
                                    </Avatar>
                                }
                                title="Создатель"/>
                            <CardContent>
                                <Typography>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper variant="outlined" square>
                            Hello22222222
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper variant="outlined" square>
                            Hello22222222
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </ThemeProvider>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));