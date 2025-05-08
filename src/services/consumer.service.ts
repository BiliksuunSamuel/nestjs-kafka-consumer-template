import { Injectable, Logger } from '@nestjs/common';
import { KafkaConsumerBase } from 'kafka-consumer-host';

@Injectable()
export class ConsumerService extends KafkaConsumerBase {
  private readonly logger = new Logger(ConsumerService.name);
  private orderSuccesses = 0;
  private orderFailed = 0;
  registerHandlers(): void {
    this.handle('sales-order', this.salesOrderTopicHandler.bind(this));
  }

  async salesOrderTopicHandler(payload: any, metadata: any): Promise<void> {
    console.log('🚀 Test Handler: Received message for sample-topic');
    console.log('Payload:', payload);
    console.log('Metadata:', metadata);
  }
}
