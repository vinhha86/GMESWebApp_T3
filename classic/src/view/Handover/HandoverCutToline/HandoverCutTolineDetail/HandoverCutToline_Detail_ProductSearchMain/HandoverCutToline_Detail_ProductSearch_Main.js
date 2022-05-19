Ext.define('GSmartApp.view.handover.HandoverCutToline_Detail_ProductSearchMain', {
    extend: 'Ext.form.Panel',
    xtype: 'HandoverCutToline_Detail_ProductSearch_Main',
    itemId: 'HandoverCutToline_Detail_ProductSearch_Main',
    viewModel: {
        type: 'HandoverCutToline_Detail_ProductSearchViewModel'
    },
    layout: 'border',
    // bind:{
    //     title: '{title}'
    // },
    items: [{
        region: 'west',
        width: '30%',
        // title: 'Danh sách sản phẩm',
        xtype: 'HandoverCutToline_Detail_ProductSearch',
        border: true,
        margin: 1
    }, {
        region: 'center',
        // width: '50%',
        // title: 'Danh sách sản phẩm',
        xtype: 'HandoverCutToline_Detail_PorderGrantSearch',
        border: true,
        margin: 1
    },],
    // dockedItems: [{
    //     layout: 'hbox',
    //     border: false,
    //     dock: 'bottom',
    //     items: [{
    //         xtype: 'button',
    //         text: 'Quay lại',
    //         margin: 3,
    //         itemId: 'btnQuayLai',
    //         iconCls: 'x-fa fa-backward'
    //     }, {
    //         xtype: 'button',
    //         text: 'Lưu',
    //         margin: 3,
    //         itemId: 'btnLuu',
    //         iconCls: 'x-fa fa-save',
    //         formBind: true
    //     }, {
    //         xtype: 'button',
    //         text: 'Lưu và tạo mới',
    //         margin: 3,
    //         itemId: 'btnLuuVaTaoMoi',
    //         iconCls: 'x-fa fa-save',
    //         formBind: true
    //     }, {
    //         flex: 1,
    //         border: false
    //     }]
    // }]
})