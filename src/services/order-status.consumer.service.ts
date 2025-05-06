import { Injectable } from '@nestjs/common';
import { KafkaConsumerBase } from 'kafka-consumer-host';

@Injectable()
export class OrderStatusConsumerService extends KafkaConsumerBase {
  registerHandlers(): void {
    this.handle('order-status', this.orderStatusHandler);
  }

  async orderStatusHandler(payload: any, metadata: any): Promise<void> {
    console.log('🚀 Test Handler: Received message for order-status');
    console.log('Payload:', payload);
    console.log('Metadata:', metadata);
  }
}
