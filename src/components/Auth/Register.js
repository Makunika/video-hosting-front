import React, {useRef, useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import API from "../../utils/API";
import {useSnackbar} from "notistack";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Register(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        login: ''
    })
    const [loading, setLoading] = useState(false);

    const handleSignUp = () => {
        setLoading(true);
        const data = {
            username: formData.login,
            email: formData.email,
            password: formData.password
        }
        API
            .post('register', data)
            .then((res) => {
                setLoading(false);
                enqueueSnackbar("Вы зарегистрированы!", { variant: 'success' });
                props.handleLink();
            }, (error) => {
                setLoading(false);
                const response = error.response.data;
                enqueueSnackbar(response.error, { variant: 'error' });
                console.log(response);
            });
    }

    const handleChange = (event) => {
        const formData1 = {
            email: formData.email,
            password: formData.password,
            login: formData.login
        };
        formData1[event.target.name] = event.target.value;
        setFormData(formData1);
    }


    return (
        <Container maxWidth="sm">
            <CssBaseline />
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Регистрация
                </Typography>
                <ValidatorForm className={classes.form}
                               onSubmit={handleSignUp}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                label="Логин"
                                name="login"
                                autoComplete="username"
                                validators={['required']}
                                errorMessages={['Это поле обязательное']}
                                value={formData.login}
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                label="Email"
                                name="email"
                                autoComplete="email"
                                validators={['required', 'isEmail']}
                                errorMessages={['Это поле обязательное', 'Неверный формат']}
                                value={formData.email}
                                disabled={loading}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextValidator
                                variant="outlined"
                                fullWidth
                                onChange={handleChange}
                                name="password"
                                label="Пароль"
                                type="password"
                                autoComplete="current-password"
                                validators={['required']}
                                errorMessages={['Это поле обязательное']}
                                value={formData.password}
                                disabled={loading}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={loading}
                        className={classes.submit}
                    >
                        Зарегистрироваться
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link style={{cursor: 'pointer'}} variant="body2" onClick={() => props.handleLink()}>
                                Уже есть аккаунт? Войти
                            </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}