const { Kafka, logLevel } = require('kafkajs');
const { faker } = require('@faker-js/faker');
const message = () => {
  return {
    //key: 'key',
    value: JSON.stringify({
      name: faker.name.firstName(),
      email: faker.internet.email(),
    }),
  };
};

const brokers = ['localhost:9092'];
// this is the topic to which we want to write messages
const topic = 'topic1';

const kafka = new Kafka({
  //clientId,
  brokers,
  logLevel: logLevel.NOTHING,
});

//To publish messages to Kafka you have to create a producer by calling the producer function of the client.
//Ref : https://kafka.js.org/docs/producing
const producer = kafka.producer();

const produce = async () => {
  await producer.connect();

  for (var i = 0; i <= 10; i++) {
    //The method send is used to publish messages to the Kafka cluster.
    await producer.send({
      topic: topic,
      messages: [message()],
    });
    //console.log('Message : ' + i);
    console.log(message().value);
  }
  await producer.disconnect();
};
produce();
module.exports = produce;
