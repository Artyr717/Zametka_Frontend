import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(""); // Добавляем поле для username
    const [profession, setProfession] = useState(""); // Для профессии
    const [error, setError] = useState(null); // Для отображения ошибки
    const navigate = useNavigate(); // Хук для навигации

    const handleRegister = async (e) => {
        e.preventDefault();
        setError(null); // Сбрасываем сообщение об ошибке
        try {
            // Отправляем данные для регистрации
            const response = await axios.post("http://127.0.0.1:8000/api/user/register", {
                username, // Добавляем поле username
                email,
                password,
                profession, // Добавляем профессию
            });

            if (response.data.status_code === 200) {
                // Если регистрация успешна, перенаправляем на страницу входа
                navigate("/home/login");
            } else {
                // Если код состояния не 200, показываем ошибку
                setError("Произошла ошибка при регистрации. Попробуйте снова.");
            }
        } catch (err) {
            // Если ошибка, выводим сообщение
            setError("Ошибка регистрации. Попробуйте снова.");
            console.error("Registration error:", err);
        }
    };

    return (
        <div className="register">
            <h1>Регистрация</h1>
            <form onSubmit={handleRegister}>
                {error && <p style={{color: "red"}}>{error}</p>} {/* Отображаем ошибку */}
                <div className="username-div">
                    <label className="username">Юзернейм</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} // Обработчик для username
                        required
                    />
                </div>
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
                <div className="profession-div">
                    <label className="profession">Занятость</label>
                    <select
                        value={profession} // Значение, которое будет выбрано
                        onChange={(e) => setProfession(e.target.value)} // Обработчик изменения
                        required
                    >
                        <option value="" disabled>Выберите занятость</option>
                        <option value="Фуллстак">Фуллстак</option>
                        <option value="Фронтендер">Фронтендер</option>
                        <option value="Бэкендер">Бэкендер</option>
                        <option value="UX Дизайнер">UX Дизайнер</option>
                        <option value="UI Дизайнер">UI Дизайнер</option>
                        <option value="Тим-лид">Тим-лид</option>
                        <option value="Нет">Нет</option>
                    </select>
                </div>
                <button type="submit">Зарегистрироваться</button>
                <a className="already-have-acc" href="/login">Уже есть аккаунт?<br></br>Войдите!</a>
            </form>
        </div>
    );
}

export default Register;
