class ResponseFormatter {
  /**
   *
   * @param stats
   */
  constructor (stats = {}) {
    this.stats = stats;
  }

  /**
   * Format output
   * @returns {{ver: string, total_khs: (number|*), cpu_temp: number, miner: (string|*), algo: string, coin:
   *   (string|*), uptime: number}}
   */
  format () {
    const { value: state, unit_of_measurement } = this.formatHashes(this.stats.total_khs * 1000);
    return {
      state,
      unit_of_measurement,
      coin: this.stats.meta[this.stats.miner].coin,
      cpu_temp: this.stats.cputemp[0],
      miner: this.stats.miner,
      uptime: this.stats.miner_stats.uptime,
      ver: this.stats.miner_stats.ver,
      algo: this.stats.miner_stats.algo,
      ...this.cardStats()
    };
  }

  /**
   * Card statistic
   * @returns {{}}
   */
  cardStats () {
    const cards = {};
    this.stats.temp.forEach((temperature, index) => {
      cards[`card_${index}`] = {
        temperature,
        fan: this.stats.fan[index],
        power: this.stats.power[index],
        ...this.formatHashes(this.stats.miner_stats.hs[index]),
      };
    });

    return cards;
  }

  formatHashes (hashes = 0, decimals = 2) {
    if (parseInt(hashes, 10) === 0) {
      return {
        value: 0,
        unit_of_measurement: 'H/s',
      };
    }
    const k = 1000;
    const dm = decimals || 2;
    const sizes = ['H/s', 'KH/s', 'MH/s', 'GH/s', 'TH/s', 'PH/s', 'EH/s', 'ZH/s', 'YH/s'];
    const i = Math.floor(Math.log(hashes) / Math.log(k));

    return {
      value: parseFloat((hashes / Math.pow(k, i)).toFixed(dm)),
      unit_of_measurement: sizes[i],
    };
  }
}

module.exports = {
  ResponseFormatter
};
