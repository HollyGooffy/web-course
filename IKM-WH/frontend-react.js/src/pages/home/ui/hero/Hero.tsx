import style from '@pages/home/ui/hero/Hero.module.css'
import { Container } from "@shared/ui/container";
import { Fan } from "@pages/home/ui/hero/fan";
import { HeroContent } from "./components/HeroContent";

export const Hero = () => {
    return (
        <section className={style.hero}>
            <Container className={style.heroGrid}>
                <HeroContent />
                <Fan />
            </Container>
        </section>
    );
};