#!/bin/bash
# Publish miner statistic to MQTT
pm2 stop "hiveos-statistic"
yarn global remove pm2
apt remove nodejs yarn
