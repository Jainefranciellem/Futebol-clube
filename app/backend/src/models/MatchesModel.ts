import MatchesModel from '../database/models/MatchesModel';
import IMatches from '../Interfaces/IMatches';
import TeamModel from '../database/models/TeamsModel';

export default class MatchModel {
  model = MatchesModel;

  async findAll(query?: boolean): Promise<IMatches[]> {
    const inProgressBolean = query === undefined ? {} : { inProgress: query };
    const dbData = await this.model.findAll({
      where: inProgressBolean,
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ] }) as unknown as IMatches[];
    return dbData.map(({
      id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress, homeTeam, awayTeam,
    }) => (
      { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress, homeTeam, awayTeam }
    ));
  }

  async updateFinish(id: number): Promise<number> {
    const [affectedRows] = await this.model.update({ inProgress: false }, { where: { id } });
    return affectedRows;
  }

  async update(
    id: number,
    homeTeamGoals:
    IMatches['homeTeamGoals'],
    awayTeamGoals: IMatches['awayTeamGoals'],
  ): Promise<number> {
    const [affectedRows] = await this.model.update({
      homeTeamGoals,
      awayTeamGoals,
    }, { where: { id } });
    return affectedRows;
  }

  async create(data: IMatches): Promise<IMatches> {
    const dbData = await this.model.create(data);
    return dbData;
  }
}
