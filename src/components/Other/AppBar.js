import React, {useEffect} from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import {ExitToApp, VideoCall} from "@material-ui/icons";
import {Link, useHistory} from "react-router-dom";
import {checkAuth, logout} from "../../Context/actions";
import {useAuthDispatch, useAuthState} from "../../Context";
import Paper from "@material-ui/core/Paper";
import CustomizedSearch from "./CustomSearch";

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        cursor: 'pointer'
    },
    titleOne: {
        display: 'block',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
        cursor: 'pointer'
    },
    search: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
}));

export default function PrimarySearchAppBar() {
    const classes = useStyles();
    const dispatch = useAuthDispatch();
    const userDetails = useAuthState();
    const auth = userDetails.token !== '';
    useEffect(() => checkAuth(dispatch), []);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);



    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const history = useHistory();

    const handleProfileMenuOpen = (event) => {
        if (!auth) {
            history.push("/auth");
        } else {
            history.push("/profile");
        }
        handleMobileMenuClose()
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleExit = async () => {
        await logout(dispatch);
        handleMobileMenuClose()
    };

    const handleNewVideo = () => {
        if (auth) {
            history.push("/new");
        }
        handleMobileMenuClose()
    }


    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            {auth &&
            <MenuItem onClick={handleNewVideo}>
                <IconButton color="inherit">
                    <Badge color="secondary">
                        <VideoCall />
                    </Badge>
                </IconButton>
                <p>Добавить видео</p>
            </MenuItem>
            }
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
            {auth && <MenuItem onClick={handleExit}>
                <IconButton
                    aria-label="Выйти из аккаунта"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <ExitToApp/>
                </IconButton>
                <p>Exit</p>
            </MenuItem>
            }
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6" noWrap onClick={() => {history.push("/"); history.go(0)}}>
                        Tronica
                    </Typography>
                    <Typography className={classes.titleOne} variant="h5" onClick={() => {history.push("/"); history.go(0)}}>
                        T
                    </Typography>
                    <div className={classes.search}>
                        <CustomizedSearch />
                    </div>
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {auth &&
                        <IconButton aria-label="Добавить новое видео" color="inherit" onClick={handleNewVideo}>
                            <Badge color="secondary">
                                <VideoCall />
                            </Badge>
                        </IconButton>
                        }

                        <IconButton
                            aria-label="Ваш аккаунт"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        {auth &&
                        <IconButton
                            edge="end"
                            aria-label="Выйти из аккаунта"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleExit}
                            color="inherit"
                        >
                            <ExitToApp/>
                        </IconButton>
                        }
                    </div>
                    <div className={classes.sectionMobile}>
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
        </div>
    );
}