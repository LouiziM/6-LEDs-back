import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EspController } from './esp_controller/esp_controller';
import { TrafficModule } from './trafficlights_db/trafficLight.module';

@Module({
  imports: [
    TrafficModule,
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: process.env.MONGODB_URI,
      }),
    }),
    ScheduleModule.forRoot(),
    ConfigModule.forRoot(),
  ],
  controllers: [AppController, EspController],
  providers: [AppService],
})
export class AppModule {}
