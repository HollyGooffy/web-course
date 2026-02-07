// Простой тест схемы валидации
const { z } = require('zod');

const APPLICATION_FORM_SCHEMA = z.object({
    groupName: z
        .string()
        .min(1, { message: "Необходимо заполнить название группы" })
        .max(255, { message: "Имя группы не может превышать 255 символов" }),

    contactTelegram: z
        .string()
        .min(1, { message: "Необходимо заполнить Telegram" })
        .regex(/^@[a-zA-Z0-9_]{5,32}$/, { 
            message: "Telegram должен начинаться с @ и содержать от 5 до 32 символов (только буквы, цифры и _)" 
        }),

    contactPhone: z
        .string()
        .min(1, { message: "Необходимо заполнить телефон" })
        .regex(/^\+7\d{10}$/, { 
            message: "Телефон должен начинаться с +7 и содержать 10 цифр (например, +79991234567)" 
        }),

    genre: z
        .string()
        .min(1, { message: "Необходимо заполнить жанр" })
        .max(124, { message: "Жанр группы не может превышать 124 символов" }),

    description: z
        .string()
        .min(10, { message: "Описание должно содержать минимум 10 символов" })
        .max(1000, { message: "Описание не может превышать 1000 символов" }),

    members: z
        .string()
        .min(1, { message: "Укажите участников группы (каждый с новой строки)" }),

    instagram: z
        .string()
        .optional()
        .refine((val) => !val || val.startsWith('https://instagram.com/') || val.startsWith('https://www.instagram.com/'), {
            message: "Ссылка должна начинаться с https://instagram.com/"
        }),

    youtube: z
        .string()
        .optional()
        .refine((val) => !val || val.startsWith('https://youtube.com/') || val.startsWith('https://www.youtube.com/'), {
            message: "Ссылка должна начинаться с https://youtube.com/"
        }),
});

// Тестовые данные
const testData = {
    groupName: 'Тестовая группа',
    contactTelegram: '@testband',
    contactPhone: '+79991234567',
    genre: 'Рок',
    description: 'Описание группы минимум 10 символов',
    members: 'Иван Иванов\nПетр Петров',
    instagram: '',
    youtube: ''
};

console.log('Тестирование схемы валидации...\n');

try {
    const result = APPLICATION_FORM_SCHEMA.parse(testData);
    console.log('✅ Валидация прошла успешно!');
    console.log('Результат:', JSON.stringify(result, null, 2));
    console.log('\nТип поля members:', typeof result.members);
} catch (error) {
    console.error('❌ Ошибка валидации:');
    console.error(error.errors);
}

// Тест с числом вместо строки
console.log('\n\nТест с числом вместо строки в members:');
const badData = {
    ...testData,
    members: 5 // Число вместо строки
};

try {
    const result = APPLICATION_FORM_SCHEMA.parse(badData);
    console.log('⚠️ Неожиданно: валидация прошла');
    console.log('Результат:', result);
} catch (error) {
    console.log('✅ Ожидаемая ошибка:');
    console.log(error.errors[0].message);
}
