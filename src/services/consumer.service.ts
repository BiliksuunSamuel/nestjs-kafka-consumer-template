import { Injectable, Logger } from '@nestjs/common';
import { KafkaConsumerBase } from 'kafka-consumer-host';

@Injectable()
export class ConsumerService extends KafkaConsumerBase {
  private readonly logger = new Logger(ConsumerService.name);
  private orderSuccesses = 0;
  private orderFailed = 0;
  registerHandlers(): void {
    this.handle('order-create', this.createOrderHandler.bind(this));
    this.handle('order-payment', this.orderPaymentHandler.bind(this));
    this.handle('sample-topic', this.sampleTopicHandler.bind(this));
  }

  async createOrderHandler(payload: any, metadata: any): Promise<void> {
    console.log('🚀 Test Handler: Received message for create-order');
    console.log('Payload:', payload);
    console.log('Metadata:', metadata);
    if (payload?.status === 'success') {
      this.orderSuccesses++;
    }
    if (payload?.status === 'failed') {
      this.orderFailed++;
    }

    console.log(
      `OrderSuccesses: ${this.orderSuccesses} \t\t\t Order Failed: ${this.orderFailed}`,
    );
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
