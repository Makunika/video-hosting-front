import {useAuthDispatch} from "../../Context";
import {useEffect} from "react";
import {checkAuth} from "../../Context/actions";


export default function Profile() {
    const dispatch = useAuthDispatch();
    useEffect(() => checkAuth(dispatch), []);
    return (
        <div>

        </div>
    )
}