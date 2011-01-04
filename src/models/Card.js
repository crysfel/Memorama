Ext.ns("Bleext.memory");

Bleext.memory.models.Card = Ext.regModel("Card", {
	belongsTo	: "Game",
	
    fields: [
        {name: 'idCard', type: 'int'},
        {name: 'img', type: 'string'}
    ],
 
    validations: [
		{type: 'presence', name: 'img'}
    ],
 
    proxy: {
        type	: 'localstorage',
		id		: "card"
    },

	remove	: function(){
		if(this.view){
			this.view.hideCard();
		}
	}
});