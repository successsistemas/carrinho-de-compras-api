import { Module } from "@nestjs/common";
import { MerchantsController } from "./merchants.controller";
import { MerchantsService } from "./merchants.service";

@Module({
	imports: [ MerchantsModule],
	providers: [MerchantsService],
	controllers: [MerchantsController],
	exports: [MerchantsService]
})
export class MerchantsModule { }