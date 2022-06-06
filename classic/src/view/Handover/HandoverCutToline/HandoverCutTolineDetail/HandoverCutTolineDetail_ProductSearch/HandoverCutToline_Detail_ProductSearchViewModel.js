Ext.define('GSmartApp.view.handover.HandoverCutToline_Detail_ProductSearchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverCutToline_Detail_ProductSearchViewModel',
    requires: [
        // 'GSmartApp.store.porder.POrder_ListStore',
        'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.handover.HandoverProductStore',
        'GSmartApp.store.handover.HandoverSkuStore',
        'GSmartApp.store.POrder_Grant',
        'GSmartApp.store.product.ProductStore'
    ],
    stores: {
        POrder_Grant: {
            type: 'POrder_Grant'
        },
        ListOrgStore_From: {
            type: 'ListOrgStore'
        },
        // ListOrgStore_To: {
        //     type: 'ListOrgStore'
        // },
        HandoverProductStore:{
            type: 'HandoverProductStore'
        },
        HandoverSkuStore: {
            type: 'HandoverSkuStore'
        },
        ProductStore: {
            type: 'ProductStore' 
        }
    },
    data: {
        viewId: '' ,// id HandoverDetail view
        currentRec: {
            buyercode: null,
            dateSX: null,
            porderid_link: null,
        
        },

    }
})