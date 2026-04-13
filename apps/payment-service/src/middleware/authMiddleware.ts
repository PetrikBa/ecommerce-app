import { getAuth } from "@clerk/hono";
import { createMiddleware } from "hono/factory";

export const shouldBeUser = createMiddleware<{
    Variables:{
        userId: string
    }
}>(async (c, next) => {
     const { userId } = getAuth(c)

    if (!userId) {
        return c.json({ message: 'You are not logged in.' }, 401)
    }

    c.set("userId", userId);

    await next();
});