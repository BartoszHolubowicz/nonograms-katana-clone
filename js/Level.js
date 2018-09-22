class Level {
  constructor (layoutMatrix) {
    this.options = {
      sectionsSpacing: 5,
      layoutMatrix,
      playerMatrix: Matrix.generate(layoutMatrix.length, layoutMatrix[0].length),
      rowSeries: Matrix.flatten(Matrix.rowSeries(layoutMatrix), 'RIGHT'),
      columnSeries: Matrix.flatten(Matrix.columnSeries(layoutMatrix), 'BOTTOM'),
      completed: false
    };
  }
  get isCompleted() {
    const {layoutMatrix, playerMatrix} = this.options;
    let flag = true;
    playerMatrix.forEach((row, i) => {
      row.forEach((num, j) => {
        if (layoutMatrix[i][j] === 1 && num !== 1)
          flag = false;
      });
    });
    return flag;
  }
}

var levels = [
  new Level([
    [0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 0],
    [1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 0, 0],
    [1, 1, 1, 0, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
    [1, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 0, 0, 1, 0, 1, 0, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
    [0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1],
    [0, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0]
  ])
];