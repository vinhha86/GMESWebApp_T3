Ext.define('GSmartApp.view.TimeSheetAbsence.TimeSheetAbsenceDetailController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.TimeSheetAbsenceDetailController',
    init: function () {
        var viewModel = this.getViewModel();
        var id = viewModel.get('id');
        this.loadInfo(id);

        var ListOrgStore = viewModel.getStore('ListOrgStore');
        ListOrgStore.loadOrg_ByOrgType(13);
        var TimeSheetAbsenceTypeStore = viewModel.getStore('TimeSheetAbsenceTypeStore');
        TimeSheetAbsenceTypeStore.loadStore();

        // console.log(id);

        // test
        // var me = this.getView();
        // me.down('#timefrom').setValue('16:45');
        // me.down('#timeto').setValue('6:00');
    },
    control: {
        '#btnThoat': {
            click: 'onThoat'
        },
        '#btnLuu': {
            click: 'onLuu'
        },
        '#btnConfirm': {
            click: 'onConfirm'
        },
    },
    onThoat: function () {
        this.getView().up('window').close();
    },
    onLuu: function () {
        var me = this.getView();
        var m = this;
        var viewModel = this.getViewModel();
        var TimeSheetAbsenceView = Ext.getCmp('TimeSheetAbsence');
        var TimeSheetAbsenceStore = TimeSheetAbsenceView.getViewModel().getStore('TimeSheetAbsenceStore');

        var id = viewModel.get('id');
        var personnelid_link = viewModel.get('personnelid_link');
        var personnelfullname = viewModel.get('personnelfullname');

        // var absencedate_from = viewModel.get('absencedate_from');
        // var absencedate_to = viewModel.get('absencedate_to');
        var absencedate_from = me.down('#absencedate_from').getValue();
        var absencedate_to = me.down('#absencedate_to').getValue();
        // var timefrom = viewModel.get('timefrom');
        // var timeto = viewModel.get('timeto');
        var timefrom = me.down('#timefrom').getValue();
        var timeto = me.down('#timeto').getValue();
        var absence_reason = viewModel.get('absence_reason');
        var absencetypeid_link = viewModel.get('absencetypeid_link');

        if (personnelid_link == null || personnelfullname == null || absencetypeid_link == null) {
            Ext.Msg.show({
                title: 'Th??ng b??o',
                msg: 'Ph???i ??i???n ?????y ????? th??ng tin!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: '????ng',
                }
            });
            return;
        }
        var params = new Object();
        params.id = id;
        params.personnelid_link = personnelid_link;
        params.personnelfullname = personnelfullname;
        params.absencedate_from = absencedate_from;
        params.absencedate_to = absencedate_to;
        params.timefrom = timefrom;
        params.timeto = timeto;
        params.absence_reason = absence_reason;
        params.absencetypeid_link = absencetypeid_link;

        console.log(personnelfullname);
        if (absencedate_to - absencedate_from < 0) {
            Ext.Msg.show({
                title: 'Th??ng b??o',
                msg: '?????n ng??y kh??ng ???????c nh??? h??n t??? ng??y!',
                buttons: Ext.MessageBox.YES,
                buttonText: {
                    yes: '????ng',
                }
            });
            return;
        } else {
            console.log(timeto - timefrom);

            if (timeto - timefrom <= 0) {
                Ext.Msg.show({
                    title: 'Th??ng b??o',
                    msg: 'Th???i gian kh??ng h???p l???!',
                    buttons: Ext.MessageBox.YES,
                    buttonText: {
                        yes: '????ng',
                    }
                });
                return;
            }
        }

        GSmartApp.Ajax.post('/api/v1/timesheetabsence/save', Ext.JSON.encode(params),
            function (success, response, options) {
                if (success) {
                    var response = Ext.decode(response.responseText);
                    if (response.respcode == 200) {
                        Ext.Msg.show({
                            title: 'Th??ng b??o',
                            msg: 'L??u th??nh c??ng',
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: '????ng',
                            }
                        });
                        TimeSheetAbsenceStore.load();
                        m.onThoat();
                    } else {
                        Ext.Msg.show({
                            title: 'Th??ng b??o',
                            msg: response.message,
                            buttons: Ext.MessageBox.YES,
                            buttonText: {
                                yes: '????ng',
                            }
                        });
                    }

                } else {
                    Ext.Msg.show({
                        title: 'Th??ng b??o',
                        msg: 'L??u th???t b???i',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng',
                        }
                    });
                }
            })
    },
    loadInfo: function (id) {
        var me = this;
        if (id == 0 || id == null) {
            //me.loadNew();
        } else {
            me.loadRecord(id);
        }
    },
    loadNew: function () {
        var viewModel = this.getViewModel();
        var m = this;
        m.setDefaultTime();
    },
    loadRecord: function (id) {
        console.log(id);
        var me = this.getView();
        var viewModel = this.getViewModel();
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/timesheetabsence/getOne', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    console.log(response);

                    // id: null,
                    // personnelid_link: null,
                    // absencedate_from: null,
                    // absencedate_to: null,
                    // absence_reason: null,
                    // absencetypeid_link: null,

                    // orgFactoryId: null, // hi???n th??? ????n v???
                    // orgProductionLineId: null, // hi???n th??? t???
                    viewModel.set('personnelid_link', response.personnelid_link);
                    viewModel.set('personnelfullname', response.personnelfullname);
                    // viewModel.set('absencedate_from', response.absencedate_from);
                    // viewModel.set('absencedate_to', response.absencedate_to);
                    viewModel.set('absence_reason', response.absence_reason);
                    viewModel.set('absencetypeid_link', response.absencetypeid_link);
                    viewModel.set('orgFactoryId', response.orgFactoryId);
                    viewModel.set('orgProductionLineId', response.orgProductionLineId);
                    viewModel.set('isConfirm', response.isConfirm);
                    console.log(viewModel.get('personnelfullname'));
                    var ListProductionLineStore = viewModel.getStore('ListProductionLineStore');
                    ListProductionLineStore.getbyParent(response.orgFactoryId);

                    var Personnel_Store = viewModel.getStore('Personnel_Store');
                    Personnel_Store.loadStore_byOrg(response.orgProductionLineId, 0);

                    var startDate = Ext.Date.parse(response.absencedate_from, 'c');
                    if (null == startDate) startDate = new Date(response.absencedate_from);
                    startDate = Ext.Date.format(startDate, 'd/m/Y');
                    viewModel.set('absencedate_from', startDate);

                    var endDate = Ext.Date.parse(response.absencedate_to, 'c');
                    if (null == endDate) endDate = new Date(response.absencedate_to);
                    endDate = Ext.Date.format(endDate, 'd/m/Y');
                    viewModel.set('absencedate_to', endDate);

                    me.down('#timefrom').setValue(response.timefrom);
                    me.down('#timeto').setValue(response.timeto);

                } else {
                    Ext.Msg.show({
                        title: 'Th??ng b??o',
                        msg: 'L???y th??ng tin th???t b???i',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng',
                        }
                    });
                }
            })
    },
    onFactoryListChange: function (cbbox, newValue, oldValue, eOpts) {
        // console.log(newValue);
        // load ds t???
        var viewModel = this.getViewModel();
        if (oldValue != null && newValue != oldValue) {
            viewModel.set('orgProductionLineId', null);
        }
        var ListProductionLineStore = viewModel.getStore('ListProductionLineStore');
        ListProductionLineStore.loadOrgByParent(newValue);
    },
    onProductionLineListChange: function (cbbox, newValue, oldValue, eOpts) {
        // console.log(newValue);
        //  console.log(oldValue);
        var viewModel = this.getViewModel();
        if (oldValue != null && newValue != oldValue) {
            viewModel.set('personnelid_link', null);
            viewModel.set('personnelfullname', null);
        }

        var Personnel_Store = viewModel.getStore('Personnel_Store');
        Personnel_Store.loadStore_byOrg(newValue, 0);
    },
    onPersonnelCodeListChange: function (cbbox, newValue, oldValue, eOpts) {
        var me = this.getView();
        var viewmdoel = this.getViewModel();
        viewmdoel.set('personnelfullname', newValue.data.fullname);

        // me.down('#personnelNameList').setValue(newValue);
        // me.down('#personnelCodeList').setValue(newValue);
    },
    onPersonnelNameListChange: function (cbbox, newValue, oldValue, eOpts) {
        console.log(newValue);
        var me = this.getView();
        var viewmdoel = this.getViewModel();
        viewmdoel.set('personnelid_link', newValue.data.id);
        viewmdoel.set('personnelfullname', newValue.data.fullname);
        //  me.down('#personnelCodeList').setValue(newValue);
        //me.down('#personnelNameList').setValue(newValue);
    },
    // setDefaultTime: function(){
    //     var me = this.getView();
    //     GSmartApp.Ajax.post('/api/v1/timesheetshifttype/getShift1ForAbsence', Ext.JSON.encode(),
    //         function (success, response, options) {
    //             var response = Ext.decode(response.responseText);
    //             if (success) {
    //                 // console.log(response);
    //                 me.down('#timefrom').setValue(response.timeFrom);
    //                 me.down('#timeto').setValue(response.timeTo);
    //             }
    //         })
    // },
    onConfirm: function () {
        var me = this;
        Ext.Msg.show({
            title: 'Th??ng b??o',
            msg: 'B???n c?? ch???c ch???n x??c nh???n ?',
            buttons: Ext.Msg.YESNO,
            icon: Ext.Msg.QUESTION,
            buttonText: {
                yes: 'C??',
                no: 'Kh??ng'
            },
            fn: function (btn) {
                if (btn === 'yes') {
                    me.Confirm();
                }
            }
        });
    },
    Confirm: function () {
        var m = this;
        var viewModel = this.getViewModel();
        var TimeSheetAbsenceView = Ext.getCmp('TimeSheetAbsence');
        var TimeSheetAbsenceStore = TimeSheetAbsenceView.getViewModel().getStore('TimeSheetAbsenceStore');
        var id = viewModel.get('id');
        var params = new Object();
        params.id = id;
        GSmartApp.Ajax.post('/api/v1/timesheetabsence/confirm', Ext.JSON.encode(params),
            function (success, response, options) {
                var response = Ext.decode(response.responseText);
                if (success) {
                    Ext.Msg.show({
                        title: 'Th??ng b??o',
                        msg: 'X??c nh???n th??nh c??ng',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng',
                        }
                    });
                    viewModel.set('isConfirm', true);
                    //load laij
                    TimeSheetAbsenceStore.load();
                    m.onThoat();
                } else {
                    Ext.Msg.show({
                        title: 'Th??ng b??o',
                        msg: 'X??c nh???n th???t b???i',
                        buttons: Ext.MessageBox.YES,
                        buttonText: {
                            yes: '????ng',
                        }
                    });
                }
            })
    }
})