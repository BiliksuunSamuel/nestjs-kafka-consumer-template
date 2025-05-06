import { Injectable } from '@nestjs/common';
import { KafkaConsumerBase } from 'kafka-consumer-host';

@Injectable()
export class ConsumerService extends KafkaConsumerBase {
  registerHandlers(): void {
    this.handle('create-order', this.createOrderHandler.bind(this));
    this.handle('order-payment', this.orderPaymentHandler.bind(this));
    this.handle('sample-topic', this.sampleTopicHandler.bind(this));
  }

  async createOrderHandler(payload: any, metadata: any): Promise<void> {
    console.log('🚀 Test Handler: Received message for create-order');
    console.log('Payload:', payload);
    console.log('Metadata:', metadata);
  }

  async orderPaymentHandler(payload: any, metadata: any): Promise<void> {
    console.log('🚀 Test Handler: Received message for update-order');
    console.log('Payload:', payload);
    console.log('Metadata:', metadata);
  }

  async sampleTopicHandler(payload: any, metadata: any): Promise<void> {
    console.log('🚀 Test Handler: Received message for sample-topic');
    console.log('Payload:', payload);
    console.log('Metadata:', metadata);
  }
}
