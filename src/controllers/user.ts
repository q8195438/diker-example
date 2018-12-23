import { JsonController, Body, Post } from 'routing-controllers';
import { BaseController } from 'diker';
import { IsEmail } from 'class-validator';
import { USERNAME_VALIDATOR, PASSWORD_VALIDATOR } from '../models/user';

class InRegister {
  @USERNAME_VALIDATOR
  username:string;
  @PASSWORD_VALIDATOR
  password:string;
  @IsEmail()
  email:string;
}

@JsonController()
export class UserController extends BaseController {
  @Post('/register')
  async register(@Body() body:InRegister) {
    return this.services.user.register(body);
  }
}
