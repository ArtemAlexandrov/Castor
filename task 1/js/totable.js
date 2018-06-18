(function() {
	'use strict';

	let table = document.getElementById('res-table');
	let inputs = document.querySelectorAll('.params-table>div.row>input');

	function show() {
		console.log(arr);
	}

	function maketablerows() {
		for(let key of arr) {
			let tr = document.createElement('div');
			tr.setAttribute('class', 'row-table');
			table.appendChild(tr);
		}
	}

	document.addEventListener("DOMContentLoaded", afterload);
	document.addEventListener("DOMContentLoaded", maketablerows);

	function maketablecells() {
		let columns = document.querySelectorAll("#res-table>div.row-table:first-child>div.cell-table");
		let rows = document.querySelectorAll("div.row-table:not(:first-child)");
		// console.log(rows);
		for(let pos of rows) {
			for(let val of columns) {
				let cell = document.createElement('div');
				cell.setAttribute('class', 'cell-table');
				pos.appendChild(cell);
			}
		}
	}

	document.addEventListener("DOMContentLoaded", maketablecells);
	document.addEventListener("DOMContentLoaded", show);

	for(let key of inputs) {
		key.addEventListener('click', afterload);
		key.addEventListener('keydown', afterload);
		key.addEventListener('keypress', afterload);
		key.addEventListener('keyup', afterload);
	}

	for(let key of inputs) {
		key.addEventListener('click', insertintotable);
		key.addEventListener('keydown', insertintotable);
		key.addEventListener('keypress', insertintotable);
		key.addEventListener('keyup', insertintotable);
	}

	function insertintotable() {
		let secondcells = document.querySelectorAll("div.row-table:not(:first-child)>div.cell-table:not(:first-child)");
		let firstcells = document.querySelectorAll("div.row-table:not(:first-child)>div.cell-table:first-child");

		let arr2 = [];
		function take() {
			for(let key in arr) {
				arr2.push(Object.values(arr[key]));
			}
			return arr2;
		}
		
		let values = take();

		values.forEach( function(element, index) {
			if(index == 0) {
				firstcells[index].innerHTML = "БО";	
			} else {
				firstcells[index].innerHTML = index;	
			}
		});

		let newarr = [];
		for(let key in values) {
			values[key].forEach( function(element, index) {
				newarr.push(element);
			});
		}
		newarr.forEach( function(element, index) {
			if(!Number.isInteger(element)) {
				secondcells[index].innerHTML = element.toFixed(9);	
			} else {
				secondcells[index].innerHTML = element;	
			}
		});
	}
	document.addEventListener("DOMContentLoaded", insertintotable);

}());