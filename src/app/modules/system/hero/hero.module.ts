import { HeroController } from "./hero.controller"
import { Module } from "@nestjs/common"

@Module({
  controllers: [HeroController],
})
export class HeroModule { }