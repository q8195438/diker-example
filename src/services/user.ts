import bcrypt from 'bcryptjs';
import sha1 from 'sha1';
import { UserEntity } from '../models/user';
import { BaseService } from 'diker';
import { Err } from 'diker';

const BCRYPT_ROUND = 5;
const DEFAULT_ROLE = 'user' as UserEntity['role'];

function hashPassword(password:string) {
  return bcrypt.hash(password, BCRYPT_ROUND);
}

export default class UserService extends BaseService {
  private err = Err(this, {
    username_already_exists: [1000, '用户名已存在'],
    email_already_exists: [1001, '邮箱已存在'],
    incorrect_username_or_password: [1002, '用户名或密码不正确'],
  });

  private async resetPassword(id:number, password:string) {
    return this.models.user.update({id}, {
      password: await hashPassword(password),
    });
  }

  private async checkPassword(id:number, hash:string, password:string) {
    if (hash.length === 40) {
      if (sha1(password) === hash) {
        await this.resetPassword(id, password);
        return true;
      }
      return false;
    }
    return bcrypt.compare(password, hash);
  }

  public async login(username:string, password:string) {
    const user = await this.models.user.getOne({username}, 'id', 'password', 'role');
    if (!user || !await this.checkPassword(user.id, user.password, password)) {
      throw new this.err.incorrect_username_or_password({username, password});
    }
    return {
      id: user.id,
      username,
      role: user.role,
    };
  }

  public async register({username, password, email}:Pick<UserEntity, 'username' | 'password' | 'email'>) {
    if (await this.models.user.exists({ username })) {
      throw new this.err.username_already_exists({ username });
    }
    if (await this.models.user.exists({ email })) {
      throw new this.err.email_already_exists({ email });
    }
    return this.models.user.insert({
      username, email,
      password: await hashPassword(password),
      role: DEFAULT_ROLE,
    }, 'id', 'username', 'role');
  }

  public async unsafeListAll() {
    return this.models.user.getMany({});
  }
}
