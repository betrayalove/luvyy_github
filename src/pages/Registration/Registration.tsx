import React, {useEffect, useState} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import './Registration.css'

const Registration: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [email, setEmail] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault()

        if (password !== confirmPassword) {
            setError('Пароли не совпадают!')
            return
        }

        try {
            const response = await axios.post('/your-endpoint', {username, email, password, confirmPassword}, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.status === 200) {
                navigate('/login')
            } else {
                setError('Обработайте другие статусы ответа здесь')
            }
        } catch (error) {
            console.error('Ошибка при отправке данных:', error)
            setError('Ошибка при выполнении запроса')
        }
    }

    const handleLoginClick = (event: React.MouseEvent) => {
        event.preventDefault()
        navigate('/login')
    }
    useEffect(() => {
        document.getElementById('email')?.focus();
    }, []);

    return (
        <div className="standart_container">
            <h2>Страница регистрации</h2>
            <form onSubmit={handleSubmit}>

                <div className='label-and-input'>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input className='standart_input'
                           type="text"
                           id="username"
                           value={username}
                           required
                           placeholder="Придумайте имя пользователя"
                           onChange={(e) => setUsername(e.target.value)}/>
                    <label htmlFor="email">Email:</label>
                    <input className='standart_input'
                           type="email"
                           id="email"
                           name="email"
                           value={email}
                           required
                           placeholder="Введите ваш Email"
                           onChange={(e) => setEmail(e.target.value)} autoComplete="off"/>
                    <label htmlFor="password">Пароль:</label>
                    <input className='standart_input'
                           type="password"
                           id="password"
                           value={password}
                           required
                           placeholder="Придумайте пароль"
                           onChange={(e) => setPassword(e.target.value)}/>
                    <label htmlFor="confirmPassword">Подтвердите пароль:</label>
                    <input className='standart_input'
                           type="password"
                           id="confirmPassword"
                           value={confirmPassword}
                           onChange={(e) => setConfirmPassword(e.target.value)}
                           required
                           placeholder="Повторите пароль"/>
                </div>

                <button className='submit-button' type="submit">
                    Зарегистрироваться
                </button>
                <div onClick={handleLoginClick}>
                    Уже есть аккаунт
                </div>

                <hr></hr>
            </form>
            {error && <div>{error}</div>}
        </div>
    )
}

export default Registration
