import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Beats.css';
import play from '../../images/svg/play.svg';
import pause from '../../images/svg/pause.svg';
import IProduct from '../../interfaces';

interface IProps {
  setCurrentId: (id: number | undefined) => void;
  setIsPlaying: (isPlaying: boolean) => void;
}

const BeatCard: React.FC<{ product: IProduct, currentTrackId: number | undefined, isPlaying: boolean, handlePlay: () => void, handlePause: () => void }> = React.memo(({ product, currentTrackId, isPlaying, handlePlay, handlePause }) => {
  return (
      <div className="beat-card" key={product.id}>
        <Link to={`/beats/${product.id}`}>
          <img className="beat-image" src={product.imageLink} alt={product.name} />
        </Link>

        {currentTrackId === product.id && isPlaying ? (
            <div className="control-button" onClick={handlePause}>
              <img src={pause} alt="pause-button" />
            </div>
        ) : (
            <div className="control-button" onClick={handlePlay}>
              <img src={play} alt="play-button" />
            </div>
        )}

        <div className="price-n-type">
          <div className="beat-price">{product.price}</div>
          <div className="beat-type">{product.type}</div>
        </div>

        <div className="beat-name">
          <Link to={`/beats/${product.id}`}>
            {product.name}
          </Link>
        </div>

        <Link to={`/user`}>
          <div className="beat-author">{product.author}</div>
        </Link>
      </div>
  );
});

const Beats: React.FC<IProps> = ({ setCurrentId, setIsPlaying }) => {
  const [currentTrackId, setCurrentTrackId] = useState<number | undefined>(undefined);
  const [isPlaying, setIsPlayingLocal] = useState(false);
  const [products, setProducts] = useState<IProduct[]>([]);

  const handlePlay = useCallback((product: IProduct) => {
    setCurrentId(product.id);
    setCurrentTrackId(product.id);
    setIsPlaying(true);
    setIsPlayingLocal(true);
  }, [setCurrentId, setCurrentTrackId, setIsPlaying, setIsPlayingLocal]);

  const handlePause = useCallback(() => {
    setIsPlaying(false);
    setIsPlayingLocal(false);
  }, [setIsPlaying, setIsPlayingLocal]);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios.get('http://localhost:3001/products', { cancelToken: source.token })
        .then(response => setProducts(response.data))
        .catch(error => console.log(error));

    return () => {
      source.cancel(); // Cleanup on component unmount
    };
  }, []);

  if (!products.length) {
    return <div>Loading...</div>;
  }

  return (
      <div className="container">
        <div className="beats-list">
          {products.map(product => (
              <BeatCard
                  key={product.id}
                  product={product}
                  currentTrackId={currentTrackId}
                  isPlaying={isPlaying}
                  handlePlay={() => handlePlay(product)}
                  handlePause={handlePause}
              />
          ))}
        </div>
      </div>
  );
};

export default Beats;
