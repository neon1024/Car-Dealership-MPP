import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import userService from "../utils/userService";

export default function VerificationPage() {
    const {token} = useParams();
    const [confirmation, setConfirmation] = useState({});

    useEffect(() => {
        const fetchEmailConfirmation = async () => {
            try {
                const confirmation = await userService.getEmailConfirmation(token);
                setConfirmation(confirmation);
            } catch(error) {
                setConfirmation({confirmed: false});
                console.error('Error fetching confirmation', error);
            }
        }
        fetchEmailConfirmation();
    }, []);

    return (
        <>
        <h1>{confirmation.confirmed === false ? "Please confirm your email" : "Email confirmed"}</h1>
        <a href="/">Go Back</a>
        </>
        
    );
}