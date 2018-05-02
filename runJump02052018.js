$('#gameContainer').html('<center><button id="hideChart" onclick="hideChart();">Hide Chart</button> <button id="viewChart" onclick="viewChart();">View Chart</button> <button id="hideLog" onclick="hideLog();">Hide Log</button> <button id="viewLog" onclick="viewLog();">View Log</button> <input style="background: none; width: 114px; text-align: center; color: #fff;" type="number" id="basebetAmount" value="0.00000000" placeholder="Base Bet" autocomplete="off"> <input style="background: none; width: 114px; text-align: center; color: #fff;" type="number" id="overBalance" value="0.00000000" placeholder="Over Balance" autocomplete="off"> <input style="background: none; width: 114px; text-align: center; color: #fff;" type="number" id="underBalance" value="0.00000000" placeholder="Under Balance" autocomplete="off"> <button id="min" onclick="min();">Min BET</button> <button id="start" onclick="start();">Start BOT</button> <button id="stop" onclick="stop();">Stop BOT</button> <button id="reset" onclick="reset();">Reset BOT</button></center><br> <div id="chart" style="width: 558px; height: 300px; float: left; border: 1px solid #fff;"></div> <div id="log" style="overflow: auto; font-size: 16px; width: 438px; height: 300px; float: right; border: 1px solid #fff;"></div>');
$('#gameContainer').css('width', '1000px');
$('#gameContainer').css('height', '370px');
$('#gameContainer').css('color', '#fff');
$('#gameContainer').css('font-size', '16px');
$('#gameContainer').css('margin', 'auto');
$('#stop').prop('disabled', true);
log('--------------------------------------------------------------');
log('BOT has applied!');
var basebetAmount = 0;
	basenbetAmount = 0;
	overBalance = 0;
	underBalance = 0;
	betAmount = 0;
	maxbetAmount = 0;
	prediction = 0;
	direction = '';
	bet = 0;
	win = 0;
	winStreak = 0;
	maxWinStreak = 0;
	lose = 0;
	loseStreak = 0;
	maxLoseStreak = 0;
	profit = 0;
	wagered = 0;
	maxBalance = 0;
	run = false;
	runLog = 0;
	runJump = 0;
	maxJump = 0;
	turn = 0;
	startTime = 0;
	onTime = 0;
	playTime = 0;
	playDay = 0;
	playHour = 0;
	playMinute = 0;
	playSecond = 0;
	speedBet = 0;
	dsp = [];
	chart;
	color = '';
	$.getScript('https://canvasjs.com/assets/script/canvasjs.min.js')
		.done(function (script, textStatus) {
		dps = [{ x: 0, y: 0 }];
		chart = new CanvasJS.Chart('chart', {
			theme: 'light2',
			zoomEnabled: true,
			axisX:{ 
				title: "Bet",
				includeZero: false,
			},
			axisY:{ 
				title: "Profit",
				includeZero: false,
			},
			title: { text: 'Dice BOT Luckygames runJump by Mai Hoang Quoc Bao', fontSize: 16 },
			data: [{ type: 'stepLine', dataPoints: dps }]
		});
		chart.render();
	});
