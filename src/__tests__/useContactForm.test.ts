import { renderHook, act } from "@testing-library/react-hooks";
import { setupServer } from "msw/node";
import { handlers } from "../mocks/handler";
import { useContactForm } from "../";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("useContactForm hook", () => {
    test("success", async () => {
        let successData = null;
        const onSuccess = (data: any) => {
            successData = data;
        };
        const onError = (data: any) => {
            console.log(data);
        };
        const { result, waitForNextUpdate } = renderHook(() =>
            useContactForm("/test", "bobslegend795@gmail.com", onSuccess, onError),
        );

        await act(async () => {
            result.current.form.setValues({
                email: "beantech.designs@gmail.com",
                fullName: "Beantech",
                subject: "Testing",
                message: "Testing message",
            });

            await result.current.form.submitForm();
        });

        // await waitForNextUpdate();

        // expect(result.current.form.values.email).toBe("bob");
        // expect(result.current.form.submitCount).toBe(10);
        expect(result.current.message).toBe("hello");
    // expect(successData).toBe("Hello");
    });
});
