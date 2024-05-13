import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userService from "../utils/userService";

export default function UserProfile() {
    const {id} = useParams();
    const [user, setUser] = useState(undefined);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await userService.getUser(id);
                setUser(user);
            } catch(error) {
                console.error('Error fetching user', error);
            }
        }
        fetchUser();
    }, []);

    return (
        <>
        {user === undefined ? <h1>You are not allowed to do this</h1> :
            <div className="UserInfo">
                <h2>Email: {user.email}</h2>
                <h2>Username: {user.username}</h2>
            </div>
        }
        <a href="/">Go Back</a>
        </>
        
    );
}