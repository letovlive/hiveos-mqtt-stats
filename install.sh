#!/bin/bash
# Publish miner statistic to MQTT
apt remove cmdtest
apt remove yarn
apt install curl
curl -sL https://deb.nodesource.com/setup_16.x | bash -
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
apt update
apt-get install -y nodejs yarn
yarn global add pm2
pm2 startup systemd

