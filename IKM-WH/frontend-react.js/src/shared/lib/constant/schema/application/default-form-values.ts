import {ApplicationFormData} from "@shared/lib/constant/schema/application/application-form-schema.ts";

export const DEFAULT_APPLICATION_FORM_VALUES: Partial<ApplicationFormData> = {
    groupName: '',
    contactTelegram: '',
    contactPhone: '',
    genre: '',
    description: '',
    members: '',
};