import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/CarAddForm.css";

export default function UserRegisterForm({registerUser}) {
    const navigateTo = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        username: "",
        password: "",
    });

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
            const emailToken = await registerUser(formData);
            if (emailToken) {
                navigateTo('/');
            }
        } catch (error) {
            console.log(error.message);
        }
        
    }

    return (
        <>
        <form className="CarAddForm" onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input type="email" placeholder="email" value={formData.email} onChange={handleChange} name="email" required/>
            <label htmlFor="username">Username</label>
            <input type="text" placeholder="username" value={formData.username} onChange={handleChange} name="username" required/>
            <label htmlFor="password">Password</label>
            <input type="password" placeholder="password" value={formData.password} onChange={handleChange} name="password" required/>
            <button type="submit">Submit</button>
        </form>
        <a href="/">Go Back</a>
        </> 
    );
}