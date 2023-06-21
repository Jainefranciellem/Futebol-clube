import sequelize = require('sequelize');
import TeamModel from '../database/models/TeamsModel';
import MatchModel from '../database/models/MatchesModel';
import { ISequelizeLeaderboard } from '../Interfaces/ILeaderBoard';
// import Matches from '../database/models/MatchesModel';
// import IMatches from '../Interfaces/IMatches';
// import ITeam from '../Interfaces/ITeam';
// import ILeaderboard from '../Interfaces/ILeaderBoard';

// type leader = Required<IMatches>;

export default class LeaderBoardService {
  constructor(
    private matchModel = MatchModel,
    private teamModel = TeamModel,
  ) { }

  static calculateHomePoints(homeTeamGoals: number, awayTeamGoals: number): number {
    if (homeTeamGoals > awayTeamGoals) return 3;
    if (homeTeamGoals === awayTeamGoals) return 1;
    return 0;
  }

  public async getHome() {
    const allMatchs = await this.matchModel.findAll({
      include: [{ model: TeamModel, as: 'homeTeam', attributes: ['teamName'] }],
      attributes: [
        [sequelize.literal('COUNT(matches.id)'), 'totalGames'],
        [sequelize.literal(`SUM(CASE WHEN matches.home_team_goals > matches.away_team_goals 
          THEN 1 ELSE 0 END)`), 'totalVictories'],
        [sequelize.literal(`SUM(CASE WHEN matches.home_team_goals < matches.away_team_goals 
          THEN 1 ELSE 0 END)`), 'totalLosses'],
        [sequelize.literal(`SUM(CASE WHEN matches.home_team_goals = matches.away_team_goals 
          THEN 1 ELSE 0 END)`), 'totalDraws'],
        [sequelize.literal('SUM(matches.home_team_goals)'), 'goalsFavor'],
        [sequelize.literal('SUM(matches.away_team_goals)'), 'goalsOwn'],
      ],
      where: { inProgress: false },
      group: 'home_team_id',
    });
    return allMatchs.map(({ dataValues }) => dataValues) as unknown as ISequelizeLeaderboard[];
  }

  public async homeLeaderBoard() {
    const matchs = await this.getHome();
    const leaderBoard = matchs.map((match) => ({
      name: match.homeTeam.teamName,
      totalPoints: Number(match.totalVictories) * 3 + Number(match.totalDraws),
      totalGames: Number(match.totalGames),
      totalVictories: Number(match.totalVictories),
      totalLosses: Number(match.totalLosses),
      totalDraws: Number(match.totalDraws),
      goalsFavor: Number(match.goalsFavor),
      goalsOwn: Number(match.goalsOwn),
    }));
    return leaderBoard;
  }
}
