import { Router } from 'express';
import TeamRouter from './TeamRouter';
import UserRouter from './UserRouter';
import MatchRouter from './MatchRouter';
import leaderboardRouter from './LearderBoard';

const router = Router();

router.use('/teams', TeamRouter);
router.use('/login', UserRouter);
router.use('/matches', MatchRouter);
router.use('/leaderboard', leaderboardRouter);

export default router;
