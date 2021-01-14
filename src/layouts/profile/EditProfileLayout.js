import {Avatar, Container, makeStyles} from "@material-ui/core";
import React, {useState} from "react";
import Grid from "@material-ui/core/Grid";
import {TextValidator, ValidatorForm} from "react-material-ui-form-validator";
import Button from "@material-ui/core/Button";
import {PhotoCamera} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import {useSnackbar} from "notistack";
import IconButton from "@material-ui/core/IconButton";
import {useAuthDispatch, useAuthState} from "../../context";
import API from "../../utils/API";
import {changeUsername} from "../../context/actions";


const useStyle = makeStyles((theme) => ({
    input: {
        display: 'none',
    },
    flex: {
        display: 'flex',
        alignItems: "center",
        justifyContent: 'space-around'
    }
}));

export default function EditProfileLayout() {
    const classes = useStyle();
    const userDetails = useAuthState();
    const dispatch = useAuthDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: userDetails.user.username
    })
    const [loading, setLoading] = useState(false);

    const handleEditProfile = () => {
        setLoading(true);
        API.put("users", formData)
            .then((response) => {
                console.log(response);
                changeUsername(dispatch, response.data.data);
                enqueueSnackbar("Логин успешно изменен", { variant: "success"});
                setLoading(false);
            },
                (error) => {
                console.log(error);
                setLoading(false);
                })
    }

    const handleChange = (event) => {
        const formData1 = {
            email: formData.email,
            password: formData.password,
            username: formData.username
        };
        formData1[event.target.name] = event.target.value;
        console.log(formData1);
        setFormData(formData1);
    }

    return (
        <Container maxWidth={"sm"}>
            <div className={classes.paper}>
                <ValidatorForm onSubmit={handleEditProfile}>
                    <Grid container spacing={3} justify="center">
                        <Grid item xs={12}>
                            <div className={classes.flex}>
                                <Avatar>A</Avatar>
                                <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
                                <label htmlFor="icon-button-file">
                                    <IconButton color="primary" size="small" aria-label="upload picture" component="span">
                                        <PhotoCamera />
                                    </IconButton>
                                </label>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                varint="standard"
                                fullWidth
                                onChange={handleChange}
                                label="Логин"
                                name="username"
                                autoComplete="off"
                                validators={['required']}
                                errorMessages={['Это поле обязательное']}
                                value={formData.username}
                                disabled={loading}
                            >
                            </TextValidator>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                varint="standard"
                                fullWidth
                                label="Email"
                                name="email"
                                disabled
                                value={userDetails.user.email}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} lg={5}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="primary"
                                type="submit"
                                disabled={loading}
                            >
                                Сохранить
                            </Button>
                        </Grid>
                    </Grid>

                </ValidatorForm>
            </div>
        </Container>
    )
}