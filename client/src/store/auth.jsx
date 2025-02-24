import { createContext, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true);

    const storeTokenLs = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token", serverToken);
    }
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };
    const getUser = async (e) => {
        if (!token) {
            setLoading(false); // If there's no token, we don't need to make the request
            return;
        }
        try {
            const response = await fetch(`http://localhost:5001/api/auth/user`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const res_data = await response.json();
                setUser(res_data.response);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        if (token) {
            getUser();
        } else {
            setLoading(false); // If there's no token, skip the fetch
        }
    }, [token])
    return <UserContext.Provider value={{ user, storeTokenLs, LogoutUser, token, getUser }}>
        {loading ? <div className="loader"></div> : children}
    </UserContext.Provider>
}

export const useAuth = () => {
    const authContextValue = useContext(UserContext);

    if (!authContextValue) {
        throw new Error("useauth used outside of the provider")
    }
    return authContextValue;
}