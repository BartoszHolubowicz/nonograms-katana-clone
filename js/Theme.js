class Theme {
  constructor (cellSize, font, fontSize, fontColor, sectionFontColor, thickLineSize, thinLineSize, thickLineColor, thinLineColor, sectorLineColor, markColor, cellColor, sectorCellColor, highlightColor) {
    this.options = {
      cellSize, font, fontSize, fontColor, sectionFontColor, thickLineSize, thinLineSize, thickLineColor, thinLineColor, sectorLineColor, markColor, cellColor, sectorCellColor, highlightColor
    }
  }
  static getColor(r, g, b, a = 1) {
    if (g !== undefined && b !== undefined)
      return a === 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`;
    else if (g !== undefined && b === undefined)
      return g === 1 ? `rgb(${r}, ${r}, ${r})` : `rgba(${r}, ${r}, ${r}, ${g})`;
    else
      return `rgb(${r}, ${r}, ${r})`;
  }
}

var lightTheme = new Theme(
  24, FONT_ROBOTO, 12, COLOR_BLACK, COLOR_BLACK, 3, 0.5, COLOR_BLACK, COLOR_BLACK, COLOR_BLACK, COLOR_BLACK, COLOR_WHITE, Theme.getColor(207), Theme.getColor(0, 0.2)
);
var darkTheme = new Theme(
  24, FONT_ROBOTO, 12, COLOR_WHITE, COLOR_WHITE, 3, 0.5, COLOR_WHITE, COLOR_WHITE, COLOR_WHITE, COLOR_WHITE, COLOR_BLACK, Theme.getColor(48), Theme.getColor(255, 0.3)
);