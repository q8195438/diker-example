import { Resolver, Query, Arg, Int } from 'type-graphql';
import { BaseResolver } from 'diker';
import { UserEntity } from '../models/user';
import { ReturnEntity } from 'diker';

@Resolver(() => UserEntity)
export default class UserResolver extends BaseResolver {
  @Query(() => UserEntity)
  @ReturnEntity(UserEntity)
  async user(@Arg('id', () => Int) id:number) {
    const user = await this.models.user.getById(id);
    if (!user) {
      throw new Error('2333');
    }
    return user;
  }
}