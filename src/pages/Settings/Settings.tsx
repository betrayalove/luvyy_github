import React, {useState, ChangeEvent, FormEvent} from 'react';
import LicenseSettings from "../../components/SettingsModule/LicenseSettings/LicenseSettings";
import SecuritySettings from "../../components/SettingsModule/SecuritySettings/SecuritySettings";
import ProfileSettings from "../../components/SettingsModule/ProfileSettings/ProfileSettings";
import SocialSettings from "../../components/SettingsModule/SocialSettings/SocialSettings";

const Settings: React.FC = () => {
    const [activeTab, setActiveTab] = useState('profile-settings');


    const handleTabClick = (tab: string) => {
        setActiveTab(tab);
    };

    return (
        <div className='page-space'>
            <div className='tab-buttons'>
                <div onClick={() => handleTabClick('profile-settings')}
                     className={activeTab === 'profile-settings' ? 'active tab-buttons-button' : 'tab-buttons-button'}>
                    Настройка профиля
                </div>
                <div onClick={() => handleTabClick('licenses')}
                     className={activeTab === 'licenses' ? 'active tab-buttons-button' : 'tab-buttons-button'}>
                    Настройка лицензий
                </div>
                <div onClick={() => handleTabClick('social')}
                     className={activeTab === 'social' ? 'active tab-buttons-button' : 'tab-buttons-button'}>
                    Социальные сети
                </div>
                <div onClick={() => handleTabClick('security')}
                     className={activeTab === 'security' ? 'active tab-buttons-button' : 'tab-buttons-button'}>
                    Безопасность
                </div>
            </div>

            {activeTab === 'profile-settings' && (
                <ProfileSettings/>
            )}
            {activeTab === 'licenses' && (
                <LicenseSettings/>
            )}
            {activeTab === 'security' && (
                <SecuritySettings/>
            )}
            {activeTab === 'social' &&
              <SocialSettings/>
            }
        </div>
    );
};

export default Settings;
