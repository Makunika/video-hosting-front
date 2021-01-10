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
import {loginUser, useAuthDispatch, useAuthState} from "../../Context";
import {useHistory} from "react-router";
import {useSnackbar} from "notistack";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import API from "../../utils/API";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    input: {
        WebkitBoxShadow: "0 0 0 1000px #303030 inset"
    }
}));

export default function Login(props) {
    const classes = useStyles();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);

    const [formData, setFormData] = useState({
        login: '',
        password: ''
    })

    const dispatch = useAuthDispatch();
    const { loading } = useAuthState();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            let username = formData.login;
            let password = formData.password;
            let user = await loginUser(dispatch, { username, password });
            console.log('alo', user);
            if (user) {
                enqueueSnackbar("Вы авторизованы!", { variant: 'success' });
                history.push('/');
            } else {
                enqueueSnackbar("Неправильный логин/пароль", { variant: 'error' });
            }

        } catch (error) {
            console.log(error);
        }
    };



    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (event) => {
        const formData1 = {
            password: formData.password,
            login: formData.login
        };
        formData1[event.target.name] = event.target.value;
        setFormData(formData1);
    }

    return (
        <Container maxWidth="sm">
            <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                    Войти
                </Typography>
                <ValidatorForm className={classes.form} onSubmit={handleLogin}>
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="login"
                        label="Логин"
                        name="login"
                        autoComplete="username"
                        autoFocus
                        disabled={loading}
                        validators={['required']}
                        errorMessages={['Это поле обязательное']}
                        value={formData.login}
                        onChange={handleChange}
                        inputProps={{ className: classes.input }}
                    />
                    <TextValidator
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="password"
                        label="Пароль"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        disabled={loading}
                        validators={['required']}
                        errorMessages={['Это поле обязательное']}
                        value={formData.password}
                        onChange={handleChange}
                        inputProps={{ className: classes.input }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        type="submit"
                        disabled={loading}
                    >
                        Войти
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link style={{cursor: 'pointer'}} variant="body2" onClick={handleClickOpen}>
                                Забыли пароль?
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link style={{cursor: 'pointer'}} variant="body2" onClick={() => props.handleLink()}>
                                {"Нет аккаунта? Зарегистрироваться"}
                            </Link>
                        </Grid>
                    </Grid>
                </ValidatorForm>
            </div>
            <ResetPassword handleClose={handleClose} open={open} />
        </Container>
    );
}


function ResetPassword(props) {
    const { enqueueSnackbar } = useSnackbar();
    const emailRef = useRef(null);

    const handleButton = async () => {

        const data = {
            email: emailRef.current.value
        }

        await API.post('reset', data)
            .then((data) => {
                    enqueueSnackbar("Проверьте почту", { variant: 'success' });
            },
                (error) => {
                    enqueueSnackbar("Пользователя с такой почтой не существует", { variant: 'error' });
            });


        props.handleClose();
    }

    return (
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Восстановление пароля</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Введите свою почту для восстановления пароля
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    inputRef={emailRef}
                    label="Email"
                    type="email"
                    autoComplete="email"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose} color="primary">
                    Отмена
                </Button>
                <Button onClick={handleButton} color="primary">
                    Восстановить пароль
                </Button>
            </DialogActions>
        </Dialog>
    )
}