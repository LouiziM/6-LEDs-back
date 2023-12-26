import { Controller, Get, Post } from '@nestjs/common';
import axios from 'axios';

@Controller('api')
export class EspController {

  @Post('change-sequence-red')
  async changeSequenceRed(): Promise<{ message: string }> {
    return this.changeSequence('red');
  }
  
  @Post('change-sequence-yellow')
  async changeSequenceYellow(): Promise<{ message: string }> {
    return this.changeSequence('yellow');
  }

  @Post('change-sequence-green')
  async changeSequenceGreen(): Promise<{ message: string }> {
    return this.changeSequence('green');
  }

  private async changeSequence(color: string): Promise<{ message: string }> {
    try {
      const response = await fetch('http://192.168.43.102:803/change-sequence', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ color }),
      });

      const data = await response.json();
      console.log(data);

      return { message: 'Sequence altered successfully!' };
    } catch (error) {
      console.error('Error changing sequence:', error.message);
      console.error('Error details:', error.response?.data);
      return { message: 'Error changing sequence' };
    }
  }
}
