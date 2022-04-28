Ext.define('GSmartApp.view.product.ProductSewingCost.Product_Balance.ProductBalance_Detail_AddPositionController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductBalance_Detail_AddPositionController',
    init: function () {
        
    },
    control: {
        '#ProductBalance_Detail_AddPosition': {
            afterrender: 'onAfterrender'
        },
        '#btnLuu': {
            click: 'onBtnLuu'
        },
        '#btnThoat': {
            click: 'onBtnThoat'
        },
        '#name': {
            keypress: 'onPressEnter'
        },
    },
    onAfterrender: function(){
        var me = this.getView();
        me.down('#name').focus();
    },
    onBtnThoat: function(){
        var view = this.getView().up('window');
		view.close();
    },
    onBtnLuu: function(){
        var me = this;
        var viewModel = this.getViewModel();
        var productid_link = viewModel.get('productid_link');
        var pcontractid_link = viewModel.get('pcontractid_link');

        var name = viewModel.get('name');
        if(name == null || name == ''){
            Ext.Msg.show({
                title: "Thông báo",
                msg: "Tên cụm công đoạn không được bỏ trống",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
            });
            return;
        }
        name = name.trim();
        me.onLuu(productid_link, pcontractid_link, name);
    },
    onLuu: function(productid_link, pcontractid_link, name){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var params = new Object();
        params.productid_link = productid_link;
        params.pcontractid_link = pcontractid_link;
        params.name = name;

        GSmartApp.Ajax.post('/api/v1/product_balance/create', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: "Thêm mới thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            },
                            fn: function(){
                                viewModel.set('name', null);
                                me.down('#name').focus();
                                m.fireEvent('reloadProductBalanceStore');
                            }
                        });
                        
                    }
                    else {
                        Ext.Msg.show({
                            title: "Thông báo",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
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
                }
            })
    },

    // enter to search
    onPressEnter: function (textfield, e, eOpts) {
        var m = this;
        if (e.getKey() == e.ENTER) {
            // Ext.Msg.alert('Keys','You pressed the Enter key');
            m.onBtnLuu();
        }
    },
});