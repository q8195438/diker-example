import { ObjectType, Field, Int } from 'type-graphql';
import { Length, IsEmail, Matches, IsInt } from 'class-validator';
import { BaseEntity, BaseModel } from 'diker';

export const USERNAME_VALIDATOR = Matches(/^[0-9a-zA-Z_\-\.]{4,32}$/);
export const PASSWORD_VALIDATOR = Length(6, 32);

@ObjectType()
export class UserEntity extends BaseEntity {
  @Field() @USERNAME_VALIDATOR
  username:string;
  @PASSWORD_VALIDATOR
  password:string;
  @Field() @IsEmail()
  email:string;
  @Field() @Matches(/^admin|user$/)
  role:'admin'|'user';
  @Field(() => Int) @IsInt()
  points:number;
}

export default class extends BaseModel<UserEntity> {
  protected tableName = 'user';

  getByUsername(username:string) {
    return this.getOne({username});
  }

  getById(id:number) {
    return this.getOne({id});
  }
}
