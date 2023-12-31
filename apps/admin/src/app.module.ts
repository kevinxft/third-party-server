import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { getConfig } from '../../utils';
import { EventsModule } from './events.module';
import { ResourceModule } from './resource/resource.module';
import { AuthModule } from './auth/auth.module';
const { ALL_IN_ONE } = getConfig();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ALL_IN_ONE.name,
        transport: Transport.TCP,
        options: {
          port: ALL_IN_ONE.port,
        },
      },
    ]),
    EventsModule,
    ResourceModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
