"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const formik_1 = require("formik");
const Yup = __importStar(require("yup"));
const axios_1 = __importDefault(require("axios"));
/**
 * React hook to handle contact form submittion.
 * @param {string} url - Endpoint which email should be sent to
 * @param {object} onSuccess - Function to handle successful mail sent
 * @param {object} onError - Function to handle unsuccessful mail sent
 * @returns {object}
 */
const useContactForm = (url, companyEmailAddress, onSuccess, onError) => {
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
            var _a;
            const schema = Yup.object({
                url: Yup.string().url("Invalid url").required("URL is required"),
                email: Yup.string()
                    .email("Company emmail address is invalid.")
                    .required("Company email address is required."),
            });
            try {
                yield schema.validate({
                    url,
                    email: companyEmailAddress,
                });
                const { data } = yield (0, axios_1.default)({
                    method: "POST",
                    url,
                    data: {
                        to: [companyEmailAddress],
                        subject,
                        body: `<div>
                      <p>From: ${fullName}(<strong>${email}</strong>)</p>
                      <div>${message}</div>
                    </div>`,
                    },
                });
                onSuccess(data);
                resetForm();
            }
            catch (error) {
                if (error === null || error === void 0 ? void 0 : error.response) {
                    return onError(Object.assign({}, (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data));
                }
                if (error === null || error === void 0 ? void 0 : error.errors) {
                    return onError(Object.assign(Object.assign({}, error), { message: error === null || error === void 0 ? void 0 : error.errors.join("/n") }));
                }
                return onError({
                    message: "Something went wrong please try again",
                });
            }
        }),
    });
    return {
        form,
    };
};
exports.default = useContactForm;
//# sourceMappingURL=useContactForm.js.map