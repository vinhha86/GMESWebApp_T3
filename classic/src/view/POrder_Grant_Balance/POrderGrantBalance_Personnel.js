Ext.define('GSmartApp.view.POrder_Grant_Balance.POrderGrantBalance_Personnel', {
    extend: 'Ext.grid.Panel',
    xtype: 'POrderGrantBalance_Personnel',
    id: 'POrderGrantBalance_Personnel',
    reference: 'POrderGrantBalance_Personnel',
    viewConfig: {
        stripeRows: true,
        columnLines: true,
        rowLines: true,
        plugins: {
            ptype: 'gridviewdragdrop',
            enableDrag: true,
            //dragText: '{0} Mã sản xuất được tính lương',
            dragGroup: 'PersonnelGroup',
            dropGroup: 'WorkingProcessGroup'
        },
        listeners: {
            // drop: 'onDropOrg',
            beforedrop: 'onBeforeWorkingProcessGroupDrop'
        }
    },
    bind: {
        store: '{Personnel_Store}'
    },
    columns: [
        {
            text: 'STT',
            width: 50,
            xtype: 'rownumberer',
            align: 'center',
            menuDisabled: true,
            sortable: false,
        }, 
        {
            text: 'Họ và tên',
            dataIndex: 'fullname',
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
                reference: 'fullnameFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                bind: {
                    value: '{fullnameFilterValue}'
                },
                listeners: {
                    keyup: 'onFullnameFilterKeyup',
                    buffer: 500
                }
            },
        }, 
        {
            text: 'Mã NV',
            dataIndex: 'code',
            menuDisabled: true,
            sortable: false,
            width: 80,
            renderer: function(value, metaData, record, rowIdx, colIdx, store) {
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            items: {
                xtype: 'textfield',
                fieldStyle: "",
                reference: 'codeFilter',
                width: '98%',
                flex: 1,
                margin: 2,
                enableKeyEvents: true,
                bind: {
                    value: '{codeFilterValue}'
                },
                listeners: {
                    keyup: 'onCodeFilterKeyup',
                    buffer: 500
                }
            },
        }, 
        {
            text: 'Bậc thợ',
            dataIndex: 'laborlevel_name',
            menuDisabled: true,
            sortable: false,
            renderer: function(value, metaData, record, rowIdx, colIdx, store){
                metaData.tdAttr = 'data-qtip="' + value + '"';
                return value;
            },
            flex: 1,
            align: 'end'
        }
    ],
});

