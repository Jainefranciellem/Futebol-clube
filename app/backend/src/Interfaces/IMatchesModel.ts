import IMatches from './IMatches';

export default interface IMatchesModel {
  findAll(query?: boolean): Promise<IMatches[]>
  update(id:number): Promise<IMatches>
}
