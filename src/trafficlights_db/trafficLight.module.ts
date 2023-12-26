import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TrafficController } from './trafficLight.controller';
import { TrafficService } from './trafficLight.service'; 
import { TrafficSchema } from './trafficLight.model'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Traffic', schema: TrafficSchema }]), 
  ],
  controllers: [TrafficController], 
  providers: [TrafficService], 
})
export class TrafficModule {} 
