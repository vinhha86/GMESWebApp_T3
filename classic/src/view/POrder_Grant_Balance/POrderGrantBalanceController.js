Ext.define('GSmartApp.view.POrder_Grant_Balance.POrderGrantBalanceController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.POrderGrantBalanceController',
    init: function () {
        
    },
    control: {
        '#POrderGrantBalance': {
            afterrender: 'onAfterrender'
        },
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var eventRecord = viewModel.get('eventRecord');

        var pcontractid_link = eventRecord.get('pcontractid_link');
        var productid_link = eventRecord.get('productid_link');
        var porderid_link = viewModel.get('porderid_link');
        var pordergrantid_link = viewModel.get('pordergrantid_link');

        var obj = new Object();
        obj.pordergrantid_link = pordergrantid_link;
        var ProductBalanceStore = viewModel.getStore('ProductBalanceStore');
        ProductBalanceStore.loadStoreForScheduleByPorderGrant(obj);

        var Personnel_Store = viewModel.getStore('Personnel_Store');
        Personnel_Store.loadStore_byPorderGrant(pordergrantid_link);
    },

    onBeforePersonnelGroupDrop:function(node, data, overModel, dropPosition, dropHandlers, eOpts){
        // console.log(data); // drag data
        // console.log(overModel);  // data where dropped
        // console.log(dropPosition);

        var m = this;
        var viewModel = this.getViewModel();

        if(overModel == null) {
            dropHandlers.cancelDrop();
            return;
        }
        if(data == null) {
            dropHandlers.cancelDrop();
            return;
        }

        var personnelid_link = data.records[0].data.id;
        var productbalanceid_link = overModel.data.id;
        var pordergrantid_link = viewModel.get('pordergrantid_link');

        // console.log(personnelid_link);
        // console.log(porderbalanceid_link);
        // console.log(pordergrantid_link);

        dropHandlers.cancelDrop();

        m.updatePorderGrantBalancePersonnel(personnelid_link, productbalanceid_link, pordergrantid_link);
    },
    updatePorderGrantBalancePersonnel: function(personnelid_link, productbalanceid_link, pordergrantid_link){
        var m = this;
        var viewModel = this.getViewModel();

        var ProductBalanceStore = viewModel.getStore('ProductBalanceStore');
        var Personnel_Store = viewModel.getStore('Personnel_Store');

        var params = new Object();
        params.personnelid_link = personnelid_link;
        params.productbalanceid_link = productbalanceid_link;
        params.pordergrantid_link = pordergrantid_link;

        GSmartApp.Ajax.post('/api/v1/porder_grant_balance/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Personnel_Store.load();
                        ProductBalanceStore.load();
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Thêm thất bại",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        // dropHandlers.cancelDrop();
                    }
                }
                else {
                    Ext.Msg.show({
                        title: "Thông báo",
                        msg: "Thêm thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        }
                    });
                    // dropHandlers.cancelDrop();
                }
            })
    },
    onBeforeWorkingProcessGroupDrop: function(node, data, overModel, dropPosition, dropHandlers, eOpts){
        var m = this;
        var viewModel = this.getViewModel();

        if(overModel == null) {
            dropHandlers.cancelDrop();
            return;
        }
        if(data == null) {
            dropHandlers.cancelDrop();
            return;
        }

        // console.log(data);
        var productbalanceid_link = data.records[0].data.id;
        var pordergrantid_link = viewModel.get('pordergrantid_link');
        var personnelid_link = data.records[0].data.personnelId;

        dropHandlers.cancelDrop();

        m.deletePorderGrantBalancePersonnel(personnelid_link, productbalanceid_link, pordergrantid_link);
    },
    deletePorderGrantBalancePersonnel: function(personnelid_link, productbalanceid_link, pordergrantid_link){
        var m = this;
        var viewModel = this.getViewModel();

        var ProductBalanceStore = viewModel.getStore('ProductBalanceStore');
        var Personnel_Store = viewModel.getStore('Personnel_Store');

        var params = new Object();
        params.personnelid_link = personnelid_link;
        params.productbalanceid_link = productbalanceid_link;
        params.pordergrantid_link = pordergrantid_link;

        GSmartApp.Ajax.post('/api/v1/porder_grant_balance/delete', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Personnel_Store.load();
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
                        // dropHandlers.cancelDrop();
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
                    // dropHandlers.cancelDrop();
                }
            })
    },

    // filter porder grant balance
    onWorkingprocess_nameFilterKeyup: function () {
        var m = this;
        var grid = this.getView();
        var viewModel = this.getViewModel();
            // Access the field using its "reference" property name.
        var ProductBalanceStore = viewModel.getStore('ProductBalanceStore');
        var filters = ProductBalanceStore.getFilters();
        var workingprocess_nameFilterValue = viewModel.get('workingprocess_nameFilterValue');

        if (workingprocess_nameFilterValue) {
            this.workingprocess_nameFilter = filters.add({
                id: 'workingprocess_nameFilter',
                property: 'workingprocess_name',
                value: workingprocess_nameFilterValue,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.workingprocess_nameFilter) {
            filters.remove(this.workingprocess_nameFilter);
            this.workingprocess_nameFilter = null;
        }
    },

    // filter personnel
    onFullnameFilterKeyup: function () {
        var m = this;
        var grid = this.getView();
        var viewModel = this.getViewModel();
            // Access the field using its "reference" property name.
        var Personnel_Store = viewModel.getStore('Personnel_Store');
        var filters = Personnel_Store.getFilters();
        var fullnameFilterValue = viewModel.get('fullnameFilterValue');

        if (fullnameFilterValue) {
            this.fullnameFilter = filters.add({
                id: 'fullnameFilter',
                property: 'fullname',
                value: fullnameFilterValue,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.fullnameFilter) {
            filters.remove(this.fullnameFilter);
            this.fullnameFilter = null;
        }
    },
    onCodeFilterKeyup: function () {
        var m = this;
        var grid = this.getView();
        var viewModel = this.getViewModel();
            // Access the field using its "reference" property name.
        var Personnel_Store = viewModel.getStore('Personnel_Store');
        var filters = Personnel_Store.getFilters();
        var codeFilterValue = viewModel.get('codeFilterValue');

        if (codeFilterValue) {
            this.codeFilter = filters.add({
                id: 'codeFilter',
                property: 'code',
                value: codeFilterValue,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.codeFilter) {
            filters.remove(this.codeFilter);
            this.codeFilter = null;
        }
    },
});