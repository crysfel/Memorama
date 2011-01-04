
/**
 * @class Bleext.memory.controllers.GameController
 * @extends extendsClass
 * Description
 */

Bleext.memory.controllers.GameController = Ext.regController("GameController", {
	model	: "Game",
	
	init	: function(){
		this.game = new this.model();
		this.createCards();
		
		this.views = {
			home	: new Bleext.memory.views.HomeView(),
			game	: new Bleext.memory.views.GameView({game:this.game,controller:this})
		};
		
		this.game.on("movecard",this.updateMoves,this);
	},
	
	home	: function(){
		this.views.viewport = Ext.getCmp(this.application.defaultTarget)
		this.views.viewport.on("newGame",this.createUser,this);
		
		this.render(this.views.home);
	},
	
	start	: function(){
		this.reset();
		this.startTime();
		this.game.startGame();
		this.game.shuffle();
		this.views.game.drawCards();
		this.updateMoves(0);
		this.render(this.views.game);
	},
	
	createUser	: function(){
		var values = this.views.home.form.getValues();
		
		if(values.username){
			var player = Ext.ModelMgr.create({
				username	: values.username
			},"Player");
			
			Ext.redirect("game/start");
		}else{
			Ext.Msg.alert("Username","Please set your username before you start!");
		}
	},
	
	reset	: function(){
		this.seconds = 0;
	},
	
	startTime	: function(){
		var me = this;
		if(!Ext.isEmpty(this.thread)){
			clearInterval(this.thread);
		}
		this.thread = setInterval(function(){
			me.seconds++;
			me.views.viewport.setTime(me.seconds);
		},1000);
	},
	
	createCards	: function(){
		var store = this.game.cards(),
			len = this.game.get("total")/2;

		for(var i=1;i<=len;i++){
			store.add({
				idCard	: i+1,
				img		: "resources/images/cards/"+(i<10?"0"+i:i)+".png"
			});
			store.add({
				idCard	: i+1,
				img		: "resources/images/cards/"+(i<10?"0"+i:i)+".png"
			});
		}
		
		this.game.cards().sync();
	},
	
	flipCard	: function(card){
		if(!this.game.get("allow") || card === this.game.get("firstCard")){
			return;
		}
		
		var fliped = this.game.get("fliped") + 1,
			me = this;
		this.game.set("fliped",fliped);
		
		if(fliped == 2){
			this.game.set("fliped",0);
			this.game.set("allow",false);
			this.game.incrementMoves();
			if(this.game.isCorrect(card)){
				this.game.set("counter",this.game.get("counter")+1);
				setTimeout(function(){
					card.remove();
					me.game.get("firstCard").remove();
					me.game.set("allow",true);
					if(me.game.isWinner()){
						me.showWinner();
					}
				},300);
			}else{
				setTimeout(function(){
					card.view.hideImage();
					me.game.get("firstCard").view.hideImage();
					me.game.set("allow",true);
				},500);
			}
		}else{
			this.game.set("firstCard",card);
		}
		
		card.view.showImage();
	},
	
	showWinner	: function(){
		Ext.Msg.alert("Congrats! you win! "+this.game.get("moves")+" moves");
		clearInterval(this.thread);
		setTimeout(function(){
			Ext.redirect("game/records");
		},3000);
	},
	
	updateMoves	: function(moves){
		this.views.viewport.setMoves(moves);
	}
});