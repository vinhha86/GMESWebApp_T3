Ext.define('GSmartApp.view.pcontract.PContract_Bom_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_Bom_View',
    id: 'PContract_Bom_View',
    controller: 'PContract_Bom_ViewController',
    itemId: 'PContract_Bom_View',
    bind: {
        store: '{PContractBom2Store_New}'
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}'
    }],
    viewConfig: {
        stripeRows: false,
        columnLines: true,
        enableTextSelection: true,
        rowLines: true
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    selModel: {
        type: 'cellmodel',
        listeners: {
            select: 'onSelectCellmodel'
        }
    },

    keyMapEnabled: true,
    keyMap: {
        // ENTER: 'onEnterKey',

        // "ALT+PRINT_SCREEN": 'doScreenshot',

        // Cmd on Mac OS X, Ctrl on Windows/Linux.
        "CmdOrCtrl+C": 'doCopy',
        "CmdOrCtrl+V": 'doPaste',

        // This one is handled by a class method.
        // ESC: {
        //     handler: 'destroy',
        //     scope: 'this',
        //     event: 'keypress'  // default would be keydown
        // },

        // "ALT+DOWN": 'openExpander',

        // Match any key modifiers and invoke before any other DOWN keys
        // handlers with lower or default priority.
        // "*+DOWN": {
        //     handler: 'preprocessDownKey',
        //     priority: 100
        // }
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            itemId: 'btnDeleteMaterial_Bom2',
            isActionDisabled: 'checkActionColumnPermission',
            iconCls: 'x-fa fas fa-trash',
            tooltip: GSmartApp.Locales.btn_xoa[GSmartApp.Locales.currentLocale],
            handler: 'onXoa'
        }],
        // hidden: true
    }, {
        text: 'Mã NPL',
        dataIndex: 'materialCode',
        menuDisabled: true,
        sortable: false,
        width: 80,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'ValueFilterFieldMaNPL',
            width: '98%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterValueMaNPLKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Nguyên phụ liệu',
        dataIndex: 'materialName',
        menuDisabled: true,
        sortable: false,
        width: 120,
        enableTextSelection: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'ValueFilterFieldTenNPL',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterValueTenNPLKeyup',
                buffer: 500
            }
        }
    }, 
    // {
    //     text: 'Thành phần vải',
    //     dataIndex: 'thanhPhanVai',
    //     menuDisabled: true,
    //     sortable: false,
    //     width: 200,
    //     renderer: function (value, metaData, record, rowIdx, colIdx, store) {
    //         var val = value == 'null' ? "" : value;
    //         metaData.tdAttr = 'data-qtip="' + val + '"';
    //         return val;
    //     }
    // }, {
    //     text: 'Nhà CC',
    //     dataIndex: 'nhacungcap',
    //     menuDisabled: true,
    //     sortable: false,
    //     width: 120,
    //     renderer: function (value, metaData, record, rowIdx, colIdx, store) {
    //         var val = value == 'null' ? "" : value;
    //         metaData.tdAttr = 'data-qtip="' + val + '"';
    //         return val;
    //     }
    // }, 
    {
        text: 'Màu NPL',
        dataIndex: 'tenMauNPL',
        menuDisabled: true,
        sortable: false,
        width: 120,
        enableTextSelection: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }, 
    {
        text: 'Cỡ/khổ',
        dataIndex: 'coKho',
        menuDisabled: true,
        sortable: false,
        width: 70,
        enableTextSelection: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        }
    }, 
    {
        text: 'PO',
        dataIndex: 'po_line',
        menuDisabled: true,
        sortable: false,
        width: 150,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'ValueFilterFieldPoLine',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterValuePoLineKeyup',
                buffer: 500
            }
        }
    }, {
        text: 'Màu SP',
        dataIndex: 'color_name',
        menuDisabled: true,
        sortable: false,
        width: 110,
        enableTextSelection: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            var val = value == 'null' ? "" : value;
            metaData.tdAttr = 'data-qtip="' + val + '"';
            return val;
        },
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            margin: 1,
            reference: 'ValueFilterField',
            width: '99%',
            enableKeyEvents: true,
            listeners: {
                keyup: 'onFilterValueKeyup',
                buffer: 500
            }
        }
    }, 
    // {
    //     text: 'SL ĐH',
    //     dataIndex: 'sldh',
    //     menuDisabled: true,
    //     sortable: false,
    //     width: 110,
    //     enableTextSelection: true,
    //     renderer: function (value, metaData, record, rowIdx, colIdx, store) {
    //         var val = value == 'null' ? "" : value;
    //         metaData.tdAttr = 'data-qtip="' + val + '"';
    //         return val;
    //     },
    //     // items: {
    //     //     xtype: 'textfield',
    //     //     fieldStyle: "",
    //     //     margin: 1,
    //     //     reference: 'ValueFilterField',
    //     //     width: '99%',
    //     //     enableKeyEvents: true,
    //     //     listeners: {
    //     //         keyup: 'onFilterValueKeyup',
    //     //         buffer: 500
    //     //     }
    //     // }
    // }, 
    {
        text: 'ĐVT',
        dataIndex: 'unitid_link',
        menuDisabled: true,
        sortable: false,
        width: 70,
        getEditor: function (record) {
            return Ext.create('Ext.grid.CellEditor', {
                field: {
                    xtype: 'combo',
                    bind: {
                        store: '{UnitStore}'
                    },
                    valueField: 'id',
                    displayField: 'code',
                    queryMode: 'local'
                }
            })
        },
        renderer: 'renderUnit'
    }, 
    {
        text: 'Hao hụt',
        dataIndex: 'lost_ratio',
        menuDisabled: true,
        sortable: false,
        width: 70,
        xtype: 'numbercolumn',
        format: '0.000',
        editor: {
            xtype: 'textfield',
            maskRe: /[0-9.]/,
            selectOnFocus: true
        },
        renderer: function (value, metaData, record) {
            return value;
        }
    }
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        itemId: 'toolbar',
        border: true,
        height: 45,
        style: "background-color : white",
        items: [
            {
                xtype: 'button',
                itemId: 'btnAddMaterial_Bom',
                text: 'Thêm NPL',
                margin: 3,
                iconCls: 'x-fa fa-plus'
            },
            {
                xtype: 'combo',
                width: 400,
                margin: 3,
                bind: {
                    store: '{PContractProductStore}',
                    value: '{IdProduct}',
                    readOnly: '{isReadOnlycmbSanPham}'
                },
                triggerAction: 'all',
                fieldLabel: 'Sản phẩm',
                labelWidth: 80,
                itemId: 'cmbSanPham',
                queryMode: 'local',
                anyMatch: true,
                valueField: 'productid_link',
                displayField: 'productBuyerCode',
                anyMatch: true
            },
            {
                xtype: 'button',
                tooltip: 'Tải file mẫu (Định mức)',
                margin: 3,
                // text: 'Mẫu file PO',
                iconCls: 'x-fa fa-download',
                itemId: 'btnDownTempBom',
                bind: {
                    hidden: '{!allowUploadBom}'
                },
                menu: [
                    {
                        itemId: 'btndownloadsize',
                        text: 'Tải file mẫu theo cỡ',
                        iconCls: 'x-fa fa-download',
                        weight: 30, 
                        hidden: true
                    },
                    {
                        itemId: 'btndownloadsize_new',
                        text: 'Tải file mẫu theo cỡ',
                        iconCls: 'x-fa fa-download',
                        weight: 30
                    },
                    {
                        itemId: 'btndownloadsizeset',
                        text: 'Tải file mẫu theo dải cỡ',
                        iconCls: 'x-fa fa-download',
                        weight: 30,
                        hidden: true,
                    },
                    {
                        itemId: 'btndownloadsizeset_new',
                        text: 'Tải file mẫu theo dải cỡ',
                        iconCls: 'x-fa fa-download',
                        weight: 30
                    }
                ]
            },
            {
                xtype: 'filefield',
                buttonText: 'Tải báo giá',
                buttonOnly: true,
                hidden: true,
                itemId: 'fileUploadBom'
            },
            {
                xtype: 'filefield',
                buttonText: 'Tải báo giá',
                buttonOnly: true,
                hidden: true,
                itemId: 'fileUploadBomNew'
            },
            {
                xtype: 'filefield',
                buttonText: 'Tải báo giá',
                buttonOnly: true,
                hidden: true,
                itemId: 'fileUploadBomSizeset'
            },
            {
                xtype: 'filefield',
                buttonText: 'Tải báo giá new',
                buttonOnly: true,
                hidden: true,
                itemId: 'fileUploadBomSizesetNew'
            },

            

            {
                xtype: 'button',
                tooltip: 'Upload định mức',
                // margin: 3,
                iconCls: 'x-fa fa-upload',
                itemId: 'btn_UploadBom',
                bind: {
                    hidden: '{!allowUploadBom}'
                },
                menu: [
                    {
                        itemId: 'btn_UploadBomSize',
                        text: 'Upload file theo cỡ',
                        iconCls: 'x-fa fa-upload',
                        weight: 30, 
                        hidden: true
                    },
                    {
                        itemId: 'btn_UploadBomSize_New',
                        text: 'Upload file theo cỡ',
                        iconCls: 'x-fa fa-upload',
                        weight: 30
                    },
                    {
                        itemId: 'btn_UploadBomSizeSet',
                        text: 'Upload file theo dải cỡ',
                        iconCls: 'x-fa fa-upload',
                        weight: 30,
                        hidden: true
                    },
                    {
                        itemId: 'btn_UploadBomSizeSet_New',
                        text: 'Upload file theo dải cỡ',
                        iconCls: 'x-fa fa-upload',
                        weight: 30,
                    },
                ]
            },
            {
                xtype: 'button',
                itemId: 'btnConfirmBOM',
                tooltip: 'Chốt định mức cân đối',
                iconCls: 'x-fa fa-check greenIcon',
                bind: {
                    text: '{text_chotdinhmuc}',
                    disabled: '{disabled_chotdinhmuc}',
                    hidden: '{hidden_chotdinhmuc}'
                }
            },
            {
                xtype: 'button',
                itemId: 'btnDeleteBOM',
                tooltip: 'Xóa định mức cân đối',
                text: 'Xóa định mức',
                iconCls: 'x-fa fa-trash redIcon',
                bind: {
                    // disabled: '{disabled_chotdinhmuc}',
                    // hidden: '{hidden_chotdinhmuc}'
                }
            }
        ]
    }]
})