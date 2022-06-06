Ext.define('GSmartApp.view.color.ColorViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.ColorViewModel',
    requires: ['GSmartApp.store.ColorStore'],

    stores: {
        color_store: {
            type: 'ColorStore'
        }
    },
    data: {
        color: {
            code: null,
            name: null,
            name_en: null,
            rgbvalue: null,
        },
        value: null,
    }
})