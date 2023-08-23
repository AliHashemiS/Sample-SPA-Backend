import { Router } from 'express';

import { signIn, signUp, getAllUsers } from '../controllers/users.controller';

const router = Router();

router.post('/authenticate', signIn);

router.post('/register', signUp);

router.get('/users', getAllUsers);

export default router;