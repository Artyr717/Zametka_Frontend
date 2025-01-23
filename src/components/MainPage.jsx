import {useEffect, useState} from "react";
import axios from "axios";
import LoadingSpinner from "./Loading.jsx";
import {Avatar} from "antd";
import colors from "tailwindcss/colors.js";

function MainPage() {
    const [userData, setUserData] = useState({
        avatar: "", // Значение по умолчанию для avatar
        username: "Гость", // Значение по умолчанию для username
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = sessionStorage.getItem("token");
                if (!token) {
                    console.warn("Token is missing. Please log in again.");
                    setLoading(false);
                    return;
                }

                const response = await axios.get("http://127.0.0.1:8000/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setUserData(response.data);
            } catch (error) {
                if (error.response) {
                    // Ошибка на сервере
                    if (error.response.status === 404 && error.response.data.message === 'User not found') {
                        console.error('Пользователь не найден.');
                        alert('Пользователь не найден.');

                        // Удаляем токен из localStorage
                        sessionStorage.removeItem('token');
                    } else if (error.response.status === 500) {
                        console.error('Ошибка сервера. Попробуйте позже.');
                        alert('Ошибка сервера. Попробуйте позже.');
                    } else {
                        console.error(`Ошибка: ${error.response.status}`);
                        alert(`Ошибка: ${error.response.status}`);
                    }
                } else if (error.request) {
                    // Ошибка при отправке запроса
                    console.error('Ошибка сети: не удалось получить ответ от сервера.');
                    alert('Ошибка сети: не удалось получить ответ от сервера.');
                } else {
                    // Ошибка, не связанная с запросом
                    console.error('Ошибка: ' + error.message);
                    alert('Произошла ошибка: ' + error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) {
        return <LoadingSpinner/>;// Показать загрузку, пока данные не загрузились
    }

    return (
        <div>
            <h1>Приветствую, <span style={{
                color: "orange"
            }}>{userData.username}</span></h1>
        </div>
    )
}

export default MainPage