import MatchesModel from '../database/models/MatchesModel';
import IMatches from '../Interfaces/IMatches';
import TeamModel from '../database/models/TeamsModel';

export default class MatchModel {
  model = MatchesModel;

  async findAll(query: boolean): Promise<IMatches[]> {
    const inProgressBolean = query === null ? {} : { inProgress: query };
    const dbData = await this.model.findAll({
      where: inProgressBolean,
      include: [
        { model: TeamModel, as: 'homeTeam', attributes: ['teamName'] },
        { model: TeamModel, as: 'awayTeam', attributes: ['teamName'] },
      ] });
    return dbData.map(({
      id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress,
    }) => (
      { id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress }
    ));
  }
}
