import React, {useState} from 'react'

import './Upload.css'
import zag from '../../images/zag.png'
import LicenseSettings from "../../components/LicenseSettings/LicenseSettings";



const Upload: React.FC = () => {
    const [image, setImage] = useState<File | null>(null)
    const [audio1, setAudio1] = useState<File | null>(null)
    const [audio2, setAudio2] = useState<File | null>(null)
    const [archive, setArchive] = useState<File | null>(null)
    const [productName, setProductName] = useState<string>('')
    const [productDescription, setProductDescription] = useState<string>('')
    const [bpm, setBpm] = useState<string>('')
    const [key, setKey] = useState<string>('')
    const [genre, setGenre] = useState<string>('')
    const [mood, setMood] = useState<string>('')
    const [isVisible, setIsVisible] = useState<boolean>(true)
    const [licenses, setLicenses] = useState<Array<{
        name: string;
        enabled: boolean;
        useLicensePrice: boolean;
        useCustomPrice: boolean;
        customPrice: string
    }>>(
        [
            {name: 'License 1', enabled: true, useLicensePrice: true, useCustomPrice: false, customPrice: ''},
            {name: 'License 2', enabled: true, useLicensePrice: true, useCustomPrice: false, customPrice: ''},
            {name: 'License 3', enabled: true, useLicensePrice: true, useCustomPrice: false, customPrice: ''},
        ]
    )

    const handleLicenseToggle = (index: number) => {
        const newLicenses = [...licenses]
        newLicenses[index].enabled = !newLicenses[index].enabled
        setLicenses(newLicenses)
    }

    const handleUseLicensePrice = (index: number) => {
        const newLicenses = [...licenses]
        newLicenses[index].useLicensePrice = true
        newLicenses[index].useCustomPrice = false // Ensure useCustomPrice is set to false
        newLicenses[index].customPrice = '' // Reset custom price when using license price
        setLicenses(newLicenses)
    }

    const handleUseCustomPrice = (index: number) => {
        const newLicenses = [...licenses]
        newLicenses[index].useLicensePrice = false
        newLicenses[index].useCustomPrice = true // Ensure useCustomPrice is set to true
        setLicenses(newLicenses)
    }

    const handleCustomPriceChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const newLicenses = [...licenses]
        const value = e.target.value.replace(/\D/g, '')
        newLicenses[index].customPrice = value
        newLicenses[index].useLicensePrice = false // Set to false when custom price is being used
        setLicenses(newLicenses)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        setImage(file)
    }

    const handleAudio1Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        if (file && (file.type === 'audio/wav' || file.type === 'audio/mp3')) {
            setAudio1(file)
        } else {
            alert('Please choose a file in WAV or MP3 format.')
        }
    }

    const handleAudio2Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        if (file && (file.type === 'audio/wav' || file.type === 'audio/mp3')) {
            setAudio2(file)
        } else {
            alert('Please choose a file in WAV or MP3 format.')
        }
    }

    const handleArchiveUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0]
        if (file && (file.type === 'application/zip' || file.type === 'application/x-rar-compressed')) {
            setArchive(file)
        } else {
            alert('Please choose a file in ZIP or RAR format.')
        }
    }

    const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '')
        setBpm(value)
    }

    const handleKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setKey(e.target.value)
    }

    const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setGenre(e.target.value)
    }

    const handleMoodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setMood(e.target.value)
    }

    const handleVisibilityChange = () => {
        setIsVisible(!isVisible)
    }

    const handleSave = () => {
        if (
            image &&
            audio1 &&
            audio2 &&
            archive &&
            productName.trim() !== '' &&
            productDescription.trim() !== '' &&
            bpm.trim() !== '' &&
            key.trim() !== '' &&
            genre.trim() !== '' &&
            mood.trim() !== ''
        ) {
            const dataToSend = {
                image,
                audio1,
                audio2,
                archive,
                productName,
                productDescription,
                bpm,
                key,
                genre,
                mood,
                isVisible,
                licenses,
            }

            console.log('Saved Data:', dataToSend)
        } else {
            alert('Please fill in all required fields.')
        }
    }

    const handleDelete = () => {
        console.log('удалил')
    }

    return (
        <div className="page-space">
            <div>
                <label>
                    {image ? (
                        <img src={URL.createObjectURL(image)} alt="Uploaded image" style={{maxWidth: '200px'}}/>
                    ) : (
                        <img src={zag} alt="Placeholder for cover upload" style={{maxWidth: '200px'}}/>
                    )}
                    <input type="file" accept="image/*" onChange={handleImageUpload}/>
                </label>
            </div>
            <div>
                <label>
                    Загрузите версию без voice tags (WAV or MP3 format):
                    <input type="file" accept="audio/wav, audio/mp3" onChange={handleAudio1Upload}/>
                    .WAV / .MP3
                </label>
            </div>
            <div>
                <label>
                    Загрузите версию с voice tags (WAV or MP3 format):
                    <input type="file" accept="audio/wav, audio/mp3" onChange={handleAudio2Upload}/>
                    .WAV / .MP3
                </label>
            </div>
            <div>
                <label>
                    Загрузите trackout:
                    <input type="file" accept="application/zip, application/x-rar-compressed"
                           onChange={handleArchiveUpload}/>
                    .ZIP / .RAR
                </label>
            </div>
            <div>
                <label>
                    Название бита:
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        autoComplete="none" // Отключить автозаполнение
                    />
                </label>
            </div>

            <div>
                <label>
                    Описание бита:
                    <textarea
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        autoComplete="none" // Отключить автозаполнение
                    />
                </label>
            </div>
            <div>
                <label>
                    Информация о бите:
                    <div>
                        <label>
                            BPM:
                            <input
                                type="text"
                                value={bpm}
                                onChange={handleBpmChange}
                                autoComplete="none" // Отключить автозаполнение
                            />
                        </label>
                    </div>
                    <div>
                        <label>
                            Тональность:
                            <select value={key} onChange={handleKeyChange}>
                                <option value="" disabled>
                                    Выберите тональность
                                </option>
                                <option value="C Major">C Major</option>
                                <option value="C Minor">C Minor</option>
                                <option value="С# Major">С# Major</option>
                                <option value="С# Minor">С# Minor</option>
                                <option value="D Major">D Major</option>
                                <option value="D Minor">D Minor</option>
                                <option value="D# Major">D# Major</option>
                                <option value="D# Minor">D# Minor</option>
                                <option value="E Major">E Major</option>
                                <option value="E Minor">E Minor</option>
                                <option value="F Major">F Major</option>
                                <option value="F Minor">F Minor</option>
                                <option value="F# Major">F# Major</option>
                                <option value="F# Minor">F# Minor</option>
                                <option value="G Major">G Major</option>
                                <option value="G Minor">G Minor</option>
                                <option value="G# Major">G# Major</option>
                                <option value="G# Minor">G# Minor</option>
                                <option value="A Major">A Major</option>
                                <option value="A Minor">A Minor</option>
                                <option value="A# Major">A# Major</option>
                                <option value="A# Minor">A# Minor</option>
                                <option value="B Major">B Major</option>
                                <option value="B Minor">B Minor</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Жанр:
                            <select value={genre} onChange={handleGenreChange}>
                                <option value="" disabled>
                                    Выберите жанр
                                </option>
                                <option value="Rock">Rock</option>
                                <option value="Pop">Pop</option>
                                <option value="Hip-hop">Hip-hop</option>
                                <option value="Trap">Trap</option>
                                <option value="Electronic">Electronic</option>
                                <option value="Classical">Classical</option>
                                <option value="Jazz">Jazz</option>
                                <option value="Blues">Blues</option>
                                <option value="Reggae">Reggae</option>
                                <option value="Country">Country</option>
                                <option value="Metal">Metal</option>
                                <option value="Rap">Rap</option>
                                <option value="R&B">R&B (Rhythm and Blues)</option>
                                <option value="Folk">Folk</option>
                                <option value="Latin">Latin</option>
                                <option value="Indie">Indie</option>
                                <option value="Punk">Punk</option>
                                <option value="Funk">Funk</option>
                                <option value="Disco">Disco</option>
                                <option value="Soul">Soul</option>
                                <option value="Club">Club</option>
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            Настроение:
                            <select value={mood} onChange={handleMoodChange}>
                                <option value="" disabled>
                                    Выберите настроение
                                </option>
                                <option value="Energetic">Энергичное (Energetic)</option>
                                <option value="Relaxing">Расслабляющее (Relaxing)</option>
                                <option value="Upbeat">Бодрое (Upbeat)</option>
                                <option value="Melancholic">Меланхоличное (Melancholic)</option>
                                <option value="Romantic">Романтичное (Romantic)</option>
                                <option value="Motivational">Мотивационное (Motivational)</option>
                                <option value="Mellow">Мягкое (Mellow)</option>
                                <option value="Uplifting">Воодушевляющее (Uplifting)</option>
                                <option value="Sentimental">Сентиментальное (Sentimental)</option>
                                <option value="Powerful">Мощное (Powerful)</option>
                                <option value="Dreamy">Мечтательное (Dreamy)</option>
                                <option value="Calm">Спокойное (Calm)</option>
                                <option value="Exciting">Захватывающее (Exciting)</option>
                                <option value="Nostalgic">Ностальгическое (Nostalgic)</option>
                                <option value="Euphoric">Эйфоричное (Euphoric)</option>
                                <option value="Reflective">Отражающее (Reflective)</option>
                                <option value="Soothing">Успокаивающее (Soothing)</option>
                                <option value="Dark">Темное (Dark)</option>
                                <option value="Chill">Чилл (Chill)</option>
                                <option value="Groovy">Груви (Groovy)</option>
                            </select>
                        </label>
                    </div>
                </label>
            </div>
            <div>
                {licenses.map((license, index) => (
                    <LicenseSettings
                        key={index}
                        license={license}
                        index={index}
                        onToggle={() => handleLicenseToggle(index)}
                        onUseLicensePrice={() => handleUseLicensePrice(index)}
                        onUseCustomPrice={() => handleUseCustomPrice(index)}
                        onCustomPriceChange={(e) => handleCustomPriceChange(e, index)}
                    />
                ))}
            </div>
            <div>
                <label>
                    Настройка приватности:
                    <input type="checkbox" checked={isVisible} onChange={handleVisibilityChange}/>
                    {isVisible ? ' Публичный' : ' Приватный'}
                </label>
            </div>
            <div>

                <button onClick={handleDelete}>Удалить</button>
                <button onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    )
}

export default Upload