import CardVideos from "../../components/Home/CardVideos";
import React, {useState} from "react";
import Login from "../../components/Auth/Login";
import Register from "../../components/Auth/Register";

function AuthPage() {
    const [login, setLogin] = useState(true);

    function handleLink() {
        setLogin(!login);
    }

    console.log("hello");
    return (
        <React.Fragment>
            {
                login ? <Login handleLink={handleLink}/> : <Register handleLink={handleLink}/>
            }
        </React.Fragment>
    )
}

export default AuthPage;