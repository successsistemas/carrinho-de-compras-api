/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CriptoController } from './cripto.controller'
import { CriptoService } from './cripto.service'

@Module({
  controllers: [CriptoController],
  providers: [CriptoService, ConfigService],
  exports: [ConfigService],

})

export class CriptoModule {}
