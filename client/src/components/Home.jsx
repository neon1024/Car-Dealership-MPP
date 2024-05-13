import "../css/Home.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import userService from "../utils/userService";
import Cookies from "js-cookie";
import {useJwt} from 'react-jwt'

export default function Home({logoutUser}) {
    const navigateTo = useNavigate();
    const [decodedToken, setDecodedToken] = useState({});
    const [user, setUser] = useState(undefined);

    // const token = Cookies.get('jwt');
    // const {decodedToken} = useJwt(token);

    // useEffect(() => {
    //     const fetchLoggedUser = async () => {
    //         try {
    //             if (decodedToken && decodedToken.id) {
    //                 const fetchedUser = await userService.getUser(decodedToken.id);
    //                 setUser(fetchedUser);
    //             } else {
    //                 setUser(undefined);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching user', error);
    //         }
    //     };

    //     if (token) {
    //         fetchLoggedUser();
    //     } else {
    //         setUser(undefined); 
    //     }
    // }, [token, decodedToken]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const decodedToken = await userService.getDecodedToken();
                setDecodedToken(decodedToken);

                if (decodedToken.id) {
                    const loggedUser = await userService.getUser(decodedToken.id);
                    setUser(loggedUser);
                }
            } catch (error) {
                setUser(undefined);
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user]);
    
    return (
        <div className="HomePage">
            {!user ? <div className="AuthButtons">
                <button className="LogInButton" onClick={() => navigateTo("/login")}>LOG IN</button>
                <button className="SignUpButton" onClick={() => navigateTo("/register")}>SIGN UP</button>
            </div> : <div><h3>Hello, {<a href={user ? `/users/${user._id}` : '/'}>{user ? user.username : "User"}</a>}!</h3><button onClick={async () => {await logoutUser(); navigateTo("/");}}>LOG OUT</button></div>}
            
            <h1>Car Dealership</h1> 
            <a href='cars'>View The Cars Available</a>
        </div>
        
    );
}