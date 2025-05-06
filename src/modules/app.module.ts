import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  KafkaConsumerHostModule,
  KafkaConsumerOffsetReset,
} from 'kafka-consumer-host';
import configuration from 'src/configuration';
import { ConsumerService } from 'src/services/consumer.service';
import { OrderStatusConsumerService } from 'src/services/order-status.consumer.service';

console.log({ KafkaConsumerHostModule });
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [configuration],
    }),
    KafkaConsumerHostModule.register({
      bootstrapServer: configuration().kafkaConsumerBootstrapServers,
      groupId: configuration().kafkaConsumerGroupId,
      clientId: configuration().consumerClientId,
      offsetReset: KafkaConsumerOffsetReset.LATEST, // or 'earliest'
    }),
  ],
  providers: [ConsumerService, OrderStatusConsumerService],
})
export class AppModule {}
