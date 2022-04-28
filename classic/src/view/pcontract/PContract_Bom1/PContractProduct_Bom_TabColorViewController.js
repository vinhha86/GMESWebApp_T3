Ext.define('GSmartApp.view.pcontract.PContractProduct_Bom_TabColorViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractProduct_Bom_TabColorViewController',
    init: function () {
        common.Check_Object_Permission();
    },
    control: {
        '#PContractProduct_Bom_TabColorView': {
            tabchange: 'onTabChange'
        },
        '#cmbSanPham': {
            select: 'onChangeProduct'
        },
        // upload download start
        '#fileUploadBom': {
            change: 'onSelectFile'
        },
        '#fileUploadBomSizeset': {
            change: 'onSelectFile_Sizeset'
        },
        '#fileUploadBomNew': {
            change: 'onSelectFileNew'
        },
        '#fileUploadBomSizesetNew': {
            change: 'onSelectFile_SizesetNew'
        },
        '#btndownloadsize': {
            click: 'onDownTemp'
        },
        '#btndownloadsizeset': {
            click: 'onDownTempSizeSet'
        },
        '#btndownloadsize_new': {
            click: 'onDownTempNew'
        },
        '#btndownloadsizeset_new': {
            click: 'onDownTempSizeSetNew'
        },
        '#btn_UploadBomSize': {
            click: 'onUpload'
        },
        '#btn_UploadBomSizeSet': {
            click: 'onUploadSizeset'
        },
        // upload download end
        '#btnAddMaterial_Bom': {
            click: 'onThemNPL'
        },
        '#btnConfirmBOM1': {
            click: 'onConfirmBOM1'
        }
    },
    onConfirmBOM1: function () {
        var me = this.getView();
        var viewmodel = this.getViewModel();

        var productid_link = viewmodel.get('IdProduct');

        if (productid_link == 0) {
            Ext.Msg.alert({
                title: "Thông báo",
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function (btn) {
                    me.down('#cmbSanPham').expand();
                }
            });
            return;
        }
        else {
            me.setLoading('Đang xử lý dữ liệu');
            var params = new Object();
            params.pcontractid_link = viewmodel.get('PContract.id');
            params.productid_link = viewmodel.get('IdProduct');

            GSmartApp.Ajax.post('/api/v1/pcontractproductbom/confim_bom1', Ext.JSON.encode(params),
                function (success, response, options) {
                    me.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            Ext.Msg.alert({
                                title: "Thông báo",
                                msg: 'Thành công',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    }
                })
        }

    },
    onChangeProduct: function (combo, rec, eOpts) {
        var me = this.getView();
        var th = this;
        var viewmodel = this.getViewModel();
        var storeBOM = viewmodel.getStore('PContractProductBomStore');
        var pcontractid_link = viewmodel.get('PContract.id');

        storeBOM.loadStore(pcontractid_link, viewmodel.get('IdProduct'));
        th.createTab();
    },
    onThemNPL: function (m) {
        var me = this.getView();
        var t = this;
        var viewmodel = this.getViewModel();

        var productid_link = viewmodel.get('IdProduct');

        if (productid_link == 0) {
            Ext.Msg.alert({
                title: "Thông báo",
                msg: 'Bạn chưa chọn sản phẩm',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },
                fn: function (btn) {
                    me.down('#cmbSanPham').expand();
                }
            });
            return;
        }

        var form = Ext.create({
            xtype: 'skusearchwindow',
            width: Ext.getBody().getViewSize().width * .99,
            height: Ext.getBody().getViewSize().height * .99,
            reference: 'skusearchwindow',
            viewModel: {
                data: {
                    sourceview: 'PContractProduct_Bom_TabColorView',
                    searchtype: 5,
                    pcontractid_link: viewmodel.get('PContract.id'),
                    productid_link_notsearch: productid_link,
                    isAddNPL: true,
                    isHiddenSkuSearchCriteria_Attr_actioncolumn: true,
                    isHiddenSkuSearchCriteria_Attr_btnThemMoi: true
                }
            }
        });
        form.show();
    },
    onTabChange: function (tabPanel, newCard, oldCard, eOpts) {
        var viewmodel = this.getViewModel();
        var storeBOM = viewmodel.getStore('PContractBomColorStore');

        var pcontractid_link = viewmodel.get('PContract').id;
        var productid_link = viewmodel.get('IdProduct');
        var colorid_link = newCard.colorid_link;
        storeBOM.removeAll();
        storeBOM.loadStoreColor(pcontractid_link, productid_link, colorid_link);
        var gridsize = Ext.getCmp(tabPanel.getActiveTab().id).getController();
        gridsize.CreateColumns();
    },
    createTab: function () {
        newActiveItem = this.getView();
        var viewmodel = this.getViewModel();
        var productid_link = viewmodel.get('IdProduct');
        var pcontractid_link = viewmodel.get('PContract.id');

        //kiem tra mau co trong sku khong thi moi sinh tab 
        var params = new Object();
        params.pcontractid_link = pcontractid_link;
        params.productid_link = productid_link;

        GSmartApp.Ajax.post('/api/v1/pcontractsku/getbypcontract_product', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    var listtitle = [];
                    var listid = [];
                    for (var i = 0; i < response.data.length; i++) {
                        var data = response.data[i];
                        if (!listid.includes(data.color_id)) {
                            listid.push(data.color_id);
                            listtitle.push(data.mauSanPham);
                        }
                    }
                    newActiveItem.removeAll();
                    for (var i = 0; i < listtitle.length; i++) {
                        newActiveItem.add({
                            title: listtitle[i],
                            xtype: 'PContract_Bom_Color_View',
                            id: 'PContract_Bom_Color_View_' + productid_link + "_" + i,
                            colorid_link: listid[i]
                        });
                    }
                    newActiveItem.setActiveTab(0);
                }
            })
    },

    onUpload: function (record) {
        console.log('here yet bro 1');
        var me = this.getView();
        me.down('#fileUploadBom').fileInputEl.dom.click();
    },
    onUploadSizeset: function () {
        console.log('here yet bro 2');
        var me = this.getView();
        me.down('#fileUploadBomSizeset').fileInputEl.dom.click();
    },
    onUploadNew: function (record) { 
        console.log('here yet bro 3');
        var me = this.getView();
        me.down('#fileUploadBomNew').fileInputEl.dom.click();
    },
    onUploadSizesetNew: function(){
        console.log('here yet bro 4');
        var me = this.getView();
        me.down('#fileUploadBomSizesetNew').fileInputEl.dom.click();
    },

    onSelectFile: function (m, value) {
        var m = this;
        var grid = this.getView();
        var viewModel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewModel.get('PContract.id'));
        data.append('productid_link', viewModel.get('IdProduct'));

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/uploadbom/bom_haiquan', data, 2 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                m.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình tải định mức",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    var store = viewModel.getStore('PContractBom2Store_New');
                    store.load();
                }
            })
    },
    onSelectFile_Sizeset: function (m, value) {
        var grid = this.getView();
        var viewModel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewModel.get('PContract.id'));
        data.append('productid_link', viewModel.get('IdProduct'));

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/uploadbom_sizeset/bom_haiquan_sizeset', data, 2 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                m.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình tải định mức",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    var store = viewModel.getStore('PContractBom2Store_New');
                    store.load();
                }
            })
    },
    onSelectFileNew: function (m, value) {
        var grid = this.getView();
        var viewModel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewModel.get('PContract.id'));
        data.append('productid_link', viewModel.get('IdProduct'));

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/uploadbom/bom_haiquan_multicolor', data, 2 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                m.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình tải định mức",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    var store = viewModel.getStore('PContractBom2Store_New');
                    store.load();
                }
            })
    },
    onSelectFile_SizesetNew: function(m, value){
        var grid = this.getView();
        var viewModel = this.getViewModel();
        var data = new FormData();
        data.append('file', m.fileInputEl.dom.files[0]);
        data.append('pcontractid_link', viewModel.get('PContract.id'));
        data.append('productid_link', viewModel.get('IdProduct'));

        grid.setLoading("Đang tải dữ liệu");
        GSmartApp.Ajax.postUpload_timeout('/api/v1/uploadbom_sizeset/bom_haiquan_sizeset_multicolor', data, 2 * 60 * 1000,
            function (success, response, options) {
                grid.setLoading(false);
                m.reset();
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode != 200) {
                        Ext.MessageBox.show({
                            title: "Có lỗi trong quá trình tải định mức",
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                    var store = viewModel.getStore('PContractBom2Store_New');
                    store.load();
                }
            })
    },

    onDownTemp: function () {
        var me = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewModel.get('PContract.id');
        params.productid_link = viewModel.get('IdProduct');

        GSmartApp.Ajax.post('/api/v1/report/download_temp_bom_haiquan', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_Bom_HaiQuan.xlsx", response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lấy thông tin thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    onDownTempSizeSet: function () {
        var me = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewModel.get('PContract.id');
        params.productid_link = viewModel.get('IdProduct');

        GSmartApp.Ajax.post('/api/v1/report/download_temp_bom_haiquan_sizeset', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_Bom_HaiQuan_SizeSet.xlsx", response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lấy thông tin thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    onDownTempNew: function () {
        var me = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewModel.get('PContract.id');
        params.productid_link = viewModel.get('IdProduct');

        GSmartApp.Ajax.post('/api/v1/report/download_temp_bom_haiquan_new', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_Bom_HaiQuan.xlsx", response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lấy thông tin thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    onDownTempSizeSetNew: function(){
        var me = this;
        var viewModel = this.getViewModel();
        var params = new Object();
        params.pcontractid_link = viewModel.get('PContract.id');
        params.productid_link = viewModel.get('IdProduct');

        GSmartApp.Ajax.post('/api/v1/report/download_temp_bom_haiquan_sizeset_new', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.saveByteArray("Template_Bom_HaiQuan_SizeSet.xlsx", response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lấy thông tin thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: 'Lấy thông tin thất bại',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    saveByteArray: function (reportName, byte) {
        var me = this;
        byte = this.base64ToArrayBuffer(byte);

        var blob = new Blob([byte], { type: "application/xlsx" });
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        var fileName = reportName;
        link.download = fileName;
        link.click();
    },
    base64ToArrayBuffer: function (base64) {
        var binaryString = window.atob(base64);
        var binaryLen = binaryString.length;
        var bytes = new Uint8Array(binaryLen);
        for (var i = 0; i < binaryLen; i++) {
            var ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }
        return bytes;
    },
})