import { PickType } from '@nestjs/swagger'
import { CreateUserRq } from './create-user.rq';
export class LoginRq extends PickType(CreateUserRq, ['email', 'password'] as const) {}