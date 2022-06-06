import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
	imports: [UserService, UserController],
	providers: [UserService],
	controllers: [UserController],
	exports: [UserService]
})
export class UserModule { }