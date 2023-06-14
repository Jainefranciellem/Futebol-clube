import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from 'sequelize';
import db from '.';
import Teams from './TeamsModel';

export default class Matches extends Model<InferAttributes<Matches>,
InferCreationAttributes<Matches>> {
  declare readonly id: CreationOptional<number>;
  declare homeTeamId: number;
  declare homeTeamGoals: number;
  declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Matches.init({
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  homeTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'home_team_id',
  },
  homeTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'home_team_goals',
  },
  awayTeamId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'away_team_id',
  },
  awayTeamGoals: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'away_team_goals',
  },
  inProgress: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
    field: 'in_progress',
  },
}, {
  sequelize: db,
  underscored: true,
  timestamps: false,
  modelName: 'teams',
});

Matches.belongsTo(Teams, {
  foreignKey: 'home_team_id',
  as: 'id_home_team',
});

Teams.hasMany(Matches, {
  foreignKey: 'home_team_id',
  as: 'id_home_team',
});

Matches.belongsTo(Teams, {
  foreignKey: 'away_team_id',
  as: 'away_team_id',
});

Teams.hasMany(Matches, {
  foreignKey: 'away_team_id',
  as: 'away_team_id',
});
