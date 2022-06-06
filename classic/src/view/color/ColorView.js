Ext.define('GSmartApp.view.color.ColorView', {
    extend: 'Ext.grid.Panel',
    xtype: 'ColorView',
    id: 'lscolor',
    cls: 'ColorView',

    controller: 'ColorViewController',
    viewModel: {
        type: 'ColorViewModel'
    },
    bind: {
        store: '{color_store}'
    },


    // plugins: {
    //     cellediting: {
    //         clicksToEdit: 2,
    //         listeners: {
    //             edit: 'onEdit'
    //         }
    //     }
    // },
    columns: [{
        xtype: 'actioncolumn',
        width: 30,
        menuDisabled: true,
        sortable: false,
        align: 'center',
        items: [{
            iconCls: 'x-fa fas fa-trash',
            tooltip: 'Xóa',
            handler: 'onXoa'
        }]
    }, {
        text: 'STT',
        width: 50,
        xtype: 'rownumberer',
        align: 'center'
    },
    {
        text: 'Tên viết tắt',
        width: 100,
        dataIndex: 'code',
        align: 'center'
    },
    {
        text: 'Tên màu',
        dataIndex: 'name',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'ColorNameFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onColorNameFilter',
                buffer: 500
            }
        },
        editor: {
            xtype: 'textfield',
            selectOnFocus: true,

        },
    }, {
        text: 'Tên màu (Tiếng Anh)',
        dataIndex: 'name_en',
        flex: 1,
        items: {
            xtype: 'textfield',
            fieldStyle: "",
            reference: 'ColorName_enFilter',
            width: '99%',
            flex: 1,
            margin: 2,
            enableKeyEvents: true,
            listeners: {
                keyup: 'onColorName_enFilter',
                buffer: 500
            }
        },
        editor: {

            xtype: 'textfield',
            selectOnFocus: true
        },
    }, {
        text: 'Màu đại diện',
        dataIndex: 'rgbvalue',
        width: 150,
        flex: 1,
        // renderer: function(value, metaData, record, rowIdx, colIdx, store) {
        //     metaData.tdAttr = 'data-qtip="' + value + '"';
        //     return value;
        // },
        renderer: 'renderColor',
    }
    ],
    dockedItems: [{
        dock: 'bottom',
        layout: 'hbox',
        align: 'center',
        items: [{
            xtype: 'button',
            margin: 5,
            text: 'Thêm mới',
            width: 120,
            iconCls: 'x-fa fa-plus',
            itemId: 'btnThemMoi'
        }, {
            xtype: 'textfield',
            itemId: 'txtCode',
            margin: 5,
            width: 150,
            emptyText: 'Tên màu viết tắt',
            bind: {
                value: '{color.code}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'txtName',
            margin: 5,
            width: 150,
            emptyText: 'Tên màu',
            allowBlank: false,
			blankText: 'Không được để trống',
            bind: {
                value: '{color.name}'
            }
        }, {
            xtype: 'textfield',
            itemId: 'txtName_en',
            margin: 5,
            width: 150,
            emptyText: 'Tên màu (Tiếng anh)',
            bind: {
                value: '{color.name_en}'
            }
        }, {
            xtype: 'colorbutton',
            margin: '10 1 10 1',
            itemId: 'colorButton',
        }, {
            xtype: 'textfield',
            itemId: 'txtRGB',
            margin: 5,
            width: 100,
            emptyText: 'Rgb',
            readOnly: true,
            edittable: false,
            bind: {
                value: '{color.rgbvalue}'
            },
            cls: 'notEditable',
        },
        ]
    }],
})