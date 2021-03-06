Ext.define('GSmartApp.view.product.ProductViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductViewCotroller',
    isActivate: false,
    init: function () {
        var viewmodel = this.getViewModel();
        var product = GSmartApp.util.State.get('product');
        if (product != null) {
            viewmodel.set('search', product);
        }
        this.onloadPage();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#ProductView': {
            activate: 'onActivate',
            itemdblclick: 'onCapNhatdbl'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        },
        '#btnTimKiem': {
            click: 'onloadPage'
        },
        '#page': {
            specialkey: 'onSpecialkey'
        },
        '#name': {
            specialkey: 'onSpecialkey'
        },
        '#code': {
            specialkey: 'onSpecialkey'
        }
    },
    onActivate: function () {
        var me = this;
        if (me.isActivate) {
            this.onloadPage();
        }
        me.isActivate = true;
    },
    onSpecialkey: function (field, e) {
        var me = this;
        if (field.itemId == "limitpage") {
            var viewmodel = this.getViewModel();
            var store = viewmodel.getStore('ProductStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            me.onloadPage();
        }
    },
    onloadPage: function () {
        var me = this.getView();
        var t = this;

        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('ProductStore');
        store.getSorters().remove('product_type');
        store.getSorters().remove('id');
        store.getSorters().add('buyercode');

        var limit = me.down('#limitpage').getValue();
        var name = viewmodel.get('search.name');
        var code = viewmodel.get('search.code');
        var page = store.currentPage;

        if (limit == null) {
            limit = 25;
        }

        if (page == null) {
            page = 1;
        }

        if (name == null) {
            name = "";
        }

        if (code == null) {
            code = "";
        }

        store.loadProduct_ByPage(limit, page, name, code);
    },
    // onViewWorkingProcess: function (grid, rowIndex, colIndex) {
    //     var me = this.getView();
    //     var rec = grid.getStore().getAt(rowIndex);
    //     var form = Ext.create('Ext.window.Window', {
    //         height: 600,
    //         closable: true,
    //         resizable: false,
    //         modal: true,
    //         border: false,
    //         title: 'Danh s??ch c??ng ??o???n chu???n s???n ph???m: "' + rec.data.buyercode + '"',
    //         closeAction: 'destroy',
    //         width: 1100,
    //         bodyStyle: 'background-color: transparent',
    //         layout: {
    //             type: 'fit', // fit screen for window
    //             padding: 5
    //         },
    //         items: [{
    //             xtype: 'List_WorkingProcess_View',
    //             viewModel: {
    //                 data: {
    //                     sourceview: 'ProductView',
    //                     working: {
    //                         productid_link: rec.data.id
    //                     }
    //                 }
    //             }
    //         }]
    //     });
    //     form.show();
    // },
    onViewWorkingProcess: function (grid, rowIndex, colIndex) {
        var me = this.getView();
        var rec = grid.getStore().getAt(rowIndex);
        var form = Ext.create('Ext.window.Window', {
            height: '90%',
            width: '90%',
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Danh s??ch c??ng ??o???n s???n ph???m: "' + rec.data.buyercode + '"',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'ProductSewingCost_View',
                viewModel: {
                    data: {
                        productid_link: rec.data.id,
                        working: {
                            productid_link: rec.data.id
                        }
                    }
                }
            }]
        });
        form.show();
    },
    onThemMoi: function (m, record) {
        var viewmodel = this.getViewModel();
        var data = new Object();
        data.name = viewmodel.get('search.name');
        data.code = viewmodel.get('search.code');

        GSmartApp.util.State.set('product', data);

        this.redirectTo("lsproduct/0/edit");
    },
    onCapNhatdbl: function (m, record, item, index, e, eOpts) {
        var viewmodel = this.getViewModel();
        var data = new Object();
        data.name = viewmodel.get('search.name');
        data.code = viewmodel.get('search.code');

        GSmartApp.util.State.set('product', data);
        var id = record.data.id;
        this.redirectTo("lsproduct/" + id + "/edit");
    },
    onCapNhat: function (grid, rowIndex, colIndex) {
        var viewmodel = this.getViewModel();
        var data = new Object();
        data.name = viewmodel.get('search.name');
        data.code = viewmodel.get('search.code');
        console.log(data);
        GSmartApp.util.State.set('product', data);

        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("lsproduct/" + id + "/edit");
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('name');
        Ext.Msg.show({
            title: 'Th??ng b??o',
            msg: 'B???n c?? ch???c ch???n x??a s???n ph???m "' + name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'C??',
                no: 'Kh??ng'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Xoa(id, rec);
                }
            }
        });
    },
    Xoa: function (id, rec) {
        var me = this.getView();
        me.setLoading("??ang x??a d??? li???u");
        var params = new Object();
        params.id = id;

        GSmartApp.Ajax.post('/api/v1/product/delete', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    Ext.MessageBox.show({
                        title: "Th??ng b??o",
                        msg: "X??a th??nh c??ng",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng',
                        }
                    });

                    var store = me.getStore();
                    store.remove(rec);
                } else {
                    Ext.Msg.show({
                        title: "Th??ng b??o",
                        msg: "X??a th???t b???i",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng',
                        }
                    });
                }
                me.setLoading(false);
            })
    }
})