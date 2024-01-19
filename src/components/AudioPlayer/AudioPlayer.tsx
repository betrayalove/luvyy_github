import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import './AudioPlayer.css'
import play from '../../images/svg/play.svg'
import pause from '../../images/svg/pause.svg'
import yesVolume from '../../images/svg/volume.svg'
import noVolume from '../../images/svg/no-volume.svg'
import addToCart from '../../images/svg/add-to-cart.svg'
interface IProps {
  id: number | undefined;
  isPlaying: boolean;
  setIsPlaying: (isPlaying: boolean) => void;
}

const AudioPlayer: React.FC<IProps> = ({ id, isPlaying, setIsPlaying }) => {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [trackData, setTrackData] = useState<any>(null)
  const [currentId] = useState<number | undefined>(undefined)
  const [volume, setVolume] = useState<number>(1)
  const [currentTime, setCurrentTime] = useState<number>(0)

  useEffect(() => {
    if (id && id !== currentId) {
      axios.get(`http://localhost:3001/products/${id}`)
        .then(response => {
          setTrackData(response.data)
          sessionStorage.setItem('trackData', JSON.stringify(response.data))
          // Обнуляем время воспроизведения при смене трека
          sessionStorage.setItem('trackTime', '0')
        })
        .catch(error => console.log(error))
    }
  }, [id])

  useEffect(() => {
    // Воспроизводим или приостанавливаем аудио в зависимости от значения isPlaying
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying])

  useEffect(() => {
    const savedTrackData = sessionStorage.getItem('trackData')
    if (savedTrackData) {
      setTrackData(JSON.parse(savedTrackData))
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (audioRef.current) {
        sessionStorage.setItem('trackTime', String(audioRef.current.currentTime))
        sessionStorage.setItem('volume', String(audioRef.current.volume))
      }
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    const savedVolume = sessionStorage.getItem('volume');
    if (audioRef.current && savedVolume) {
      audioRef.current.volume = Number(savedVolume);
      setVolume(Number(savedVolume));

      // Set the initial background color of the volume slider
      const percent = Number(savedVolume) * 100;
      const volumeSlider = document.querySelector('.right-player input') as HTMLInputElement;
      if (volumeSlider) {
        volumeSlider.style.background = `linear-gradient(to right, #ffffff ${percent}%, var(--secondary-text-color) ${percent}%)`;
      }
    }
  }, [trackData]);

  const handleMetadataLoaded = () => {
    const savedTime = sessionStorage.getItem('trackTime')
    if (audioRef.current && savedTime) {
      audioRef.current.currentTime = Number(savedTime)
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const volume = Number(event.target.value)
    setVolume(volume)
    if (audioRef.current) {
      audioRef.current.volume = volume
      // Вычисляем процент громкости
      const percent = volume * 100
      // Обновляем фон слайдера
      event.target.style.background = `linear-gradient(to right, #ffffff ${percent}%, var(--secondary-text-color) ${percent}%)`
    }
  }

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(event.target.value)
    setCurrentTime(time)
    if (audioRef.current) {
      audioRef.current.currentTime = time
      // Вычисляем процент воспроизведения
      const percent = (time / audioRef.current.duration) * 100
      // Обновляем фон слайдера
      event.target.style.background = `linear-gradient(to right, #ffffff ${percent}%, var(--secondary-text-color) ${percent}%)`
    }
  }

// Обновляем фон слайдера при обновлении времени воспроизведения
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime
      setCurrentTime(time)
      // Вычисляем процент воспроизведения
      const percent = (time / audioRef.current.duration) * 100
      // Находим слайдер в DOM и обновляем его фон
      const slider = document.querySelector('.time-slider') as HTMLElement
      if (slider) {
        slider.style.background = `linear-gradient(to right, #ffffff ${percent}%, var(--secondary-text-color) ${percent}%)`
      }
    }
  }

  useEffect(() => {
    if (window.innerWidth < 1000 && audioRef.current) {
      audioRef.current.volume = 1
    }
  }, [])


  if (!trackData) return null

  return (
    <div className="player-container">
      <div className="player">
        <audio src={trackData.musicLink} ref={audioRef} autoPlay={isPlaying} controls={false}
               onLoadedMetadata={handleMetadataLoaded}
               onTimeUpdate={handleTimeUpdate}/>
        <input type="range" min="0" max={audioRef.current?.duration || 0} value={currentTime}
               onChange={handleTimeChange} className="time-slider svg-el"/>
        <div className="player-controls">
          <div className="left-player">
            <img className="player-image" src={trackData.imageLink} alt="track-image"/>
            <div className="name-n-author">
              <p className='name'>{trackData.name}</p>
              <p className='author'>{trackData.author}</p>
            </div>

          </div>

          <div className="center-player">
            <img className='svg-el' src={isPlaying ? pause : play} onClick={handlePlayPause} alt="Volume"/>
          </div>

          <div className="right-player">
            <img className="svg-el add-to-cart" src={addToCart} alt="AddToCart"/>
            <img className="svg-el" src={volume > 0 ? yesVolume : noVolume} alt="Volume"/>

            <input className="svg-el" type="range" min="0" max="1" step="0.01" value={volume}
                   onChange={handleVolumeChange}/>
          </div>
        </div>
      </div>
    </div>
  )

}

export default AudioPlayer
