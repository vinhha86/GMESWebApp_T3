Ext.define('GSmartApp.view.product.ProductSelectAttributeViewCotroller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductSelectAttributeViewCotroller',
    init: function () {
        var me = this.getView();
        var store = this.getViewModel().getStore('AttributeValueStore');
        store.loadStore(me.IdAttribute);
        this.loadAttributeValueStore();
    },
    control: {
        '#btnAddAttributeValue': {
            click: 'onBtnAddAttributeValue'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        },
        'ProductSelectAttributeView': {
            select: 'onSelectValue',
            beforedeselect: 'onDeselect'
        }
    },
    onDeselect: function (grid, record, index, eOpts) {
        if (record.data.isdefault) return false;
    },
    onSelectValue: function (grid, record, index, eOpts) {
        var me = this.getView();

        if (record.data.isdefault) {
            me.getSelectionModel().deselectAll();
            me.getSelectionModel().select(record, true, true);
        } else {
            if (me.IdAttribute == 4 || me.IdAttribute == 30) return;

            // var rec = grid.getStore().findRecord('isdefault', true);
            // me.getSelectionModel().deselect(rec);
        }

    },
    onFilterValueKeyup: function () {
        var viewmodel = this.getViewModel();
        var store = viewmodel.get('AttributeValueStore');
        var filterField = this.lookupReference('ValueFilterField'),
            filters = store.getFilters();

        if (filterField.value) {
            this.valueFilter = filters.add({
                id: 'valueFilter',
                property: 'value',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.valueFilter) {
            filters.remove(this.valueFilter);
            this.valueFilter = null;
        }
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    Luu: function () {
        var me = this.getView();
        var select = me.getSelectionModel().getSelection();

        var gridAtt = Ext.getCmp('ProductAttributeView');
        var store = gridAtt.getStore();
        var description = "";
        for (var i = 0; i < store.data.length; i++) {
            var rec = store.data.items[i];

            if (rec.get('is_select')) {
                var name = "";
                if (rec.get('attributeid_link') == me.IdAttribute) {
                    for (var j = 0; j < select.length; j++) {
                        if (name == "") {
                            name = select[j].get('value');
                        }
                        else {
                            name += ", " + select[j].get('value');
                        }
                    }
                }
                else {
                    name = rec.get('attributeValueName').replace('ALL, ', '');
                }

                if (description != "") {
                    description += "; " + name;
                }
                else {
                    description = name;
                }
            }
        }

        var params = new Object();
        params.productid_link = me.IdProduct;
        params.attributeid_link = me.IdAttribute;
        params.description = description;

        var obj = [];
        for (var i = 0; i < select.length; i++) {
            var data = select[i].data;
            obj.push(data.id);
        }

        params.listvalue = obj;
        params.msgtype = "PRODUCT_ATTRIBUTE_CREATE";
        params.message = "T???o thu???c t??nh s???n ph???m";

        GSmartApp.Ajax.post('/api/v1/productattribute/createvalue', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        mainView = Ext.getCmp('ProductAttributeView');
                        mainView.getStore().load();

                        SKUView = Ext.getCmp('ProductSKU');
                        SKUView.getStore().load();

                        viewInfo = Ext.getCmp('ProductInfoView');
                        viewInfo.getController().loadInfo(me.IdProduct);

                        me.up('window').close();
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Th??ng b??o',
                            msg: 'L??u th???t b???i',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: '????ng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Th??ng b??o',
                        msg: 'L??u th???t b???i',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng',
                        }
                    });
                }
            })
    },
    onLuu: function () {
        var me = this.getView();
        var m = this;
        var viewmodel = this.getViewModel();

        if (me.IdAttribute == 4 || me.IdAttribute == 30) {
            Ext.Msg.show({
                title: 'Th??ng b??o',
                msg: 'Thay ?????i gi?? tr??? thu???c t??nh c???a m??u , c??? s???n ph???m s??? thay ?????i ?????n m?? SKU c???a s???n ph???m ',
                buttons: Ext.Msg.YESNO,
                icon: Ext.Msg.QUESTION,
                buttonText: {
                    yes: 'C??',
                    no: 'Kh??ng'
                },
                fn: function (btn) {
                    if (btn === 'no') {
                        me.up('window').close();
                    }
                    else {
                        m.Luu();
                    }
                }
            });
        } else {
            m.Luu();
        }
    },
    loadAttributeValueStore: function () {
        var me = this.getView();
        var params = new Object();
        params.attributeid_link = me.IdAttribute;
        params.productid_link = me.IdProduct;
        GSmartApp.Ajax.post('/api/v1/productattribute/getvalue', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        for (var i = 0; i < response.data.length; i++) {
                            var data = me.getStore().findRecord('id', response.data[i].id);
                            me.getSelectionModel().select(data, true, true);
                        }
                    }
                }
            })
    },
    onBtnAddAttributeValue: function () {
        // console.log('here yet');
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var IdAttribute = viewModel.get('IdAttribute');
        // console.log(IdAttribute);
        // console.log(IdProduct);

        var value = me.down('#txtAttributeValueAdd').getValue();
        if (value == null || value == '' || value.length == 0) {
            Ext.Msg.show({
                title: 'Th??ng b??o',
                msg: 'Gi?? tr??? thu???c t??nh kh??ng ???????c ????? tr???ng',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: '????ng',
                }
            });
            me.down('#txtAttributeValueAdd').focus();
            return;
        }

        // var check = this.checkValidate(value);
        // if (!check) return;

        var data = new Object();
        data.id = 0;
        data.value = value;
        data.attributeid_link = IdAttribute;

        var params = new Object();
        params.msgtype = "ATTRIBUTEVALUE_CREATE";
        params.message = "T???o gi?? tr??? thu???c t??nh";
        params.data = data;

        me.setLoading("??ang l??u d??? li???u");

        GSmartApp.Ajax.post('/api/v1/attributevalue/attributevalue_create_quick', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);

                var response = Ext.decode(response.responseText);
                if (success) {
                    if (response.message == 'Gi?? tr??? thu???c t??nh ???? t???n t???i') {
                        Ext.Msg.show({
                            title: 'Th??ng b??o',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: '????ng',
                            }
                        });
                    } else {
                        var AttributeValueStore = me.getViewModel().getStore('AttributeValueStore');
                        AttributeValueStore.load();
                        me.down('#txtAttributeValueAdd').setValue('');
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Th??ng b??o',
                        msg: 'L??u th???t b???i',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng',
                        }
                    });
                }
                me.setLoading(false);
            })
    },
    onEnterAddAttributeValue: function (textfield, e, eOpts) {
        var m = this;
        if (e.getKey() == e.ENTER) {
            m.onBtnAddAttributeValue();
        }
    }
})