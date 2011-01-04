
/**
 * @class Bleext.memory.views.HomeView
 * @extends Ext.Panel
 * Description
 */
Bleext.memory.views.HomeView = Ext.extend(Ext.Panel, {
	layout		: "vbox",
	
    initComponent	: function() {

		this.items = [{
			width	: 400,
			centered: true,
			cls		: "bleext-home-bg",
			items	: [this.createMsg(),this.createForm()]
		}];
		
        Bleext.memory.views.HomeView.superclass.initComponent.apply(this, arguments);
    },

	createMsg		: function(){
		return {
			html	: "<h1>Welcome!</h1><p>Please give us your name!</p>"
		}
	},
	
	createForm		: function(){
		this.form = new Ext.form.FormPanel({
			items	: [{
				xtype: "textfield",
				name : "username",
				label: "Username"
			}]
		});
		
		return this.form;
	}
});

Ext.reg('homeview', Bleext.memory.views.HomeView);