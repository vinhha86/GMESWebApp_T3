Ext.define('GSmartApp.view.pcontract.PContractMainViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.PContractMainViewController',
    isActivate: false,
    init: function () {
        
        // PContractStore.loadStore(search.productbuyer_code, search.po_code, search.orgbuyerid_link,
        //     search.orgvendorid_link, search.contractbuyer_code, search.contractbuyer_yearfrom, search.contractbuyer_yearto, search.month, search.year);

        common.Check_Object_Permission();
    },
    control: {
        '#PContractMainView': {
            afterrender: 'onAfterrender',
            itemdblclick: 'ondblClick',
            select: 'onPContractSelect',
        },
        '#btnThemMoi_PContractMainView': {
            click: 'onThemMoi'
        },
        // '#orgcustomerid_link': {
        //     select: 'onloadPage'
        // },
        // '#orgbuyerid_link': {
        //     select: 'onloadPage'
        // }, 
        // '#orgvendorid_link': {
        //     select: 'onloadPage'
        // },
        '#btnTimKiem2': {
            click: 'onShow'
        },
        '#btnTimKiem': {
            click: 'onloadPage'
        },
        '#contractcode': {
            specialkey: 'onSpecialkey'
        },
        '#limitpage': {
            specialkey: 'onSpecialkey'
        },
        // searh fields
        '#productbuyer_code': {
            keypress: 'onPressEnterSearch',
        },
        '#po_code': {
            keypress: 'onPressEnterSearch'
        },
        '#orgbuyerid_link': {
            keypress: 'onPressEnterSearch',
        },
        '#orgvendorid_link': {
            keypress: 'onPressEnterSearch'
        },
        '#contractbuyer_code': {
            keypress: 'onPressEnterSearch',
        },
        '#contractbuyer_yearfrom': {
            keypress: 'onPressEnterSearch'
        },
        '#contractbuyer_yearto': {
            keypress: 'onPressEnterSearch',
        },
        '#month': {
            keypress: 'onPressEnterSearch',
        },
        '#year': {
            keypress: 'onPressEnterSearch',
        },
        '#month_year_shipdate': {
            keypress: 'onPressEnterSearchMonthYear'
        }
    },
    onAfterrender: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var PContractStore = viewModel.getStore('PContractStore');
        PContractStore.getSorters().remove('deliverydate');
        PContractStore.getSorters().add('vendorname');
        PContractStore.getSorters().add('buyername');
        PContractStore.getSorters().add('contractcode');

        var search = new Object();
        var po = GSmartApp.util.State.get('po');
        if (po == null) {
            search = viewModel.get('value');
        }
        else {
            search = po;
            viewModel.set('value', search);
        }
        GSmartApp.util.State.set('po', null);

        var EndBuyer = viewModel.getStore('EndBuyer');
        var Vendor = viewModel.getStore('Vendor');
        EndBuyer.loadStore(12);
        EndBuyer.sort('name', 'ASC');
        Vendor.loadStore(11);
        Vendor.sort('name', 'ASC');

        console.log(search);
        Ext.defer(function () { 
            m.onloadPage();
        }, 50);
       
    },
    onSpecialkey: function (field, e) {
        var m = this;
        if (field.itemId == "limitpage") {
            var viewModel = this.getViewModel();
            var store = viewModel.getStore('PContractStore');
            store.currentPage = 1;
        }
        if (e.getKey() == e.ENTER) {
            m.onloadPage();
        }
    },
    onloadPage: function () {
        var m = this;
        var me = this.getView();

        var viewModel = this.getViewModel();
        var PContractStore = viewModel.getStore('PContractStore');

        var productbuyer_code = me.down('#productbuyer_code').getValue();
        var po_code = me.down('#po_code').getValue();
        var orgbuyerid_link = me.down('#orgbuyerid_link').getValue();
        var orgvendorid_link = me.down('#orgvendorid_link').getValue();
        var contractbuyer_code = me.down('#contractbuyer_code').getValue();
        var contractbuyer_yearfrom = me.down('#contractbuyer_yearfrom').getValue();
        var contractbuyer_yearto = me.down('#contractbuyer_yearto').getValue();
        // var month = me.down('#month').getValue() == null ? '' : me.down('#month').getValue().trim();
        // var year = me.down('#year').getValue() == null ? '' : me.down('#year').getValue().trim();

        // console.log(month);
        // console.log(year);

        if (productbuyer_code == null) {
            productbuyer_code = "";
        }

        if (po_code == null) {
            po_code = "";
        }

        if (orgbuyerid_link == null) {
            orgbuyerid_link = 0;
        }

        if (orgvendorid_link == null) {
            orgvendorid_link = 0;
        }

        if (contractbuyer_code == null) {
            contractbuyer_code = "";
        }

        if (contractbuyer_yearfrom == null) {
            contractbuyer_yearfrom = "";
        }

        if (contractbuyer_yearto == null) {
            contractbuyer_yearto = "";
        }

        var firstday_month = "";
        var lastday_month = "";
        // if ((month != "" && year!="")) {
        //     if (month <= 12 && month >= 0){
        //         if(month == 1 || month ==3 || month ==5 || month ==7 || month ==9 || month ==11){
        //             firstday_month = year+"-"+month + "-" + "1";
        //             lastday_month = year+"-"+month + "-" + "31";   
        //         }
        //         else if(month == 4 || month ==6 || month ==8 || month ==10 || month ==12 ){
        //             firstday_month = year+"-"+month + "-" + "1";
        //             lastday_month = year+"-"+month + "-" + "30";  
        //         }
        //         else if(month == 2 && year%4==0 ) {
        //             firstday_month = year+"-"+month + "-" + "1";
        //             lastday_month = year+"-"+month + "-" + "29"; 
        //         }
        //         else {
        //             firstday_month = year+"-"+month + "-" + "1";
        //             lastday_month = year+"-"+month + "-" + "28"; 
        //         }
        //     }
        //     else {
        //         Ext.MessageBox.show({
        //         title: "Thông báo",
        //         msg: 'Vui lòng nhập tháng từ 1 đến 12',
        //         buttons: Ext.MessageBox.YES,
        //         buttonText: {
        //             yes: 'Đóng',
        //         }
        //         });
        //         firstday_month = "";
        //         lastday_month = "";
        //     }
        // }
        // else if (month == "" && year != ""){
        //     // Ext.MessageBox.show({
        //     //     title: "Thông báo",
        //     //     msg: 'Vui lòng nhập tháng để tìm kiếm',
        //     //     buttons: Ext.MessageBox.YES,
        //     //     buttonText: {
        //     //         yes: 'Đóng',
        //     //     }
        //     // });
        //     firstday_month = "";
        //     lastday_month = "";
        // }
        // else if (month != "" && year == ""){
        //     // Ext.MessageBox.show({
        //     //     title: "Thông báo",
        //     //     msg: 'Vui lòng nhập năm để tìm kiếm',
        //     //     buttons: Ext.MessageBox.YES,
        //     //     buttonText: {
        //     //         yes: 'Đóng',
        //     //     }
        //     // });
        //     firstday_month = "";
        //     lastday_month = "";
        // }
        // else {
        //     firstday_month = "";
        //     lastday_month = "";
        // }

        PContractStore.loadStore(productbuyer_code, po_code, orgbuyerid_link,
            orgvendorid_link, contractbuyer_code,
            contractbuyer_yearfrom, contractbuyer_yearto,
            firstday_month, lastday_month);
        var PContractPOList = viewModel.getStore('PContractPOList');
        PContractPOList.removeAll();
        me.getSelectionModel().deselectAll();
    },
    onThemMoi: function () {
        var viewModel = this.getViewModel();
        var data = new Object();
        data.productbuyer_code = viewModel.get('value.productbuyer_code');
        data.po_code = viewModel.get('value.po_code');
        data.orgbuyerid_link = viewModel.get('value.orgbuyerid_link');
        data.orgvendorid_link = viewModel.get('value.orgvendorid_link');
        data.contractbuyer_code = viewModel.get('value.contractbuyer_code');
        data.contractbuyer_yearfrom = viewModel.get('value.contractbuyer_yearfrom');
        data.contractbuyer_yearto = viewModel.get('value.contractbuyer_yearto');

        GSmartApp.util.State.set('po', data);

        this.redirectTo("lspcontract/0/edit");
    },
    onEdit: function (rec) {
        var viewModel = this.getViewModel();
        var data = new Object();
        data.productbuyer_code = viewModel.get('value.productbuyer_code');
        data.po_code = viewModel.get('value.po_code');
        data.orgbuyerid_link = viewModel.get('value.orgbuyerid_link');
        data.orgvendorid_link = viewModel.get('value.orgvendorid_link');
        data.contractbuyer_code = viewModel.get('value.contractbuyer_code');
        data.contractbuyer_yearfrom = viewModel.get('value.contractbuyer_yearfrom');
        data.contractbuyer_yearto = viewModel.get('value.contractbuyer_yearto');
        data.month = viewModel.get('value.month') == null ? '' : viewModel.get('value.month');
        data.year = viewModel.get('value.year') == null ? '' : viewModel.get('value.year');

        GSmartApp.util.State.set('po', data);

        var id = rec.get('id');
        this.redirectTo("lspcontract/" + id + "/edit");
    },
    ondblClick: function (m, record, item, index, e, eOpts) {
        var viewModel = this.getViewModel();
        var data = new Object();
        data.productbuyer_code = viewModel.get('value.productbuyer_code');
        data.po_code = viewModel.get('value.po_code');
        data.orgbuyerid_link = viewModel.get('value.orgbuyerid_link');
        data.orgvendorid_link = viewModel.get('value.orgvendorid_link');
        data.contractbuyer_code = viewModel.get('value.contractbuyer_code');
        data.contractbuyer_yearfrom = viewModel.get('value.contractbuyer_yearfrom');
        data.contractbuyer_yearto = viewModel.get('value.contractbuyer_yearto');
        data.month = viewModel.get('value.month') == null ? '' : viewModel.get('value.month');
        data.year = viewModel.get('value.year') == null ? '' : viewModel.get('value.year');

        GSmartApp.util.State.set('po', data);
        var id = record.data.id;
        this.redirectTo("lspcontract/" + id + "/edit");
    },
    onXoa: function (rec) {
        var grid = this.getView();
        var id = rec.get('id');

        var params = new Object();
        params.id = id;
        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa đơn hàng "' + rec.data.name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    GSmartApp.Ajax.post('/api/v1/pcontract/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                var response = Ext.decode(response.responseText);
                                var store = grid.getStore();
                                if (response.respcode != 200) {
                                    Ext.Msg.show({
                                        title: "Thông báo",
                                        msg: 'Xóa thất bại',
                                        buttons: Ext.MessageBox.YES,
                                        buttonText: {
                                            yes: 'Đóng',
                                        }
                                    });
                                }
                                else {
                                    // store.removeAt(rowIndex);
                                    store.load();
                                }
                            } else {
                                var response = Ext.decode(response.responseText);
                                Ext.Msg.show({
                                    title: 'Xóa hợp đồng',
                                    msg: response.message,
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        })
                }
            }
        });
    },
    checkActionColumnPermission: function (view, rowIndex, colIndex, item, record) {
        return common.Check_ActionColum_Permission(item.itemId);
    },
    onPContractSelect: function (e, selected, eOpts) {
        if (null != selected) {
            var m = this;
            var me = this.getView();
            var viewModel = this.getViewModel();

            viewModel.set('pcontractid_link', selected.data.id);
            var productbuyer_code = me.down('#productbuyer_code').getValue();
            var po_code = me.down('#po_code').getValue();

            if (productbuyer_code == null) {
                productbuyer_code = "";
            }

            if (po_code == null) {
                po_code = "";
            }

            var params = new Object();
            params.pcontractid_link = selected.id;
            params.potype = 10;
            GSmartApp.Ajax.post('/api/v1/pcontract_po/getDsPhanXuongSX_byPcontractId', Ext.JSON.encode(params),
                function (success, response, options) {
                    var response = Ext.decode(response.responseText);
                    me.setLoading(false);
                    if (success) {
                        if (response.respcode == 200) {
                            var phanXuongIds = response.phanXuongIds;
                            m.loadDsUser_PContractPOList(selected.id, phanXuongIds);
                        }
                    } else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Lấy thông tin thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }

                })

            // var PContractPOList = viewModel.getStore('PContractPOList');
            // // PContractPOList.loadByPContractAndType(selected.id, 10);
            // PContractPOList.loadByPContractAndType_async(selected.id, 10);
            // PContractPOList.load({
            //     scope: this,
            //     callback: function(records, operation, success) {
            //         if(!success){
            //              // this.fireEvent('logout');
            //         } else {
            //             // lay danh sach id phan xuong de load store user
            //             var factories_Id = new Array();
            //             for(var i = 0; i < records.length; i++){
            //                 var records_factories_Id = records[i].get('factories_Id');
            //                 for(var j = 0; j < records_factories_Id.length; j++){
            //                     if(!factories_Id.includes(records_factories_Id[j])){
            //                         factories_Id.push(records_factories_Id[j]);
            //                     }
            //                 }
            //             }
            //             // console.log(factories_Id);

            //             // load store user
            //             var userStore = viewModel.getStore('UserStore');
            //             userStore.loadUserbyOrg_Buyer_Multi(factories_Id, null);
            //         }
            //     }
            // });

        }
    },

    loadDsUser_PContractPOList: function(pcontractId, phanXuongIds){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var userStore = viewModel.getStore('UserStore');
        var PContractPOList = viewModel.getStore('PContractPOList');
        // userStore.loadUserbyOrg_Buyer_Multi(factories_Id, null);
        userStore.loadUserbyOrg_Buyer_Multi_async(phanXuongIds, null);
        userStore.load({
            scope: this,
            callback: function(records, operation, success) {
                if(!success){
                     // this.fireEvent('logout');
                } else {
                    PContractPOList.loadByPContractAndType(pcontractId, 10);
                }
            }
        });
    },

    onMenu_ContractList: function (grid, rowIndex, colIndex, item, e, record) {
        var me = this;
        var menu_grid = new Ext.menu.Menu({
            xtype: 'menu',
            anchor: true,
            //padding: 10,
            minWidth: 150,
            viewModel: {},
            items: [
                {
                    text: 'Chi tiết đơn hàng',
                    itemId: 'btnEditPContract_PContract_PO_List',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-edit brownIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onEdit(record);
                    },
                },
                {
                    text: 'Xóa đơn hàng',
                    itemId: 'btnDeletePO_PContract_PO_List',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-trash redIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onXoa(record);
                    }
                },
                {
                    text: 'Quyết toán đơn hàng',
                    itemId: 'btnmenuQuyetToanDonHang',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-calculator greenIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onShowRecon(record);
                    }
                },
                '-',
                {
                    text: 'Bảng cân đối NPL',
                    itemId: 'btnBalance',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-balance-scale blueIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onShowBalance(record);
                    }
                },
                {
                    text: 'Thông tin đơn hàng',
                    itemId: 'btnBalance',
                    separator: true,
                    margin: '10 0 0',
                    iconCls: 'x-fa fas fa-info blueIcon',
                    handler: function () {
                        var record = this.parentMenu.record;
                        me.onShowInfo(record);
                    }
                },
                
                // {
                //     text: 'Tổng hợp báo cáo KHSX',
                //     itemId: 'btnTongHopBaoCao',
                //     separator: true,
                //     margin: '10 0 0',
                //     iconCls: 'x-fa fas fa-download brownIcon',
                //     handler: function () {
                //         var record = this.parentMenu.record;
                //         me.onTongHopBaoCao(record);
                //     }
                // }
            ]
        });
        // HERE IS THE MAIN CHANGE
        var position = [e.getX() - 10, e.getY() - 10];
        e.stopEvent();
        menu_grid.record = record;
        menu_grid.showAt(position);
        common.Check_Menu_Permission(menu_grid);
    },
    onContractCodeFilterKeyup: function () {
        var viewModel = this.getViewModel();
        var PContractStore = viewModel.get('PContractStore');
        var grid = this.getView(),
            // Access the field using its "reference" property name.
            filterField = this.lookupReference('contractcodeFilterField'),
            filters = PContractStore.getFilters();

        if (filterField.value) {
            this.contractcodeFilter = filters.add({
                id: 'contractcodeFilter',
                property: 'contractcode',
                value: filterField.value,
                anyMatch: true,
                caseSensitive: false
            });
        }
        else if (this.contractcodeFilter) {
            filters.remove(this.contractcodeFilter);
            this.contractcodeFilter = null;
        }
    },
    onShowBalance: function (rec) {
        var id = rec.get('id');
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Bảng cân đối NPL',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Balance_Main',
                viewModel: {
                    data: {
                        pcontractid_link: id
                    }
                }
            }]
        });
        form.show();
    },
    onShowInfo: function (rec) {
        var id = rec.get('id');
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Thông tin chào giá',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .60,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContractInfo_View',
                viewModel: {
                    data: {
                        pcontract: rec,
                        pcontractid_link: id
                    }
                }
            }]
        });
        form.show();
    },
    onTongHopBaoCao: function (rec) {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var fileName = "KeHoachSX_" + rec.get('contractcode') + ".xlsx";
        var id = rec.get('id');
        // console.log(rec);

        var params = new Object();
		params.id = id;
		GSmartApp.Ajax.post('/api/v1/pcontract/get_TongHopBaoCaoKHSX', Ext.JSON.encode(params),
			function (success, response, options) {
				var response = Ext.decode(response.responseText);
				if (success) {
					if (response.respcode == 200) {
                        console.log('get_TongHopBaoCaoKHSX successed');
                        m.saveByteArray(fileName, response.data);
					}
				} else {
					Ext.Msg.show({
						title: 'Thông báo',
						msg: 'Lấy thông tin tổng hợp thất bại',
						buttons: Ext.MessageBox.YES,
						buttonText: {
							yes: 'Đóng',
						}
					});
				}

			})
    },
    saveByteArray: function (reportName, byte) {
        var me = this;
        byte = this.base64ToArrayBuffer(byte);
        
        var blob = new Blob([byte], {type: "application/xlsx"});
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

    onShowRecon: function (rec) {
        var id = rec.get('id');
        var form = Ext.create('Ext.window.Window', {
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            title: 'Quyết toán đơn hàng',
            closeAction: 'destroy',
            height: Ext.getBody().getViewSize().height * .95,
            width: Ext.getBody().getViewSize().width * .95,
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'Recon_Main_Pcontract',
                viewModel: {
                    data: {
                        pcontractid_link: id
                    }
                }
            }]
        });
        form.show();
    },

    // enter to search
    onPressEnterSearch: function (textfield, e, eOpts) {
		var m = this;
		if (e.getKey() == e.ENTER) {
			// Ext.Msg.alert('Keys','You pressed the Enter key');
			m.onloadPage();
		}
	},
    onShow: function () {
        console.log("okeeeeeeee");
        var m = this;
        var me = this.getView();

        var viewModel = this.getViewModel();
        var PContractStore = viewModel.getStore('PContractStore');

        var productbuyer_code = me.down('#productbuyer_code').getValue();
        var po_code = me.down('#po_code').getValue();
        var orgbuyerid_link = me.down('#orgbuyerid_link').getValue();
        var orgvendorid_link = me.down('#orgvendorid_link').getValue();
        var contractbuyer_code = me.down('#contractbuyer_code').getValue();
        var contractbuyer_yearfrom = me.down('#contractbuyer_yearfrom').getValue();
        var contractbuyer_yearto = me.down('#contractbuyer_yearto').getValue();
        var month_year_shipdate = me.down('#month_year_shipdate').getValue();
        var checkFormats = m.checkFormats(month_year_shipdate);
       console.log(checkFormats);
        if(checkFormats == 1){
            console.log("null");
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Vui lòng nhập tháng năm (mm/YYYY)",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }
        else if(checkFormats==2){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Nhập sai định dạng (mm/YYYY)",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                }
            });
            return;
        }

    
       console.log("1111");
    //    return;

        if (productbuyer_code == null) {
            productbuyer_code = "";
        }

        if (po_code == null) {
            po_code = "";
        }

        if (orgbuyerid_link == null) {
            orgbuyerid_link = 0;
        }

        if (orgvendorid_link == null) {
            orgvendorid_link = 0;
        }

        if (contractbuyer_code == null) {
            contractbuyer_code = "";
        }

        if (contractbuyer_yearfrom == null) {
            contractbuyer_yearfrom = "";
        }

        if (contractbuyer_yearto == null) {
            contractbuyer_yearto = "";
        }

        var firstday_month = viewModel.get('value.firstday_month');
        var lastday_month = viewModel.get('value.lastday_month');
        console.log(firstday_month);
        console.log(lastday_month);

        // PContractStore.loadStore(productbuyer_code, po_code, orgbuyerid_link,
        //     orgvendorid_link, contractbuyer_code,
        //     contractbuyer_yearfrom, contractbuyer_yearto,
        //     firstday_month, lastday_month);
        // var PContractPOList = viewModel.getStore('PContractPOList');
        // PContractPOList.removeAll();
        // me.getSelectionModel().deselectAll();


        var form = Ext.create('Ext.window.Window', {
            height: "90%",
            width: "90%",
            closable: true,
            resizable: false,
            modal: true,
            border: false,
            // title: 'Danh sách sản phẩm',
            closeAction: 'destroy',
            bodyStyle: 'background-color: transparent',
            layout: {
                type: 'fit', // fit screen for window
                padding: 5
            },
            items: [{
                xtype: 'PContract_POListByMonth_Main',
                viewModel: {
                    type: 'PContract_POListByMonth_Main_ViewModel',
                    data: {
                        firstday_month: firstday_month,
                        lastday_month: lastday_month,
                        // viewId: viewId
                    }
                }
            }]
        });
        form.show();
    },
    checkFormats: function(month_year_shipdate) {
        var m = this;
        var viewModel = this.getViewModel();
        if(month_year_shipdate == "") {
            return 1;
        }
        var month_year = month_year_shipdate.trim();
        if(( (month_year.length != 7) && (month_year.length !=5)) || (month_year[2] != "/")) {
                // console.log("LỖI !!");
            return 2;
        }
        if(month_year.length == 5){
            var month_year_Array = month_year.split("/");
            month_year = month_year_Array[0] + '/20' + month_year_Array[1];
        }

        var e = month_year.split("/");
        var month = parseInt(e[0], 10);
        var year = parseInt(e[1], 10);
        var yearNow = (new Date()).getFullYear();
        if((month>12) || (month<0) || (year>(yearNow+1)) || (year<(yearNow-2))){
        // console.log("Lỗi ");
        return 2;
        }
        viewModel.set('value.month_year', month_year);
        if(month == 1 || month ==3 || month ==5 || month ==7 || month ==9 || month ==11){
                        firstday_month = year+"-"+month + "-" + "1";
                        lastday_month = year+"-"+month + "-" + "31";   
                        viewModel.set('value.firstday_month', firstday_month);
                        viewModel.set('value.lastday_month', lastday_month);
                    }
        else if(month == 4 || month ==6 || month ==8 || month ==10 || month ==12 ){
                        firstday_month = year+"-"+month + "-" + "1";
                        lastday_month = year+"-"+month + "-" + "30"; 
                        viewModel.set('value.firstday_month', firstday_month);
                        viewModel.set('value.lastday_month', lastday_month);
                    }
        else if(month == 2 && year%4==0 ) {
                        firstday_month = year+"-"+month + "-" + "1";
                        lastday_month = year+"-"+month + "-" + "29"; 
                        viewModel.set('value.firstday_month', firstday_month);
                        viewModel.set('value.lastday_month', lastday_month);
                    }
        else {
                        firstday_month = year+"-"+month + "-" + "1";
                        lastday_month = year+"-"+month + "-" + "28"; 
                        viewModel.set('value.firstday_month', firstday_month);
                        viewModel.set('value.lastday_month', lastday_month);
                   }
        return 0;
        
    },
    onPressEnterSearchMonthYear: function (textfield, e, eOpts) {
		var m = this;
		if (e.getKey() == e.ENTER) {
			// Ext.Msg.alert('Keys','You pressed the Enter key');
			m.onShow();
		}
	},
})