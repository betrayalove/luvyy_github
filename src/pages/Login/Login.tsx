import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import './Login.css';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/', {email, password}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const {accessToken, refreshToken} = response.data;

                document.cookie = `jwt=${accessToken}; path=/`;
                document.cookie = `refreshToken=${refreshToken}; path=/`;

                navigate('/products'); // Redirect to the main page after successful authorization
            }
        } catch (err) {
            console.error('Error during login:', err);

        }

    };

    const handleRegisterClick = (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/registration');
    };

    return (
        <div className="standart_container">
            <h2>Авторизация</h2>
            <form onSubmit={handleSubmit}>
                <div className='label-and-input'>
                    <label htmlFor="email">Email:</label>
                    <input
                        className='standart_input'
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Введите ваш Email"
                    />
                    <label htmlFor="password">Пароль:</label>
                    <input
                        className='standart_input'
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Введите ваш пароль"
                    />
                </div>

                <button className='submit-button' type="submit">
                    Авторизоваться
                </button>

                <div onClick={handleRegisterClick}>
                    Еще нет аккаунта
                </div>
                <hr></hr>

            </form>
        </div>
    );
};

export default Login;
