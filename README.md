# Beantech Contact Form

A custom hook for handling contact form submission.

# Installing

Using npm:

```
$ npm install @beantech-designs/contact-form
```

## Example

```jsx
import { useContactForm } from "@beantech-designs/contact-form";

const ContactForm = () => {
  const onSuccess = (data) => {
    console.log(data);
  };

  const onError = (error) => {
    console.log(error);
  };

  // useContactForm takes in three parameters
  // - url: The emailing server url to send the form information.
  // - onSuccess: A function to handle a successfull email sent.
  // - onError: A function to handle any error if the form fails to submit

  const { form } = useContactForm("url", onSuccess, onError);
  return (
    <form onSubmit={form.handleSubmit}>
      // fullName
      <div>
        <input
          type="text"
          name="fullName"
          onChange={form.handleChange}
          value={form.values.fullName}
        />
        // validation error message
        {form.touched.fullName && form.errors.fullName ? (
          <div>{form.errors.fullName}</div>
        ) : null}
      </div>
      // Email
      <div>
        <input
          type="email"
          name="email"
          onChange={form.handleChange}
          value={form.values.email}
        />
        // validation error message
        {form.touched.email && form.errors.email ? (
          <div>{form.errors.email}</div>
        ) : null}
      </div>
      // subject
      <div>
        <input
          type="text"
          name="subject"
          onChange={form.handleChange}
          value={form.values.subject}
        />
        // validation error message
        {form.touched.subject && form.errors.subject ? (
          <div>{form.errors.subject}</div>
        ) : null}
      </div>
      // message
      <div>
        <textarea
          name="message"
          onChange={form.handleChange}
          value={form.values.message}
        ></textarea>
        // validation error message
        {form.touched.message && form.errors.message ? (
          <div>{form.errors.message}</div>
        ) : null}
      </div>
      <input type="submit" value="Submit" disabled={form.isSubmitting} />
    </form>
  );
};
```
