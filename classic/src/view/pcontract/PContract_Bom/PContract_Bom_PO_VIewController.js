Ext.define('GSmartApp.view.pcontract.PContract_Bom_PO_VIewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContract_Bom_PO_VIewController',
    control: {
        'PContract_Bom_PO_VIew': {
            select: 'onSelectRow',
            beforedeselect: 'onBeforedeselect',
            cellclick: 'onLoadProduct'
        }
    },
    listen: {
        store: {
            'PContractPOStore': {
                'loaddone': 'onLoadDone'
            },
            'ProductStore': {
                'done': 'onLoadSKU'
            },
            'PContractSKUStore': {
                'loadStoreByPO_and_Product_done': 'onLoad_LineSKU'
            }
        }
    },
    init: function () {
        var viewModel = this.getViewModel();
        var store = viewModel.getStore('PContractBom_PO_Store');
        var pcontractid_link = viewModel.get('pcontractid_link');
        var productid_link = viewModel.get('productid_link');

        store.loadPOConfirm(pcontractid_link, productid_link);
    },
    onLoad_LineSKU: function () {
        var viewModel = this.getViewModel();
        var main = this.getView().up('#PContract_Bom_PO_MainView');
        var grid = this.getView().up('#PContract_Bom_PO_MainView').down('#PContract_Bom_PO_SKUView');

        var sourceView = viewModel.get('sourceView');

        var params = new Object();
        params.pcontract_poid_link = viewModel.get('pcontract_poid_link');
        params.material_skuid_link = viewModel.get('material_skuid_link');
        params.productid_link = viewModel.get('cmb_productid_link');
        var store = viewModel.getStore('PContractSKUStore');

        var api = '';
        switch(sourceView){
            case 'BomHaiQuan':
                api = 'pcontractproductbomhq';
                break;
            case 'BomCanDoi':
                api = 'pcontractproductbom2';
                break;
        }

        main.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.post('/api/v1/' + api + '/getsku_byline', Ext.JSON.encode(params),
            function (success, response, options) {
                main.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình tải dữ liệu",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    else {
                        var data = response.data;

                        for (var i = 0; i < data.length; i++) {
                            var rec = store.findRecord('skuid_link', data[i].product_skuid_link);
                            grid.getSelectionModel().select(rec, true, true);
                            data[i].quantity = data[i].quantity == null ? 0 : data[i].quantity;
                            rec.set('pquantity', data[i].quantity);
                        }

                        store.commitChanges();
                    }
                }
            })
    },
    onLoadSKU: function (rec) {
        var viewModel = this.getViewModel();
        viewModel.set('cmb_productid_link', rec.get('id'));

        var storeSku = viewModel.getStore('PContractSKUStore');
        var pcontract_poid_link = viewModel.get('pcontract_poid_link');
        var material_skuid_link = viewModel.get('material_skuid_link');

        storeSku.loadStoreByPO_and_Product_Material(rec.data.id, pcontract_poid_link, material_skuid_link);
    },
    onLoadProduct: function (m, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        if (cellIndex == 0) return;
        var main = this.getView().up('#PContract_Bom_PO_MainView');
        main.setLoading('Đang tải dữ liệu');
        var viewModel = this.getViewModel();
        var pcontract_poid_link = record.get('id');
        var productStore = viewModel.getStore('PContractProduct_PO_Store');
        viewModel.set('pcontract_poid_link', record.get('id'));

        productStore.loadbyPO(pcontract_poid_link);
    },
    onSelectRow: function (m, record, index, eOpts) {
        var grid = this.getView();
        var main = this.getView().up('#PContract_Bom_PO_MainView');
        var viewModel = this.getViewModel();
        var sourceView = viewModel.get('sourceView');
        viewModel.set('pcontract_poid_link', record.get('id'));

        var params = new Object();
        params.pcontract_poid_link = record.get('id');
        params.pcontractid_link = viewModel.get('pcontractid_link');
        params.material_skuid_link = viewModel.get('material_skuid_link');

        var api = '';
        switch(sourceView){
            case 'BomHaiQuan':
                api = 'pcontractproductbomhq';
                break;
            case 'BomCanDoi':
                api = 'pcontractproductbom2';
                break;
        }

        main.setLoading("Đang xử lý");
        GSmartApp.Ajax.post('/api/v1/' + api +'/select_poline', Ext.JSON.encode(params),
            function (success, response, options) {
                main.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình xử lý dữ liệu",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                        grid.getSelectionModel().deselect(record, true, true);
                    }
                    else {
                        var productStore = viewModel.getStore('PContractProduct_PO_Store');
                        var pcontract_poid_link = viewModel.get('pcontract_poid_link');
                        var product_id_link = viewModel.get('cmb_productid_link');
                        var material_skuid_link = viewModel.get('material_skuid_link');

                        if (product_id_link == 0)
                            productStore.loadbyPO(pcontract_poid_link);
                        else {
                            var storeSKU = viewModel.getStore('PContractSKUStore');
                            storeSKU.removeAll();
                            storeSKU.loadStoreByPO_and_Product_Material(product_id_link, pcontract_poid_link, material_skuid_link);
                        }

                        grid.up('#PContract_Bom_PO_MainView').fireEvent('SelectDone', record.get('po_buyer'))
                    }
                }
                else {
                    grid.getSelectionModel().deselect(record, true, true);
                }
            })
    },
    onBeforedeselect: function (m, record, index, eOpts) {
        var grid = this.getView();
        var main = this.getView().up('#PContract_Bom_PO_MainView');
        var viewModel = this.getViewModel();
        viewModel.set('pcontract_poid_link', record.get('id'));
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn bỏ chọn po line?" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    var params = new Object();
                    params.pcontract_poid_link = record.get('id');
                    params.material_skuid_link = viewModel.get('material_skuid_link');

                    var sourceView = viewModel.get('sourceView');
                    var api = '';
                    switch(sourceView){
                        case 'BomHaiQuan':
                            api = 'pcontractproductbomhq';
                            break;
                        case 'BomCanDoi':
                            api = 'pcontractproductbom2';
                            break;
                    }

                    main.setLoading("Đang xử lý");
                    GSmartApp.Ajax.post('/api/v1/' + api + '/deselect_poline', Ext.JSON.encode(params),
                        function (success, response, options) {
                            main.setLoading(false);
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                if (response.respcode != 200) {
                                    Ext.MessageBox.show({
                                        title: "Có lỗi trong quá trình xử lý dữ liệu",
                                        msg: response.message,
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                    grid.getSelectionModel().select(record, true, true);
                                }
                                else {
                                    var productStore = viewModel.getStore('PContractProduct_PO_Store');
                                    var pcontract_poid_link = viewModel.get('pcontract_poid_link');
                                    var product_id_link = viewModel.get('cmb_productid_link');
                                    var material_skuid_link = viewModel.get('material_skuid_link');

                                    if (product_id_link == 0)
                                        productStore.loadbyPO(pcontract_poid_link);
                                    else {
                                        var storeSKU = viewModel.getStore('PContractSKUStore');
                                        storeSKU.removeAll();
                                        storeSKU.loadStoreByPO_and_Product_Material(product_id_link, pcontract_poid_link, material_skuid_link);
                                    }

                                    grid.up('#PContract_Bom_PO_MainView').fireEvent('DeSelectDone', record.get('po_buyer'))
                                }
                            }
                            else {
                                grid.getSelectionModel().select(record, true, true);
                            }
                        })
                }
                else {
                    grid.getSelectionModel().select(record, true, true);
                }
            }
        });
    },
    onLoadDone: function () {
        var grid = this.getView();
        var main = this.getView().up('#PContract_Bom_PO_MainView');

        var viewModel = this.getViewModel();
        var sourceView = viewModel.get('sourceView');
        var store = viewModel.getStore('PContractBom_PO_Store');
        var pcontractid_link = viewModel.get('pcontractid_link');
        var productid_link = viewModel.get('productid_link');
        var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.productid_link = productid_link;
        params.material_skuid_link = viewModel.get('material_skuid_link');

        var api = '';
        switch(sourceView){
            case 'BomHaiQuan':
                api = 'pcontractproductbomhq';
                break;
            case 'BomCanDoi':
                api = 'pcontractproductbom2';
                break;
        }

        main.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.post('/api/v1/' + api + '/getpo_by_npl', Ext.JSON.encode(params),
            function (success, response, options) {
                main.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình tải dữ liệu",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    else {
                        var data = response.data;
                        for (var i = 0; i < data.length; i++) {
                            var rec = store.findRecord('id', data[i].pcontract_poid_link);
                            grid.getSelectionModel().select(rec, true, true);
                        }
                    }
                }
            })
    }
})