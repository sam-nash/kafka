# KAFKA Basics

## Local Installation on Mac

[Tutorial](https://www.conduktor.io/kafka/kafka-fundamentals)

### Set Up Java

[Instructions](https://stackoverflow.com/questions/21964709/how-to-set-or-change-the-default-java-jdk-version-on-macos/24657630#24657630)

### Start Zookeeper

```
~/kafka_2.13-3.3.2/bin/zookeeper-server-start.sh -daemon ~/kafka_2.13-3.3.2/config/zookeeper.properties
```

<i>Use <b>-daemon</b> flag to run Zookeeper in daemon mode in the background</i>

### Start Apache Kafka

```
~/kafka_2.13-3.3.2/bin/kafka-server-start.sh -daemon ~/kafka_2.13-3.3.2/config/server.properties
```

### Topics Operations using CLI

#### Create a Topic

> Creates a Kafka topic called **topic1** with 3 partitions and a replication factor of 1 on a Kafka broker that is running at localhost:9092

```
kafka-topics.sh --bootstrap-server localhost:9092 --topic topic1 --create --partitions 3 --replication-factor 1
```

#### List a Topic

```
kafka-topics.sh --bootstrap-server localhost:9092 --list
```

#### Describe Topic

```
kafka-topics.sh --bootstrap-server localhost:9092 --describe --topic topic1

Result
======
Topic: topic1	TopicId: tuGOkA30Rlqc8jVcS2367Q	PartitionCount: 3	ReplicationFactor: 1	Configs:
	Topic: topic1	Partition: 0	Leader: 0	Replicas: 0	Isr: 0
	Topic: topic1	Partition: 1	Leader: 0	Replicas: 0	Isr: 0
	Topic: topic1	Partition: 2	Leader: 0	Replicas: 0	Isr: 0
```

#### Delete a Topic

```
kafka-topics.sh --bootstrap-server localhost:9092 --delete --topic topic1, topic2, topic3
```

### Producer Operations using CLI

#### Send messages from the console

> Start the producer to send messages tot he specified topic. If the topic does not exist, it can be auto-created by Kafka with the default number of partitions and replication factor.

```
kafka-console-producer.sh --broker-list localhost:9092 --topic topic1
```

#### Produce messages from a file with the Kafka Console

> Create a messages.json file that has each message on a new line.

```
kafka-console-producer.sh --bootstrap-server localhost:9092 --topic topic1 < messages.json
```

#### Produce messages with key in the Kafka Console Producer CLI

> example : "Name":"Sam"

```
kafka-console-producer.sh --bootstrap-server localhost:9092 --topic topic1 --property parse.key=true --property key.separator=:
```

> Failing to send the data in key : value format will result in an exception & the producer to quit.

#### Consume Data in a Kafka Topic using the CLI

> Consuming only the future messages of a Kafka topic

```
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic topic1
```

> Consuming all historical messages and future ones in a Kafka topic

```
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic topic1 --from-beginning
```

#### consume a Kafka Topic and show both the key, value along with the partition and offset using the Kafka Console Consumer CLI

```
kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic topic1 --formatter kafka.tools.DefaultMessageFormatter --property print.partition=true --property print.offset=true --property print.key=true --property print.value=true --from-beginning
```

```
Result
======
Partition:0	Offset:0	null	Test
Partition:0	Offset:1	null
Partition:1	Offset:0	null	1
Partition:1	Offset:1	null	2
Partition:1	Offset:2	null	3
Partition:1	Offset:3	null	4
Partition:1	Offset:4	null	5
Partition:1	Offset:5	null	6
Partition:1	Offset:6	null	7
Partition:1	Offset:7	null	8
Partition:1	Offset:8	null	9
Partition:1	Offset:9	null	10
Partition:1	Offset:10	null	11
Partition:1	Offset:11	null
Partition:2	Offset:0	name	Sam
```

> - If the topic does not exist, the console consumer will automatically create it with default.
> - You can consume multiple topics at a time with a comma-delimited list or a pattern.
> - If a consumer group id is not specified, the kafka-console-consumer generates a random consumer group
> - The order in which the messages are received is at the partition level, not at the topic level.

## Docker

[Tutorial](https://developer.confluent.io/tutorials/kafka-console-consumer-producer-basics/kafka.html)

Steps to getting started after the pre-requisites are met

1. docker compose up -d

### Create a Topic

`docker exec -t broker kafka-topics --create --topic orders --bootstrap-server broker:9092`

### List topics

```
docker exec broker \
kafka-topics --list --bootstrap-server broker:9092
```

### Write to topic

```
docker exec --interactive --tty broker \
kafka-console-producer --bootstrap-server broker:9092 \
                       --topic orders
```

### Read from a topic

#### Only the latest messages when the consumer is running

```
docker exec --interactive --tty broker \
kafka-console-consumer \
  --topic orders \
  --bootstrap-server broker:9092

```

#### All the messages from beginning that were sent to the topic even before the consumer started

```
docker exec --interactive --tty broker \
kafka-console-consumer \
  --topic orders \
  --bootstrap-server broker:9092
  --from-beginning

```
