module.exports = {

  async pmt(rate, np, present, future, type) {
    if (!future) future = 0;
    if (!type) type = 0;

    if (rate === 0) return -(present + future)/np;

    const pvif = Math.pow(1 + rate, np);
    let pmt = rate / (pvif - 1) * -(present * pvif + future);

    if (type === 1) {
      pmt /= (1 + rate);
    }

    return pmt;
  },

  async ipmt(present, pmt, rate, per) {
    const tmp = Math.pow(1 + rate, per);
    return 0 - (present * tmp * rate + pmt * (tmp - 1));
  },

  async ppmt(pmt, ipmt) {
    return pmt - ipmt;
  }

}