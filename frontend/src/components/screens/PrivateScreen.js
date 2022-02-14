import React from 'react';
import {useState, useEffect} from 'react';
import axios from 'axios';

export const PrivateScreen = ({history}) => {
    const [error, setError] = useState("");
    const [privateData, setPrivateData] = useState("");

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            history.push("/login")
        }

        const fetchPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer  ${localStorage.getItem("authToken")}`
                }
            }
            try {
                const data = await axios.get("api/private", config);
                setPrivateData(data.data);


            } catch (error) {
                localStorage.removeItem("authToken");
                setError("your not authorized please login");

            }
        }
        fetchPrivateData();
    }, [history]);
    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        history.push("/login");
    }


    return error ? (
        <span className='error'>{error}</span>) : (
        <>
            <div style={{background: "green", color: "white"}}>{privateData}</div>
            <button onClick={logoutHandler}>Logout</button>
        </>
    );


}
