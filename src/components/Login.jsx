import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

function Login({setAuth}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null); // Для отображения ошибки
    const navigate = useNavigate(); // Хук для навигации

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null); // Сбрасываем сообщение об ошибке
        try {
            const response = await axios.post("http://127.0.0.1:8000/api/user/login", {
                email,
                password,
            });

            // Сохраняем токен в localStorage
            sessionStorage.setItem("token", response.data.access_token);

            // Устанавливаем авторизацию
            setAuth(true);

            // Перенаправляем на страницу профиля
            navigate("/home");
            window.location.reload();
        } catch (err) {
            // Если ошибка, выводим сообщение
            setError("Invalid email or password. Please try again.");
            console.error("Login error:", err);
        }
    };

    return (
        <div className="login">
            <h1>Вход</h1>
            <form onSubmit={handleLogin}>
                {error && <p style={{color: "red"}}>{error}</p>} {/* Отображаем ошибку */}
                <div className="email-div">
                    <label className="email">Почта</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="password-div">
                    <label className="password">Пароль</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit">
                    Вход
                </button>
                <a className="dont-have-acc" href="/register">Нет аккаунта?<br></br>Зарегистрируйся!</a>
            </form>
        </div>
    );
}

Login.propTypes = {
    setAuth: PropTypes.func.isRequired,
};

export default Login;
