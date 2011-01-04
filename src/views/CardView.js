/**
 * @class Bleext.memory.views.CardView
 * @extends extendsClass
 * Description
 */

Ext.ns("Bleext.memory");

Bleext.memory.views.CardView = Ext.extend(Ext.Container, {
	width	: 100,
	cls		: "bleext-memory-card bleext-memory-card-hidden",
	
    initComponent: function() {
        
		this.addEvents({
			"tab"	: true
		});
        
		this.html = {
			tag		: "div",
			children: [{
				tag		: "img",
				src		: Ext.BLANK_IMAGE_URL,
				style	: "background-image: url("+this.card.get("img")+")"
			}]
		}
		
		
        Bleext.memory.views.CardView.superclass.initComponent.apply(this, arguments);

		this.on("tab",this.controller.flipCard,this.controller);
    },

	afterRender	: function(){
		Bleext.memory.views.CardView.superclass.afterRender.apply(this,arguments);
		this.el.on("click",this.handleClickEvent,this);
	},
	
	handleClickEvent	: function(){
		this.card.view = this;
		this.fireEvent("tab",this.card);
	},
	
	showImage	: function(){
		this.el.removeCls("bleext-memory-card-hidden");
		this.el.addCls("bleext-memory-card-fliped");
	},
	
	hideImage	: function(){
		this.el.addCls("bleext-memory-card-hidden");
		this.el.removeCls("bleext-memory-card-fliped");
	},
	
	hideCard	: function(){
		this.el.addCls("bleext-memory-card-remove");
	}
});

Ext.reg('cardview', Bleext.memory.views.CardView);