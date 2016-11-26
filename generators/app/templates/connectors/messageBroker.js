var logger = require('./logger');
var amqp = require('amqplib');
var when = require('when');
var eventEmitter = require('events');
var sleep = require('sleep');
var ampqAutoRecovery = require('amqplib-auto-recovery');

var messageBroker = {};

// Prepares message broke for emmiting events
messageBroker.eventEmitter = new eventEmitter();

messageBroker.connect = function(){
  return amqp.connect(process.env.BROKER_URI).then(function(conn){
    logger.info("Successfully connected to RabbitMQ at=" + process.env.BROKER_URI);
    messageBroker.connection = conn;
    return conn.createChannel().then(function(ch){
      messageBroker.channel = ch;
      logger.info("Successfully created channel within RabbitMQ");
      return conn;
    })
  }, function(err){
    logger.error("Error connecting messageBroker, trying again...");
    sleep.usleep(1000*process.env.BROKER_RECONNECT_TIME);
    return messageBroker.connect();
  })
};

messageBroker.disconnect = function(){
  logger.info("Disconnecting to RabbitMQ");
  messageBroker.connection.disconnect();
};


messageBroker.openQueue = function(queueName){
  messageBroker.channel.assertQueue(queueName, {durable: true}).then(function(queue){
    logger.info("Queue " + queueName + " is open");
  })
};

messageBroker.openExchange = function(exchangeName, exchangeType){
  messageBroker.channel.assertExchange(exchangeName, exchangeType, {durable: true}).then(function(exchange){
    logger.info("Exchange " + exchangeName + " with type=" + exchangeType + " is open");
  })
};

messageBroker.consumeMessage = function(queueName, callback){
  messageBroker.channel.consume(queueName, callback, {noAck: false})
};

messageBroker.publishMessage = function(exchangeName, exchangeType, message){
  messageBroker.channel.publish(exchangeName, exchangeType, new Buffer(message), {"persistent": "true"});
  logger.info("Sending message through exchange=" + exchangeName + " with type=" + exchangeType);
};

messageBroker.subscribe = function(queueName, exchangeType, messageType){
  messageBroker.channel.bindQueue(queueName, exchangeType, messageType).then(function(queue){
    logger.info("Subscribed queue= " + queueName + " to exchange of type=" + exchangeType + " with routing key=" + messageType);
  })
};


messageBroker.initBroker = function(){
  // Connects to RabbitMQ server
  return messageBroker.connect().then(function(conn){
    return when.all([
      // openQueue and openExchange for your application
    ]).then(function(result){
      return when.all([
        // messageBroker subscribe and bindExchange functions
      ]).then(function(result){
        // messageBroker consume functions to start the messaging system
      })
    });
  });
}

module.exports = messageBroker;
