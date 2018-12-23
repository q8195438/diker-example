import { JsonController, Get } from 'routing-controllers';
import { BaseController } from 'diker';

@JsonController()
export class UserController extends BaseController {
  @Get('/')
  async index() {
    return this.services.user.unsafeListAll();
  }
}
