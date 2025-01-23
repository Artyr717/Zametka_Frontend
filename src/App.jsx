import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Navigate, Route, Routes} from 'react-router-dom';
import Login from './components/Login.jsx';
import Profile from "./components/Profile.jsx";
import MainLayout from "./components/MainLayout.jsx";
import Register from "./components/Register.jsx";
import MainPage from "./components/MainPage.jsx";

function App() {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (token) {
            setAuth(true);
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<MainLayout/>}>
                    <Route path="home" element={<MainPage/>}/>
                    <Route path="profile" element={auth ? <Profile/> : <Login setAuth={setAuth}/>}/>
                    <Route path="login" element={<Login setAuth={setAuth}/>}/>
                    <Route path="register" element={<Register/>}/>
                </Route>
            </Routes>

        </Router>

    );
}

export default App;