Ext.ns("Bleext.memory");

Bleext.memory.models.Game = Ext.regModel("Game", {
	belongsTo: "Player",
	hasMany	: [
		{model:"Card",name:"cards"}
	],
	
    fields	: [
		{name: "id", type: "int"},
		{name: 'time', type: 'int'},
        {name: 'startTime', type: 'date'},
		{name: 'moves', type: 'int'},
		{name: 'total', type: 'int'},
		{name: 'fliped', type: "int"},
		{name: "firstCard"},
		{name: "allow"},
		{name: "counter",type: "int"}
    ],
 
    proxy: {
        type	: 'localstorage',
		id		: "game"
    },

	constructor	: function(){
		
		this.addEvents({
			"startgame"	: true,
			"gameover"	: true,
			"movecard"	: true,
			"beforesave": true,
			"saverecord": true	
		});
		
		Bleext.memory.models.Game.superclass.constructor.apply(this,arguments);
		
		this.set("total", 24);
		this.set("fliped",0);
	},
	
	startGame	: function(){
		this.set({
			"startTime"	: new Date(),
			"time"		: 0,
			"moves"		: 0,
			"counter"	: 0,
			"fliped"	: 0,
			"allow"		: true
		});
		this.fireEvent("startgame",this);
	},
	
	isCorrect	: function(card){
		return  card !== this.get("firstCard") && card.get("idCard") === this.get("firstCard").get("idCard");
	},
	
	isWinner	: function(){
		return this.get("counter") >= this.get("total")/2;
	},
	
	incrementMoves: function(){
		var total = this.get("moves")+1;
		this.set("moves",total);
		this.fireEvent("movecard",total);
	},
	
	shuffle	: function(){
		var store = this.cards();
		var original = store.getRange();
		store.removeAll();
		for(var i=0;i<10;i++){
			original.sort(function() {
	            return Math.round(Math.random())-0.5;
	        });
		}
		this.cards().loadData(original);
		this.cards().sync();
	}
});