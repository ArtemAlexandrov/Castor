(function() {
	'use strict';
	
	// ИСХОДНЫЕ ПАРАМЕТРЫ
	var params = {
		// Объем базового ордера, btc
		volbaseorder: 0.01,
		// Объем страховочного ордера
		volsafeorder: 0.01,
		// Желаемый профит,%
		profit: 0.5,
		// % падения для выставления СО
		fallpercentage: 2,
		// Цена монеты, btc
		coincost: 0.001,
		// Множитель объема СО
		factorvol: 1.3,
		// Множитель шага СО
		factorstep: 1.3
	}

	function someFunc() {
		params.volbaseorder = parseFloat(document.getElementById('volbaseorder').value);
		params.volsafeorder = parseFloat(document.getElementById('volsafeorder').value);
		params.profit = parseFloat(document.getElementById('profit').value);
		params.fallpercentage = parseFloat(document.getElementById('fallpercentage').value);
		params.coincost = parseFloat(document.getElementById('coincost').value);
		params.factorvol = parseFloat(document.getElementById('factorvol').value);
		params.factorstep = parseFloat(document.getElementById('factorstep').value);
	}

	let inputs = document.querySelectorAll('.params-table>div.row>input');
	for(let key of inputs) {
		key.addEventListener('click', someFunc);
		key.addEventListener('keydown', someFunc);
		key.addEventListener('keypress', someFunc);
		key.addEventListener('keyup', someFunc);
	}

	// Описание класса объекта результата
	function Resobj(params, index, prevparams) {
		if(index == 0) {
			this.fallcost = 0;																	// % падения
			this.purchasecost = params.coincost;												// Цена покупки монеты в ордере, btc
			this.ordersum = params.volbaseorder;												// Объем СО Сумма задействованная в ордере, btc
			this.dealsum = params.volbaseorder;													// Сумма задействованная в сделке, btc
			this.countcoinsinorder = this.ordersum / this.purchasecost;							// Кол-во купленных монет в ордере
			this.countcoinsindeal = this.countcoinsinorder;										// Кол-во купленных монет в сделке
		}
		if(index == 1) {
			this.fallcost = params.fallpercentage;
			this.purchasecost = params.coincost * (1 - this.fallcost / 100);
			this.ordersum = params.volsafeorder;
			this.dealsum = prevparams.dealsum + params.volsafeorder;
			this.countcoinsinorder = this.ordersum / this.purchasecost;
			this.countcoinsindeal = this.countcoinsinorder + prevparams.countcoinsindeal;
		}
		if(index > 1) {
			this.fallcost = prevparams.fallcost * params.factorstep + params.fallpercentage;
			this.purchasecost = params.coincost * (1 - this.fallcost / 100);
			this.ordersum = prevparams.ordersum * params.factorvol;
			this.dealsum = params.volsafeorder * params.factorvol + prevparams.dealsum;
			this.countcoinsinorder = this.ordersum / this.purchasecost;
			this.countcoinsindeal = this.countcoinsinorder + prevparams.countcoinsindeal;
		}
		if(index > 2) {
			this.dealsum = prevparams.ordersum * params.factorvol + prevparams.dealsum;
		}
		this.benefitprofit = this.dealsum * params.profit / 100;								// Желаемый профит в Btc
		this.returnsumafterdeal = this.dealsum + this.benefitprofit;							// Сумма которая возвращается на баланс при завершении сделки, Btc
		this.averagecoincost = this.dealsum / this.countcoinsindeal;							// Средняя цена монеты за сделку, btc
		this.requiredcoinprice = this.averagecoincost * (1 + params.profit / 100);				// Цена монеты необходимая для продажи с желаемым профитом, btc
		this.requiredgrowth = (this.requiredcoinprice / this.purchasecost - 1) * 100;			// требуемый рост для продажи с прибылью
	}

	// функция расчета
	function calc(params) {
		let arr = [];
		for(let i = 0; i < 21; i++) {
			if(i == 0) {
				arr[i] = new Resobj(params, i);
			}
			if(i >= 1) {
				let params0 = {};
				for (var key in arr[i-1]) {
					params0[key] = arr[i-1][key];
				}
				arr[i] = new Resobj(params, i, params0);
			}
		}
		return arr;
	}

	function callFunction() {
		window.arr = calc(params);
	}
	
	for(let key of inputs) {
		key.addEventListener('click', callFunction);
		key.addEventListener('keydown', callFunction);
		key.addEventListener('keypress', callFunction);
		key.addEventListener('keyup', callFunction);
	}
	window.afterload = function() {
		callFunction();
	}

}());