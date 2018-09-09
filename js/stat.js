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

  var Message = {
    TEXT: 'Ура вы победили!\nСписок результатов:',
    FONT_FAMILY: 'PT Mono',
    FONT_SIZE: 16,
    COLOR: '#000000'
  };

  drawHexagon(ctx, shadow.color, shadow.x, shadow.y);
  drawHexagon(ctx, Cloud.COLOR, Cloud.X, Cloud.Y);
  drawText(ctx, Message);
  drawChart(ctx, names, times);
};

function drawHexagon(ctx, color, x, y) {
  ctx.fillStyle = color;
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

function drawText(ctx, Message) {
  var strings = Message.TEXT.split('\n');

  ctx.fillStyle = Message.COLOR;
  ctx.font = Message.FONT_SIZE + 'px' + Message.FONT_FAMILY;

  for (var i = 0, y = Message.FONT_SIZE + 25; i < strings.length; i++, y += Message.FONT_SIZE) {
    ctx.fillText(strings[i], 220, y);
  }
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
    var color = (names[i] === 'Вы') ? SELF_COLOR : getRandomColumnColor();

    drawColumn(ctx, color, columnX, columnY, COLUMN_WIDTH, columnHeight, times[i], names[i]);
  }
}

function getRandomColumnColor() {
  return 'rgba(0, 0, 255, ' + Math.random().toFixed(2) + ')';
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

function drawColumn(ctx, color, x, y, width, height, time, name) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = '#000';
  ctx.fillText(parseInt(time, 10), x, y - 5);
  ctx.fillText(name, x, y + height + 15);
}
