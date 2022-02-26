"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const formik_1 = require("formik");
const Yup = require("yup");
const axios_1 = require("axios");
/**
 * React hook to handle contact form submittion.
 * @param {string} url - Endpoint which email should be sent to
 * @param {object} onSuccess - Function to handle successful mail sent
 * @param {object} onError - Function to handle unsuccessful mail sent
 * @returns {object}
 */
const useContactForm = (url, onSuccess, onError) => {
    const form = (0, formik_1.useFormik)({
        initialValues: {
            email: "",
            fullName: "",
            subject: "",
            message: "",
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required("Your fullname is required."),
            email: Yup.string()
                .email("Invalid email address.")
                .required("Your email address is required."),
            subject: Yup.string().required("Field is required."),
            message: Yup.string().required("Please input a message."),
        }),
        onSubmit: ({ email, fullName, subject, message }, { resetForm }) => __awaiter(void 0, void 0, void 0, function* () {
            const schema = Yup.object({
                url: Yup.string().url("Invalid url").required("URL is required"),
            });
            try {
                const isValid = yield schema.isValid({ url });
                if (!isValid)
                    throw new Error("Invalid URL");
                const { data } = yield (0, axios_1.default)({
                    method: "POST",
                    url,
                    data: {
                        email,
                        fullName,
                        subject,
                        message,
                    },
                });
                onSuccess(data);
            }
            catch (error) {
                onError(error.message);
            }
        }),
    });
    return {
        form,
    };
};
exports.default = useContactForm;
//# sourceMappingURL=useContactForm.js.map