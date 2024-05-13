import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CarAddForm.css";

export default function UserLoginForm({loginUser}) {
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        authCode: "",
    });

    const [authCodeSent, setAuthCodeSent] = useState(false);

    const handleChange = (event) => {
        const changedField = event.target.name;
        const newValue = event.target.value;
        setFormData(currentData => {
            return {
                ...currentData,
                [changedField]:newValue
            }
        });
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await loginUser(formData);
            if (authCodeSent) {
                navigateTo("/");
            }
            if (response) {
                setAuthCodeSent(true);
            }
        } catch (error) {
            console.log(error.message);
        }
        
    }

    return (
        <>
        <form className="CarAddForm" onSubmit={handleSubmit}>
            {!authCodeSent ? <div><label htmlFor="email">Email</label>
            <input type="email" placeholder="email" value={formData.username} onChange={handleChange} name="email" required/>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="password" value={formData.password} onChange={handleChange} name="password" required/>
            </div> : <div><label htmlFor="authCode">Auth Code</label><input type="text" placeholder="auth code" value={formData.authCode} onChange={handleChange} name="authCode"/></div>
            }
            <button type="submit">Submit</button>
        </form>
        <a href="/">Go Back</a>
        </> 
    );
}