#!/bin/bash
# Publish miner statistic to MQTT
apt update
apt install nodejs yarn -y
yarn global add pm2
pm2 startup systemd

