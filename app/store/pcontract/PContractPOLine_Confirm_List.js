Ext.define('GSmartApp.store.pcontract.PContractPOLine_Confirm_List', {
	extend: 'Ext.data.Store',
	alias: 'store.PContractPOLine_Confirm_List',
	storeId: 'PContractPOLine_Confirm_List',
	model: 'GSmartApp.model.pcontract.PContractPOLine_Confirm',
	sorters: [
		{
			direction: 'ASC',
			property: 'shipdate'
		},
		{
			direction: 'ASC',
			property: 'po_buyer'
		},
		{
			direction: 'ASC',
			property: 'productbuyercode'
		}
	],
	loadPOLine_Confirm_ByMonthYear: function(firstday_month,lastday_month){
		var params = new Object();
        params.firstDayOfMonth_shipDate = firstday_month;
        params.lastDayOfMonth_shipDate = lastday_month;

		this.setProxy({
			type: 'ajax',
			actionMethods: {
				create : 'POST',
				read   : 'POST',
				update : 'POST',
				destroy: 'POST'
			},
			url: config.getAppBaseUrl()+'/api/v1/pcontract_po/getPOLine_Confirm_ByMonthYear',
			paramsAsJson:true,
			noCache: false,
			extraParams : params,
			headers :{
				'Accept': "application/json", 
				'Content-Type':"application/json"
			 },
			reader: {
				type: 'json',
				rootProperty: 'data'
			}
		});
		this.load();
	},
});
