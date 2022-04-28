Ext.define('GSmartApp.view.POrder_Grant_Balance.POrderGrantBalanceViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.POrderGrantBalanceViewModel',
    requires: [
        'GSmartApp.store.personnel.Personnel_Store',
        'GSmartApp.store.porder.POrderBalanceStore'
    ],
    stores: {
        Personnel_Store: {
            type: 'Personnel_Store'
        },
        // POrderBalanceStore: {
        //     type: 'POrderBalanceStore'
        // },
        ProductBalanceStore: {
            type: 'ProductBalanceStore'
        },
    },
    data: {
        eventRecord: null,
        porderid_link: null,
        porder_grantid_link: null,

        // filter porder grant balance
        workingprocess_nameFilterValue: null,
        // filter personnel
        fullnameFilterValue: null,
        codeFilterValue: null,
    }
})