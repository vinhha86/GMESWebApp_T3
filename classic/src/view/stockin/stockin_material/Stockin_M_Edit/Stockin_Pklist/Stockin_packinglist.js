Ext.define('GSmartApp.view.stockin.stockin_material.stockin_m_edit.stockin_pklist.Stockin_packinglist', {
    extend: 'Ext.panel.Panel',
    xtype: 'Stockin_packinglist',
    id: 'Stockin_packinglist',
    controller: 'Stockin_packinglist_Controller',
    // viewModel: 'Invoice_packinglist_ViewModel',
    viewModel: {
        type: 'Stockin_packinglist_ViewModel'
    },
	layout: {
        type: 'vbox',
        pack: 'start',
        align: 'stretch'
    },
    items: [
        {
            margin: 1,
            flex: 1,
            layout: 'border',
            items: [
                {
                    region: 'west',
                    xtype: 'Stockin_packinglist_lotnumber',
                    width: '20%',
                    margin: 1
                },
                {
                    region: 'center',
                    xtype: 'Stockin_packinglist_detail',
                    margin: 1
                }
            ]
        }, 
    ],
    dockedItems: [
        {
            dock: 'bottom',
            layout: 'hbox',
            border: false,
            items: [
                {
                    margin: 3,
                    xtype:'button',
                    text:  'Thoát',
                    iconCls: 'x-fa fa-window-close',
                    itemId: 'btnThoat'
                },
                {
                    margin: 3,
                    xtype: 'button',
                    tooltip: 'Tải file mẫu danh sách packinglist',
                    itemId: 'btnDownloadTmpFile',
                    iconCls: 'x-fa fa-download',
                    bind: {
                        hidden: '{isUploadBtnHidden}'
                    }
                },
                // {
                //     margin: 3,
                //     xtype: 'button',
                //     tooltip: 'Upload file danh sách packinglist',
                //     itemId: 'btnUploadTmpFile',
                //     iconCls: 'x-fa fa-upload',
                //     bind: {
                //         hidden: '{isUploadBtnHidden}'
                //     }
                // },
                {
                    xtype: 'button',
                    margin: 3,
                    tooltip: 'Upload file danh sách packinglist',
                    iconCls: 'x-fa fa-upload',
                    menu: [
                        {
                            itemId: 'btnUploadTmpFileKiem', // id:1
                            iconCls: 'x-fa fa-upload',
                            text: 'Upload packinglist (kiểm)',
                        },
                        {
                            itemId: 'btnUploadTmpFile', // id:11
                            iconCls: 'x-fa fa-upload',
                            text: 'Upload packinglist (không kiểm)',
                        },
                    ],
                    bind: {
                        hidden: '{isUploadBtnHidden}'
                    }
                },
                {
                    xtype: 'filefield',
                    buttonOnly: true,
                    hidden: true,
                    itemId: 'fileUpload',
                },
            ]
        }
    ],
});
