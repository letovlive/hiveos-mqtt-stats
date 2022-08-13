const mqtt = require('mqtt');
const Tail = require('tail').Tail;
const dotenv = require('dotenv').config().parsed;
const ResponseFormatter = require('./formatters/ResponseFormatter').ResponseFormatter;

let client = mqtt.connect(dotenv.MQTT_URL, {
  port: dotenv.MQTT_PORT || 1883,
  username: dotenv.MQTT_USER,
  password: dotenv.MQTT_PASSWORD,
});
const logPath = dotenv.LOG_PATH;
const errorHandler = (error) => {
  const errorMessage = { state: 'error', message: 'Error to read log' };
  client.publish(dotenv.MQTT_TOPIC, JSON.stringify({ ...errorMessage, error }));
};

try {
  client.publish(dotenv.MQTT_TOPIC, 'start');
  const options = {
    separator: /[\r]{0,1}\n/,
    fromBeginning: false,
    fsWatchOptions: {},
    useWatchFile: true,
    follow: true,
    logger: console,
    nLines: 1
  };
  const tail = new Tail(logPath, options);
  tail.on('line', function (data) {
    if (data.indexOf('"method":"stats"') !== -1) {
      const parsed = JSON.parse(
        data.replace(/^\[.*\>\s/, '')
      );
      const responseFormatter = new ResponseFormatter(parsed.params);
      const formattedStats = responseFormatter.format();

      console.log(formattedStats);
      client.publish(dotenv.MQTT_TOPIC, JSON.stringify(formattedStats));
    }
  });

  tail.on('error', function (error) {
    errorHandler(error);
  });
} catch (error) {
  errorHandler(error);
}
