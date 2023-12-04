import { useState, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    //default axios
    axios.defaults.baseURL = "http://localhost:3000";
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    axios.defaults.headers.post["Content-Type"] = "application/json";
    axios.defaults.headers.put["Content-Type"] = "application/json";
    axios.defaults.headers.patch["Content-Type"] = "application/json";
    axios.defaults.headers.delete["Content-Type"] = "application/json";
    axios.defaults.headers.get["Content-Type"] = "application/json";
    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };