

const Footer = () => {
    return (
        <footer className="footer">
            <h2 className="footer__title">Yeahub</h2>
            <p className="footer__subtitle">Выбери,каким будет IT завтра вместе с нами</p>
            <p className="footer__description"> Yeahub - это полностью открытый проект призванный объединить и улучшить IT-сферу. Наш исходный код доступен
                для просмотра на GitHub. Дизайн проекта так же открыт для ознакомления в Figma.
            </p>
            <div className="footer__social">
                <div>© 2024 Yeahub Документы</div>
                <div className="footer__websocial websocial">
                    <h3 className="websocial__title">Ищите нас в других соцсетях @yeahub_it</h3>
                    <ul className="websocial__list">
                        <li className="websocial__item">
                            <a  href="#" className="websocial__link">
                                <img className="websocial__icon" src="/images/FigmaIcon.svg" alt="Figma Icon" />
                            </a>
                        </li>
                        <li className="websocial__item">
                            <a  href="#" className="websocial__link">
                                <img className="websocial__icon" src="/images/Telegram_white.svg" alt="Telegram Icon" />
                            </a>
                        </li>
                        <li className="websocial__item">
                            <a  href="#" className="websocial__link">
                                <img className="websocial__icon" src="/images/youtubeIcon.svg" alt="Youtube Icon" />
                            </a>
                        </li>
                        <li className="websocial__item">
                            <a  href="#" className="websocial__link">
                                <img className="websocial__icon" src="/images/tiktokIcon.svg" alt="TikTok Icon" />
                            </a>
                        </li>
                        <li className="websocial__item">
                            <a  href="#" className="websocial__link">
                                <img className="websocial__icon" src="/images/GithubIcon.svg" alt="GitHub Icon" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
