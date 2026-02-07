import {z} from "zod";

export const APPLICATION_FORM_SCHEMA = z.object({
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
        .min(3, { message: "Необходимо заполнить жанр" })
        .max(124, { message: "Жанр группы не может превышать 124 символов" }),

    description: z
        .string()
        .min(10, { message: "Описание должно содержать минимум 10 символов" })
        .max(1000, { message: "Описание не может превышать 1000 символов" }),

    members: z
        .string()
        .min(1, { message: "Укажите участников группы (каждый с новой строки)" }),
});

export type ApplicationFormData = z.infer<typeof APPLICATION_FORM_SCHEMA>;