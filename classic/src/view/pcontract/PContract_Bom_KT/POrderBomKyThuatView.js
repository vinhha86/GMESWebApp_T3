Ext.define('GSmartApp.view.pcontract.PContract_Bom_KT.POrderBomKyThuatView', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderBomKyThuatView',
    id: 'POrderBomKyThuatView',
    controller: 'POrderBomKyThuatViewController',
    bind: {
        store: '{POrderBom2Store}'
    },
    features: [{
        ftype: 'grouping',
        groupHeaderTpl: '{name}'
    }],
    viewConfig: {
        stripeRows: false,
        columnLines: true,
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
    columns: [
        {
            xtype: 'actioncolumn',
            width: 30,
            menuDisabled: true,
            sortable: false,
            align: 'center',
            items: [{
                itemId: 'btnDeleteMaterial_BomKyThuat',
                // isActionDisabled: 'checkActionColumnPermission',
                iconCls: 'x-fa fas fa-trash',
                tooltip: 'Xóa',
                handler: 'onXoa'
            }]
        }, 
        {
            text: 'Mã NPL',
            dataIndex: 'materialCode',
            width: 80,
            sortable: false,
            menuDisabled: true,
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
        }, 
        {
            text: 'Nguyên phụ liệu',
            dataIndex: 'materialName',
            width: 120,
            sortable: false,
            menuDisabled: true,
            renderer: function (value, metaData, record, rowIdx, colIdx, store) {
                var val = value == 'null' ? "" : value;
                metaData.tdAttr = 'data-qtip="' + val + '"';
                return val;
            }
        }, 
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
        // {
        //     text: 'Thành phần vải',
        //     dataIndex: 'thanhPhanVai',
        //     width: 150,
        //     sortable: false,
        //     menuDisabled: true,
        //     renderer: function (value, metaData, record, rowIdx, colIdx, store) {
        //         var val = value == 'null' ? "" : value;
        //         metaData.tdAttr = 'data-qtip="' + val + '"';
        //         return val;
        //     }
        // }, 
        {
            text: 'Màu SP',
            dataIndex: 'color_name',
            width: 110,
            sortable: false,
            menuDisabled: true,
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
        {
            text: 'ĐVT',
            dataIndex: 'unitName',
            width: 70,
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
        border: true,
        height: 45,
        style: "background-color : white",
        items: [
            {
                xtype: 'button',
                text: 'Đồng bộ định mức cân đối',
                margin: 3,
                itemId: 'btnDongBo',
                iconCls: 'x-fa fa-refresh',
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
                fieldLabel: 'Sản phẩm',
                labelWidth: 80,
                itemId: 'cmbSanPham',
                queryMode: 'local',
                anyMatch: true,
                valueField: 'productid_link',
                displayField: 'productBuyerCode'
            },
            {
                xtype: 'button',
                text: 'Kế hoạch cắt',
                margin: 1,
                itemId: 'btnCutPlan',
                iconCls: 'x-fa fa-cut'
            }
        ]
    }]
})