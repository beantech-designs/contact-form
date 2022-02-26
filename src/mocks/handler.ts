import { rest } from "msw";

export const handlers: any[] = [
    rest.post("/test", (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ success: true }));
    }),
];
