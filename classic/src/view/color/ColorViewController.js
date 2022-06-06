Ext.define('GSmartApp.view.color.ColorViewController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.ColorViewController',

    init: function (view) {
        var viewmodel = view.getViewModel();
        var color_Store = viewmodel.getStore('color_store');
        color_Store.loadStore();
    },
    control: {
        '#btnThemMoi': {
            click: 'ThemMoi',
        },
        '#colorButton': {
            change: 'changeColor',
        }
    },
    changeColor: function ( thiss, color, previousColor, eOpts )  {
        // console.log(this);
        var viewmodel = this.getViewModel();
        viewmodel.set('color.rgbvalue', color);
    },

    ThemMoi:function(){
        var me =this;
        var viewmodel = this.getViewModel();
        var params = new Object();
        var Color = new Object();
        Color.code = viewmodel.get('color.code');
        Color.name = viewmodel.get('color.name');
        Color.name_en = viewmodel.get('color.name_en');
        Color.rgbvalue = viewmodel.get('color.rgbvalue');
        Color.id=null;
        params.data = Color;
        var color_name = viewmodel.get('color.name');
        
        if(!color_name || !color_name.trim() ){
            Ext.MessageBox.show({
                title: "Thông báo",
                msg: "Tên màu không được để trống !",
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: 'Đóng',
                },

            });
           
        }else{
            me.Them_DB(params);
        }
    },
    Them_DB:function(params){
        var viewmodel = this.getViewModel();
        GSmartApp.Ajax.post('/api/v1/color/create', Ext.JSON.encode(params),
        function (success, response, options) {
            if (success) {
                var response = Ext.decode(response.responseText);
                if (response.respcode == 200) {
                    Ext.MessageBox.show({
                        title: "Thông báo",
                        msg: "Thêm thành công",
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: 'Đóng',
                        },
                    })
                    viewmodel.set('color.code', null);
                    viewmodel.set('color.name', null);
                    viewmodel.set('color.name_en', null);
                    viewmodel.set('color.rgbvalue', null);
                    //load
                    var color_Store = viewmodel.getStore('color_store');
                    color_Store.loadStore();
                }
            } else {
                Ext.MessageBox.show({
                    title: "Thông báo",
                    msg: "Thêm thất bại",
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: 'Đóng',
                    }
                });
            }

        })
    },
    /**
     * 
     *Sua
     */
    onEdit: function (editor, context, e) {
        var me = this;
        var params = new Object();
        params.data = context.record.data;

        //kiểm tra nếu dữ liệu khác lúc ban đầu thì thêm
        if (context.value != context.originalValue) {
            me.Them_DB(params);
        }
    },
    /**
     * xoa
     */
    onXoa: function (grid, rowIndex) {
        var viewmodel = this.getViewModel();
        var rec = grid.getStore().getAt(rowIndex);
        var params = new Object();
        params.data = rec.data;
        console.log(params.data);

        Ext.Msg.show({
            title: 'Thông báo',
            msg: 'Bạn có chắc chắn xóa tên màu này  "' + rec.data.name + '" ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'Có',
                no: 'Không'
            },
            //chọn button có
            fn: function (btn) {
                if (btn === 'yes') {

                    GSmartApp.Ajax.post('/api/v1/color/delete', Ext.JSON.encode(params),
                        function (success, response, options) {
                            if (success) {
                                Ext.MessageBox.show({
                                    title: "Thông báo",
                                    msg: "Xóa thành công",
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });

                                //load lại trang
                                var color_Store = viewmodel.getStore('color_store');
                                color_Store.loadStore();
                            } else {
                                Ext.Msg.show({
                                    title: 'Thông báo',
                                    msg: 'Xóa thất bại',
                                    buttons: Ext.MessageBox.YES,
                                    buttonText: {
                                        yes: 'Đóng',
                                    }
                                });
                            }
                        })

                }
            }
        })
    },
    /**
     * filter
     */
     onColorNameFilter: function(){
        var filterField=this.lookupReference('ColorNameFilter');
        filters=this.getView().store.getFilters();

        if(filterField.value){
            this.nameFilter=filters.add({
                id:'nameFilter',
                property:'name', // dataIndex
                value:filterField.value,
                anyMatch:true,
                caseSensitive:false
            });
        }else if(this.nameFilter){
            filters.remove(this.nameFilter);
            this.nameFilter = null;
        }
    },
    onColorName_enFilter: function(){
        var filterField=this.lookupReference('ColorName_enFilter');
        filters=this.getView().store.getFilters();

        if(filterField.value){
            this.name_enFilter=filters.add({
                id:'name_enFilter',
                property:'name_en',  // dataIndex
                value:filterField.value,
                anyMatch:true,
                caseSensitive:false
            });
        }else if(this.name_enFilter){
            filters.remove(this.name_enFilter);
            this.name_enFilter = null;
        }
    },
    renderColor: function(value, metaData, record, rowIdx, colIdx, store) {
            metaData.tdStyle = 'background-color: ' + value + ';';
        return value;
    }
})