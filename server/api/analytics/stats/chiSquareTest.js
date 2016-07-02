// unless otherwise noted, the contents of this file are from http://stats.theinfo.org/chi2.js

function degrees_of_freedom(table) { return (table.length - 1) * (table[0].length - 1); }

function expected_value(table, row, column) {
  var sum_row, sum_column, sum_total, i, j;
  sum_row = 0;
  for (i in table[row]) { sum_row += table[row][i]; }
  sum_column = 0;
  for (i in table) { sum_column += table[i][column]; }
  sum_total = 0;
  for (i in table) { for (j in table[i]) { sum_total += table[i][j]; } }
  return (sum_row * sum_column) / sum_total;
}

function chisq(table) {
  var chisq, i, j, unexpected;
  chisq = 0;
  for (i in table) { for (j in table[i]) {
    unexpected = table[i][j] - expected_value(table, i, j);
    chisq += Math.pow(unexpected, 2) / expected_value(table, i, j);
  } }
  return chisq;
}

/* from http://www.fourmilab.ch/rpkp/experiments/analysis/chiCalc.js */

function poz(z) {
  var y, x, w;
  var Z_MAX = 6.0;              /* Maximum meaningful z value */

  if (z == 0.0) {
    x = 0.0;
  } else {
    y = 0.5 * Math.abs(z);
    if (y >= (Z_MAX * 0.5)) {
      x = 1.0;
    } else if (y < 1.0) {
      w = y * y;
      x = ((((((((0.000124818987 * w
                     - 0.001075204047) * w + 0.005198775019) * w
                     - 0.019198292004) * w + 0.059054035642) * w
                     - 0.151968751364) * w + 0.319152932694) * w
                     - 0.531923007300) * w + 0.797884560593) * y * 2.0;
    } else {
      y -= 2.0;
      x = (((((((((((((-0.000045255659 * y
                           + 0.000152529290) * y - 0.000019538132) * y
                           - 0.000676904986) * y + 0.001390604284) * y
                           - 0.000794620820) * y - 0.002034254874) * y
                           + 0.006549791214) * y - 0.010557625006) * y
                           + 0.011630447319) * y - 0.009279453341) * y
                           + 0.005353579108) * y - 0.002141268741) * y
                           + 0.000535310849) * y + 0.999936657524;
    }
  }
  return z > 0.0 ? ((x + 1.0) * 0.5) : ((1.0 - x) * 0.5);
}


var BIGX = 20.0;                  /* max value to represent exp(x) */

function ex(x) {
  return (x < -BIGX) ? 0.0 : Math.exp(x);
}

function pochisq(x, df) {
  var a, y, s;
  var e, c, z;
  var even;                     /* True if df is an even number */

  var LOG_SQRT_PI = 0.5723649429247000870717135; /* log(sqrt(pi)) */
  var I_SQRT_PI = 0.5641895835477562869480795;   /* 1 / sqrt(pi) */

  if (x <= 0.0 || df < 1) {
    return 1.0;
  }

  a = 0.5 * x;
  even = !(df & 1);
  if (df > 1) {
    y = ex(-a);
  }
  s = (even ? y : (2.0 * poz(-Math.sqrt(x))));
  if (df > 2) {
    x = 0.5 * (df - 1.0);
    z = (even ? 1.0 : 0.5);
    if (a > BIGX) {
      e = (even ? 0.0 : LOG_SQRT_PI);
      c = Math.log(a);
      while (z <= x) {
        e = Math.log(z) + e;
        s += ex(c * z - a - e);
        z += 1.0;
      }
      return s;
    } else {
      e = (even ? 1.0 : (I_SQRT_PI / Math.sqrt(a)));
      c = 0.0;
      while (z <= x) {
        e = e * (a / z);
        c = c + e;
        z += 1.0;
      }
      return c * y + s;
    }
  } else {
    return s;
  }
}

function trimfloat(ov, d) {
  var o = '', v = ov.toString();
  var c, i, n = 0, indec = false, aftdec = false;
  for (i = 0; i < v.length; i++) {
    c = v.charAt(i);
    if (!indec) {
      if (c == '.') {
        indec = true;
      }
      if (d > 0 || c != '.') { o += c; }
    } else {
      if (aftdec) {
        o += c;
      } else {
        if ((c >= '0') && (c <= '9')) {
          if (n < d) {
            o += c;
          }
          n++;
        } else {
          aftdec = true;
          o += c;
        }
      }
    }
  }
  return o;
}

function significance(table) { return pochisq(chisq(table), degrees_of_freedom(table)); }

// added by our team:
module.exports = testSignificance = (aVisits, aClicks, bVisits, bClicks) => {
  return significance([[aClicks, aVisits - aClicks], [bClicks, bVisits - bClicks]]);
};

// console.log(significance([[165, 2835], [134, 1866]]));
// console.log(testSig(3000, 165, 2000, 134));
