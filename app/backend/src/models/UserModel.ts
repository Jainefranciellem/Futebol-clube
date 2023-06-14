import IUser from '../Interfaces/IUsers';

import UsersModel from '../database/models/UsersModel';
import IUserModel from '../Interfaces/IUserModel';

export default class UserModel implements IUserModel {
  model = UsersModel;

  async findAll(email: IUser['email']): Promise<IUser | null> {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return null;
    const { id, password, username, role } = user;
    return { id, email, password, username, role };
  }
}
