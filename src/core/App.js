
Ext.regApplication({
    name			: "Bleext.memory",
	defaultUrl 		: "game/home",
	defaultTarget	: "viewport",
	
    launch			: function() {
        Bleext.memory.Core.init();
    }
});