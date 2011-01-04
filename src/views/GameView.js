
/**
 * @class Bleext.memory.views.GameView
 * @extends Ext.Panel
 * Description
 */
Bleext.memory.views.GameView = Ext.extend(Ext.Panel, {
	scroll		: "both",
	
    initComponent: function() {
        
		this.items = [];
		
        Bleext.memory.views.GameView.superclass.initComponent.apply(this, arguments);
    },

	drawCards	: function(){
		var cards = [];
		
		this.removeAll();
		
		this.game.cards().each(function(card){
			cards.push({
				xtype	: "cardview",
				controller: this.controller,
				card	: card
			});
		},this);
		
		for(var i=0,c=0,len=Math.ceil(this.game.get("total")/6);i<len;i++){
			var row = {
				xtype	: "container",
				layout	: "hbox",
				items	: [],
				padding	: "10 0 0 0"
			};
			for(var j=0;j<6;j++,c++){
				row.items.push({
					xtype	: "container",
					flex	: 1
				});
				row.items.push(cards[c]);
			}
			row.items.push({
				xtype	: "container",
				flex	: 1
			});
			this.add(row);
		}
		this.doLayout();
	}
});

Ext.reg('gameview', Bleext.memory.views.GameView);