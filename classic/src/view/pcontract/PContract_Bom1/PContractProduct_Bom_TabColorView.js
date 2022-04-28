Ext.define('GSmartApp.view.pcontract.PContractProduct_Bom_TabColorView', {
    extend: 'Ext.tab.Panel',
    xtype: 'PContractProduct_Bom_TabColorView',
    id: 'PContractProduct_Bom_TabColorView',
    itemId: 'PContractProduct_Bom_TabColorView',
    controller: 'PContractProduct_Bom_TabColorViewController',
    // tabPosition: 'right',
    dockedItems: [{
        dock: 'top',
        xtype: 'toolbar',
        border: true,
        height: 45,
        style: "background-color : white",
        items: [
            {
                xtype: 'button',
                itemId: 'btnAddMaterial_Bom',
                text: 'Thêm NPL',
                margin: 3,
                iconCls: 'x-fa fa-plus'
            },
            {
                xtype: 'combo',
                width:400,
                margin: 3,
                bind: {
                    store: '{PContractProductStore}',
                    value: '{IdProduct}',
                    readOnly: '{isReadOnlycmbSanPham}'
                },
                fieldLabel: 'Sản phẩm',
                labelWidth: 80,
                itemId: 'cmbSanPham',
                queryMode: 'local',
				anyMatch: true,
                editable: false,
                valueField: 'productid_link',
                displayField: 'productBuyerCode'
            },
            // upload download start
            {
                xtype: 'button',
                tooltip: 'Tải file mẫu (Định mức)',
                margin: 3,
                // text: 'Mẫu file PO',
                iconCls: 'x-fa fa-download',
                itemId: 'btnDownTempBom',
                bind: {
                    hidden: '{!allowUploadBom}'
                },
                menu: [
                    {
                        itemId: 'btndownloadsize',
                        text: 'Tải file mẫu theo cỡ',
                        iconCls: 'x-fa fa-download',
                        weight: 30, 
                        hidden: true
                    },
                    {
                        itemId: 'btndownloadsize_new',
                        text: 'Tải file mẫu theo cỡ',
                        iconCls: 'x-fa fa-download',
                        weight: 30
                    },
                    {
                        itemId: 'btndownloadsizeset',
                        text: 'Tải file mẫu theo dải cỡ',
                        iconCls: 'x-fa fa-download',
                        weight: 30,
                        hidden: true,
                    },
                    {
                        itemId: 'btndownloadsizeset_new',
                        text: 'Tải file mẫu theo dải cỡ',
                        iconCls: 'x-fa fa-download',
                        weight: 30
                    }
                ]
            },
            {
                xtype: 'filefield',
                buttonText: 'Tải báo giá',
                buttonOnly: true,
                hidden: true,
                itemId: 'fileUploadBom'
            },
            {
                xtype: 'filefield',
                buttonText: 'Tải báo giá New',
                buttonOnly: true,
                hidden: true,
                itemId: 'fileUploadBomNew'
            },
            {
                xtype: 'filefield',
                buttonText: 'Tải báo giá',
                buttonOnly: true,
                hidden: true,
                itemId: 'fileUploadBomSizeset'
            },
            {
                xtype: 'filefield',
                buttonText: 'Tải báo giá new',
                buttonOnly: true,
                hidden: true,
                itemId: 'fileUploadBomSizesetNew'
            },

            {
                xtype: 'button',
                tooltip: 'Upload định mức',
                // margin: 3,
                iconCls: 'x-fa fa-upload',
                itemId: 'btn_UploadBom',
                bind: {
                    hidden: '{!allowUploadBom}'
                },
                menu: [
                    {
                        itemId: 'btn_UploadBomSize',
                        text: 'Upload file theo cỡ',
                        iconCls: 'x-fa fa-upload',
                        weight: 30, 
                        hidden: true
                    },
                    {
                        itemId: 'btn_UploadBomSize_New',
                        text: 'Upload file theo cỡ',
                        iconCls: 'x-fa fa-upload',
                        weight: 30
                    },
                    {
                        itemId: 'btn_UploadBomSizeSet',
                        text: 'Upload file theo dải cỡ',
                        iconCls: 'x-fa fa-upload',
                        weight: 30,
                        hidden: true
                    },
                    {
                        itemId: 'btn_UploadBomSizeSet_New',
                        text: 'Upload file theo dải cỡ',
                        iconCls: 'x-fa fa-upload',
                        weight: 30,
                    },
                ]
            },
            // upload download end
            {
                xtype:'button',
                text: 'Chốt định mức',
                itemId:'btnConfirmBOM1',
                // ui: 'header',
                tooltip: 'Chốt định mức hải quan',
                iconCls: 'x-fa fa-check greenIcon',
                // handler: 'onFactoriesTap',
            }            
        ]
    }]
})