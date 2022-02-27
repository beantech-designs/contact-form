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

  const options = {
    url: "http://www.domain.com",
    companyEmailAddress: "companyEmail@company.com",
    onSuccess,
    onError,
    template: (email, fullName, message) => `<h1>Name: ${fullName}</h1>
                                              <h2>Email: ${email}</h2>
                                              <p>${message}</p>
                                            `,
  };

  const { form } = useContactForm(options);
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

#### useContactForm(options)

`options`

- `url`: _required_ - Mail server endpoint.
- `companyEmailAddress`: _required_ - Email address of the host company.
- `onSuccess`: _required_ - Function to be called if email was successfully sent.
- `onError`: _required_ - Function to be called if an error occured when sending email.
- `template`: _optional_ - HTML template to render as email template.
