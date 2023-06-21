import { Request, Router, Response } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderController = new LeaderBoardController();

const leaderRouter = Router();

leaderRouter.get('/home', (req: Request, res: Response) => leaderController.getHome(req, res));
export default leaderRouter;
