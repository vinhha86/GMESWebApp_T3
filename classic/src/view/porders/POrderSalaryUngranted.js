Ext.define('GSmartApp.view.porders.POrderSalaryUngranted', {
    extend: 'Ext.grid.Panel',
    xtype: 'pordersalaryungranted',
    reference: 'pordersalaryungranted',
    requires: [
        'GSmartApp.store.POrderSetSalaryMonth',
        'Ext.Number',
        'Ext.Date'
    ],
    controller: 'pordersalaryungranted',
    title: 'Lệnh chưa tính lương',    
    store: {
        type: 'pordersalaryungranted'
    },
    columnLines: true,
    //multiSelect: true,
    selModel: 'rowmodel',
    features: [{
        id: 'group',
        ftype: 'groupingsummary',
        groupHeaderTpl: '<b>Tổ sản xuất: {name}</b>',
        hideGroupedHeader: false,
        enableGroupingMenu: false
    },{
        ftype: 'summary',
        dock: 'bottom'
    }], 
    viewConfig: {
        //enableTextSelection: true,
        stripeRows: false,
        plugins: {
            ptype: 'gridviewdragdrop',
            dragText: '{0} Mã sản xuất tính lương',
            dragGroup: 'secondGridDDGroup',
            dropGroup: 'firstGridDDGroup'
        },
        listeners: {
            //drop: 'onDrop',
            //beforedrop: 'onBeforeDrop'
        }        
     },
    columns: [
        { header: 'Mã SX', locked: false, dataIndex: 'ordercode', width: 70,
            editor: {xtype: 'textfield', readOnly: true},
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'porderFilterField_Salary',
                width: 65,
                margin: 2,
                enableKeyEvents: true,
                listeners: {
                    keyup: 'onPOrderFilterKeyup',
                    buffer: 500
                }
            },
            renderer: function (value, metaData, record, rowIndex) {
                var c = record.get('status');
                if (c == 0) {
                    metaData.tdCls = 'process-free';
                } else if (c == 1) {
                    metaData.tdCls =  'process-granted';
                } else if (c == 2) {
                    metaData.tdCls =  'process-ready';
                } else if (c == 3) {
                    metaData.tdCls =  'process-subprocess';
                } else if (c == 4) {
                    metaData.tdCls =  'process-running';
                } else if (c == 5) {
                    metaData.tdCls =  'process-done';
                } else if (c == 6) {
                    metaData.tdCls =  'process-finish';
                }                                
                //metaData.tdCls = record.get('change') > 0 ? 'color-other' : 'color-gio';
                // if (null != record.get('productiondate')){
                //     metaData.tdAttr = 'data-qtip="' + Ext.util.Format.date(record.get('productiondate'),'d/m/Y') + '"';
                // }
                return value;
            },
            summaryType: 'count', summaryRenderer: 'renderSum'                   
        },
        { header: 'Lịch lên hàng', headerWrap: true, dataIndex: 'golivedesc', width: 90},
        { header: 'Mùa', headerWrap: true, dataIndex: 'season', width: 80},
        { header: 'Cắt TT', dataIndex: 'amountcutsum', width: 70},
        { header: 'Vào chuyền', dataIndex: 'amountinputsum', flex: 1},
    ],
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        items: [
            {
                xtype: 'combobox',
                width: '40%',
                editable: false,
                //margin: '0 5 0 5',
                // fieldLabel: 'Giao SX',
                // labelWidth: 50,
                store: {
                    type: 'porderdatesearch'
                },
                displayField: 'name',
                valueField: 'id',
                reference:'cboOrderDate'
            },            
            {
                xtype: 'combobox',
                width: '40%',
                editable: false,
                //margin: '0 5 0 5',
                // fieldLabel: 'Tổ SX',
                // labelWidth: 40,
                store: {
                    type: 'orgtosx'
                },
                displayField: 'name',
                valueField: 'id',
                reference:'cboOrg_Salary',
                listeners: {
                    select: 'onOrgItemSelected'
                }                
            },
            {
                tooltip: 'Tìm kiếm lệnh',
                iconCls: 'x-fa fa-search',
                weight: 30,
                handler: 'onSearchTap'
            }
    ]
    }]
});
