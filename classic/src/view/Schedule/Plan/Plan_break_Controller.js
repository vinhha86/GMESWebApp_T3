Ext.define('GSmartApp.view.Schedule.Plan.Plan_break_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Plan_break_Controller',
    init: function () {
        var view = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrder_ListGrantSKUStore');
        // store.getSorters().removeAll();
        // store.getSorters().add({
        //     property: 'pcontractPo_Shipdate',
        //     direction: 'ASC'
        // }, {
        //     direction: 'ASC',
        //     property: 'mauSanPham'
        // }, {
        //     direction: 'ASC',
        //     property: 'sort_size'
        // });
        store.setGroupField('poBuyerShipdate');
        var pordergrantid_link = viewmodel.get('plan.pordergrant_id_link');
        store.loadStore_NotAsync(pordergrantid_link);
        store.load({
            scope: this,
            callback: function (records, operation, success) {
                if (records.length == 0) {
                    viewmodel.set('ishidden', false);
                    view.down('#sum_amount_break').focus();
                }
            }
        })
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onBreak'
        },
        '#btnTach': {
            click: 'onTach'
        },

    },
    onThoat: function () {
        var viewmodel = this.getViewModel();
        viewmodel.set('sum_amount_break',0);
        this.getView().up('window').close();
    },
    renderSum: function (value, summaryData, dataIndex) {
        if (null == value) value = 0;
        return '<div style="font-weight: bold; color:darkred;">' + Ext.util.Format.number(value, '0,000') + '</div>';
    },
    onEdit: function (editor, context, e) {
        var viewmodel = this.getViewModel();
       if(typeof context !== "undefined"){ 
        console.log(context);
        var rec = context.record;
        if (context.value > rec.get('grantamount')) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Số lượng tách không được lớn hơn số lượng đang hiện có!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                },
                fn: function () {
                    // rec.set('amount_break', context.originalValue == null ? 0 : context.originalValue);
                    var store = viewmodel.getStore('POrder_ListGrantSKUStore');
                    store.rejectChanges();
                }
            });
        }
    }
        this.onCaculateSum();
    },
    onBreak: function () {
        var me = this;
        var grid = this.getView();
        var viewmodel = this.getViewModel();
        var params = viewmodel.get('plan');
        var store = viewmodel.getStore('POrder_ListGrantSKUStore');
        var me = this.getView();

        var list_sku = [];
        var sum = 0;
        store.each(function (record) {
            var data = new Object();
            data = record.data;
            // console.log(data);
            data.amount_break = data.amount_break == null ? 0 : data.amount_break;
            if (data.amount_break > 0)
                list_sku.push(data);
            var amount = parseInt(record.data.amount_break == null ? "0" : "0" + record.data.amount_break);
            sum += amount;
        });

        if (!viewmodel.get('ishidden') && sum == 0) {
            sum = viewmodel.get('amount') == "" ? 0 : parseInt(viewmodel.get('amount').toString().replace(/,/gi, ''));
        }

        if (sum == 0) {
            Ext.Msg.show({
                title: 'Thông báo',
                msg: 'Số lượng tách không được bằng 0',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
        }
        else {
            params.data = list_sku;
            params.quantity = sum;

            grid.setLoading('Đang xử lý dữ liệu');
            GSmartApp.Ajax.post('/api/v1/schedule/break_porder', Ext.JSON.encode(params),
                function (success, response, options) {
                    grid.setLoading(false);
                    if (success) {
                        var response = Ext.decode(response.responseText);
                        if (response.respcode == 200) {
                            me.fireEvent('BreakPorder', response);
                        }
                        else {
                            Ext.Msg.show({
                                title: 'Thông báo',
                                msg: 'Cập nhật thất bại',
                                buttons: Ext.MessageBox.YES,
                                buttonText: {
                                    yes: 'Đóng',
                                }
                            });
                        }
                    } else {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: 'Cập nhật thất bại',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng',
                            }
                        });
                    }
                })
        }

    },
    onCaculateSum: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrder_ListGrantSKUStore');
        var POrder_ListGrantSKUsData = store.getData().items;
        var sum_amount_break = 0;
        for (var i = 0; i <POrder_ListGrantSKUsData.length; i++) {
            sum_amount_break += POrder_ListGrantSKUsData[i].data.amount_break;
        }
        viewmodel.set('sum_amount_break', sum_amount_break);
    },



    onTach: function(){
        var me = this.getView();
        var viewmodel = this.getViewModel();
        var store = viewmodel.getStore('POrder_ListGrantSKUStore');
        var selection= me.getSelectionModel().getSelection();
        var sum_amount_break = 0;

        var POrder_ListGrantSKUsData = store.getData().items;
        for (var i = 0; i <POrder_ListGrantSKUsData.length; i++) {
            var id = POrder_ListGrantSKUsData[i].data.id;
            for(var j=0;j<selection.length;j++){
                var grantamountSelection= selection[j].data.grantamount;
                var idSelection= selection[j].data.id;
                
                if(id == idSelection ){
                    // console.log("11");
                    // console.log(selection[j].data.amount_break);
                    if(selection[j].data.amount_break == 0){
                    POrder_ListGrantSKUsData[i].data.amount_break = grantamountSelection;
                    store.setData(POrder_ListGrantSKUsData);
                    }
                };
            }   
            sum_amount_break +=  POrder_ListGrantSKUsData[i].data.amount_break;   
            viewmodel.set('sum_amount_break', sum_amount_break);
            
        }
        this.onEdit();
        
    }
})