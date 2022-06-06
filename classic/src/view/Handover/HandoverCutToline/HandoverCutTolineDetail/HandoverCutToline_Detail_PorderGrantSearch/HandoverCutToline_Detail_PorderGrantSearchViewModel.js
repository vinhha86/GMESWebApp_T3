Ext.define('GSmartApp.view.handover.HandoverCutToline_Detail_PorderGrantSearchViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverCutToline_Detail_PorderGrantSearchViewModel',
    
    requires: [
        'GSmartApp.store.POrder_Grant',
    ],
    stores: {
        POrder_Grant: {
            type: 'POrder_Grant'
        },
    },
    data: {
        viewId: '', // id HandoverDetail view
        currentRec: {
           
        
        },
    }
})