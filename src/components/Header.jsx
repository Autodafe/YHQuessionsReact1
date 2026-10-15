import { useState } from "react";
import { Link } from "react-router-dom";


const Header = () => {
    const [isOpen,setIsOpen] = useState(false)
    return (
        <header className="header">
            {/* <img src="/src/assets/YeaHubQuessionReact1.svg" alt="Yeahub Logo" /> */}
            <Link to="/">

                <picture>
                
                <source media="(min-width: 768px)" srcSet="/images/YeaHubQuessionReact1.svg" />
                
                <img src="/images/logoMobile.svg" alt="Yeahub Logo" />
                </picture>
            </Link>

            <div className="header__list-wrapper">

                <p className="header__dropdown">Подготовка 
                    <span className="header__dropdown-arrow">
                        <svg 
                        width="16" 
                        height="10" 
                        viewBox="0 0 16 10" 
                        fill="none" 
                        xmlns="http://w3.org"
                         
                            >
                        <path 
                          d="M1.5 1.5L8 8L14.5 1.5" 
                          stroke="#6A0BFF"         
                          strokeWidth="2.0"        
                          strokeLinecap="round"    
                          strokeLinejoin="round"    
                        />
                    </svg>
                    </span>
                </p>

                <ul className="header__list">
                    <li className="header__item">
                        <a className="header__item-link" href="#">База вопросов</a>
                    </li>
                    <li className="header__item">
                         <a className="header__item-link" href="#">Тренажёр</a>
                     </li>
                    <li className="header__item">
                        <a className="header__item-link" href="#">Материалы</a>
                    </li>
                    <li className="header__item">
                        <a className="header__item-link" href="#">Навыки(hh)</a>
                       </li>
                </ul>
            </div>

            <div className="header__identification-wrapper">
                <button type="button" className="header__burger" onClick={()=> setIsOpen(prev => !prev)}>
                    
                </button>

                    <div className={`header__identification ${isOpen ? 'open':''}`} >
                        <button type="button" className="header__login">Вход</button>
                        <button type="button" className="header__registration">Регистрация</button>
                    </div>
            </div>
        </header>
    );
};

export default Header;
