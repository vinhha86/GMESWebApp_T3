Ext.define('GSmartApp.view.pcontract.PContract_Product_SKU.PContract_POListByMonth.PContract_POListByMonth_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'PContract_POListByMonth_Main',
    itemId: 'PContract_POListByMonth_Main',
    // id: 'PContract_POListByMonthMain',
    IdProduct: 0,
    pcontractid_link: 0,
    // controller: 'PContractSKUMainViewController',
    // layout: 'border',



    viewModel: {
        type: 'PContract_POListByMonth_Main_ViewModel'
    },
    layout: 'border',
    // bind:{
    //     title: '{title}'
    // },
    items: [{
        region: 'center',
        xtype: 'PContractSKUView_custom',
        border: true,
        margin: 1
    }, {
        region: 'west',
        width: '55%',
        xtype: 'PContract_POList_custom'
    }]
})