import React, {useState} from 'react';
import './User.css';
import zag from '../../images/zag.png';

const User: React.FC = () => {
    const [activeTab, setActiveTab] = useState('beats');

    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className='page-space'>
            <div className='user-menu'>
                <img className='user-logo' src={zag} alt='user-logo'/>
                <div className='user-name-n-description'>
                    <div className='user-name'>betrayalove</div>
                    <div className='user-description'>Меня зовут Кирилл20см я из Урюпинска, пишу в стилях TRAP RAP и RnB
                        я очень люблю это дело. Надеюсь, Вам понравится мое творчество
                    </div>
                </div>


            </div>
            <div className='tab-buttons'>
                <div onClick={() => handleTabClick('beats')} className={activeTab === 'beats' ? 'active tab-buttons-button' : 'tab-buttons-button'}>Биты
                </div>
                <div onClick={() => handleTabClick('kits')} className={activeTab === 'kits' ? 'active tab-buttons-button' : 'tab-buttons-button'}>Киты</div>
                <div onClick={() => handleTabClick('licenses')}
                     className={activeTab === 'licenses' ? 'active tab-buttons-button' : 'tab-buttons-button'}>Лицензии
                </div>
                <div onClick={() => handleTabClick('info')} className={activeTab === 'info' ? 'active tab-buttons-button' : 'tab-buttons-button'}>Инфо</div>
            </div>

            {activeTab === 'beats' && <div>биты</div>}
            {activeTab === 'kits' && <div>киты</div>}
            {activeTab === 'licenses' && <div>лицензии</div>}
            {activeTab === 'info' && <div>инфо</div>}
        </div>
    );
};

export default User;
