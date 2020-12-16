import API from "../utils/API";


export async function loginUser(dispatch, loginPayload) {
    console.log(loginPayload);
    dispatch({ type: 'REQUEST_LOGIN' });
    await API.post("/auth", loginPayload).then((response) => {
        let data = response.data;
        console.log(data);
        if (data.username) {
            dispatch({ type: 'LOGIN_SUCCESS', payload: data });
            console.log(data);
            localStorage.setItem('currentUser', JSON.stringify(data));
            return data;
        }
        dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
        console.log(data.errors[0]);
        return;
    }).catch((response) => {
        dispatch({ type: 'LOGIN_ERROR', error: response.data });
        console.log(response.data);
    })
}

export async function logout(dispatch) {
    dispatch({ type: 'LOGOUT' });
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
}

export function checkAuth(dispatch, userDetails) {
    let auth = !!userDetails.user;
    if (auth) {
        API.put('/auth/check', '').then(() => {
            auth = true;
        }).catch((error) => {
            dispatch({type: 'LOGOUT'});
            localStorage.removeItem('currentUser');
            localStorage.removeItem('token');
            auth = false;
        });
    }
    return auth;
}