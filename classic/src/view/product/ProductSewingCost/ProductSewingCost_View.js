Ext.define('GSmartApp.view.product.ProductSewingCost.ProductSewingCost_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'ProductSewingCost_View',
    itemId: 'ProductSewingCost_View',
    requires: [
        'Ext.grid.Panel'
    ],
    border: true,
    controller: 'ProductSewingCost_ViewController',
    // viewModel: {
    //     type: 'ProductSewingCost_ViewModel'
    // },
    bind: {
        store: '{ProductSewingCostStore}'
    },
    // selModel: 'rowmodel',
    // selModel: {
    //     selType: 'checkboxmodel',
    //     checkOnly: true
    // },
    features: [
        {
            id: 'group',
            ftype: 'groupingsummary',
            // groupHeaderTpl: '<b>Cụm công đoạn: {name}</b>',
            groupHeaderTpl: [
                '<div><b>{name:this.formatName}</b></div>',
                {
                    formatName: function(name) {
                        if(name != null && name != ''){
                            return 'Cụm công đoạn: ' + Ext.String.trim(name);
                        }
                        return '&nbsp';
                    }
                }
            ],
            hideGroupedHeader: false,
            enableGroupingMenu: false,
        },
        {
            ftype: 'summary',
            dock: 'bottom'
        },
    ],
    viewConfig: {
        enableTextSelection: true,
        stripeRows: false,
        rowLines: true,
        columnLines: true
    },
    // plugins: {
    //     cellediting: {
    //         clicksToEdit: 1,
    //         listeners: {
    //             edit: 'onEdit'
    //         } 
    //     }
    // },
    
    columns: [
        {
            xtype: 'actioncolumn',
            width: 45,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [
                {
                    iconCls: 'x-fa fas fa-edit',
                    tooltip: 'Sửa',
                    handler: 'onEditRow'
                },
                {
                    iconCls: 'x-fa fas fa-trash',
                    tooltip: 'Xóa',
                    handler: 'onXoa'
                }
            ]
        },
        {
            text: 'STT',
            width: 50,
            xtype: 'rownumberer',
            align: 'center'
        },
        {
            header: 'Tên công đoạn',
            dataIndex: 'name',
            menuDisabled: true,
            sortable: false,
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'nameFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onNameFilterKeyup',
                    buffer: 500
                },
                bind: {
                    value: '{nameFilterValue}'
                }
            },
        },
        {
            header: 'Mã công đoạn',
            dataIndex: 'code',
            menuDisabled: true,
            sortable: false,
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'codeFilter',
                width: '99%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onCodeFilterKeyup',
                    buffer: 500
                },
                bind: {
                    value: '{codeFilterValue}'
                }
            },
        },
        {
            header: 'Thiết bị',
            dataIndex: 'device_name',
            menuDisabled: true,
            sortable: false,
            width: 120,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            header: 'Bậc thợ',
            dataIndex: 'laborlevel_name',
            menuDisabled: true,
            sortable: false,
            width: 135,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            header: 'T/gian',
            dataIndex: 'timespent_standard',
            menuDisabled: true,
            sortable: false,
            width: 70,
            renderer: function(value){
                return value == null ? "" : (value + " (s)");
            }
        },
        {
            header: 'Chú thích',
            dataIndex: 'techcomment',
            menuDisabled: true,
            sortable: false,
            flex: 1,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
        },
        {
            header: 'Đơn giá',
            dataIndex: 'cost',
            menuDisabled: true,
            sortable: false,
            align: 'right',
            width: 100,
            renderer: 'rendernumber',
            editor:{
                xtype:'textfield',
                maskRe: /[0-9.]/,
                selectOnFocus: true,
                cancelOnEsc: false,
                completeOnEnter: false
            }
        },
        {
            header: 'SL',
            dataIndex: 'amount',
            menuDisabled: true,
            sortable: false,
            align: 'right',
            width: 60,
            renderer: 'rendernumberint',
            editor:{
                xtype:'textfield',
                maskRe: /[0-9]/,
                selectOnFocus: true,
                cancelOnEsc: false,
                completeOnEnter: false
            }
        },
        {
            header: 'Tổng giá',
            dataIndex: 'totalcost',
            menuDisabled: true,
            sortable: false,
            width: 100,
            align: 'right',
            summaryType: 'sum', 
            summaryRenderer: 'renderSum',
            renderer: 'rendernumber'
        },
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            // {
            //     tooltip: 'Thêm công đoạn',
            //     iconCls: 'x-fa fa-plus',
            //     itemId:'btnThemCongDoan',
            //     weight: 30,
            // },
            {
                tooltip: 'Thêm công đoạn',
                iconCls: 'x-fa fa-plus',
                itemId:'btnDetailNew',
                weight: 30,
            },
            // {
            //     xtype:'button',
            //     text: 'Chốt quy trình công nghệ',
            //     itemId:'btnConfirmSewingCost',
            //     // ui: 'header',
            //     tooltip: 'Chốt quy trình công nghệ',
            //     iconCls: 'x-fa fa-check greenIcon',
            //     // handler: 'onFactoriesTap',
            // },
            {
                xtype:'button',
                text: 'Cụm công đoạn',
                itemId:'btnProductBalance',
                // ui: 'header',
                tooltip: 'Cụm công đoạn',
                // iconCls: 'x-fa fa-check greenIcon',
            },
            {
                xtype: 'combo',
                width:400,
                // margin: 3,
                bind: {
                    store: '{PContractProductStore}',
                    value: '{IdProduct}',
                    // readOnly: '{isReadOnlycmbSanPham}'
                },
                fieldLabel: 'Sản phẩm',
                labelWidth: 80,
                itemId: 'cmbSanPham',
                queryMode: 'local',
				anyMatch: true,
                editable: false,
                valueField: 'productid_link',
                displayField: 'productBuyerCode'
            },
            // {
            //     xtype: 'button',
            //     tooltip: 'Tải file mẫu (quy trình công nghệ tiêu chuẩn)',
            //     itemId: 'btnDownloadTmpFileStandard',
            //     // margin: 3,
            //     // text: 'Mẫu file quy trình công nghệ',
            //     iconCls: 'x-fa fa-download',
            // },
            // {
            //     xtype: 'button',
            //     tooltip: 'Tải file mẫu (quy trình công nghệ)',
            //     itemId: 'btnDownloadTmpFile',
            //     // margin: 3,
            //     // text: 'Mẫu file quy trình công nghệ',
            //     iconCls: 'x-fa fa-download',
            // },
            // {
            //     xtype: 'button',
            //     tooltip: 'Upload file (quy trình công nghệ)',
            //     itemId: 'btnUploadTmpFile',
            //     // margin: 3,
            //     // text: 'Mẫu file quy trình công nghệ',
            //     iconCls: 'x-fa fa-upload',
            // },
            // {
            //     xtype: 'filefield',
            //     buttonOnly: true,
            //     hidden: true,
            //     itemId: 'fileUpload',
            // },
            '->',
            // {
            //     xtype: 'button',
            //     tooltip: 'Xoá',
            //     itemId: 'btnDeleteProductSewingCost',
            //     // margin: 3,
            //     // text: 'Mẫu file quy trình công nghệ',
            //     iconCls: 'x-fa fa-trash',
            // }
        ]
    }]
});
