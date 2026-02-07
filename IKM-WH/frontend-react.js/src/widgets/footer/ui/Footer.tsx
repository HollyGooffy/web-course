import React from 'react';
import {Music, Mail, MapPin, Clock} from 'lucide-react';
import { useNavigation } from '@shared/hooks/useNavigation';
import style from './Footer.module.css';

const TelegramIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path
            d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.13-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
    </svg>
);

const TikTokIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path
            d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
);

const VKIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path
            d="M15.684 0H8.316C1.592 0 0 1.592 0 8.316v7.368C0 22.408 1.592 24 8.316 24h7.368C22.408 24 24 22.408 24 15.684V8.316C24 1.592 22.408 0 15.684 0zm3.692 17.123h-1.744c-.66 0-.864-.525-2.05-1.727-1.033-1.01-1.49-.9-1.744-.9-.356 0-.458.102-.458.593v1.575c0 .424-.135.678-1.253.678-1.846 0-3.896-1.118-5.335-3.202C4.624 10.857 4.03 8.57 4.03 8.096c0-.254.102-.491.593-.491h1.744c.441 0 .61.203.78.677.863 2.49 2.303 4.675 2.896 4.675.22 0 .322-.102.322-.66V9.721c-.068-1.186-.695-1.287-.695-1.71 0-.204.17-.407.44-.407h2.744c.373 0 .508.203.508.643v3.473c0 .372.17.508.271.508.22 0 .407-.136.813-.542 1.254-1.406 2.151-3.574 2.151-3.574.119-.254.322-.491.763-.491h1.744c.525 0 .644.271.525.643-.22 1.017-2.354 4.031-2.354 4.031-.186.305-.254.44 0 .78.186.254.796.779 1.203 1.253.745.847 1.32 1.558 1.473 2.05.17.49-.085.744-.576.744z"/>
    </svg>
);

export const Footer: React.FC = () => {
    const { goToAdminLogin } = useNavigation();

    const handleLogoDoubleClick = () => {
        goToAdminLogin();
    };

    return (
        <footer className={style.footer}>
            <div className={style.container}>
                <div className={style.footerContent}>
                    <div className={style.mainInfo}>
                        <div className={style.logo}>
                            <Music size={32}/>
                            <span 
                                className={style.logoText}
                                onDoubleClick={handleLogoDoubleClick}
                            >
                                WELCOME HOME
                            </span>
                        </div>
                        <p className={style.description}>
                            Музыкальные фестивали, которые объединяют сердца и души.
                            Создаем незабываемые моменты и коллекционные воспоминания.
                        </p>
                        <div className={style.socialLinks}>
                            <a
                                href="https://t.me/Whmdf"
                                className={style.socialLink}
                                aria-label="Telegram"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <TelegramIcon/>
                            </a>
                            <a
                                href="https://www.tiktok.com/@welcomehome_perm"
                                className={style.socialLink}
                                aria-label="TikTok"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <TikTokIcon/>
                            </a>
                            <a
                                href="https://vk.com/club231931102"
                                className={style.socialLink}
                                aria-label="VKontakte"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <VKIcon/>
                            </a>
                        </div>
                    </div>

                    <div className={style.contactInfo}>
                        <h4>Контакты</h4>
                        <div className={style.contactItem}>
                            <Mail size={16}/>
                            <a href="mailto:welcomehome@gmail.com">welcomehome@gmail.com</a>
                        </div>
                        <div className={style.contactItem}>
                            <MapPin size={16}/>
                            <span>Пермь, Россия</span>
                        </div>
                        <div className={style.contactItem}>
                            <Clock size={16}/>
                            <span>Пн-Пт: 10:00-19:00</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};