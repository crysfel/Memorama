/**
 * @class Bleext.memory.views.RecordsView
 * @extends Ext.Panel
 * Description
 */
Bleext.memory.views.RecordsView = Ext.extend(Ext.Panel, {

    initComponent: function() {
        
        Bleext.memory.views.RecordsView.superclass.initComponent.apply(this, arguments);
    }
});

Ext.reg('recordsview', Bleext.memory.views.RecordsView);