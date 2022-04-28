Ext.define('GSmartApp.view.pcontract.PContractInsertAttributeView', {
    extend: 'Ext.grid.Panel',
    xtype: 'PContractInsertAttributeView',
    id: 'PContractInsertAttributeView',
    controller: 'PContractInsertAttributeViewCotroller',
    IdProduct : 0,
    IdPContract: 0,
    viewModel: {
        type : 'ProductDetailViewModel'
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'MULTI'
    },
    viewConfig: {
        stripeRows: true,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true
    },
    bind: {
        store: '{AttributeStore}'
    },
    columns: [{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    }, {
        text: 'Thuộc tính',
        dataIndex: 'name',
        flex: 1
    }],
    dockedItems:[{
        dock:'bottom',
        layout:'hbox',
        border: false,
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close'
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save'
        },{
            border: false,
            flex : 1
        },]
    }]
});

