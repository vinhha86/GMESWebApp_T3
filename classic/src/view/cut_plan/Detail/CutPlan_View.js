Ext.define('GSmartApp.view.cut_plan.Detail.CutPlan_View', {
    extend: 'Ext.grid.Panel',
    xtype: 'CutPlan_View',
    itemId: 'CutPlan_View',
    controller: 'CutPlan_ViewController',
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
        getRowClass: function (record, index) {
            if (record.data.type == 2) {
                return "po_accept";
            }
            else if (record.data.type == 1) {
                return "po_wrongamount"
            }
        }
    },
    plugins: {
        cellediting: {
            clicksToEdit: 1,
            listeners: {
                edit: 'onEdit'
            }
        }
    },
    bind: {
        store: '{CutPlanRowStore}',
        selection: '{cutplan_selection}'
    },
    columns: [{
        xtype: 'actioncolumn',
        width: 28,
        sortable: false,
        menuDisabled: true,
        align: 'center',
        items: [
            {
                handler: 'onXoa',
                getClass: function (v, meta, rec) {
                    if (rec.get('type') == 0) {
                        return 'x-fa fas fa-trash';
                    }
                },
                getTip: function (value, metadata, record, row, col, store) {
                    if (record.get('type') == 0) {
                        return 'Xóa';
                    }
                }
            }
        ]
    }, {
        text: 'Sơ đồ cắt',
        dataIndex: 'name',
        width: 120,
        sortable: false,
        menuDisabled: true,
        getEditor: function (record) {
            if (record.get('type') == 0) {
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                        xtype: 'textfield',
                        selectOnFocus: true
                    }
                })
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    }, {
        text: 'Lá vải',
        dataIndex: 'la_vai',
        width: 50,
        sortable: false,
        menuDisabled: true,
        getEditor: function (record) {
            if (record.get('type') == 0) {
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                        xtype: 'textfield',
                        selectOnFocus: true,
                        maskRe: /[0-9]/
                    }
                })
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return parseInt(value) == 0 ? '' : Ext.util.Format.number(value, '0,000');;
        }
    }, 
    {
        text: 'Dài sơ đồ (mét)',
        dataIndex: 'dai_so_do',
        width: 70,
        sortable: false,
        menuDisabled: true,
        getEditor: function (record) {
            if (record.get('type') == 0) {
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                        xtype: 'textfield',
                        selectOnFocus: true,
                        maskRe: /[0-9.]/
                    }
                })
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return parseFloat(value) == 0 ? '' : Ext.util.Format.number(value, '0,000.00');;
        }
    }, 
    {
        text: 'SL vải cần',
        dataIndex: 'sl_vai',
        width: 80,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return parseFloat(value) == 0 ? '' : Ext.util.Format.number(value, '0,000.00');
        }
    }, 
    {
        text: 'Khổ (mét)',
        dataIndex: 'kho',
        width: 60,
        sortable: false,
        menuDisabled: true,
        getEditor: function (record) {
            if (record.get('type') == 0) {
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                        xtype: 'textfield',
                        selectOnFocus: true,
                        maskRe: /[0-9.,a-z']/
                    }
                })
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return value == 'null' ? '' : value;
        }
    },
    {
        text: 'Số thân',
        dataIndex: 'so_than',
        width: 60,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return parseFloat(value) == 0 ? '' : Ext.util.Format.number(value, '0,000');
        }
    }, 
    {
        text: 'Hao hụt',
        dataIndex: 'hao_hut',
        width: 50,
        sortable: false,
        menuDisabled: true,
        getEditor: function (record) {
            if (record.get('type') == 0) {
                return Ext.create('Ext.grid.CellEditor', {
                    field: {
                        xtype: 'textfield',
                        selectOnFocus: true,
                        maskRe: /[0-9.]/
                    }
                })
            }
        },
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return parseFloat(value) == 0 ? '' : Ext.util.Format.number(value, '0,000.00');
        }
    }, 
    {
        text: 'Định mức cắt (mét)',
        dataIndex: 'dinh_muc_cat',
        width: 80,
        sortable: false,
        menuDisabled: true,
        renderer: function (value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdAttr = 'data-qtip="' + value + '"';
            return parseFloat(value) == 0 ? '' : Ext.util.Format.number(value, '0,000.0000');
        }
    },  
    // {
    //     text: 'SL Cây',
    //     dataIndex: 'so_cay',
    //     width: 60,
    //     sortable: false,
    //     menuDisabled: true,
    //     getEditor: function (record) {
    //         if (record.get('type') == 0) {
    //             return Ext.create('Ext.grid.CellEditor', {
    //                 field: {
    //                     xtype: 'textfield',
    //                     selectOnFocus: true,
    //                     maskRe: /[0-9]/
    //                 }
    //             })
    //         }
    //     },
    //     renderer: function (value, metaData, record, rowIdx, colIdx, store) {
    //         metaData.tdAttr = 'data-qtip="' + value + '"';
    //         return parseInt(value) == 0 ? '' : Ext.util.Format.number(value, '0,000');
    //     }
    // }
    ],
    dockedItems: [{
        dock: 'top',
        layout: 'hbox',
        xtype: 'toolbar',
        padding: '0 0 10 5',
        height: 38,
        items: [
            {
                xtype: 'combo',
                bind: {
                    store: '{LoaiPhoiStore}',
                    value: '{typephoimau}'
                },
                valueField: 'typephoimau',
                displayField: 'name',
                margin: 2,
                editable: false,
                itemId: 'cmbLoaiPhoi',
                fieldLabel: 'Kế hoạch cắt'
            },     
            {
                xtype: 'button',
                itemId: 'btnAdd_CutPlan',
                // ui: 'header',
                margin: 2,
                text: 'Tạo kế hoạch cắt mới',
                iconCls: 'x-fa fa-folder-open-o'
            }, 
            {
                xtype: 'button',
                itemId: 'btnDel_CutPlan',
                // ui: 'header',
                margin: 2,
                text: 'Xoá kế hoạch cắt',
                iconCls: 'x-fa fa-trash-o'
            }, 
            '->',
            {
                xtype: 'button',
                margin: 2,
                // ui: 'header',
                text: 'Thêm sơ đồ cắt mới',
                itemId: 'btnThemSoDo',
                iconCls: 'x-fa fa-scissors'
            }, 
            {
                xtype: 'button',
                margin: 2,
                ui: 'header',
                hidden: true,
                text: 'Thêm loại phối',
                itemId: 'btnThemLoaiPhoi',
                iconCls: 'x-fa fa-plus'
            }
    ]
    }]
});

