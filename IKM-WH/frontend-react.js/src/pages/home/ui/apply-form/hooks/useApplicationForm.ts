import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { APPLICATION_FORM_SCHEMA, DEFAULT_APPLICATION_FORM_VALUES } from "@shared/lib/constant/schema/application";
import { ApplicationFormData, useApplicationSubmit } from "@entities/application";

export const useApplicationForm = () => {
    const { isLoading, submitStatus, submitApplication } = useApplicationSubmit();
    
    const form = useForm<ApplicationFormData>({
        resolver: zodResolver(APPLICATION_FORM_SCHEMA),
        defaultValues: DEFAULT_APPLICATION_FORM_VALUES,
        mode: 'onSubmit',
        reValidateMode: 'onSubmit'
    });

    const onSubmit = async (data: ApplicationFormData) => {
        const result = await submitApplication(data);
        if (result.success) {
            form.reset(DEFAULT_APPLICATION_FORM_VALUES);
        }
    };

    const onError = (errors: any) => {
        console.error('Validation errors:', errors);
    };

    return {
        form,
        isLoading,
        submitStatus,
        onSubmit,
        onError
    };
};