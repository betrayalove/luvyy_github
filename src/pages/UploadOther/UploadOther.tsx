import React, {useState} from 'react';
import axios from 'axios';
import './UploadOther.css';
import zag from '../../images/zag.png';

const UploadOther: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [archive, setArchive] = useState<File | null>(null);
    const [productName, setProductName] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [selectedGenre, setSelectedGenre] = useState('');
    const [productPrice, setProductPrice] = useState<number | ''>('');
    const [isVisible, setIsVisible] = useState(true); // Add state for visibility setting

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setImage(file);
    };

    const handleArchiveUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        setArchive(file);
    };

    const handleDelete = () => {
        // Implement the deletion logic as needed
    };

    const handleSave = () => {
        if (
            image &&
            archive &&
            productName.trim() !== '' &&
            productDescription.trim() !== '' &&
            selectedGenre !== '' &&
            productPrice !== ''
        ) {
            const dataToSend = {
                image,
                archive,
                productName,
                productDescription,
                selectedGenre,
                productPrice,
                isVisible,
            };

            // You can send the data to the server using axios or perform other actions here
            console.log('Saved Data:', dataToSend);
        } else {
            alert('Please fill in all required fields.');
        }
    };

    const handleVisibilityChange = () => {
        setIsVisible((prevVisibility) => !prevVisibility);
    };
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
                    Загрузите архив:
                    <input type="file" accept="application/zip, application/x-rar-compressed"
                           onChange={handleArchiveUpload}/>
                    .ZIP / .RAR
                </label>
            </div>

            <div>
                <label>
                    Название товара:
                    <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)}
                           autoComplete="none"/>
                </label>
            </div>

            <div>
                <label>
                    Описание товара:
                    <textarea
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        autoComplete="none"
                    />
                </label>
            </div>

            <div>
                <label>
                    Информация о товаре:
                    <div>
                        <label>
                            Жанр:
                            <select value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                                <option>Выберите тип товара</option>
                                <option value="Rock">Rock</option>
                                <option value="Pop">Pop</option>
                                <option value="Hip-hop">Hip-hop</option>
                                <option value="Trap">Trap</option>
                            </select>
                        </label>
                    </div>
                </label>
            </div>
            <div>
                <label>
                    Цена товара:
                    <input
                        type="number"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.valueAsNumber || '')}
                        autoComplete="none"
                    />
                </label>
            </div>
            <div>
                <label>
                    Настройка приватности:
                    <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={handleVisibilityChange}
                    />
                    {isVisible ? ' Публичный' : ' Приватный'}
                </label>
            </div>
            <div>
                <button onClick={handleDelete}>Удалить</button>
                <button onClick={handleSave}>Сохранить</button>
            </div>
        </div>
    );
};

export default UploadOther;
