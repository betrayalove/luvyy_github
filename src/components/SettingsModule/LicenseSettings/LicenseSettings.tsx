import React, {ChangeEvent, FormEvent, useState} from 'react';
import './LicenseSettings.css';

interface License {
    name: string;
    price: number;
    totalListens: number;
    videosWithBeat: number;
    livePerformances: boolean;
    mp3: boolean;
    wav: boolean;
    trackout: boolean;
    unlimitedListens: boolean;
    unlimitedVideos: boolean;
}

const LicenseSettings: React.FC = () => {
    const initialLicense: License = {
        name: '',
        price: 0,
        totalListens: 0,
        videosWithBeat: 0,
        livePerformances: false,
        mp3: false,
        wav: false,
        trackout: false,
        unlimitedListens: false,
        unlimitedVideos: false,
    };

    const [licenses, setLicenses] = useState<License[]>([
        {
            ...initialLicense,
            price: 0,
        },
        {...initialLicense},
        {...initialLicense},
        {...initialLicense},
        {
            ...initialLicense,
            livePerformances: true,
            mp3: true,
            wav: true,
            trackout: true,
            totalListens: -1,
            videosWithBeat: -1,
            unlimitedListens: true,
            unlimitedVideos: true,
        },
    ]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        // Handle conversion from 'Безлимитно' to the appropriate numeric value (-1) for submission
        // Убираем поля unlimitedListens и unlimitedVideos при сохранении
        const processedLicenses = licenses.map(({unlimitedListens, unlimitedVideos, ...license}) => license);


        // Log the processed licenses for submission (with -1 for unlimited values)
        console.log('License settings submitted:', processedLicenses);

        // Display the original licenses in the console (with '∞' for unlimited values)
        console.log('Original licenses:', licenses);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const {name, type, checked, value} = e.target;

        setLicenses((prevLicenses) => {
            const updatedLicenses = [...prevLicenses];
            const updatedLicense = {
                ...updatedLicenses[index],
                [name]:
                    type === 'checkbox'
                        ? checked && index !== 4
                        : type === 'number'
                            ? checked
                                ? -1
                                : Number(value)
                            : value,
            };

            // Handle unlimitedListens and unlimitedVideos
            if (name === 'unlimitedListens' || name === 'unlimitedVideos') {
                updatedLicense.totalListens = checked ? -1 : updatedLicense.totalListens;
                updatedLicense.videosWithBeat = checked ? -1 : updatedLicense.videosWithBeat;
            }

            updatedLicenses[index] = updatedLicense;

            // If it's the fifth license, disable all checkboxes and set them to true
            if (index === 4) {
                updatedLicense.livePerformances = true;
                updatedLicense.mp3 = true;
                updatedLicense.wav = true;
                updatedLicense.trackout = true;
            }

            return updatedLicenses;
        });
    };

    return (
        <div className="standart_container">
            <h2>Настройка лицензий</h2>
            <form onSubmit={handleSubmit}>
                <div className='licenses'>
                    {licenses.map((license, index) => (
                        <div key={index} className="licen">
                            <div className='label-and-input'>
                                Название лицензии:
                                <input
                                    className="standart_input"
                                    type="text"
                                    name="name"
                                    value={license.name}
                                    onChange={(e) => handleChange(e, index)}
                                />

                                Цена:
                                <input
                                    className="standart_input"
                                    type="number"
                                    name="price"
                                    value={license.price}
                                    onChange={(e) => handleChange(e, index)}
                                    disabled={index === 0}
                                />

                                Количество прослушиваний:
                                <input
                                    className="standart_input"
                                    type={license.unlimitedListens ? 'text' : 'number'}
                                    name="totalListens"
                                    value={license.unlimitedListens ? '∞' : license.totalListens}
                                    onChange={(e) => handleChange(e, index)}
                                    disabled={license.unlimitedListens || index === 4}
                                />

                                Безлимитно
                                <input
                                    type="checkbox"
                                    name="unlimitedListens"
                                    checked={license.unlimitedListens}
                                    onChange={(e) => handleChange(e, index)}
                                    disabled={index === 4}
                                />

                                Видео с данным битом:
                                <input
                                    className="standart_input"
                                    type={license.unlimitedVideos ? 'text' : 'number'}
                                    name="videosWithBeat"
                                    value={license.unlimitedVideos ? '∞' : license.videosWithBeat}
                                    onChange={(e) => handleChange(e, index)}
                                    disabled={license.unlimitedVideos || index === 4}
                                />

                                Безлимитно
                                <input
                                    type="checkbox"
                                    name="unlimitedVideos"
                                    checked={license.unlimitedVideos}
                                    onChange={(e) => handleChange(e, index)}
                                    disabled={index === 4}
                                />

                                Живые выступления:
                                <input
                                    type="checkbox"
                                    name="livePerformances"
                                    checked={license.livePerformances}
                                    onChange={(e) => handleChange(e, index)}
                                    disabled={index === 4}
                                />

                                MP3:
                                <input
                                    type="checkbox"
                                    name="mp3"
                                    checked={license.mp3}
                                    onChange={(e) => handleChange(e, index)}
                                    disabled={index === 4}
                                />

                                WAV:
                                <input
                                    type="checkbox"
                                    name="wav"
                                    checked={license.wav}
                                    onChange={(e) => handleChange(e, index)}
                                    disabled={index === 4}
                                />

                                Trackout:
                                <input
                                    type="checkbox"
                                    name="trackout"
                                    checked={license.trackout}
                                    onChange={(e) => handleChange(e, index)}
                                    disabled={index === 4}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                <button className="submit-button" type="submit">
                    Сохранить
                </button>
            </form>
        </div>
    );
};

export default LicenseSettings;
