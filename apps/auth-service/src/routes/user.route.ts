import { Router } from 'express';
import clerkClient from '../utils/clerk.js';

const router: Router = Router();

router.get('/', async (req, res) => {
    const users = await clerkClient.users.getUserList();
    res.status(200).json(users);
});


router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await clerkClient.users.getUser(id);
    res.status(200).json(user);
});

router.post('/', async (req, res) => {
    try {
        type CreateParams = Parameters<typeof clerkClient.users.createUser>[0];
        const newUser: CreateParams = req.body;
        const user = await clerkClient.users.createUser(newUser);
        res.status(200).json(user);
    } catch (err: any) {
        const status = err.status || 500;
        const errors = err.errors || [];
        const message = errors.length > 0
            ? errors.map((e: any) => e.longMessage || e.message).join(", ")
            : err.message || "Internal server error";
        res.status(status).json({ message });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const user = await clerkClient.users.deleteUser(id);
    res.status(200).json(user);
});


export default router;
