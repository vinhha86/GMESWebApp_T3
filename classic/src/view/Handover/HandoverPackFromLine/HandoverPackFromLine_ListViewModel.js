Ext.define('GSmartApp.view.handover.HandoverPackFromLine_ListViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.HandoverPackFromLine_ListViewModel',
    requires: [
        'GSmartApp.store.handover.HandoverStore',
        'GSmartApp.store.org.ListOrgStore',
        'GSmartApp.store.handover.HandOverStatusStore'
    ],
    stores: {
        HandoverStore: {
            type: 'HandoverStore'
        },
        ListOrgStoreFrom: {
            type: 'ListOrgStore'
        },
        ListOrgStoreTo: {
            type: 'ListOrgStore'
        },
        HandOverStatusStore: {
            type: 'HandOverStatusStore'
        },
    },
    data: {
        viewId: ''
    },
    formulas: {
        isBtnThemMoiHidden : function (get) {
            var viewId = get('viewId');
            if (
                viewId == 'handover_line_fromcut' ||
                viewId == 'handover_pack_fromline'
            ) {
                return true;
            }
            return false;
        }
    }
})