import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

/**
 * React hook to handle contact form submittion.
 * @param {string} url - Endpoint which email should be sent to
 * @param {object} onSuccess - Function to handle successful mail sent
 * @param {object} onError - Function to handle unsuccessful mail sent
 * @returns {object}
 */
const useContactForm = (
    url: string,
    companyEmailAddress: string,
    onSuccess: (data: unknown) => void,
    onError: (error: unknown) => void,
) => {
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
                      body: `<div>
                      <p>From: ${fullName}(<strong>${email}</strong>)</p>
                      <div>${message}</div>
                    </div>`,
                  },
              });
              onSuccess(data);
              resetForm();
          } catch (error) {
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
    };
};

export default useContactForm;
