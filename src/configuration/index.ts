import * as dotenv from 'dotenv';

dotenv.config();

export default () => ({
  kafkaConsumerBootstrapServers: process.env.KAFKA_CONSUMER_BOOTSTRAP_SERVERS,
  kafkaConsumerGroupId: process.env.KAFKA_CONSUMER_GROUP_ID,
  consumerClientId: process.env.KAFKA_CONSUMER_CLIENT_ID,
  producerClientId: process.env.KAFKA_PRODUCER_CLIENT_ID,
  sslKey: process.env.SSL_KEY,
  sslSecret: process.env.SSL_SECRET,
});
