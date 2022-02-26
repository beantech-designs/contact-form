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
        const mockFunction = jest.fn();
        const errFunction = jest.fn();
        const { result } = renderHook(() =>
            useContactForm(
                "/api/test",
                "bobslegend795@gmail.com",
                mockFunction,
                errFunction,
            ),
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

        expect(result.current.form.submitCount).toBe(1);
    });
});
