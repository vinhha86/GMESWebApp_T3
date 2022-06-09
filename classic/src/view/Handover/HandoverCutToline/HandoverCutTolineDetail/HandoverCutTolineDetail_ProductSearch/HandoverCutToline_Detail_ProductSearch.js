Ext.define('GSmartApp.view.handover.HandoverCutToline_Detail_ProductSearch', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverCutToline_Detail_ProductSearch',
    itemId: 'HandoverCutToline_Detail_ProductSearch',
    reference: 'HandoverCutToline_Detail_ProductSearch',
    controller: 'HandoverCutToline_Detail_ProductSearchController',
    // viewModel:{
    //     type:'HandoverCutToline_Detail_ProductSearchViewModel'
    // },
    viewConfig: {
        stripeRows: false,
        enableTextSelection: true,
        columnLines: true,
        rowLines: true,
    },
    selModel: {
        selType: 'checkboxmodel',
        mode: 'SINGLE'
    },
    bind:{
        // store:'{POrder_ListStore}'
        store:'{ProductStore}'
    },
    columns:[{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center',
    }, 
    //  { header: 'ID', dataIndex: 'id', flex: 1},
        { header: 'Mã SP', dataIndex: 'buyercode', flex: 1},
    ],
    // dockedItems:[{
    //     layout:'hbox',
    //     border: false,
    //     dock:'bottom',
    //     items:[{
    //         xtype:'button',
    //         text: 'Thoát',
    //         margin: 3,
    //         itemId:'btnQuayLai',
    //         iconCls: 'x-fa fa-window-close'
    //     },{
    //         xtype:'button',
    //         text: 'Chọn',
    //         margin: 3,
    //         itemId:'btnLuu',
    //         iconCls: 'x-fa fa-save',
    //         formBind: true
    //     },{
    //         flex:1,
    //         border: false
    //     },]
    // }]
});

