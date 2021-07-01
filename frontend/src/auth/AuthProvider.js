import { useState, createContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import routes from '../helpers/routes';
import { toast } from 'react-toastify';

export const AuthContext = createContext();
export default function AuthProvider({ children }) {

    let history = useHistory();
    const apiUrl = 'http://localhost:4000/api';
    const [user, setUser] = useState("");
    const [userToken, setToken] = useState("");


    const login = async (userLogin) => {
        const res = await axios.post(apiUrl + '/users/login', userLogin)
        try {
            if (res.data.status === 404) {
                toast.error("El usuario no existe")
            }
            else if (res.data.status === 406) {
                toast.error("La contraseña es incorrecta")
            }
            else {
                setUser(res.data);
                setToken(res.data.token)
                toast.success("Ingreso Correcto")
                localStorage.setItem('name', res.data.username)
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('id', res.data.id)
                history.push(routes.wallet)
            }
        } catch (err) {
            console.log(err)
        }
    }

    const createUser = async (newUser) => {
        const username = newUser.username;
        const password = newUser.password;
        const res = await axios.post('http://localhost:4000/api/users/register', {
            username: username.split(" ").join(""),
            password: password
        });
        if (res.data.status === 302) {
            toast.warning("El usuario ya existe")
        } else if (res.data.error === null) {
            setToken(res.data.token)
            toast.success("Usuario creado con exito")
            history.push(routes.login)
        }
    }

    const logout = () => {
        setUser("");
        setToken("")
        localStorage.clear()
    }

    const isLogged = () => !!user;

    useEffect(() => {
        const loggedName = localStorage.getItem("name");
        const loggedId = localStorage.getItem("id");
        const loggedToken = localStorage.getItem("token");
        if (loggedName) {
            setUser({ username: loggedName, token: loggedToken, id: loggedId });
        }
    }, []);

    const contextValue = {
        user,
        userToken,
        createUser,
        login,
        logout,
        isLogged,
    }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>

}


