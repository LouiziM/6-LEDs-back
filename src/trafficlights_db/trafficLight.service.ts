import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Traffic } from './trafficLight.model'; 

@Injectable()
export class TrafficService {
  constructor(
    @InjectModel('Traffic') private readonly trafficModel: Model<Traffic>,
  ) {}

  async insertTraffic(id: string, long: number, lat: number,color: string) {
    const newTraffic = new this.trafficModel({
      id,
      long,
      lat,
      color,
    });
    const result = await newTraffic.save();
    return result.id as string;
  }

  async getTraffic() {
    const trafficData = await this.trafficModel.find().exec();
    return trafficData.map(traffic => ({
      id: traffic.id,
      long: traffic.long,
      lat: traffic.lat,
      color: traffic.color,
    }));
  }

  async getSingleTraffic(trafficId: string) {
    const traffic = await this.findTraffic(trafficId);
    return {
      id: traffic.id,
      long: traffic.long,
      lat: traffic.lat,
      color: traffic.color,

    };
  }
  async getSingleColor(trafficId: string) {
    const traffic = await this.findTraffic(trafficId);
    console.log(traffic.color)
    return {
      color: traffic.color,

    };
  }
  async updateTraffic(
    trafficId: string,
    long: number,
    lat: number,
    color: string,

  ) {
    const updatedTraffic = await this.findTraffic(trafficId);
    if (long) {
      updatedTraffic.long = long;
    }
    if (lat) {
      updatedTraffic.lat = lat;
    }
    if (color) {
      updatedTraffic.color = color;
    }
    updatedTraffic.save();
  }

  async deleteTraffic(trafficId: string) {
    const result = await this.trafficModel.deleteOne({ id: trafficId }).exec();
    if (result != null) {
      throw new NotFoundException('Could not find traffic data.');
    }
  }

  private async findTraffic(id: string): Promise<Traffic> {
    try {
      const traffic = await this.trafficModel.findOne({ id: id }); 
      if (!traffic) {
        throw new NotFoundException('Could not find traffic data.');
      }
  
      return traffic as Traffic;
    } catch (error) {
      throw new NotFoundException('Could not find traffic data.');
    }
  }
  
  async updateTrafficColor(id: string, color: string) {
    const traffic = await this.findTraffic(id);
    if (!traffic) {
      throw new NotFoundException(`stops here ${id} for some reason`);
    }
    console.log(` ${id} changed to ${color}`)
    traffic.color = color;
    await traffic.save();
  }
  

}
