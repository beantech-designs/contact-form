import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios, { AxiosResponse, AxiosError } from "axios";

/**
 * React hook to handle contact form submittion.
 * @param {string} url - Endpoint which email should be sent to
 * @param {object} onSuccess - Function to handle successful mail sent
 * @param {object} onError - Function to handle unsuccessful mail sent
 * @returns {object}
 */

type Options = {
  url: string;
  companyEmailAddress: string;
  onSuccess: (data: AxiosResponse) => void;
  onError: (error: AxiosError | unknown) => void;
  template?: (email: string, fullName: string, message: string) => string;
};

const useContactForm = ({
  url,
  companyEmailAddress,
  onSuccess,
  onError,
  template,
}: Options) => {
  const [isSending, setIsSending] = useState<boolean>(false);

  const form = useFormik<{
    email: string;
    fullName: string;
    subject: string;
    message: string;
  }>({
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
    onSubmit: async ({ email, fullName, subject, message }, { resetForm }) => {
      setIsSending(true);
      const schema = Yup.object({
        url: Yup.string().url("Invalid url").required("URL is required"),
        email: Yup.string()
          .email("Company emmail address is invalid.")
          .required("Company email address is required."),
      });
      try {
        await schema.validate({
          url,
          email: companyEmailAddress,
        });

        const { data } = await axios({
          method: "POST",
          url,
          data: {
            to: [companyEmailAddress],
            subject,
            body: template
              ? template(email, fullName, message)
              : `<div>
                      <p>From: ${fullName}(<strong>${email}</strong>)</p>
                      <div>${message}</div>
                    </div>`,
          },
        });
        setIsSending(false);
        resetForm();
        onSuccess(data);
      } catch (error) {
        setIsSending(false);
        if (error?.response) {
          return onError({
            ...error?.response?.data,
          });
        }

        if (error?.errors) {
          return onError({
            ...error,
            message: error?.errors.join("/n"),
          });
        }

        return onError({
          message: "Something went wrong please try again",
        });
      }
    },
  });

  return {
    form,
    isSending,
  };
};

export default useContactForm;
