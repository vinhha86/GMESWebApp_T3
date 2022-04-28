Ext.define('GSmartApp.view.product.ProductSewingCost.Product_Balance.ProductBalanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductBalanceController',
    init: function () {
        
    },

    control: {
        '#ProductBalance': {
            afterrender: 'onAfterrender'
        },
        '#btnQuayLai': {
            click: 'onBtnQuayLai'
        },
        '#btnSapXepCumCongDoan': {
            click: 'onBtnSapXepCumCongDoan'
        },
        '#btnXoaViTriMulti': {
            click: 'onBtnXoaViTriMulti',
        },
        '#btnThemViTri': {
            click: 'onBtnThemViTri'
        },
    },
    onAfterrender: function(){
        console.log('onAfterrender');
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var productid_link = viewModel.get('productid_link');
        var pcontractid_link = viewModel.get('pcontractid_link');

        var ProductSewingCostStore = viewModel.getStore('ProductSewingCostStore');
        ProductSewingCostStore.loadByProductUnused(productid_link, pcontractid_link);

        var ProductBalanceStore = viewModel.getStore('ProductBalanceStore');
        ProductBalanceStore.loadStore(productid_link, pcontractid_link);
    },
    onBtnQuayLai: function(){
        var m = this;
        var viewModel = this.getViewModel();
        m.fireEvent('Thoat');
    },
    onBtnSapXepCumCongDoan: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var productid_link = viewModel.get('productid_link');
        var pcontractid_link = viewModel.get('pcontractid_link');

        var form = Ext.create('Ext.window.Window', {
            // height: 400,
            width: 400,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Sắp xếp cụm công đoạn',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'ProductBalance_Sort_View',
                viewModel: {
                    data: {
                        productid_link: productid_link,
                        pcontractid_link: pcontractid_link,
                    }
                }
            }]
        });
        form.show();

        form.down('#ProductBalance_Sort_View').getController().on('reloadProductBalanceStore', function(){
            var ProductBalanceStore = viewModel.get('ProductBalanceStore');
            ProductBalanceStore.load();
            // form.close();
        })
    },
    onBtnThemViTri: function(){
        var m = this;
        var viewModel = this.getViewModel();
        var productid_link = viewModel.get('productid_link');
        var pcontractid_link = viewModel.get('pcontractid_link');

        var form = Ext.create('Ext.window.Window', {
            // height: 400,
            width: 400,
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thêm cụm công đoạn',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'ProductBalance_Detail_AddPosition',
                viewModel: {
                    // type: 'ProductBalance_Detail_AddPositionViewModel',
                    data: {
                        productid_link: productid_link,
                        pcontractid_link: pcontractid_link,
                    }
                }
            }]
        });
        form.show();

        form.down('#ProductBalance_Detail_AddPosition').getController().on('reloadProductBalanceStore', function(){
            var ProductBalanceStore = viewModel.get('ProductBalanceStore');
            ProductBalanceStore.load();
            // form.close();
        })
    },
    onBtnXoaViTriMulti: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var ProductBalanceStore = viewModel.getStore('ProductBalanceStore');
        var ProductSewingCostStore = viewModel.getStore('ProductSewingCostStore');
        var selection = me.down('#ProductBalance_Detail').getSelectionModel().getSelection();
        // console.log(selection);
        if(selection.length == 0){
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Bạn chưa chọn cụm công đoạn",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
            return;
        }

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var idList = new Array();
                    for(var i = 0; i < selection.length; i++) {
                        idList.push(selection[i].get('id'));
                    }

                    me.setLoading(true);

                    var params = new Object();
                    params.idList = idList;

                    GSmartApp.Ajax.post('/api/v1/product_balance/delete_multi', Ext.JSON.encode(params),
                        function (success, response, options) {
                            me.setLoading(false);
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode == 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: "Xóa thành công!",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        },
                                    });
                                    ProductBalanceStore.load();
                                    ProductSewingCostStore.load();
                                }
                                else {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: "Xóa thất bại!",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        }
                                    });
                                }
                            } else {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: "Xóa thất bại!",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng'
                                    }
                                });
                            }
                        })
                }
            }
        });
    },
    onBtnXoaViTri: function(grid, rowIndex, colIndex){
        var m = this;
        grid.setLoading('Đang xóa dữ liệu');
        var viewmodel = this.getViewModel();
        var ProductBalanceStore = viewmodel.getStore('ProductBalanceStore');
        var ProductSewingCostStore = viewmodel.getStore('ProductSewingCostStore');

        var rec = ProductBalanceStore.getAt(rowIndex);

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa cụm công đoạn ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.id = rec.get('id');

                    GSmartApp.Ajax.post('/api/v1/product_balance/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            grid.setLoading(false);
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode == 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: "Xóa thành công",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        },
                                        fn: function () {
                                            // ProductBalanceStore.remove(rec);
                                            ProductBalanceStore.load();
                                            ProductSewingCostStore.load();
                                        }
                                    });
                                }
                                else {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: "Xóa thất bại",
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng'
                                        }
                                    });
                                }
                            }
                            else {
                                Ext.Msg.show({
                                    title: "Thông báo",
                                    msg: "Xóa thất bại",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng'
                                    }
                                });
                            }
                        })
                }else{
                    grid.setLoading(false);
                }
            }
        });
    },
    onBeforeDropBalanceDetailSubToSub: function(node, data, overModel, dropPosition, dropHandlers, eOpts){
        console.log('SubToSub');
        console.log(data); // drag data
        console.log(overModel);  // data where dropped
        console.log(dropPosition);

        var me = this;

        // if(overModel == null) {
        //     dropHandlers.cancelDrop();
        //     return;
        // }
        if(data == null) {
            dropHandlers.cancelDrop();
            return;
        }

        var productbalanceid_link_next = overModel.data.productbalanceid_link;
        var productbalanceid_link_prev = data.records[0].data.productbalanceid_link;
        var product_balance_processid_link = data.records[0].data.id; 

        if(productbalanceid_link_next == productbalanceid_link_prev){
            dropHandlers.cancelDrop();
            return;
        }

        me.onDropBalanceDetailSubToSub(product_balance_processid_link, 
            productbalanceid_link_prev, productbalanceid_link_next, dropHandlers);
        // dropHandlers.cancelDrop();
    },
    onDropBalanceDetailSubToSub: function(product_balance_processid_link, 
        productbalanceid_link_prev, productbalanceid_link_next, dropHandlers){
        var viewModel = this.getViewModel();
        var ProductBalanceStore = viewModel.getStore('ProductBalanceStore');

        var params = new Object();
        params.product_balance_processid_link = product_balance_processid_link;
        params.productbalanceid_link_next = productbalanceid_link_next;

        GSmartApp.Ajax.post('/api/v1/product_balance_process/updateProductBalanceId', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        ProductBalanceStore.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Xoá thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        dropHandlers.cancelDrop();
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xoá thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    dropHandlers.cancelDrop();
                }
            })
    },
    onBeforeDropBalanceDetailSub: function(node, data, overModel, dropPosition, dropHandlers, eOpts){
        console.log('SubToList');
        console.log(node); // node data
        console.log(data); // drag data
        console.log(overModel);  // data where dropped
        console.log(dropPosition);

        // dropHandlers.cancelDrop();
        // return;

        var me = this;

        // if(overModel == null) {
        //     dropHandlers.cancelDrop();
        //     return;
        // }
        if(data == null) {
            dropHandlers.cancelDrop();
            return;
        }

        var product_balance_processid_link = data.records[0].data.id;

        me.onDropBalanceDetailSub(product_balance_processid_link, dropHandlers);
        // dropHandlers.cancelDrop();
    },
    onDropBalanceDetailSub: function(product_balance_processid_link, dropHandlers){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var ProductSewingCostStore = viewModel.getStore('ProductSewingCostStore');
        var ProductBalanceStore = viewModel.getStore('ProductBalanceStore');

        var params = new Object();
        params.product_balance_processid_link = product_balance_processid_link;

        GSmartApp.Ajax.post('/api/v1/product_balance_process/delete', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        ProductSewingCostStore.load();
                        m.getProductBalanceStoreData(product_balance_processid_link);
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Xoá thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        dropHandlers.cancelDrop();
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Xoá thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    dropHandlers.cancelDrop();
                }
            })
    },
    onBeforeDropWorkingProcess: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
        console.log('ListToPosition');
        console.log(data); // drag data
        console.log(overModel);  // data where dropped
        console.log(dropPosition);

        var me = this;

        if(overModel == null) {
            dropHandlers.cancelDrop();
            return;
        }
        if(data == null) {
            dropHandlers.cancelDrop();
            return;
        }

        var productbalanceid_link = overModel.data.id;
        var productsewingcostid_link = data.records[0].data.id;

        me.onDropWorkingProcess(productbalanceid_link, productsewingcostid_link, dropHandlers);
        // dropHandlers.cancelDrop();
    },
    onDropWorkingProcess: function(productbalanceid_link, productsewingcostid_link, dropHandlers){

        var viewModel = this.getViewModel();
        var ProductBalanceStore = viewModel.getStore('ProductBalanceStore');

        var params = new Object();
        params.productbalanceid_link = productbalanceid_link;
        params.productsewingcostid_link = productsewingcostid_link;

        GSmartApp.Ajax.post('/api/v1/product_balance_process/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        ProductBalanceStore.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Thêm mới thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        dropHandlers.cancelDrop();
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Thêm mới thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    dropHandlers.cancelDrop();
                }
            })
    },
    getProductBalanceStoreData: function(product_balance_processid_link){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var productid_link = viewModel.get('productid_link');
        var pcontractid_link = viewModel.get('pcontractid_link');

        var params = new Object();
        params.productid_link = productid_link;
        params.pcontractid_link = pcontractid_link;

        GSmartApp.Ajax.post('/api/v1/product_balance/getByProduct', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        m.setProductBalanceStoreData(response, product_balance_processid_link);
                    }
                }
            })
    },
    setProductBalanceStoreData: function(response, product_balance_processid_link){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var ProductBalanceStore = viewModel.getStore('ProductBalanceStore');
        var storeItems = ProductBalanceStore.getData().items;
        // console.log(response.data);
        // console.log(storeItems);

        for(var i=0;i<response.data.length;i++){
            var responseRec = response.data[i];
            for(var j=0;j<storeItems.length;j++){
                var storeItem = storeItems[j];
                if(responseRec.id == storeItem.get('id')){
                    storeItem.set('workingprocess_name', responseRec.workingprocess_name);
                    storeItem.set('timespent_standard', responseRec.timespent_standard);

                    var productBalanceProcesses = storeItem.get('productBalanceProcesses');
                    if(productBalanceProcesses == null) productBalanceProcesses = [];
                    for(var k=0;k<productBalanceProcesses.length;k++){
                        if(productBalanceProcesses[k].id == product_balance_processid_link){
                            productBalanceProcesses.splice(k, 1);
                            storeItem.set('productBalanceProcesses', productBalanceProcesses);
                        }
                    }
                }
            }
        }
        ProductBalanceStore.commitChanges();
    }   
});