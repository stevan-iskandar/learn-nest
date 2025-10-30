import { Public } from "@/decorators/auth.decorator"
import type { Hero, HeroById } from "@/grpc/hero/hero.interface"
import { Metadata, type ServerUnaryCall } from "@grpc/grpc-js"
import { Controller, Get, Param, Query } from "@nestjs/common"
import { GrpcMethod } from "@nestjs/microservices"

@Controller()
export class HeroController {
  @Public()
  @GrpcMethod('HeroService', 'FindOne')
  @Get('find')
  findOne(@Query() data: HeroById, metadata: Metadata, call: ServerUnaryCall<any, any>): Hero | undefined {
    const items: Hero[] = [
      { id: 1, name: 'Deku' },
      { id: 2, name: 'All Might' },
    ]
    console.log('get called')
    return items.find(({ id }) => id == data.id)
  }
}