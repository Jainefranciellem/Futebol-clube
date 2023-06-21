import sequelize = require('sequelize');
import TeamModel from '../models/teamModel';

const querySequelize: any = {
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
  order: [
    [sequelize.literal('totalVictories'), 'DESC'],
    [sequelize.literal('goalsBalance'), 'DESC'],
    [sequelize.literal('goalsFavor'), 'DESC'],
  ],
};

export default querySequelize;
