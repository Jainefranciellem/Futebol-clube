import MatchesModel from '../models/MatchesModel';
import IMatches from '../Interfaces/IMatches';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';

export default class MatchesService {
  constructor(
    private MatchModel = new MatchesModel(),
  ) {}

  public async getAllMatches(query?: boolean): Promise<ServiceResponse<IMatches[]>> {
    const allMatches = await this.MatchModel.findAll(query);
    return { status: 'SUCCESSFUL', data: allMatches };
  }

  public async updateFinish(id: number): Promise<ServiceResponse<ServiceMessage>> {
    await this.MatchModel.updateFinish(id);
    return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
  }

  public async update(
    id: number,
    homeTeamGoals: number,
    awayTeamGoals: number,
  ): Promise<ServiceResponse<ServiceMessage>> {
    await this.MatchModel.update(id, homeTeamGoals, awayTeamGoals);
    return { status: 'SUCCESSFUL', data: { message: 'Updated' } };
  }

  public async create(data: IMatches): Promise<ServiceResponse<IMatches>> {
    const dataMatchs = await this.MatchModel.create({ ...data, inProgress: true });
    return { status: 'SUCCESSFUL', data: dataMatchs };
  }
}
