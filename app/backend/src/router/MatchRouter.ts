import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchesController';

const MatchesController = new MatchController();

const TeamRouter = Router();

TeamRouter.get('/', (req: Request, res: Response) => MatchesController.getAllMatches(req, res));

export default TeamRouter;
