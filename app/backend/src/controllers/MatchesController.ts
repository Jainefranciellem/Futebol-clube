import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  constructor(
    private MatchService = new MatchesService(),
  ) { }

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress === undefined || inProgress === '') {
      const { data } = await this.MatchService.getAllMatches();
      return res.status(200).json(data);
    }

    const { data } = await this.MatchService.getAllMatches(inProgress === 'true');
    return res.status(200).json(data);
  }
}
