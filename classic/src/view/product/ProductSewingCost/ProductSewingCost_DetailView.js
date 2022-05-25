Ext.define('GSmartApp.view.product.ProductSewingCost.ProductSewingCost_DetailView', {
    extend: 'Ext.form.Panel',
    xtype: 'ProductSewingCost_DetailView',
    itemId:'ProductSewingCost_DetailView',
    controller: 'ProductSewingCost_DetailViewController',
    viewModel: {
        type: 'ProductSewingCost_DetailViewModel'
    },
    layout: 'vbox',
    items: [{
        xtype: 'textfield',
        itemId: 'name',
        width: 400,
        labelWidth: 120,
        margin: 3,
        fieldLabel: 'Tên công đoạn (' + '<span style="color:red">*</span>' + ')',
        allowBlank: false,
        // blankText: 'Tên công đoạn',
        maxLength: 100,
        maxLengthText: 'Tối đa 100 ký tự',
        enableKeyEvents : true,
        bind: {
            value: '{obj.name}'
        },
    },
    {
        xtype: 'textfield',
        itemId: 'code',
        width: 400,
        labelWidth: 120,
        margin: 3,
        fieldLabel: 'Mã công đoạn (' + '<span style="color:red">*</span>' + ')',
        // allowBlank: false,
        // blankText: 'Tên công đoạn',
        maxLength: 50,
        maxLengthText: 'Tối đa 50 ký tự',
        enableKeyEvents : true,
        bind: {
            value: '{obj.code}'
        },
        hidden: true,
    },
    {
        xtype: 'combobox',
        itemId: 'devicerequired',
        width: 400,
        labelWidth: 120,
        margin: 3,
        fieldLabel: 'Thiết bị',
        bind: {
            store: '{DeviceTypeStore}',
            value: '{obj.devicerequiredid_link}'
        },
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        anyMatch: true,
        enableKeyEvents : true,
        // editable: false,
    },
    {
        xtype: 'combobox',
        itemId: 'laborrequired',
        width: 400,
        labelWidth: 120,
        margin: 3,
        fieldLabel: 'Bậc thợ',
        bind: {
            store: '{LaborStore}',
            value: '{obj.laborrequiredid_link}'
        },
        displayField: 'name',
        valueField: 'id',
        queryMode: 'local',
        anyMatch: true,
        enableKeyEvents : true,
        // editable: false,
    },
    {
        xtype: 'numberfield',
        itemId: 'timespent_standard',
        hideTrigger:true,
        width: 400,
        labelWidth: 120,
        margin: 3,
        fieldLabel: 'Thời gian (s)',
        maskRe: /[0-9.]/,
        minValue: 0,
        fieldStyle:{
            'text-align':'right',
            // 'color': 'blue'
        },
        // allowBlank: false,
        // blankText: 'Tên công đoạn',
        // maxLength: 50,
        // maxLengthText: 'Tối đa 50 ký tự',
        enableKeyEvents : true,
        bind: {
            value: '{obj.timespent_standard}'
        },
    },
    {
        xtype: 'numberfield',
        itemId: 'cost',
        hideTrigger:true,
        width: 400,
        labelWidth: 120,
        margin: 3,
        fieldLabel: 'Đơn giá',
        maskRe: /[0-9.]/,
        minValue: 0,
        fieldStyle:{
            'text-align':'right',
            // 'color': 'blue'
        },
        // edittable: false,
        // readOnly: true,
        // allowBlank: false,
        // blankText: 'Tên công đoạn',
        // maxLength: 50,
        // maxLengthText: 'Tối đa 50 ký tự',
        enableKeyEvents : true,
        bind: {
            value: '{obj.cost}'
        },
    },
    {
        xtype: 'numberfield',
        itemId: 'amount',
        hideTrigger:true,
        width: 400,
        labelWidth: 120,
        margin: 3,
        fieldLabel: 'Số lượng',
        maskRe: /[0-9.]/,
        minValue: 0,
        fieldStyle:{
            'text-align':'right',
            // 'color': 'blue'
        },
        // edittable: false,
        // readOnly: true,
        // allowBlank: false,
        // blankText: 'Tên công đoạn',
        // maxLength: 50,
        // maxLengthText: 'Tối đa 50 ký tự',
        enableKeyEvents : true,
        bind: {
            value: '{obj.amount}'
        },
    },
    {
        xtype: 'numberfield',
        itemId: 'totalcost',
        hideTrigger:true,
        width: 400,
        labelWidth: 120,
        margin: 3,
        fieldLabel: 'Tổng giá',
        maskRe: /[0-9.]/,
        minValue: 0,
        fieldStyle:{
            'text-align':'right',
            // 'color': 'blue'
        },
        edittable: false,
        readOnly: true,
        // allowBlank: false,
        // blankText: 'Tên công đoạn',
        // maxLength: 50,
        // maxLengthText: 'Tối đa 50 ký tự',
        enableKeyEvents : true,
        bind: {
            value: '{obj.totalcost}'
        },
        hidden: true,
    },
    {
        xtype:'textarea',
        itemId: 'techcomment',
        labelWidth: 120,
        width: 400,
        flex: 1,
        margin: 3,
        fieldLabel: 'Chú thích',
        reference: 'techcomment',
        // edittable: false,
        // readOnly: true,
        // allowBlank: false,
        // blankText : 'Không được để trống',
        maxLength: 500,
        maxLengthText: 'Tối đa 500 ký tự',
        enableKeyEvents : true,
        bind: {
            value: '{obj.techcomment}'
        },
    }],
    dockedItems:[{
        layout:'hbox',
        border: false,
        dock:'bottom',
        items:[{
            xtype:'button',
            text: 'Thoát',
            margin: 3,
            itemId:'btnThoat',
            iconCls: 'x-fa fa-window-close',
            formBind: false
        },{
            xtype:'button',
            text: 'Lưu',
            margin: 3,
            itemId:'btnLuu',
            iconCls: 'x-fa fa-save',
            formBind: true
        },{
            flex:1,
            border: false
        },]
    }]
})