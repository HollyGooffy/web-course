import { useState } from 'react';
import { Container } from '@/shared/ui/container';
import styles from './Header.module.css';
import {Link} from "react-router-dom";

export const Header = () => {
    const [isNavActive, setIsNavActive] = useState(false);

    const toggleNav = () => {
        setIsNavActive(!isNavActive);
    };

    return (
        <header className={styles.header} id="header">
            <Container className={styles.headerInner}>
                <Link to="/" className={styles.headerLogo}>
                    Welcome <span>Home</span>
                </Link>

                <button
                    className={styles.headerNavToggle}
                    id="navToggle"
                    onClick={toggleNav}
                >
                    <i className="fas fa-bars"></i>
                </button>

                <nav className={`${styles.headerNav} ${isNavActive ? styles.headerNavActive : ''}`}>
                    <Link to="/" className={styles.headerNavLink}>Главная</Link>
                    <Link to="/festivals" className={styles.headerNavLink}>Концерты</Link>
                    <a href="#groups" className={styles.headerNavLink}>Группы</a>
                    <Link to="/buy-ticket" className={styles.headerNavLink}>Купить билет</Link>
                </nav>
            </Container>
        </header>
    );
};