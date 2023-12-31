import * as bcrypt from 'bcryptjs';
import { ILogin } from '../Interfaces/ILogin';
import UserModel from '../models/UserModel';
import IUser from '../Interfaces/IUsers';
import IUsersModel from '../Interfaces/IUserModel';
import { ServiceMessage, ServiceResponse } from '../Interfaces/ServiceResponse';
import JWT from '../utils/JWT';
import { IToken } from '../Interfaces/Itoken';

export default class UserService {
  constructor(
    private userModel: IUsersModel = new UserModel(),
    private jwtService = JWT,
  ) { }

  public async login(data: ILogin): Promise<ServiceResponse<ServiceMessage | IToken>> {
    const user = await this.userModel.findAll(data.email);
    console.log(user);
    if (user) {
      if (!bcrypt.compareSync(data.password, user.password)) {
        return { status: 'INVALID_DATA', data: { message: 'Invalid email or password' } };
      }
      const { email, id, role, username } = user as IUser;
      const token = this.jwtService.sign({ email, id, role, username });
      return { status: 'SUCCESSFUL', data: { token } };
    }
    return { status: 'NOT_FOUND', data: { message: 'Invalid email or password' } };
  }
}
