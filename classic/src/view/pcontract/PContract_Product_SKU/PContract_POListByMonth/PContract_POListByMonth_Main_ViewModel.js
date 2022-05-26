Ext.define('GSmartApp.view.handover.PContract_POListByMonth_Main_ViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.PContract_POListByMonth_Main_ViewModel',
    requires: [
        // 'GSmartApp.store.porder.POrder_ListStore',
        'GSmartApp.store.pcontract.PContractPOLine_Confirm_List',
        'GSmartApp.store.pcontract.PContractProductStore',
        'GSmartApp.store.pcontract.PContractSKUStore',
        
    ],
    stores: {
        PContractPOLine_Confirm_List: {
            type: 'PContractPOLine_Confirm_List'
        },
        PContractProduct_PO_Store: {
            type: 'PContractProductStore'
        },
        PContractSKUStore: {
            type: 'PContractSKUStore'
        },
    },
    data: {

    }
})