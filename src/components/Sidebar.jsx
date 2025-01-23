import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import LoadingSpinner from "./Loading.jsx";

function Sidebar() {
    const [userData, setUserData] = useState({
        avatar: "", // Значение по умолчанию для avatar
        username: "Гость", // Значение по умолчанию для username
        profession: "Нет Данных"
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
        return <LoadingSpinner/>; // Показать загрузку, пока данные не загрузились
    }

    return (
        <div className="sidebar">
            <div className="brand">
                <h1>Zametka</h1>
            </div>
            <div className="profile">
                <img
                    src={userData.avatar || "https://i.pinimg.com/736x/1e/f8/15/1ef8156889dba99417ff2b3a6d99988d.jpg"} // Подстановка аватара по умолчанию
                    alt="Profile Picture"
                />
                <div className="profile-info">
                    <Link to="/profile">
                        <span>{userData.username}</span>
                    </Link>
                    <p>{userData.profession}</p>
                </div>
            </div>
            <div className="menu">
                <Link to="/home">
                    <i className="fa fa-home fa-xl" aria-hidden="true"></i>
                    <span>Главная</span>
                </Link>
                <Link to="/tasks">
                    <i className="fa fa-tasks fa-xl" aria-hidden="true"></i>
                    <span>Задачи</span>
                </Link>
                <Link to="/team">
                    <i className="fa fa-users fa-xl" aria-hidden="true"></i>
                    <span>Команда</span>
                </Link>
                <Link to="/profile">
                    <i className="fa fa-user-circle fa-xl" aria-hidden="true"></i>
                    <span>Профиль</span>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
