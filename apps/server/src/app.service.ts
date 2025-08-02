import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello() {
    return {
      message: 'Hello, welcome to MelodayzMusic API.',
      tag: 'Feel the beat, anywhere you go!!!',
    };
  }
}
