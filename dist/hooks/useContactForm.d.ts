/// <reference types="react" />
/**
 * React hook to handle contact form submittion.
 * @param {string} url - Endpoint which email should be sent to
 * @param {object} onSuccess - Function to handle successful mail sent
 * @param {object} onError - Function to handle unsuccessful mail sent
 * @returns {object}
 */
declare const useContactForm: (url: string, companyEmailAddress: string, onSuccess: (data: unknown) => void, onError: (error: unknown) => void) => {
    form: {
        initialValues: {
            email: string;
            fullName: string;
            subject: string;
            message: string;
        };
        initialErrors: import("formik").FormikErrors<unknown>;
        initialTouched: import("formik").FormikTouched<unknown>;
        initialStatus: any;
        handleBlur: {
            (e: import("react").FocusEvent<any, Element>): void;
            <T = any>(fieldOrEvent: T): T extends string ? (e: any) => void : void;
        };
        handleChange: {
            (e: import("react").ChangeEvent<any>): void;
            <T_1 = string | import("react").ChangeEvent<any>>(field: T_1): T_1 extends import("react").ChangeEvent<any> ? void : (e: string | import("react").ChangeEvent<any>) => void;
        };
        handleReset: (e: any) => void;
        handleSubmit: (e?: import("react").FormEvent<HTMLFormElement>) => void;
        resetForm: (nextState?: Partial<import("formik").FormikState<{
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }>>) => void;
        setErrors: (errors: import("formik").FormikErrors<{
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }>) => void;
        setFormikState: (stateOrCb: import("formik").FormikState<{
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }> | ((state: import("formik").FormikState<{
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }>) => import("formik").FormikState<{
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }>)) => void;
        setFieldTouched: (field: string, touched?: boolean, shouldValidate?: boolean) => Promise<void> | Promise<import("formik").FormikErrors<{
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }>>;
        setFieldValue: (field: string, value: any, shouldValidate?: boolean) => Promise<void> | Promise<import("formik").FormikErrors<{
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }>>;
        setFieldError: (field: string, value: string) => void;
        setStatus: (status: any) => void;
        setSubmitting: (isSubmitting: boolean) => void;
        setTouched: (touched: import("formik").FormikTouched<{
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }>, shouldValidate?: boolean) => Promise<void> | Promise<import("formik").FormikErrors<{
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }>>;
        setValues: (values: import("react").SetStateAction<{
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }>, shouldValidate?: boolean) => Promise<void> | Promise<import("formik").FormikErrors<{
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }>>;
        submitForm: () => Promise<any>;
        validateForm: (values?: {
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }) => Promise<import("formik").FormikErrors<{
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }>>;
        validateField: (name: string) => Promise<void> | Promise<string>;
        isValid: boolean;
        dirty: boolean;
        unregisterField: (name: string) => void;
        registerField: (name: string, { validate }: any) => void;
        getFieldProps: (nameOrOptions: any) => import("formik").FieldInputProps<any>;
        getFieldMeta: (name: string) => import("formik").FieldMetaProps<any>;
        getFieldHelpers: (name: string) => import("formik").FieldHelperProps<any>;
        validateOnBlur: boolean;
        validateOnChange: boolean;
        validateOnMount: boolean;
        values: {
            email: string;
            fullName: string;
            subject: string;
            message: string;
        };
        errors: import("formik").FormikErrors<{
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }>;
        touched: import("formik").FormikTouched<{
            email: string;
            fullName: string;
            subject: string;
            message: string;
        }>;
        isSubmitting: boolean;
        isValidating: boolean;
        status?: any;
        submitCount: number;
    };
};
export default useContactForm;
