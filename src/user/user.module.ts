import { Module } from "@nestjs/common";
import { DatabaseService } from "src/database/api-database.service copy";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";


@Module({
	imports: [UserModule],
	providers: [UserService, DatabaseService],
	controllers: [UserController],
	exports: [UserService]
})
export class UserModule { }