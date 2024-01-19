import React from 'react';
import './ProfileSettings.css'


const ProfileSettings: React.FC = () => {
    return (
        <div className='standart_container'>
            <h2>Настройка профиля</h2>
            <form className='profile-settings'>
                <div className='label-and-input'>
                    <label htmlFor="username">Имя пользователя:</label>
                    <input className='standart_input' type="text" id="username" name="username"/>
                    <label htmlFor="displayName">Отображаемое имя:</label>
                    <input className='standart_input' type="text" id="displayName" name="displayName"/>
                    <label htmlFor="country">Страна:</label>
                    <input className='standart_input' type="text" id="country" name="country"/>
                    <label htmlFor="birthDate">Дата рождения:</label>
                    <input className='standart_input' type="date" id="birthDate" name="birthDate"/>
                    <label htmlFor="firstName">Имя:</label>
                    <input className='standart_input' type="text" id="firstName" name="firstName"/>
                    <label htmlFor="lastName">Фамилия:</label>
                    <input className='standart_input' type="text" id="lastName" name="lastName"/>
                    <label htmlFor="biography">Биография:</label>
                    <textarea className='standart-textarea' id="biography" name="biography"/>

                </div>
                <button className='submit-button' type="submit">Сохранить</button>
            </form>
        </div>
    );
};

export default ProfileSettings;
