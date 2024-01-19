import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import cart from '../../images/svg/cart.svg'
import notice from '../../images/svg/notice.svg'
import upload from '../../images/svg/upload.svg'
import menu from '../../images/svg/stash/menu.svg'
import profile from '../../images/svg/profile.svg'
import '../../index.css'
import { ThemeContext } from '../../context/ThemeContext'

const Header: React.FC = () => {
  const isAuthorized = false
  const { theme, setTheme } = useContext(ThemeContext)!
  const [mainMenuOpen, setMainMenuOpen] = useState(false)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(window.innerWidth) // Track window width
  const navigate = useNavigate()

  const closeMenus = () => {
    setMainMenuOpen(false)
    setProfileMenuOpen(false)
  }

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    closeMenus(); // Close menus when changing the theme
  };


  const toggleMainMenu = () => {
    setMainMenuOpen(!mainMenuOpen)
    setProfileMenuOpen(false)
  }

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!profileMenuOpen)
    setMainMenuOpen(false)
  }

  const handleResize = () => {
    setWindowWidth(window.innerWidth) // Update window width on resize
    closeMenus() // Close menus on resize
  }

  useEffect(() => {
    // Attach event listener for window resize
    window.addEventListener('resize', handleResize)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const authorizedMenu = (
    <div className="right-nav">
      <img className="svg-el" src={upload} alt="upload-logo" onClick={() => navigate('/upload-beat')}/>
      <img className="svg-el" src={cart} alt="cart-logo"/>
      <img className="svg-el" src={notice} alt="upload-logo" onClick={() => navigate('/notifications')}/>
      <img className="svg-el" src={profile} onClick={toggleProfileMenu} alt="profile-logo"/>
    </div>
  )

  const unauthorizedMenu = (
    <div className="right-nav">
      <img className="svg-el" src={profile} onClick={toggleProfileMenu} alt="profile-logo"/>
    </div>
  )

  const ProfileMenu = ({ isAuthorized, toggleTheme, closeMenus }: {
    isAuthorized: boolean;
    toggleTheme: () => void;
    closeMenus: () => void
  }) => {
    return (
      <>
        {isAuthorized ? (
          <div className="profile-menu">
            <div className='profile-menu-link' onClick={() => {closeMenus();navigate('/user')}}>Профиль</div>
            <div className='profile-menu-link' onClick={() => {closeMenus();navigate('/settings')}}>Настройки</div>
            <div className='profile-menu-link' onClick={toggleTheme}>Сменить тему</div>
            <div className='profile-menu-link' onClick={() => {closeMenus()}}>Выйти</div>
          </div>
        ) : (
          <div className="profile-menu">
            <div className='profile-menu-link' onClick={toggleTheme}>Сменить тему</div>
            <div className='profile-menu-link' onClick={() => {closeMenus();navigate('/login')}}>Войти</div>
            <div className='profile-menu-link' onClick={() => {closeMenus();navigate('/registration')}}>Зарегистрироваться</div>
          </div>
        )}
      </>
    )
  }

  return (
    <header className="main-header">
      <nav className="main-nav">
        <div className="left-nav">
          <Link className="logo" to="/" onClick={closeMenus}>
            LUVYY
          </Link>
          {windowWidth < 1000 ? (
            <>
              <img
                className="svg-el"
                src={menu}
                alt="menu-icon"
                onClick={toggleMainMenu}
              />
              {mainMenuOpen && (
                <div className="main-menu">
                  <Link to="/beats" onClick={closeMenus}>
                    Биты
                  </Link>
                  <Link to="/kits" onClick={closeMenus}>
                    Киты
                  </Link>
                  <Link to="/articles" onClick={closeMenus}>
                    Статьи
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="left-nav-without-logo">
              <Link to="/beats" onClick={closeMenus}>
                Биты
              </Link>
              <Link to="/kits" onClick={closeMenus}>
                Киты
              </Link>
              <Link to="/articles" onClick={closeMenus}>
                Статьи
              </Link>
            </div>
          )}
        </div>
        {isAuthorized ? authorizedMenu : unauthorizedMenu}
      </nav>
      {profileMenuOpen && <ProfileMenu isAuthorized={isAuthorized} toggleTheme={toggleTheme} closeMenus={closeMenus} />}
    </header>
  )
}

export default Header
