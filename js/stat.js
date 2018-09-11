'use strict';

window.renderStatistics = function (ctx, names, times) {
  var Cloud = {
    X: 100,
    Y: 10,
    HEIGHT: 270,
    WIDTH: 420,
    COLOR: 'white'
  };

  var shadow = {
    x: Cloud.X + 10,
    y: Cloud.Y + 10,
    color: 'rgba(0, 0, 0, 0.7)'
  };

  drawHexagon(ctx, shadow.color, shadow.x, shadow.y);
  drawHexagon(ctx, Cloud.COLOR, Cloud.X, Cloud.Y);
  drawText(ctx, 'Ура вы победили!', 220, 40);
  drawText(ctx, 'Список результатов:', 220, 60);
  drawChart(ctx, names, times);
};

function drawHexagon(ctx, color, x, y) {
  ctx.fillStyle = color || '#000000';
  ctx.beginPath();
  ctx.moveTo(30 + x, 30 + y);
  ctx.lineTo(210 + x, 0 + y);
  ctx.lineTo(390 + x, 30 + y);
  ctx.lineTo(420 + x, 135 + y);
  ctx.lineTo(390 + x, 240 + y);
  ctx.lineTo(210 + x, 270 + y);
  ctx.lineTo(30 + x, 240 + y);
  ctx.lineTo(0 + x, 135 + y);
  ctx.fill();
  ctx.closePath();
}

function drawText(ctx, message, x, y, font, color) {
  ctx.fillStyle = color || '#000000';
  ctx.font = font || '16px PT Mono';
  ctx.fillText(message, x, y);
}

function drawChart(ctx, names, times) {
  var CHART_HEIGHT = 150;
  var COLUMN_WIDTH = 40;
  var MARGIN = 50;
  var SELF_COLOR = 'rgba(255, 0, 0, 1)';
  var FIRST_COLUMN_X = 160;
  var FIRST_COLUMN_Y = 235;
  var maxTime = getMaxElement(times);
  var columnHeightStep = CHART_HEIGHT / maxTime;

  for (var i = 0; i < names.length; i++) {
    var columnHeight = times[i] * columnHeightStep;
    var columnX = FIRST_COLUMN_X + (MARGIN + COLUMN_WIDTH) * i;
    var columnY = FIRST_COLUMN_Y - columnHeight;
    var timeY = columnY - 5;
    var nameY = columnY + columnHeight + 15;
    var color = (names[i] === 'Вы') ? SELF_COLOR : 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';

    drawText(ctx, parseInt(times[i], 10), columnX, timeY);
    drawText(ctx, names[i], columnX, nameY);
    drawRectangle(ctx, columnX, columnY, COLUMN_WIDTH, columnHeight, color);
  }
}

function getMaxElement(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
}

function drawRectangle(ctx, x, y, width, height, color) {
  ctx.fillStyle = color || '#000000';
  ctx.fillRect(x, y, width, height);
}