function updateChart(bet, profit, color) {
	dps.push({ x: bet, y: profit, color: color });
	if (dps[dps.length - 2]) {
		dps[dps.length - 2].lineColor = color;
	}
	if (dps.length > 1e3) {
		dps.shift();
	}
	chart.render();
}
function min() {
	$('#basebetAmount').val((0.00000001).toFixed(8));
}
function start() {
	startTime = new Date();
	basebetAmount = $('#basebetAmount').val();
	basenbetAmount = basebetAmount * 10;
	overBalance = $('#overBalance').val();
	underBalance = $('#underBalance').val();
	betAmount = basebetAmount;
	prediction = 6;
	direction = 'under';
	run = true;
	$('#basebetAmount').val(parseFloat(basebetAmount).toFixed(8));
	$('#overBalance').val(parseFloat(overBalance).toFixed(8));
	$('#underBalance').val(parseFloat(underBalance).toFixed(8));
	$('#basebetAmount').prop('disabled', true);
	$('#overBalance').prop('disabled', true);
	$('#underBalance').prop('disabled', true);
	$('#min').prop('disabled', true);
	$('#start').prop('disabled', true);
	$('#stop').prop('disabled', false);
	$('#reset').prop('disabled', true);
	doBet();
}
function stop() {
	run = false;
	$('#basebetAmount').prop('disabled', false);
	$('#overBalance').prop('disabled', false);
	$('#underBalance').prop('disabled', false);
	$('#min').prop('disabled', false);
	$('#start').prop('disabled', false);
	$('#stop').prop('disabled', true);
	$('#reset').prop('disabled', false);
}
function reset() {
	basebetAmount = 0;
	basenbetAmount = 0;
	overBalance = 0;
	underBalance = 0;
	betAmount = 0;
	maxbetAmount = 0;
	prediction = 0;
	direction = '';
	bet = 0;
	win = 0;
	lose = 0;
	profit = 0;
	wagered = 0;
	maxBalance = 0;
	run = false;
	runLog = 0;
	runJump = 0;
	maxJump = 0;
	turn = 0;
	startTime = 0;
	onTime = 0;
	playTime = 0;
	playDay = 0;
	playHour = 0;
	playMinute = 0;
	playSecond = 0;
	speedBet = 0;
	dsp = [];
	chart;
	color = '';
	$.getScript('https://canvasjs.com/assets/script/canvasjs.min.js')
		.done(function (script, textStatus) {
		dps = [{ x: 0, y: 0 }];
		chart = new CanvasJS.Chart('chart', {
			theme: 'light2',
			zoomEnabled: true,
			axisX:{ 
				title: "Bet",
				includeZero: false,
			},
			axisY:{ 
				title: "Profit",
				includeZero: false,
			},
			title: { text: 'Dice BOT Luckygames runJump by Mai Hoang Quoc Bao', fontSize: 16 },
			data: [{ type: 'stepLine', dataPoints: dps }]
		});
		chart.render();
	});
	$('#log p').remove();
	log('--------------------------------------------------------------');
	log('BOT has reset!');
}
function log(content) {
	$('<p style="text-align: justify; margin: 0px; padding-left: 10px;">' + content + '</p>').appendTo('#log');
}
function hideChart() {
	document.getElementById('chart').hidden = true;
}
function viewChart() {
	document.getElementById('chart').hidden = false;
}
function hideLog() {
	document.getElementById('log').hidden = true;
}
function viewLog() {
	document.getElementById('log').hidden = false;
}
function doBet() {
	if (run === true) {
		jQuery.ajax({
			url: '/ajx/',
			type: 'POST',
			dataType: 'html',
			timeout: 2e4,
			data: {
				game: 'dice',
				coin: $('#coin').val(),
				betAmount: betAmount,
				prediction: prediction,
				direction: direction,
				clientSeed: $('#clientSeed').val(),
				serverSeedHash: $('#serverSeedHash').html(),
				action: 'playBet',
				hash: user.hash
			},
			success: function (data) {
				var game = JSON.parse(data);
					gameResult = game.gameResult;
					gameresultNumber = game.resultNumber;
					gameBalance = parseFloat(game.balance);
					gameProfit = parseFloat(game.profit);
				if (game.result === true) {
					$('#serverSeedHash').html(game.serverSeedHash);
					$('#prevServerSeed').html(game.prevServerSeed);
					$('#prevServerSeedHash').html(game.prevServerSeedHash);
					$('#prevClientSeed').html(game.prevClientSeed);
					$('#balance').val(game.balance);
					bet++;
					profit += gameProfit;
					wagered += parseFloat(betAmount);
					runLog++;
					onTime = new Date().getTime();
					playTime = onTime - startTime;
					playDay = Math.floor(playTime / (1e3 * 60 * 60 * 24));
					playHour = Math.floor((playTime % (1e3 * 60 * 60 * 24)) / (1e3 * 60 * 60));
					playMinute = Math.floor((playTime % (1e3 * 60 * 60)) / (1e3 * 60));
					playSecond = Math.floor((playTime % (1e3 * 60)) / 1e3);
					speedBet = parseFloat((bet / playTime) * 1e3);
					if (gameResult === 'win') { win++; winStreak++; loseStreak = 0; color = '#2eab5b'; } else { lose++; loseStreak++; winStreak = 0; color = '#ab2e40'; }
					if (runLog >= 1e2) { runLog = 0; $('#log p').remove(); }
					if (runJump >= maxJump) { maxJump = runJump; }
					if (betAmount >= maxbetAmount) { maxbetAmount = betAmount; }
					if (gameBalance >= maxBalance) { maxBalance = gameBalance; }
					if (winStreak >= maxWinStreak) { maxWinStreak = winStreak; }
					if (loseStreak >= maxLoseStreak) { maxLoseStreak = loseStreak; }
					$('#log p').remove(); 
					log('--------------------------------------------------------------');
					log('<font style="color: ' + color + '">' + parseFloat(betAmount).toFixed(8) + ' ' + direction + ' ' + prediction + ' -> ' + gameresultNumber + ' ' + gameResult + ' ' + gameProfit.toFixed(8) + '</font>');
					log('--------------------------------------------------------------');
					log('playTime = ' + playDay + ':' + playHour + ':' + playMinute + ':' + playSecond + '');
					log('speedBet = ' + speedBet.toFixed(2) + '');
					log('profit = ' + profit.toFixed(8) + '');
					log('wagered = ' + wagered.toFixed(8) + '');
					log('maxbetAmount = ' + parseFloat(maxbetAmount).toFixed(8) + '');
					log('maxJump = ' + maxJump + '');
					log('bet = ' + bet + ' - win = ' + win + ' - lose = ' + lose + '');
					log('winStreak = ' + winStreak + ' - maxWinStreak = ' + maxWinStreak + '');
					log('loseStreak = ' + loseStreak + ' - maxLoseStreak = ' + maxLoseStreak + '');
					$('#log').stop().animate({ scrollTop: $('#log')[0].scrollHeight });
					updateChart(bet, profit, color);
					if (betAmount >= gameBalance) {
						log('--------------------------------------------------------------');
						log('You lose!');
						return;
					} else {
						if (overBalance != 0 && gameBalance >= overBalance) {
							log('--------------------------------------------------------------');
							log('Over balance!');
							return;
						} else if (underBalance != 0 && gameBalance <= underBalance) {
							log('--------------------------------------------------------------');
							log('Under balance!');
							return;
						} else {
							if (gameBalance >= maxBalance) {
								turn = 0;
								runJump = 0;
							}
							if (turn === 0) {
								if (runJump >= 3) {
									turn = 1;
								}
								if (runJump%2 === 0) {
									if (gameresultNumber >= 36 && betAmount > (basenbetAmount - 0.00000001)) {
										runJump += 1;
									} else {
										if (gameBalance >= maxBalance && gameresultNumber < 36 && betAmount > (basenbetAmount - 0.00000001)) {
											runJump = 0;
										}
									}
								} else {
									if (gameresultNumber >= 49 && betAmount > (basenbetAmount - 0.00000001)) {
										runJump += 1;
									} else {
										if (gameBalance >= maxBalance && gameresultNumber < 49 && betAmount > (basenbetAmount - 0.00000001)) {
											runJump = 0;
										}
									}
								}
								if (gameresultNumber > 90) {
									betAmount = basenbetAmount * Math.pow(2, runJump);
									if (runJump%2 === 0) {
										prediction = 36;
									} else {
										prediction = 49;
									}
									direction = 'under';
								} else {
									betAmount = basebetAmount;
									if (Math.floor(Math.random()*2)+1 === 1) {
										prediction = 50;
										direction = 'over';
									} else {
										prediction = 49;
										direction = 'under';
									}
								}
							} else if (turn === 1) {
								if (gameresultNumber >= 80 && betAmount > (basenbetAmount - 0.00000001)) {
									runJump += 1;
								} else {
									if (gameBalance >= maxBalance && gameresultNumber < 80 && betAmount > (basenbetAmount - 0.00000001)) {
										runJump = 0;
									}
								}
								if (gameresultNumber > 90) {
									betAmount = basenbetAmount * Math.pow(2, runJump);
									prediction = 80;
									direction = 'under';
								} else {
									betAmount = basebetAmount;
									if (Math.floor(Math.random()*2)+1 === 1) {
										prediction = 50;
										direction = 'over';
									} else {
										prediction = 49;
										direction = 'under';
									}
								}
							}
						}
					}
					doBet();
				}
			},
			error: function (xhr, ajaxOptions, throwagerednError) {
				
			},
			timeout: function (xhr, ajaxOptions, throwagerednError) {
				check = true;
			},
			abetort: function (xhr, ajaxOptions, throwagerednError) {
				check = true;
			}
		});
	} else {
		log('--------------------------------------------------------------');
		log('BOT has stopped!');
		return;
	}
}
