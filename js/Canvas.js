class Canvas {
  constructor (x, y, theme) {
    this.options = {
      scale: 1,
      pos: {
        x,
        y
      },
      theme,
      currentLevel: levels[_.random(levels.length - 1)]
    };
  }
  canvasPreload() {
    this.options.font = loadFont(FONT_ROBOTO);
  }
  canvasSetup() {
    const {theme} = this.options;
  }
  placeMark(x, y, type) {
    const {theme, scale} = this.options;
    const {cellSize} = theme.options;

    const i = Math.floor((y - this.boardY) / (cellSize * scale));
    const j = Math.floor((x - this.boardX) / (cellSize * scale));

    if (!this.options.currentLevel.options.playerMatrix[i][j])
      this.options.currentLevel.options.playerMatrix[i][j] = type;
    else
      this.options.currentLevel.options.playerMatrix[i][j] = 0;
  }
  drawText(string, x, y) {
    const {scale, theme} = this.options;
    
    strokeWeight(1);
    fill(theme.options.fontColor);
    textSize(theme.options.fontSize * scale);
    textFont(this.options.font);
    text(string, this.options.pos.x + x * scale, this.options.pos.y + y * scale);
  }
  drawLine(x1, y1, x2, y2) {
    const {scale} = this.options;

    line(this.options.pos.x + x1 * scale, this.options.pos.y + y1 * scale, this.options.pos.x + x2 * scale, this.options.pos.y + y2 * scale);
  }
  drawRect(x, y, w, h) {
    const {scale} = this.options;

    rect(this.options.pos.x + x * scale, this.options.pos.y + y * scale, w * scale, h * scale);
  }
  drawEllipse(x, y, w, h) {
    const {scale} = this.options;

    ellipse(this.options.pos.x + x * scale, this.options.pos.y + y * scale, w * scale, h * scale);
  }
  drawGrid() {
    const {scale, theme} = this.options;
    const {cellSize} = theme.options;
    const {rowSeries, columnSeries, layoutMatrix, sectionsSpacing} = this.options.currentLevel.options;
    let thickLines = [
      // Outer box
      { x1: 0, y1: 0, x2: rowSeries[0].length * cellSize + layoutMatrix[0].length * cellSize, y2: 0 },
      { x1: 0, y1: 0, x2: 0, y2: columnSeries.length * cellSize + layoutMatrix.length * cellSize },
      { x1: 0, y1: columnSeries.length * cellSize + layoutMatrix.length * cellSize, x2: rowSeries[0].length * cellSize + layoutMatrix[0].length * cellSize, y2: columnSeries.length * cellSize + layoutMatrix.length * cellSize },
      { x1: 0 + rowSeries[0].length * cellSize + layoutMatrix[0].length * cellSize, y1: 0, x2: rowSeries[0].length * cellSize + layoutMatrix[0].length * cellSize, y2: columnSeries.length * cellSize + layoutMatrix.length * cellSize },
      // Inner lines
      { x1: rowSeries[0].length * cellSize, y1: 0, x2: rowSeries[0].length * cellSize, y2: columnSeries.length * cellSize + layoutMatrix.length * cellSize },
      { x1: 0, y1: columnSeries.length * cellSize, x2: rowSeries[0].length * cellSize + layoutMatrix[0].length * cellSize, y2: columnSeries.length * cellSize },
    ]
    // Thick lines
    stroke(theme.options.thickLineColor);
    strokeWeight(theme.options.thickLineSize * scale);
    thickLines.forEach(singleLine => this.drawLine(singleLine.x1, singleLine.y1, singleLine.x2, singleLine.y2));
    for (let i = 1; i < layoutMatrix[0].length; i++) {
      if (i % sectionsSpacing === 0) {
        this.drawLine(rowSeries[0].length * cellSize + i * cellSize, 0, rowSeries[0].length * cellSize + i * cellSize, columnSeries.length * cellSize + layoutMatrix.length * cellSize);
        this.drawLine(0, columnSeries.length * cellSize + i * cellSize, rowSeries[0].length * cellSize + layoutMatrix[0].length * cellSize, columnSeries.length * cellSize + i * cellSize);
      }
    }
    // Thin lines
    stroke(theme.options.thinLineColor);
    strokeWeight(theme.options.thinLineSize * scale);
    // Vertical lines
    rowSeries.forEach((row, idx) => this.drawLine(0, columnSeries.length * cellSize + (idx + 1) * cellSize, rowSeries[0].length * cellSize + layoutMatrix[0].length * cellSize, columnSeries.length * cellSize + (idx + 1) * cellSize));
    Matrix.transpose(rowSeries).forEach((row, idx) => this.drawLine((idx + 1) * cellSize, columnSeries.length * cellSize, (idx + 1) * cellSize, columnSeries.length * cellSize + layoutMatrix.length * cellSize));
    // Horizontal lines
    Matrix.transpose(columnSeries).forEach((col, idx) => this.drawLine(rowSeries[0].length * cellSize + (idx + 1) * cellSize, 0, rowSeries[0].length * cellSize + (idx + 1) * cellSize, columnSeries.length * cellSize + layoutMatrix.length * cellSize));
    columnSeries.forEach((col, idx) => this.drawLine(rowSeries[0].length * cellSize, (idx + 1) * cellSize, rowSeries[0].length * cellSize + layoutMatrix[0].length * cellSize, (idx + 1) * cellSize));
  }
  drawSeriesBackground() {
    const {theme} = this.options;
    const {cellSize} = theme.options;
    const {rowSeries, columnSeries} = this.options.currentLevel.options;

    fill(theme.options.sectorCellColor);
    this.drawRect(0, columnSeries.length * cellSize, rowSeries[0].length * cellSize, rowSeries.length * cellSize);
    this.drawRect(rowSeries[0].length * cellSize, 0, columnSeries[0].length * cellSize, columnSeries.length * cellSize);
  }
  drawSeries() {
    const {theme} = this.options;
    const {cellSize} = theme.options;
    const {rowSeries, columnSeries} = this.options.currentLevel.options;

    this.drawSeriesBackground();
    rowSeries.forEach((row, i) => {
      row.forEach((num, j) => {
        if (num)
          this.drawText(num, j * cellSize + cellSize / 2, columnSeries.length * cellSize + i * cellSize + cellSize / 2);
      });
    });
    columnSeries.forEach((row, i) => {
      row.forEach((num, j) => {
        if (num)
          this.drawText(num, rowSeries[0].length * cellSize + j * cellSize + cellSize / 2, i * cellSize + cellSize / 2);
      });
    });
  }
  drawMiniature() {
    const {theme} = this.options;
    const {cellSize} = theme.options;
    const {rowSeries, columnSeries} = this.options.currentLevel.options;
    const {playerMatrix} = this.options.currentLevel.options;
    const playerMatrixProp = playerMatrix.length >= playerMatrix[0].length ? playerMatrix.length : playerMatrix[0].length;
    const miniCellSize = columnSeries.length < rowSeries[0].length ? columnSeries.length * cellSize / playerMatrixProp : rowSeries[0].length * cellSize / playerMatrixProp;
    const offset = {
      x: columnSeries.length < rowSeries[0].length ? (rowSeries[0].length * cellSize - columnSeries.length * cellSize) / 2 : 0,
      y: columnSeries.length < rowSeries[0].length ? 0 : (columnSeries.length * cellSize - rowSeries[0].length * cellSize) / 2
    };

    fill(theme.options.markColor);
    playerMatrix.forEach((row, i) => {
      row.forEach((num, j) => {
        if (num === 1)
          this.drawRect(offset.x + j * miniCellSize, offset.y + i * miniCellSize, miniCellSize, miniCellSize);
      });
    });

  }
  drawMark() {
    const {theme} = this.options;
    const {cellSize} = theme.options;
    const {rowSeries, columnSeries} = this.options.currentLevel.options;
    const {playerMatrix} = this.options.currentLevel.options;
    const solidMarkMargin = cellSize * 0.16;
    const tempMarkMargin = cellSize * 0.7;

    fill(theme.options.markColor);
    strokeWeight(1);
    playerMatrix.forEach((row, i) => {
      row.forEach((num, j) => {
        switch (num) {
          case 1:
            this.drawRect(rowSeries[0].length * cellSize + j * cellSize + solidMarkMargin / 2, columnSeries.length * cellSize + i * cellSize + solidMarkMargin / 2, cellSize - solidMarkMargin, cellSize - solidMarkMargin);
            break;
          case 2:
            strokeWeight(theme.options.thinLineSize + 1);
            this.drawLine(rowSeries[0].length * cellSize + j * cellSize, columnSeries.length * cellSize + i * cellSize, rowSeries[0].length * cellSize + (j + 1) * cellSize, columnSeries.length * cellSize + (i + 1) * cellSize);
            this.drawLine(rowSeries[0].length * cellSize + j * cellSize, columnSeries.length * cellSize + (i + 1) * cellSize, rowSeries[0].length * cellSize + (j + 1) * cellSize, columnSeries.length * cellSize + i * cellSize);
            break;
          case 3:
            ellipseMode(CORNER);
            this.drawEllipse(rowSeries[0].length * cellSize + j * cellSize + tempMarkMargin / 2, columnSeries.length * cellSize + i * cellSize + tempMarkMargin / 2, cellSize - tempMarkMargin, cellSize - tempMarkMargin);
            break;
          default:
            break;
        }
      });
    });
  }
  drawHighlight() {
    const {theme} = this.options;
    const {cellSize} = theme.options;
    const {scale} = this.options;

    if (this.mouseInsideBoard) {
      fill(theme.options.highlightColor);
      rect(this.boardX + Math.floor((mouseX - this.boardX) / (cellSize * scale)) * (cellSize * scale), this.boardY + Math.floor((mouseY - this.boardY) / (cellSize * scale)) * (cellSize * scale), cellSize * scale, cellSize * scale);
    }
  }
  drawFrame() {
    const {theme} = this.options;

    background(theme.options.cellColor);
    textAlign(CENTER, CENTER);
    this.drawSeries();
    this.drawGrid();
    this.drawMark();
    this.drawMiniature();
    this.drawHighlight();
  }
  get width() {
    const {cellSize} = this.options.theme.options;
    const {rowSeries, columnSeries} = this.options.currentLevel.options;
    const {scale} = this.options;
    return (rowSeries[0].length * cellSize + columnSeries[0].length * cellSize) * scale;
  }
  get height() {
    const {cellSize} = this.options.theme.options;
    const {rowSeries, columnSeries} = this.options.currentLevel.options;
    const {scale} = this.options;
    return (rowSeries.length * cellSize + columnSeries.length * cellSize) * scale;
  }
  get boardX() {
    const {cellSize} = this.options.theme.options;
    const {rowSeries} = this.options.currentLevel.options;
    const {scale} = this.options;
    return this.options.pos.x + (rowSeries[0].length * cellSize) * scale;
  }
  get rightX() {
    const {cellSize} = this.options.theme.options;
    const {columnSeries} = this.options.currentLevel.options;
    const {scale} = this.options;
    return this.boardX + (columnSeries[0].length * cellSize) * scale;
  }
  get boardY() {
    const {cellSize} = this.options.theme.options;
    const {columnSeries} = this.options.currentLevel.options;
    const {scale} = this.options;
    return this.options.pos.y + (columnSeries.length * cellSize) * scale;
  }
  get bottomY() {
    const {cellSize} = this.options.theme.options;
    const {rowSeries} = this.options.currentLevel.options;
    const {scale} = this.options;
    return this.boardY + (rowSeries.length * cellSize) * scale;
  }
  get boardPos() {
    return ({ x: this.boardX, y: this.boardY });
  }
  get mouseInsideBoard() {
    return (mouseX > this.boardX && mouseX < this.rightX) && (mouseY > this.boardY && mouseY < this.bottomY);
  }
}