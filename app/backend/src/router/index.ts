import { Router } from 'express';
import TeamRouter from './TeamRouter';
import UserRouter from './UserRouter';
import MatchRouter from './MatchRouter';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', UserRouter);
router.use('/matches', MatchRouter);

export default router;
