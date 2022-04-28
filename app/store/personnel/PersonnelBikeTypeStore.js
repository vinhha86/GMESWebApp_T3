Ext.define('GSmartApp.store.personnel.PersonnelBikeTypeStore', {
	extend: 'Ext.data.Store',
	storeId: 'PersonnelBikeTypeStore',
    alias: 'store.PersonnelBikeTypeStore',
	fields: [
		{name: 'id'},
		{name: 'name',  type: 'string'}
	],
	data: [{
        name: 'Xe máy', id: 1
    },{
        name: 'Xe đạp điện', id: 2
    },{
        name: 'Xe đạp', id: 3
    }]
});