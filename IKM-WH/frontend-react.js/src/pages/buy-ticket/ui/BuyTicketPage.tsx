import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/widgets';
import { Footer } from '@/widgets/footer';
import { Container } from '@shared/ui/container';
import style from './BuyTicketPage.module.css';

export const BuyTicketPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Имитация отправки данных
        setTimeout(() => {
            setIsSubmitting(false);
            setSuccess(true);
            
            // Через 3 секунды редирект на главную
            setTimeout(() => {
                navigate('/');
            }, 3000);
        }, 1000);
    };

    if (success) {
        return (
            <>
                <Header />
                <main className={style.page}>
                    <Container>
                        <div className={style.successMessage}>
                            <div className={style.successIcon}>✓</div>
                            <h1>Билет успешно забронирован!</h1>
                            <p>Подтверждение отправлено на вашу почту</p>
                            <p className={style.redirectText}>Перенаправление на главную...</p>
                        </div>
                    </Container>
                </main>
                <Footer />
            </>
        );
    }

    return (
        <>
            <Header />
            <main className={style.page}>
                <Container>
                    <div className={style.content}>
                        <div className={style.header}>
                            <h1>Купить билет на фестиваль</h1>
                            <p>Заполните форму для бронирования билета</p>
                        </div>

                        <form className={style.form} onSubmit={handleSubmit}>
                            <div className={style.formGroup}>
                                <label htmlFor="firstName">
                                    Имя <span className={style.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Введите ваше имя"
                                    className={style.input}
                                />
                            </div>

                            <div className={style.formGroup}>
                                <label htmlFor="lastName">
                                    Фамилия <span className={style.required}>*</span>
                                </label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    placeholder="Введите вашу фамилию"
                                    className={style.input}
                                />
                            </div>

                            <div className={style.formGroup}>
                                <label htmlFor="email">
                                    Email <span className={style.required}>*</span>
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="example@email.com"
                                    className={style.input}
                                />
                            </div>

                            <div className={style.priceInfo}>
                                <div className={style.priceRow}>
                                    <span>Стоимость билета:</span>
                                    <span className={style.price}>2500 ₽</span>
                                </div>
                            </div>

                            <button 
                                type="submit" 
                                className={style.submitButton}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? 'Обработка...' : 'Купить билет'}
                            </button>

                            <p className={style.note}>
                                * После отправки формы на вашу почту придет письмо с подтверждением и инструкциями по оплате
                            </p>
                        </form>
                    </div>
                </Container>
            </main>
            <Footer />
        </>
    );
};
