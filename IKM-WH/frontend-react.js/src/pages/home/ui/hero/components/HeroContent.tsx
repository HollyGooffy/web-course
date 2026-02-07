import style from '../Hero.module.css';

export const HeroContent = () => {
    return (
        <div>
            <h1 className={style.heroTitle}>Welcome Home</h1>
            <p className={style.heroSubtitle}>
                Музыкальное пространство для тех, кто хочет почувствовать себя
                по-настоящему дома. Концерты, мерч и фестивали — всё здесь.
            </p>
            <div className={style.heroButtons}>
                <a href="#poster" className="btn btn--primary">Афиша</a>
                <a href="#apply" className="btn btn--secondary">Подать заявку</a>
            </div>
        </div>
    );
};