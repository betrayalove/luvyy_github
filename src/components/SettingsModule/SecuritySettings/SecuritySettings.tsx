import React, {ChangeEvent, FormEvent} from 'react';
import './SecuritySettings.css'


const SecuritySettings: React.FC = () => {
    return (
        <div className="standart_container">
            <h2>Безопасность</h2>
            <form>
                <div className="label-and-input">
                    <label htmlFor="changeEmail">Изменить Email:</label>
                    <input
                        className='standart_input'
                        type="email"
                        id="changeEmail"
                        name="changeEmail"/>
                </div>
                <button className='submit-button' type="button">
                    Изменить Email
                </button>
                <div className="label-and-input">
                    <label htmlFor="changeUsername">Изменить Логин:</label>
                    <input
                        className='standart_input'
                        type="text"
                        id="changeUsername"
                        name="changeUsername"/>
                </div>
                <button className='submit-button' type="button">
                    Изменить Логин
                </button>
                <div className="label-and-input">
                    <label htmlFor="oldPassword">Старый пароль:</label>
                    <input
                        className='standart_input'
                        type="password"
                        id="oldPassword"
                        name="oldPassword"/>
                    <label htmlFor="newPassword">Новый пароль:</label>
                    <input
                        className='standart_input'
                        type="password"
                        id="newPassword"
                        name="newPassword"/>
                    <label htmlFor="confirmPassword">Подтверждение пароля:</label>
                    <input
                        className='standart_input'
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"/>

                </div>
                <button className='submit-button' type="button">
                    Изменить Пароль
                </button>
            </form>
        </div>
    );
};

export default SecuritySettings;
