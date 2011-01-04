/**
 * @class Bleext.memory.views.Viewport
 * @extends Ext.Panel
 * Description
 */

Bleext.memory.views.Viewport = Ext.extend(Ext.Panel, {
	id				: "viewport",
	layout			: "card",
	fullscreen		: true,
	cls				: "bleext-memory-viewport",
	
    initComponent	: function() {

		this.addEvents({
			"newGame"	: true
		});

		this.dockedItems = this.createTaskBar();
        this.time = new Date();
		this.time.setMinutes(0);

        Bleext.memory.views.Viewport.superclass.initComponent.apply(this, arguments);
		
    },

	createTaskBar	: function(){
		this.stopWatch = new Ext.Component({name:"time",html:"00:00",width:110,cls:"bleext-memory-tool"});
		this.moves = new Ext.Component({name:"moves",html:"0 Moves",width:100,cls:"bleext-memory-tool"});
		return { 
			xtype	: "toolbar",
			dock	: "bottom",
			items	: [
				{text:"New game",handler:this.onNewGame,scope:this},
				{xtype: "spacer"},
				this.moves,
				{xtype: 'spacer', width: 50},
				this.stopWatch
			]
		};
	},
	
	setTime		: function(time){
		var sec = time,
			min = 0;
			
		if(time >= 60){
			min = Math.floor(time/60);
			sec = time - min*60;
		}
		this.time.setSeconds(sec);
		this.time.setMinutes(min);

		this.stopWatch.getEl().setHTML(Ext.util.Format.date(this.time,"i:s"));
	},
	
	onNewGame	: function(){
		this.fireEvent("newGame");
	},
	
	setMoves	: function(move){
		this.moves.getEl().setHTML(move+" Moves");
	}
});

Ext.reg('memoryviewport', Bleext.memory.views.Viewport);