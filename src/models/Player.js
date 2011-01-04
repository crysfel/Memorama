
/**
 * @class Bleext.memory.models.Player
 * @extends extendsClass
 * Description
 */

Ext.ns("Bleext.memory");

Bleext.memory.models.Player = Ext.regModel("Player", {
	fields		: [
		{name:"username",type:"string"},
		{name:"bestTime",type:"int"}
	]
});