import CardVideos from "../../components/Home/CardVideos";
import React, {useState} from "react";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";
import {useHistory} from "react-router";
import {useAuthState} from "../../Context";

function AuthPage() {
    const [login, setLogin] = useState(true);


    function handleLink() {
        setLogin(!login);
    }

    return (
        <React.Fragment>
            {
                login ? <Login handleLink={handleLink}/> : <Register handleLink={handleLink}/>
            }
        </React.Fragment>
    )
}

export default AuthPage;