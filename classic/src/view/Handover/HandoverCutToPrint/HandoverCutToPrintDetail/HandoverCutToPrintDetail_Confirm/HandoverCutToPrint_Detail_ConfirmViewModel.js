Ext.define('GSmartApp.view.handover.HandoverCutToPrint_Detail_ConfirmViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverCutToPrint_Detail_ConfirmViewModel',
    requires: [
    ],
    stores: {
    },
    data: {
        username: '',
        password: '',
        handoverid_link: null,
        viewId: '',
        currentStatus: null
    }
})