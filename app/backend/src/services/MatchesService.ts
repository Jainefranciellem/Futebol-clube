import MatchesModel from '../models/MatchesModel';
import IMatches from '../Interfaces/IMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import IMatchesModel from '../Interfaces/IMatchesModel';

export default class MatchesService {
  constructor(
    private MatchModel: IMatchesModel = new MatchesModel(),
  ) {}

  public async getAllMatches(query?: boolean): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.MatchModel.findAll(query);
    return { status: 'SUCCESSFUL', data: allMatches };
  }
}
