import { Container, makeStyles} from "@material-ui/core";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React, {useState} from "react";
import {useSnackbar} from "notistack";
import Backdrop from "@material-ui/core/Backdrop";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import API from "../utils/API";
import {useAuthState} from "../context";

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="determinate" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption" component="div" >{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}

const userStyle = makeStyles((theme) => ({
    input: {
        display: 'none'
    },
    paper: {
        marginTop: theme.spacing(3)
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    }
}));

export default function NewVideoPage() {
    const classes = userStyle();
    const { enqueueSnackbar } = useSnackbar();
    const userDetails = useAuthState();
    const [load, setLoad] = React.useState(false);
    const [progress, setProgress] = useState(0);
    const [formData, setFormData] = useState({
        name: "",
        about: '',
    })

    const handleChange = (event) => {
        const formData1 = {
            name: formData.name,
            about: formData.about,
        };
        formData1[event.target.name] = event.target.value;
        setFormData(formData1);
    }

    const handleNewVideo = async () => {
        setLoad(true);
        const f = new FormData();
        f.append("name", formData.name);
        f.append("about", formData.about);
        f.append("userId", userDetails.id);
        f.append("file", document.getElementById("icon-button-file").files[0])
        await API.post("file/video", f, {
            onUploadProgress: (progressEvent) => {
                const totalLength = progressEvent.lengthComputable ? progressEvent.total : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length');
                console.log("onUploadProgress", totalLength);
                if (totalLength !== null) {
                    setProgress(Math.round((progressEvent.loaded * 100) / totalLength));
                }
            }
        }).then((response) => {
            console.log(response.data);
                setLoad(false);
                setProgress(0);
        },
            (error) => {
                console.log(error);
                enqueueSnackbar(error.response, { variant: "error"});
                setLoad(false);
                setProgress(0);
            }).catch((error) => {
                console.log(error);
        })
    }

    return (
        <Container maxWidth={"sm"}>
            <div className={classes.paper}>
                <ValidatorForm onSubmit={handleNewVideo}>
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={12}>
                            <input accept="video/mp4" className={classes.input} id="icon-button-file" type="file" />
                            <label htmlFor="icon-button-file">
                                <Button component="span" color="primary">
                                    Выберите файл
                                </Button>
                            </label>
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="standard"
                                fullWidth
                                onChange={handleChange}
                                label="Название"
                                name="name"
                                autoComplete="off"
                                validators={['required']}
                                errorMessages={['Это поле обязательное']}
                                value={formData.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="standard"
                                fullWidth
                                multiline
                                rowsMax={20}
                                rows={4}
                                onChange={handleChange}
                                label="Описание"
                                name="about"
                                autoComplete="off"
                            />
                        </Grid>
                        <Grid item xs={12} lg={5}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                type="submit"
                            >
                                Сохранить
                            </Button>
                        </Grid>
                    </Grid>
                </ValidatorForm>
                <Backdrop className={classes.backdrop} open={load}>
                    <CircularProgressWithLabel value={progress} />
                </Backdrop>
            </div>
        </Container>
    )
}