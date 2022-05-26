Ext.define('GSmartApp.view.pcontract.PContract_Product_SKU.PContract_POListByMonth.PContract_POList_customController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_POList_customController',
    init: function () {
        var m = this;
        var viewModel = this.getViewModel();
        // var viewId = viewModel.get('viewId');
        var firstday_month = viewModel.get('firstday_month');
        var lastday_month = viewModel.get('lastday_month');
        // console.log(firstday_month);
        // console.log(lastday_month);
        var PContractPOLine_Confirm_List = viewModel.getStore('PContractPOLine_Confirm_List');
        PContractPOLine_Confirm_List.loadPOLine_Confirm_ByMonthYear(firstday_month,lastday_month);
        PContractPOLine_Confirm_List.setGroupField('productbuyercode');
        var data = PContractPOLine_Confirm_List.getData().items;
        // console.log(data);
    },
    control: {
        '#PContract_POList_custom': {
            itemclick: 'onSelectPO'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
    },
    onPOChilFilterKeyup: function (text, e, eOpts) {
        var filterField = this.lookupReference('POFilterChil2'),
        PContract_POList_custom = text.up('gridpanel');
        store = PContract_POList_custom.getStore(),
            filters = store.getFilters();
        //  console.log(filterField);
        if (filterField.value) {
            this.POFilterChil = filters.add({
                id: 'POFilterChil2',
                property: 'po_buyer',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.POFilterChil2) {
            filters.remove(this.POFilterChil2);
            this.POFilterChil2 = null;
        }
    },
    onPConTractFilterKeyup: function (text, e, eOpts) {
        var filterField = this.lookupReference('POFilterChil'),
            PContract_POList_custom = text.up('gridpanel');
        store = PContract_POList_custom.getStore(),
            filters = store.getFilters();
            // console.log(filterField);
        if (filterField.value) {
            this.POFilterChil = filters.add({
                id: 'POFilterChil',
                property: 'contractcode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.POFilterChil) {
            filters.remove(this.POFilterChil);
            this.POFilterChil = null;
        }
    },
    onSelectPO: function (m, rec) {
        var grid = this.getView();
        var m = this;

        var viewModel = this.getViewModel();
        viewModel.set('poLine', rec);
        // viewModel.set('isDisable_btnThemSKU', false);
        // viewModel.set('isDisable_btnConfirmSKU', false);
        viewModel.set('pcontract_poid_link', rec.data.id);
        var productid_link = rec.data.productid_link;

        var productStore = viewModel.getStore('PContractProduct_PO_Store');
        var pcontractid_link = rec.data.pcontractid_link;
        productStore.loadStore_bypairid_Async(productid_link, rec.data.po_quantity, true, pcontractid_link);
        productStore.load({
            scope: this,
            callback: function (records, operation, success) {
                // console.log(records);
                if( records.length > 0){
                var record = records[0];
                var skuView = Ext.getCmp('PContractSKUView_custom');
                // var cmbSanPham = skuView.down('#cmbSanPham');
                // cmbSanPham.select(record);
                m.fireEvent('selectPO_line', record);
                // viewModel.set('IdProduct', record.get('id'));
                // viewModel.set('Product_pquantity', record.data.pquantity);
                // console.log(record);
                //clear sku list
                var storeSku = viewModel.getStore('PContractSKUStore');
                storeSku.removeAll();
                storeSku.loadStoreByPO_and_Product(record.get('id'), rec.data.id);
             }
            }
        });
    },
    onThoat: function () {
        var viewmodel = this.getViewModel();
        this.getView().up('window').close();
    },
})