#!/bin/bash
# Publish miner statistic to MQTT
pm2 start dist/bundle.js --name "hiveos-statistic"
