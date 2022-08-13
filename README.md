# HiveOS MQTT statistic.

The package contains MQTT publisher for HiveOS miner.

## Installation
To run the project:

```bash
cd ~
git clone https://github.com/letovlive/hiveos-mqtt-stats.git
cd hiveos-mqtt-stats
cp .env.example .env
```

Use preferred editor and setup credentials in .env file. Or use `vi` to edit:

```bash
vi .env
```

Make scripts executable:

```bash
chmod +x install.sh
chmod +x start.sh
chmod +x stop.sh
```

Install and run:

```bash
./install.sh
./start.sh
```

To stop publishing:

```bash
./stop.sh
```

## Uninstall

To remove the project:

```bash
cd ~/hiveos-mqtt-stats
chmod +x uninstall.sh
./uninstall.sh
```
