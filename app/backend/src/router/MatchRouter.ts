import { Request, Router, Response } from 'express';
import MatchController from '../controllers/MatchesController';
import ValidateToken from '../middlewares/validationToken';
import validateMatch from '../middlewares/validationMatches';

const MatchesController = new MatchController();

const TeamRouter = Router();

TeamRouter.get('/', (req: Request, res: Response) => MatchesController.getAllMatches(req, res));
TeamRouter.patch('/:id/finish', ValidateToken, (req: Request, res: Response) =>
  MatchesController.finishMatches(req, res));

TeamRouter.patch('/:id', ValidateToken, (req: Request, res: Response) =>
  MatchesController.update(req, res));

TeamRouter.post('/', ValidateToken, validateMatch, (req: Request, res: Response) =>
  MatchesController.create(req, res));

export default TeamRouter;
