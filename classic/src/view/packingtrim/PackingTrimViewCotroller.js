Ext.define('GSmartApp.view.packingtrim.PackingTrimViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PackingTrimViewCotroller',
    init: function () {
        this.onloadPage();
    },
    control: {
        '#btnThemMoi': {
            click: 'onThemMoi'
        },
        '#delete': {
            click: 'onXoa'
        },
        '#edit': {
            click: 'onCapNhat'
        },
        '#PackingTrimView': {
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

        var limit = me.down('#limitpage').getValue();
        var name = me.down('#name').getValue();
        var code = me.down('#code').getValue();
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

        store.loadPackingTrim_ByPage(limit, page, name, code);
    },
    onActivate: function () {
        var me = this;
        this.onloadPage();
    },
    onThemMoi: function (m, record) {
        var me = this.getView();

        this.redirectTo("lspackingtrim/" + 0 + "/edit");
    },
    onCapNhatdbl: function (m, record, item, index, e, eOpts) {
        var id = record.data.id;
        this.redirectTo("lspackingtrim/" + id + "/edit");
    },
    onCapNhat: function (grid, rowIndex, colIndex) {
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        this.redirectTo("lspackingtrim/" + id + "/edit");
    },
    onXoa: function (grid, rowIndex, colIndex) {
        var me = this;
        var rec = grid.getStore().getAt(rowIndex);
        var id = rec.get('id');
        var name = rec.get('name');
        Ext.Msg.show({
            title: 'Th??ng b??o',
            msg: 'B???n c?? ch???c ch???n x??a ph??? li???u "' + name + '" ?',
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