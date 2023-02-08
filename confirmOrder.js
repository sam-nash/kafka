const { Kafka, logLevel } = require('kafkajs');
const { faker } = require('@faker-js/faker');
const { orderSummary } = require('./iTotal');

const orderData = {
  customerName: faker.name.firstName(),
  customerEmail: faker.internet.email(),
  item: 'apple',
  quantity: 2,
  transactionId: faker.datatype.uuid(),
};

const message = () => {
  return {
    //key: 'key',
    value: JSON.stringify(orderSummary(orderData)),
  };
};

// a single broker instanbce that we connect to
const brokers = ['localhost:9092'];
// this is the topic to which we want to write messages
const topic = 'topic1';

const kafka = new Kafka({
  brokers,
  logLevel: logLevel.NOTHING,
});

//To publish messages to Kafka you have to create a producer by calling the producer function of the client.
//Ref : https://kafka.js.org/docs/producing
const producer = kafka.producer();

const produce = async () => {
  await producer.connect();

  //The method send is used to publish messages to the Kafka cluster.
  await producer.send({
    topic: topic,
    messages: [message()],
  });
  //console.log('Message : ' + i);
  console.log(message().value);

  await producer.disconnect();
};
produce();
module.exports = produce;
