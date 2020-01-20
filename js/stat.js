'use strict';

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = '#fff';
  ctx.fillRect(100, 10, 420, 270);

  ctx.font = '16px PT Mono'
  ctx.fillStyle = '#000';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура вы победили!', 230, 10);
  ctx.fillText('Список результатов:', 220, 30);

  // вывести коэффициент расчета максимального значения
  var maxTimes = times[0]
  for (var i = 0; i < times.length; i++) {
    if (times[i] > maxTimes) {
      maxTimes = times[i];
    }
  }
  console.log(times);
  var maxHeight = 150;
  var cofHeight = maxHeight / maxTimes;
  console.log(cofHeight);

  // перерасчет времен относительно максимального значения
  var newTimes = [];
  for (i = 0; i < times.length; i++) {
    newTimes[i] = times[i] * cofHeight;
  }
  console.log(newTimes);

  // построение гистограммы и вывод игроков
  var firstX = 160;
  var firstY = 240;
  var nameY = 250;
  var timesName = 60;
  var widthColumn = 40;
  var distanceBetweenColumns = 50;
  for (i = 0; i < names.length; i++) {
    var columnsX = firstX + (widthColumn + distanceBetweenColumns) * i;
    ctx.fillStyle = colorYouColumn;
    var colorYouColumn = names[i] === 'Вы' ? ctx.fillStyle = 'rgba(255, 0, 0, 1)' : ctx.fillStyle = 'rgb(20, 56, 199, ' + Math.random().toFixed(2) + ')';
    ctx.fillRect(columnsX, firstY, widthColumn, -newTimes[i]);
    ctx.fillStyle = '#000'
    ctx.fillText(names[i], columnsX, nameY);
    ctx.fillStyle = '#000'
    ctx.fillText(newTimes[i].toFixed(0), columnsX, timesName);
  }
  console.log(names);
};
