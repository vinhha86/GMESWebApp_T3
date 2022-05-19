Ext.define('GSmartApp.view.handover.HandoverCutToline_Detail_PorderGrantSearch', {
    extend: 'Ext.grid.Panel',
    xtype: 'HandoverCutToline_Detail_PorderGrantSearch',
    itemId: 'HandoverCutToline_Detail_PorderGrantSearch',
    reference: 'HandoverCutToline_Detail_PorderGrantSearch',
    controller: 'HandoverCutToline_Detail_PorderGrantSearchController',
    // viewModel:{
    //     // type:'HandoverCutToline_Detail_PorderSearchViewModel'
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
        store:'{POrder_Grant}'
    },
    columns:[{
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },  
        {header: 'Ngày Bắt đầu', dataIndex: 'start_date_plan',renderer: Ext.util.Format.dateRenderer('d/m/y')},
        {header: 'Ngày Kết thúc', dataIndex: 'finish_date_plan',renderer: Ext.util.Format.dateRenderer('d/m/y')},
        // { header: 'Mã lệnh', dataIndex: 'ordercode', flex: 2},
        { header: 'Số Lượng', dataIndex: 'grantamount', flex: 1},
    ],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[
            {flex: 1},
            {
                xtype:'button',
                text: 'Thoát',
                margin: 3,
                itemId:'btnQuayLai',
                iconCls: 'x-fa fa-window-close'
            },{
                xtype:'button',
                text: 'Chọn',
                margin: 3,
                itemId:'btnLuu',
                iconCls: 'x-fa fa-save',
                formBind: true
            }
        ]
    }]
});

