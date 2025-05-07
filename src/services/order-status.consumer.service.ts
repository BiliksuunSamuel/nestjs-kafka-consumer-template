import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { KafkaConsumerBase } from 'kafka-consumer-host';
import { KafkaProducerService } from 'kafka-producer-host';
import { interval } from 'rxjs';

@Injectable()
export class OrderStatusConsumerService extends KafkaConsumerBase {
  constructor(private readonly producerService: KafkaProducerService) {
    super();
  }
  registerHandlers(): void {
    this.handle('order-status', this.orderStatusHandler.bind(this));
    this.producerCreateOrder();
  }

  //method to producer message to order-create topic at an intervar of every 2 seconds
  async producerCreateOrder() {
    interval(2000).subscribe(async () => {
      const order = {
        id: randomUUID().toString(),
        key: `order-create-${randomUUID().toString()}`,
        amout: Math.floor(Math.random() * 1000),
        status: Math.random() > 0.5 ? 'success' : 'failed',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        customer: {
          id: randomUUID().toString(),
          name: `customer-${randomUUID().toString()}`,
          email: `customer-${randomUUID().toString()}@example.com`,
        },
        address: {
          id: randomUUID().toString(),
          street: `street-${randomUUID().toString()}`,
          city: `city-${randomUUID().toString()}`,
          state: `state-${randomUUID().toString()}`,
          country: `country-${randomUUID().toString()}`,
          zip: `zip-${randomUUID().toString()}`,
        },
      };
      await this.producerService.produceAsync('order-create', order, {
        key: order.key,
        partition: order.status === 'success' ? 0 : 1,
        headers: {
          'x-correlation-id': order.id,
          'x-request-id': order.id,
          'x-trace-id': order.id,
          'x-span-id': order.id,
        },
      });
    });
  }

  async orderStatusHandler(payload: any, metadata: any): Promise<void> {
    console.log('🚀 Test Handler: Received message for order-status');
    console.log('Payload:', payload);
    console.log('Metadata:', metadata);
    await this.producerService.produceAsync('create-order', payload);
  }
}
