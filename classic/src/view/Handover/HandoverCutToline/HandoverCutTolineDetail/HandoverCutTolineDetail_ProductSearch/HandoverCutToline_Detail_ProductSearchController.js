Ext.define('GSmartApp.view.handover.HandoverCutToline_Detail_ProductSearchController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.HandoverCutToline_Detail_ProductSearchController',
    init: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var buyercode = viewModel.get('buyercode');
        var dateSX = viewModel.get('dateSX');
        var ProductStore = viewModel.get('ProductStore');
        ProductStore.loadStoreByBuyerCodeAndTypeId(buyercode,10);
        ProductStore.load({
			scope: this,
			callback: function(records, operation, success) {
				if(!success){
					 // this.fireEvent('logout');
				} else {
                    // console.log(records);
                    var items = ProductStore.getData().items;
                    console.log(items);
                    if(viewId == 'handover_cut_toline_detail'){
                        if(items.length == 0){
                            m.fireEvent('found0Product');
                        }
                        if(items.length == 1){
                            m.fireEvent('found1Product', records);
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
        '#HandoverCutToline_Detail_ProductSearch': {
            // select: 'onSelectProduct',
            itemclick: 'onSelectProduct'
        },
    },
    onSelectProduct: function(grid, record, item, index, e, eOpts){
        console.log("11111");
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var viewId = viewModel.get('viewId');
        var dateSX = viewModel.get('dateSX');
        // var selection= me.getSelectionModel().getSelection();
        var productid_link = record.get('id');
        console.log(record);
        viewModel.set('currentRec.porderid_link', productid_link);
        // return;
        var POrder_Grant = viewModel.getStore('POrder_Grant');
        // POrder_ListStore.loadStoreByPordercode(pordercode);
        POrder_Grant.loadDanhSachLenhKeHoachByDate(productid_link, dateSX);
        // // POrder_Grant.load({
		// // 	scope: this,
		// // 	callback: function(records, operation, success) {
		// // 		if(!success){
		// // 			 // this.fireEvent('logout');
		// // 		} else {
        // //             // console.log(records);
        // //             var items = POrder_Grant.getData().items;
        // //             if(viewId == 'handover_cut_toline_detail'){
        // //                 if(items.length == 0){
        // //                     m.fireEvent('found0PorderGrant');
        // //                 }
        // //                 if(items.length == 1){
        // //                     m.fireEvent('found1PorderGrant', records);
        // //                 }
        // //             }
		// // 		}
		// // 	}
        // });
        // var form = Ext.create('Ext.window.Window', {
        //     height: 400,
        //     width: 500,
        //     closable: true,
        //     resizable: false,
        //     modal: true,
        //     border: false,
        //     title: 'Danh sách lệnh',
        //     closeAction: 'destroy',
        //     bodyStyle: 'background-color: transparent',
        //     layout: {
        //         type: 'fit', // fit screen for window
        //         padding: 5
        //     },
        //     items: [{
        //         xtype: 'HandoverCutToline_Detail_PorderGrantSearch',
        //         viewModel: {
        //             // type: 'HandoverCutToline_Detail_PorderGrantSearchViewModel',
        //             data: {
        //                 productid_link: productid_link,
        //                 dateSX:dateSX,
        //                 viewId: viewId
        //             }
        //         }
        //     }]
        // });
        // form.show();

        // form.down('#HandoverCutToline_Detail_PorderGrantSearch').getController().on('found0PorderGrant', function () {
        //     Ext.Msg.show({
        //         title: "Thông báo",
        //         msg: "Không tìm thấy lệnh",
        //         buttons: Ext.MessageBox.YES,
        //         buttonText: {
        //             yes: 'Đóng',
        //         }
        //     });
        //     form.close();
        // });

        // form.down('#HandoverCutToline_Detail_PorderGrantSearch').getController().on('foundManyPorderGrant', function (select) {
        //     if(select.length == 0){
        //         Ext.Msg.show({
        //             title: "Thông báo",
        //             msg: "Phải chọn ít nhất một lệnh",
        //             buttons: Ext.MessageBox.YES,
        //             buttonText: {
        //                 yes: 'Đóng',
        //             }
        //         });
        //         return;
        //     }
        //     //  console.log(select[0]);
        //     var porderid_link = select[0].data.porderid_link;
        //     // console.log(porderid_link);
        //     var pordercode = select[0].data.ordercode;
        //     // console.log(pordercode); // 
            m.fireEvent('loadOrg',productid_link);
    
        //     // cut to line, load store ListOrgStore_To


        //     form.close();
        // });

    },
    onQuayLai: function(){
        this.getView().up('window').close();
    },
    onLuu: function(){
        // console.log('luu');
        var viewModel = this.getViewModel();
        var m = this.getView();
        var select = m.getSelectionModel().getSelection();

        this.fireEvent('foundManyProduct', select);

    },
})