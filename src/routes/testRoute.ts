import { Router } from "express";
import {testHandler} from '../controllers/testController';

const router = Router();

router.get('/test', testHandler);

export default router;