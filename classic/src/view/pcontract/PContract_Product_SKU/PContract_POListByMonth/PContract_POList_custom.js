Ext.define('GSmartApp.view.pcontract.PContract_Product_SKU.PContract_POListByMonth.PContract_POList_custom', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContract_POList_custom',
    itemId: 'PContract_POList_custom',
    cls: 'PContract_POList_custom',
    controller: 'PContract_POList_customController',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        listeners: {
            expandbody: 'onSelectOffer'
        },
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}'
    }],
    bind: {
        store: '{PContractPOLine_Confirm_List}'
    },
    columns: [{
                    xtype: 'actioncolumn',
                    width: 28,
                    // menuDisabled: true,
                    sortable: false,
                    hideable: false,
                    align: 'center',
                    // items: [
                    //     {
                    //         iconCls: 'x-fa fas fa-bars linekhIcon',
                    //         handler: 'onMenu_PO'
                    //     }
                    // ]
                }, 
                // {
                //     text: 'STT',
                //     width: 40,
                //     xtype: 'rownumberer',
                //     align: 'center'
                // },
                {
                    text: 'PO Buyer',
                    dataIndex: 'po_buyer',
                    // sortable: true,
                    // flex: 1,
                    width: 120,
                    items: {
                        xtype: 'textfield',
                        fieldStyle: "",
                        reference: 'POFilterChil2',
                        width: '99%',
                        // flex: 1,
                        width: 118,
                        margin: 2,
                        enableKeyEvents: true,
                        listeners: {
                            keyup: 'onPOChilFilterKeyup',
                            buffer: 500
                        }
                    },
                    // renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                    //     metaData.tdCls = 'po_linekh';
                    //     metaData.tdAttr = 'data-qtip="' + value + '"';
                    //     return value;
                    // },
                    // editor: {
                    //     allowBlank: false,
                    //     selectOnFocus: false
                    // }
                },
                {
                    text: 'Mã đơn hàng',
                    dataIndex: 'contractcode',
                    width: 120,
                    items: {
                        xtype: 'textfield',
                        fieldStyle: "",
                        reference: 'POFilterChil',
                        width: '99%',
                        flex: 1,
                        margin: 2,
                        enableKeyEvents: true,
                        listeners: {
                            keyup: 'onPConTractFilterKeyup',
                            buffer: 500
                        }
                    }
                },
                {
                    text: 'DC#',
                    dataIndex: 'dc',
                    width: 45,
                    hideable: false,
                    renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                        metaData.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    },
                }, 
                {
                    text: 'PT đóng gói',
                    dataIndex: 'phuongThucDongGoi',
                    flex: 1,
                    hideable: false,
                    renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                        metaData.tdAttr = 'data-qtip="' + value + '"';
                        return value;
                    },
                }, 
                
                // {
                //     text: 'Ship Mode',
                //     dataIndex: 'shipmodeid_link',
                //     width: 60,
                //     // hideable: false,
                //     // editor: {
                //     //     completeOnEnter: true,
                //     //     field: {
                //     //         xtype: 'combo',
                //     //         typeAhead: true,
                //     //         triggerAction: 'all',
                //     //         selectOnFocus: false,
                //     //         bind: {
                //     //             store: '{ShipModeStore}',
                //     //             value: '{shipmodeid_link}'
                //     //         },
                //     //         displayField: 'name',
                //     //         valueField: 'id',
                //     //         queryMode: 'local'
                //     //     }
                //     // },
                //     // renderer: 'renderShipping'
                // },
                {
                    text: 'Ngày VC',
                    xtype: 'datecolumn',
                    dataIndex: 'productiondate',
                    // hideable: false,
                    // // renderer: Ext.util.Format.dateRenderer('d/m/y'),
                    // renderer: function (value) {
                    //     var date = Ext.Date.parse(value, 'c');
                    //     return Ext.Date.format(date, 'd/m/y');
                    // },
                    // width: 72,
                    // editor: {
                    //     xtype: 'datefield',
                    //     fieldStyle: 'font-size:11px;',
                    //     format: 'd/m/y',
                    //     altFormats: "Y-m-d\\TH:i:s.uO",
                    // },
                    // renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                    //     metaData.tdCls = 'po_linekh';
                    //     var date = Ext.Date.parse(value, 'c');
                    //     return Ext.Date.format(date, 'd/m/y');
                    // }
                },
                {
                    text: 'Ngày GH',
                    xtype: 'datecolumn',
                    dataIndex: 'shipdate',
                    // hideable: false,
                    // renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                    //     metaData.tdCls = 'po_linekh';
                    //     var date = Ext.Date.parse(value, 'c');
                    //     return Ext.Date.format(date, 'd/m/y');
                    // },
                    // width: 72,
                    // editor: {
                    //     xtype: 'datefield',
                    //     fieldStyle: 'font-size:11px;',
                    //     format: 'd/m/y',
                    //     altFormats: "Y-m-d\\TH:i:s.uO",
                    // },
                },
                {
                    text: 'SL',
                    align: 'end',
                    hideable: false,
                    dataIndex: 'po_quantity',
                    width: 70,
                    // renderer: 'onRender_poquantity',
                    // editor: {
                    //     xtype: 'numberfield',
                    //     fieldStyle: 'font-size:11px;',
                    //     hideTrigger: true,
                    //     allowBlank: false,
                    //     minValue: 0,
                    //     maxValue: 1000000,
                    //     selectOnFocus: false,
                    //     decimalPrecision: 0
                    // },
                    // summaryType: 'sum', summaryRenderer: 'renderSum',
                    // align: 'end',
                },],
    // plugins: [{
    //     ptype: 'cellediting',
    //     clicksToEdit: 2,
    //     listeners: {
    //         validateedit: 'onPOListEdit'
    //     }
    // }, {
    //     ptype: 'rowwidget',
    //     id: 'rowwidget',
    //     widget:
    //     {
    //         xtype: 'grid',
    //         itemId: 'PO_ChildList',
    //         plugins: {
    //             cellediting: {
    //                 clicksToEdit: 2,
    //                 listeners: {
    //                     validateedit: 'onPOListEdit'
    //                 }
    //             }
    //         },
    //         features: [{
    //             ftype: 'summary',
    //             dock: 'bottom'
    //         }],
    //         viewConfig: {
    //             stripeRows: false
    //         },
    //         bind: {
    //             store: '{record.sub_po_confirm}'
    //         },
    //         columns: [{
    //             xtype: 'actioncolumn',
    //             width: 28,
    //             menuDisabled: true,
    //             sortable: false,
    //             hideable: false,
    //             align: 'center',
    //             items: [
    //                 {
    //                     iconCls: 'x-fa fas fa-bars linekhIcon',
    //                     handler: 'onMenu_PO'
    //                 }
    //             ]
    //         }, 
    //         // {
    //         //     text: 'STT',
    //         //     width: 40,
    //         //     xtype: 'rownumberer',
    //         //     align: 'center'
    //         // },
    //         {
    //             text: 'PO Buyer',
    //             dataIndex: 'po_buyer',
    //             sortable: true,
    //             flex: 1,
    //             items: {
    //                 xtype: 'textfield',
    //                 fieldStyle: "",
    //                 reference: 'POFilterChil',
    //                 width: '99%',
    //                 flex: 1,
    //                 margin: 2,
    //                 enableKeyEvents: true,
    //                 listeners: {
    //                     keyup: 'onPOChilFilterKeyup',
    //                     buffer: 500
    //                 }
    //             },
    //             renderer: function (value, metaData, record, rowIdx, colIdx, store) {
    //                 metaData.tdCls = 'po_linekh';
    //                 metaData.tdAttr = 'data-qtip="' + value + '"';
    //                 return value;
    //             },
    //             editor: {
    //                 allowBlank: false,
    //                 selectOnFocus: false
    //             }
    //         },{
    //             text: 'DC#',
    //             dataIndex: 'dc',
    //             width: 45,
    //             hideable: false,
    //             renderer: function (value, metaData, record, rowIdx, colIdx, store) {
    //                 metaData.tdAttr = 'data-qtip="' + value + '"';
    //                 return value;
    //             },
    //         }, {
    //             text: 'PT đóng gói',
    //             dataIndex: 'phuongThucDongGoi',
    //             width: 60,
    //             hideable: false,
    //             renderer: function (value, metaData, record, rowIdx, colIdx, store) {
    //                 metaData.tdAttr = 'data-qtip="' + value + '"';
    //                 return value;
    //             },
    //         }, {
    //             text: 'Ship Mode',
    //             dataIndex: 'shipmodeid_link',
    //             width: 60,
    //             hideable: false,
    //             editor: {
    //                 completeOnEnter: true,
    //                 field: {
    //                     xtype: 'combo',
    //                     typeAhead: true,
    //                     triggerAction: 'all',
    //                     selectOnFocus: false,
    //                     bind: {
    //                         store: '{ShipModeStore}',
    //                         value: '{shipmodeid_link}'
    //                     },
    //                     displayField: 'name',
    //                     valueField: 'id',
    //                     queryMode: 'local'
    //                 }
    //             },
    //             renderer: 'renderShipping'
    //         },
    //         {
    //             text: 'Ngày VC',
    //             xtype: 'datecolumn',
    //             dataIndex: 'productiondate',
    //             hideable: false,
    //             // renderer: Ext.util.Format.dateRenderer('d/m/y'),
    //             renderer: function (value) {
    //                 var date = Ext.Date.parse(value, 'c');
    //                 return Ext.Date.format(date, 'd/m/y');
    //             },
    //             width: 72,
    //             editor: {
    //                 xtype: 'datefield',
    //                 fieldStyle: 'font-size:11px;',
    //                 format: 'd/m/y',
    //                 altFormats: "Y-m-d\\TH:i:s.uO",
    //             },
    //             renderer: function (value, metaData, record, rowIdx, colIdx, store) {
    //                 metaData.tdCls = 'po_linekh';
    //                 var date = Ext.Date.parse(value, 'c');
    //                 return Ext.Date.format(date, 'd/m/y');
    //             }
    //         },
    //         {
    //             text: 'Ngày GH',
    //             xtype: 'datecolumn',
    //             dataIndex: 'shipdate',
    //             hideable: false,
    //             renderer: function (value, metaData, record, rowIdx, colIdx, store) {
    //                 metaData.tdCls = 'po_linekh';
    //                 var date = Ext.Date.parse(value, 'c');
    //                 return Ext.Date.format(date, 'd/m/y');
    //             },
    //             width: 72,
    //             editor: {
    //                 xtype: 'datefield',
    //                 fieldStyle: 'font-size:11px;',
    //                 format: 'd/m/y',
    //                 altFormats: "Y-m-d\\TH:i:s.uO",
    //             },
    //         },
    //         {
    //             text: 'SL',
    //             align: 'end',
    //             hideable: false,
    //             dataIndex: 'po_quantity',
    //             width: 70,
    //             renderer: 'onRender_poquantity',
    //             editor: {
    //                 xtype: 'numberfield',
    //                 fieldStyle: 'font-size:11px;',
    //                 hideTrigger: true,
    //                 allowBlank: false,
    //                 minValue: 0,
    //                 maxValue: 1000000,
    //                 selectOnFocus: false,
    //                 decimalPrecision: 0
    //             },
    //             summaryType: 'sum', summaryRenderer: 'renderSum',
    //             align: 'end',
    //         },]
    //     }
    // }
    // ],
    dockedItems: [{
        dock: 'top',
        border: 'hbox',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 40,
        items: [{
            xtype: 'displayfield',
            fieldStyle: "font-weight: bold; font-size: 14px; color: black",
            labelWidth: 0,
            bind: {
                value: 'Danh sách PO'
            }
        },
        ]
    },
    {
        dock:'bottom',
        layout: 'hbox',
        items:[{
            xtype: 'button',
            text: 'Thoát',
            itemId: 'btnThoat',
            iconCls: 'x-fa fa-window-close',
            margin: 5
        },]
    }]
});

