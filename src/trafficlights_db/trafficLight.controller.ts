import { Controller, Post, Body, Get, Param, Patch, Delete , Query } from '@nestjs/common';
import { TrafficService } from './trafficLight.service'; 

@Controller('traffic') 
export class TrafficController { 
  constructor(private readonly trafficService: TrafficService) {} 

  @Post()
  async addTraffic( 
    @Body('id') trafficId: string,
    @Body('long') trafficLong: number,
    @Body('lat') trafficLat: number,
    @Body('color') color: string,

  ) {
    const generatedId = await this.trafficService.insertTraffic( 
      trafficId,
      trafficLong,
      trafficLat,
      color,
    );
    return { id: generatedId };
  }

  @Get()
  async getAllTraffic() {
    const trafficData = await this.trafficService.getTraffic(); 
    return trafficData;
  }

  @Get(':id')
  getTraffic(@Param('id') trafficId: string) {
    return this.trafficService.getSingleTraffic(trafficId); 
  }

  @Delete(':id')
  async removeTraffic(@Param('id') trafficId: string) {
    await this.trafficService.deleteTraffic(trafficId); 
    return null;
  }

  @Patch(':id')
async updateTrafficColor(
  @Param('id') trafficId: string,
  @Query('color') color: string,
) {

  await this.trafficService.updateTrafficColor(trafficId, color);
  return null;
}
@Get(':id')
  getColor(@Param('id') trafficId: string) {
    return this.trafficService.getSingleColor(trafficId); 
  }
}
