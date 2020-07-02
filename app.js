(function () {
'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyController', ToBuyController)
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController (ShoppingListCheckOffService) {
		var toBuy = this;
		toBuy.list = ShoppingListCheckOffService.toBuyList;
		toBuy.moveItem = function (index) {
			ShoppingListCheckOffService.moveToAlreadyBought(index);
			toBuy.isEmpty = ShoppingListCheckOffService.isEverythingBought();
			ShoppingListCheckOffService.isStillNothingBought();
		};
	}

	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController (ShoppingListCheckOffService) {
		var alreadyBought = this;
		alreadyBought.list = ShoppingListCheckOffService.alreadyBought;
		alreadyBought.obj = ShoppingListCheckOffService;

	}

	function ShoppingListCheckOffService () {
		var service = this;

		service.toBuyList = [
			{
				name: 'apples',
				quantity: 12
			},
			{
				name: 'carrots',
				quantity: 7
			},
			{
				name: 'peaches',
				quantity: 4
			},
			{
				name: 'bananas',
				quantity: 8
			},
			{
				name: 'tomatoes',
				quantity: 6
			}];
		service.alreadyBought = [];

		service.isNothingBought = true;

		service.moveToAlreadyBought = function (index) {
			service.alreadyBought.push(service.toBuyList[index]);
			service.toBuyList.splice(index, 1);
		};

		service.isEverythingBought = function () {
			if (service.toBuyList.length === 0)
				return true;
			else return false;
		}

		service.isStillNothingBought = function () {
			if (service.alreadyBought.length === 0)
				service.isNothingBought = true;
			else service.isNothingBought = false;
		}

	}

})();