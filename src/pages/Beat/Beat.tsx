import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import IProduct from '../../interfaces';
import axios from 'axios';
import './Beat.css';
import play from '../../images/svg/play.svg';
import pause from '../../images/svg/pause.svg';
import imager from '../../images/zag.png'

interface IProps {
    setCurrentId: (id: number | undefined) => void;
    setIsPlaying: (isPlaying: boolean) => void;
}


const Beat: React.FC<IProps> = ({setCurrentId, setIsPlaying}) => {
    const {id} = useParams<{ id: string }>();
    const [currentTrackId, setCurrentTrackId] = useState<number | undefined>(undefined);
    const [isPlaying, setIsPlayingLocal] = useState(false);
    const [product, setProduct] = useState<IProduct | null>(null);
    const navigate = useNavigate()
    const handlePlay = (product: IProduct) => {
        setCurrentId(product.id);
        setCurrentTrackId(product.id);
        setIsPlaying(true);
        setIsPlayingLocal(true);
    };

    const handlePause = () => {
        setIsPlaying(false);
        setIsPlayingLocal(false);
    };

    useEffect(() => {
        // Fetch data based on the beat ID from the route parameter
        axios.get(`http://localhost:3001/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.log(error));
    }, [id]);

    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div className="page-space">
            <div className='beat-id-elements'>
                <div className='beat-id-left-bar'>
                    <div className="beat-card-id" key={product.id}>

                        <img className="beat-image-id" src={product.imageLink} alt={product.name}/>

                        {currentTrackId === product.id && isPlaying ? (
                            <div className="control-button-id" onClick={handlePause}>
                                <img src={pause} alt="pause-button-id"/>
                            </div>
                        ) : (
                            <div className="control-button-id" onClick={() => handlePlay(product)}>
                                <img src={play} alt="play-button-id"/>
                            </div>
                        )}


                    </div>
                    <div className='beat-id-free-download'>
                        <div>Скачать бесплатно</div>

                    </div>
                    <div className='beat-id-block-name'>Информация о бите:</div>
                    <div className='beat-id-info'>

                        <div><span>Название:</span> {product.name}</div>
                        <div onClick={() => {
                            navigate(`/user`)
                        }}><span>Автор:</span> {product.author}</div>
                        <div><span>Тип:</span> {product.type}</div>
                        <div><span>BPM:</span> {product.bpm}</div>
                    </div>
                </div>
                <div className='beat-id-right-bar'>

                    <div className='beat-id-block-name'>Лицензии:</div>
                    <div className='licenses'>

                        <div className='license'>
                            <div className='license-name'>Mp3 лицензия</div>

                            <div><span>Файлы:</span> .mp3</div>
                            <div><span>Прослушивания:</span> 10,000</div>
                            <div><span>Музыкальные видео:</span> 1</div>
                            <div><span>Коммерческие выступления:</span> разрешены</div>
                            <button className='buy-button'>₽500 купить</button>
                        </div>
                        <div className='license'>
                            <div className='license-name'>WAV лицензия</div>

                            <div><span>Файлы:</span> .wav</div>
                            <div><span>Прослушивания:</span> 100,000</div>
                            <div><span>Музыкальные видео:</span> 1</div>
                            <div><span>Коммерческие выступления:</span> разрешены</div>
                            <button className='buy-button'>₽1000 купить</button>
                        </div>
                        <div className='license'>
                            <div className='license-name'>TrackOut лицензия</div>

                            <div><span>Файлы:</span> .wav, архив с TrackOut</div>
                            <div><span>Прослушивания:</span> 10,000,000</div>
                            <div><span>Музыкальные видео:</span> БЕЗГРАНИЧНО</div>
                            <div><span>Коммерческие выступления:</span> разрешены</div>
                            <button className='buy-button'>₽2000 купить</button>
                        </div>
                    </div>
                    <img src={imager} className='youtube-player' alt='youtube-player'/>
                    <div className='beat-id-block-name'>
                        Комментарии
                    </div>
                    <div className='comment-added'>
                        <textarea className='comment-added-textarea'/>
                        <button className='comment-add-button'>Оставить комментарий</button>
                    </div>
                    <div className='comments'>
                        <div className='comment'>
                            <img className='comment-author-photo' src={imager} alt='comment-author-photo'/>
                            <div>
                                <div className='comment-author'>
                                    betrayalove
                                </div>
                                <div className='comment-content'>
                                    Очень хороший бит, ставлю лайк!
                                </div>
                            </div>
                        </div>
                        <div className='comment'>
                            <img className='comment-author-photo' src={imager} alt='comment-author-photo'/>
                            <div>
                                <div className='comment-author'>
                                    betrayalove
                                </div>
                                <div className='comment-content'>
                                    Очень хороший бит, ставлю лайк! Очень хороший бит, ставлю лайк! Очень хороший бит,
                                    ставлю лайк! Очень хороший бит, ставлю лайк!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    );
};

export default Beat;
