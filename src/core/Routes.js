
Ext.Router.draw(function(map) {

	map.connect("game/home", {controller: 'GameController', action: 'home'});
	map.connect("game/start",  {controller: 'GameController', action: 'start'});
	map.connect("game/records",  {controller: 'RecordsController', action: 'show'});

});