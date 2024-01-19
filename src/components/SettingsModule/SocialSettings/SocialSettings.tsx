import React, {ChangeEvent, FormEvent, useState} from 'react';
import './SocialSettings.css';


const SocialSettings: React.FC = () => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    };

    return (
        <div className="standart_container">
            <h2>Настройка лицензий</h2>
            <form onSubmit={handleSubmit}>

                <button className="submit-button" type="submit">
                    Сохранить
                </button>
            </form>
        </div>
    );
};

export default SocialSettings;
