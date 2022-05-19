Ext.define('GSmartApp.view.handover.HandoverCutToline_Detail_PorderGrantSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverCutToline_Detail_PorderGrantSearchController',
    init: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var productid_link = viewModel.get('productid_link');
        var dateSX = viewModel.get('dateSX');
        // console.log(dateSX);
        // console.log(productid_link);
        var POrder_Grant = viewModel.get('POrder_Grant');
        // POrder_ListStore.loadStoreByPordercode(pordercode);
        POrder_Grant.loadDanhSachLenhKeHoachByDate(productid_link, dateSX);
        POrder_Grant.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
                    // console.log(records);
                    var items = POrder_Grant.getData().items;
                    if(viewId == 'handover_cut_toline_detail'){
                        if(items.length == 0){
                            m.fireEvent('found0PorderGrant');
                        }
                        if(items.length == 1){
                            m.fireEvent('found1PorderGrant', records);
                        }
                    }
				}
			}
        });
    },
    listen: {

    },
    control: {
        '#btnQuayLai': {
            click: 'onQuayLai'
        },
        '#btnLuu': {
            click: 'onLuu'
        },
    },
    onQuayLai: function(){
        this.getView().up('window').close();
    },
    onLuu: function(){
        // console.log('luu');
        var viewModel = this.getViewModel();
        var m = this.getView();
        var select = m.getSelectionModel().getSelection();
        this.fireEvent('loadOrg', select);
        this.fireEvent('foundProduct',select);
        
        
    


    },
})