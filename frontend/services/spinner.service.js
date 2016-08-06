'use strict';

import angular from 'angular';

console.log('spiner ready');

angular
	.module('base')
	.factory("spinner", spinner);

function spinner(){
	let sp = this;

	let service = {
		startSpinn: startSpinn,
		stopSpinn: stopSpinn
	};
	

	function startSpinn(el = document.querySelector('body')){
		if(!sp.el){
			sp.el = el;
			el.children().prop('style','opacity: 0.5');
			let spinner = angular.element(require('../templates/spinner.pug')());
			sp.spinner = spinner;
			el.append(spinner);

		}else{
			console.log('Not allowed multiply spinners');
		};
	};

	function stopSpinn(){
		sp.spinner.remove();
		sp.el.children().prop('style','');
	};
	return service;
};

