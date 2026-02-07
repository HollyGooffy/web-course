import { Container } from "@shared/ui/container";
import { SectionTitle } from "@shared/ui/sectionTitle";
import { Button } from "@shared/ui/button/ui";
import { useApplicationForm } from "./hooks/useApplicationForm";
import { FormField } from "./components/FormField";
import { TextAreaField } from "./components/TextAreaField";
import { StatusMessage } from "./components/StatusMessage";
import style from './ApplyForm.module.css';

export const ApplyForm = () => {
    const { form, isLoading, submitStatus, onSubmit, onError } = useApplicationForm();
    const { register, handleSubmit, formState: { errors } } = form;

    return (
        <section className={style.formSection} id="apply">
            <Container>
                <SectionTitle>Подать заявку на фестиваль</SectionTitle>
                <form className={style.form} onSubmit={handleSubmit(onSubmit, onError)}>
                    <h2 className={style.formTitle}>Расскажите о вашей группе</h2>

                    <StatusMessage status={submitStatus} />

                    <FormField
                        id="groupName"
                        label="Название группы *"
                        placeholder="Введите название группы"
                        register={register}
                        error={errors.groupName}
                    />

                    <FormField
                        id="contactTelegram"
                        label="Telegram для связи *"
                        placeholder="@username"
                        register={register}
                        error={errors.contactTelegram}
                    />

                    <FormField
                        id="contactPhone"
                        label="Телефон для связи *"
                        placeholder="+79991234567"
                        type="tel"
                        register={register}
                        error={errors.contactPhone}
                        helpText="Формат: +7 и 10 цифр слитно (например, +79991234567)"
                    />

                    <FormField
                        id="genre"
                        label="Жанр *"
                        placeholder="Укажите жанр музыки"
                        register={register}
                        error={errors.genre}
                    />

                    <TextAreaField
                        id="description"
                        label="Описание группы *"
                        placeholder="Расскажите о вашей группе, опыте выступлений, репертуаре..."
                        rows={4}
                        register={register}
                        error={errors.description}
                    />

                    <TextAreaField
                        id="members"
                        label="Участники группы *"
                        placeholder="Укажите имена участников (каждый с новой строки)&#10;Например:&#10;Иван Иванов&#10;Петр Петров&#10;Сергей Сергеев"
                        rows={5}
                        register={register}
                        error={errors.members}
                    />
                    
                    <Button
                        variant='primary'
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? "Отправка..." : 'Отправить заявку'}
                    </Button>
                </form>
            </Container>
        </section>
    );
};