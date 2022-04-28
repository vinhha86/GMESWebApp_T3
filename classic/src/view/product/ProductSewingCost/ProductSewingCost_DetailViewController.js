Ext.define('GSmartApp.view.product.ProductSewingCost.ProductSewingCost_DetailViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ProductSewingCost_DetailViewController',
    init: function () {

    },
    control: {
        '#ProductSewingCost_DetailView': {
            afterrender: 'onAfterrender'
        },
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        },
        '#name': {
            keypress: 'onPressEnterSearch'
        },
        '#code': {
            keypress: 'onPressEnterSearch'
        },
        '#devicerequired': {
            keypress: 'onPressEnterSearch'
        },
        '#laborrequired': {
            keypress: 'onPressEnterSearch'
        },
        '#timespent_standard': {
            keypress: 'onPressEnterSearch'
        },
        '#cost': {
            keypress: 'onPressEnterSearch'
        },
        '#amount': {
            keypress: 'onPressEnterSearch'
        },
        '#totalcost': {
            keypress: 'onPressEnterSearch'
        },
        '#techcomment': {
            keypress: 'onPressEnterSearch'
        },
    },
    onAfterrender: function(){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        var obj = viewModel.get('obj');

        // load combo store
        var DeviceTypeStore = viewModel.getStore('DeviceTypeStore');
        DeviceTypeStore.loadStore();
        var LaborStore = viewModel.getStore('LaborStore');
        LaborStore.loadStore();

        if(obj.id != null && obj.id != 0){
            m.loadInfo(obj.id);
        }
    },
    onThoat: function () {
        this.fireEvent('Thoat');
    },
    loadInfo: function(id){
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();

        var params = new Object();
        params.id = id;

        me.setLoading(true);
        GSmartApp.Ajax.post('/api/v1/productsewingcost/findById', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        viewModel.set('obj', response.data);
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: "Lấy thông tin thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    onLuu: function () {
        var m = this;
        var me = this.getView();
        var viewModel = this.getViewModel();
        
        var action = viewModel.get('action');
        var productid_link = viewModel.get('productid_link');
        var pcontractid_link = viewModel.get('pcontractid_link');
        var obj = viewModel.get('obj');

        obj = m.checkObj(obj);
        if(obj.message != ''){
            Ext.Msg.show({
                title: 'Thông báo',
                msg: message,
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng'
                }
            });
            return;
        }

        var objList = new Array();
        objList.push(obj);

        var params = new Object();
        params.data = objList;
        params.productid_link = productid_link;
        params.pcontractid_link = pcontractid_link;

        me.setLoading(true);
        GSmartApp.Ajax.post('/api/v1/productsewingcost/create', Ext.JSON.encode(params),
            function (success, response, options) {
                me.setLoading(false);
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Thông báo',
                            msg: "Lưu thành công",
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: 'Đóng'
                            },
                            fn: function () {
                                if(action == 'create'){
                                    // clear để cho phép tạo mới luôn -> cho nhanh
                                    var newObj = new Object();
                                    newObj.id = null;
                                    newObj.pcontractid_link = pcontractid_link;
                                    newObj.productid_link = productid_link;
                                    viewModel.set('obj', newObj);
                                    me.down('#name').focus();
                                    m.fireEvent('LuuThanhCong');
                                }else if(action == 'edit'){
                                    // lấy thông tin response về -> edit
                                    viewModel.set('obj', response.data);
                                    m.fireEvent('LuuThanhCong');
                                }
                            }
                        });
                    }
                } else {
                    Ext.Msg.show({
                        title: 'Thông báo',
                        msg: "Lưu thất bại",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng'
                        }
                    });
                }
            })
    },
    checkObj: function(obj){
        obj.message = '';
        var cost = obj.cost;
        var amount = obj.amount;
        if(isNaN(cost) && cost != null){
            obj.message = 'Đơn giá phải là số'
        }else if(isNaN(amount)  && amount != null){
            obj.message = 'Số lượng phải là số'
        }
        return obj;
    },

    // enter to search
    onPressEnterSearch: function (textfield, e, eOpts) {
		var m = this;
		if (e.getKey() == e.ENTER) {
			// Ext.Msg.alert('Keys','You pressed the Enter key');
			m.onLuu();
		}
	},
})