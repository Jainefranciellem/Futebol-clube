import { Request, Router, Response } from 'express';
import TeamController from '../controllers/TeamController';

const teamController = new TeamController();

const TeamRouter = Router();

TeamRouter.get('/teams', (req: Request, res: Response) => teamController.getAllTeams(req, res));
TeamRouter.get('/teams/:id', (req: Request, res: Response) => teamController.getTeamById(req, res));

export default TeamRouter;
