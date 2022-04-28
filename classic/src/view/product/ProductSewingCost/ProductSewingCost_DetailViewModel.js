Ext.define('GSmartApp.view.product.ProductSewingCost.ProductSewingCost_DetailViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ProductSewingCost_DetailViewModel',
    requires: [
        'GSmartApp.store.product.ProductSewingCostStore',
    ],
    stores: {
        ProductSewingCostStore: {
            type: 'ProductSewingCostStore'
        },
        DeviceTypeStore: {
            type: 'devices_type_store'
        },
        LaborStore: {
            type: 'LaborStore'
        }
    },
    data: {
        action: null, // create || edit
        pcontract: null,
        pcontractid_link: null,
        productid_link: null,
        obj: {
            id: null,
            productid_link: null,
            pcontractid_link: null,
            name: null,
            code: null,
            devicerequiredid_link: null,
            laborrequiredid_link: null,
            timespent_standard: null,
            cost: null,
            amount: null,
            totalcost: null,
            techcomment: null,
        }
    },
    formulas: {
        // ishidden_addproduct: function (get) {
        //     if (get('productid_link_filter') > 0 || get('isWindow')) return true;
        //     return false;
        // },
    }
})