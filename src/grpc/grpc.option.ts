import { ReflectionService } from "@grpc/reflection"
import { GrpcOptions, Transport } from "@nestjs/microservices"
import path from "path"

export const grpcOptions: GrpcOptions = {
  transport: Transport.GRPC,
  options: {
    package: 'hero',
    protoPath: path.join(__dirname, './hero/hero.proto'),
    url: `0.0.0.0:3000`,
    onLoadPackageDefinition: (pkg, server) => {
      new ReflectionService(pkg).addToServer(server)
    },
  },
}