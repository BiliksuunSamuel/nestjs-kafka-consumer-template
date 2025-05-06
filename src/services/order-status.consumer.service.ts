import { Injectable } from '@nestjs/common';
import { KafkaConsumerBase } from 'kafka-consumer-host';
import { KafkaProducerService } from 'kafka-producer-host';

@Injectable()
export class OrderStatusConsumerService extends KafkaConsumerBase {
  constructor(private readonly producerService: KafkaProducerService) {
    super();
  }
  registerHandlers(): void {
    this.handle('order-status', this.orderStatusHandler.bind(this));
  }

  async orderStatusHandler(payload: any, metadata: any): Promise<void> {
    console.log('🚀 Test Handler: Received message for order-status');
    console.log('Payload:', payload);
    console.log('Metadata:', metadata);
    await this.producerService.produceAsync('create-order', payload);
  }
}
