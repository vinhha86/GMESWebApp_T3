Ext.define('GSmartApp.view.salary.Salary_Sum_Main', {
    extend: 'Ext.form.Panel',
    xtype: 'Salary_Sum_Main',
    id:'Salary_Sum_Main',
    viewModel:{
        type:'Salary_Sum_Model'
    },
    layout: 'border',
    items: [{
        region: 'west',
        width: 250,
        title: 'Danh sách đơn vị',
        xtype: 'Salary_Sum_ListOrg',
        border: true,
        margin: 1
    
    }, {
        region: 'center',
        xtype: 'Salary_Sum_D',
        border: true,
        margin: 1
    }]
})