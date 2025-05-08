import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  KafkaConsumerHostModule,
  KafkaConsumerOffsetReset,
} from 'kafka-consumer-host';
import configuration from 'src/configuration';
import { ConsumerService } from 'src/services/consumer.service';
import { KafkaProducerHostModule } from 'kafka-producer-host';
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
      offsetReset: KafkaConsumerOffsetReset.LATEST,
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: configuration().sslKey,
        password: configuration().sslSecret,
      },
    }),
    KafkaProducerHostModule.register({
      bootstrapServer: configuration().kafkaConsumerBootstrapServers,
      clientId: configuration().producerClientId,
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: configuration().sslKey,
        password: configuration().sslSecret,
      },
    }),
  ],
  providers: [ConsumerService],
})
export class AppModule {}
