class Matrix {
  constructor (w, h) {
    this.options = {
      w, h
    };
    this.m = w && h ? Matrix.generate(w, h) : w && !h ? Matrix.generate(w, w) : [];
  }
  static generate(h, w) {
    let result = [];
    let row;
    for (let i = 0; i < h; i++) {
      row = [];
      for (let j = 0; j < w; j++)
        row = [...row, 0];
      result = [...result, row];
    }
    return result;
  }
  static set(m, i, j, arg) {
    m[i][j] = arg;
  }
  static rowSeries(m) {
    let result = [];
    let combo;
    let newRow;
    for (let row of m) {
      combo = 0;
      newRow = [];
      for (let num of row) {
        if (num)
          combo++;
        else if (!num && combo) {
          newRow = [...newRow, combo];
          combo = 0;
        }
      }
      if (combo)
        newRow = [...newRow, combo];
      result = [...result, [...newRow]];
    }
    return result;
  }
  static columnSeries(m) {
    return Matrix.rowSeries(Matrix.transpose(m));
  }
  static flatten(m, type) {
    let result = [];
    let max = 0;
    for (let row of m) {
      let rowMax = row.length;
      if (rowMax > max)
        max = rowMax;
    }
    let newRow;
    for (let row of m) {
      newRow = type === RIGHT || type === BOTTOM ? [] : [...row];

      for (let i = 0; i < max - row.length; i++)
        newRow = [...newRow, 0];
      result = [...result, type === RIGHT || type === BOTTOM ? [...newRow, ...row] : [...newRow]];
    }

    return (type === LEFT || type === RIGHT) ? result : Matrix.transpose(result);
  }
  static transpose(m) {
    let result = [];
    let row;
    for (let i = 0; i < m[0].length || 0; i++) {
      row = [];
      for (let j = 0; j < m.length || 0; j++)
        row = [...row, m[j][i]];
      result = [...result, [...row]];
    }
    return result;
  }
}