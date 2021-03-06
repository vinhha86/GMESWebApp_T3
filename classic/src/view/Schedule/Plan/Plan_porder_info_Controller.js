Ext.define('GSmartApp.view.Schedule.Plan.Plan_porder_info_Controller', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.Plan_porder_info_Controller',
    init: function(){
      
    } ,
    control: {
        '#btnThoat' : {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        },
        '#date_start' : {
            collapse: 'onSelectStartDate',
            focus: 'onfocusdatestart'
        },
        '#date_end' : {
            collapse: 'onSelectEndDate',
            focus: 'onfocusdateend'
        },
        '#duration' : {
            specialkey: 'onSpecialkey',
            focus: 'onfocusduration'
        },
        '#productivity' : {
            specialkey: 'onSpecialkey',
            focus: 'onfocusproductivity'
        }
    },
    itemId: '',
    url: '',
    onfocusproductivity: function(){
        var me = this;
        me.itemId = '#productivity';
        me.url = 'update_productivity';
    },
    onfocusduration: function(){
        var me = this;
        me.itemId = '#duration';
        me.url = 'update_duration';
    },
    onfocusdatestart: function(){
        var me = this;
        me.itemId = '#date_start';
        me.url = 'update_date';
    },
    onfocusdateend: function(){
        var me = this;
        me.itemId = '#date_end';
        me.url = 'update_date';
    },
    onLuu: function(){
        var me = this;
        me.Calculate(me.itemId, me.url, true);
    },
    onThoat: function(){
        this.getView().up('window').close();
    },
    onSelectStartDate: function( field, value, eOpts){
        this.Calculate('#date_start', 'update_date');
    },
    onSelectEndDate: function(){
        this.Calculate('#date_end', 'update_date');
    },
    onDuration: function() {
        this.Calculate('#duration', 'update_duration');
    },
    onProductivity: function(){
        this.Calculate('#productivity', 'update_productivity');
    },
    onSpecialkey: function(field, e ){
        var me = this;
        if(e.getKey() == e.ENTER){
            if(field.itemId == "duration"){
                me.Calculate('#duration', 'update_duration');
            } 
            else if (field.itemId == "productivity"){
                me.Calculate('#productivity', 'update_productivity');
            }
        }
    },
    Calculate: function(itemId, url, isSave){
        var form = this.getView();
        form.setLoading('??ang t??nh s??? li???u!');
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = viewmodel.get('sch');

        if(params.duration != '' && params.productivity != ''){
            GSmartApp.Ajax.post('/api/v1/schedule/'+url , Ext.JSON.encode(params),
            function (success, response, options) {
                form.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        viewmodel.set('sch',response.data);
                        if(isSave){
                            me.UpdatePorder();
                        }
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Th??ng b??o',
                            msg: 'C???p nh???t th???t b???i',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: '????ng',
                            },
                            fn: function(){
                                me.down(itemId).focus(true);
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Th??ng b??o',
                        msg: 'C???p nh???t th???t b???i',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng',
                        },
                        fn: function(){
                            me.down(itemId).focus(true);
                        }
                    });
                }
            })
        }
    },
    UpdatePorder: function(){
        var me = this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        params.data = viewmodel.get('sch');

        if(params.duration != '' && params.productivity != ''){
            GSmartApp.Ajax.post('/api/v1/schedule/update_porder_productivity' , Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        me.fireEvent('UpdatePorder', response.data);
                    }
                    else {
                        Ext.Msg.show({
                            title: 'Th??ng b??o',
                            msg: 'C???p nh???t th???t b???i',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: '????ng',
                            },
                            fn: function(){
                                viewmodel.set('sch', viewmodel.get('oldValue'));
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Th??ng b??o',
                        msg: 'C???p nh???t th???t b???i',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng',
                        },
                        fn: function(){
                            viewmodel.set('sch', viewmodel.get('oldValue'));
                        }
                    });
                }
            })
        } else {
            Ext.Msg.show({
                title: 'Th??ng b??o',
                msg: 'B???n kh??ng ???????c b??? tr???ng s??? ng??y SX v?? n??ng su???t!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: '????ng',
                },
                fn: function(){
                    viewmodel.set('sch', viewmodel.get('oldValue'));
                }
            });
        }
    }
})