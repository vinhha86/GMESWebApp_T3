Ext.define('GSmartApp.view.personel.Personnel_info', {
    extend: 'Ext.form.Panel',
    xtype: 'Personnel_info',
    id: 'Personnel_info',
    controller: 'Personnel_info_ViewController',
    layout: 'hbox',
    items: [
        {
            layout: 'vbox',
            flex: 1,
            maxWidth: 1100,
            items: [
                {
                    // row 1
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'code',
                            labelWidth: 78,
                            fieldLabel: 'Mã NV (' + '<span style="color:red">*</span>' + ') ',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.code}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            fieldLabel: 'Nơi cấp :',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.place_idnumber}'
                            }
                        },
                        {
                            xtype: 'combo',
                            itemId: 'cmbChucVu',
                            queryMode: 'local',
                            anyMatch: true,
                            labelWidth: 78,
                            fieldLabel: 'Chức vụ',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            displayField: 'name',
                            valueField: 'id',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.positionid_link}',
                                store: '{Personnel_Position_Store}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày kí HĐTV:',
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex: 1,
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{personnel.date_probation_contract}'
                            }
                        },
                    ]
                },
                {
                    // row 2
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            fieldLabel: 'Họ và tên (' + '<span style="color:red">*</span>' + ')',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.fullname}'
                            }
                        },
                        {
                            xtype: 'combo',
                            itemId: 'cmbQuocTich',
                            queryMode: 'local',
                            anyMatch: true,
                            labelWidth: 78,
                            fieldLabel: 'Quốc tịch',
                            hidden: true,
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            displayField: 'name',
                            valueField: 'id',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{person.countryid_link}',
                                store: '{OrgCountryStore}'
                            }
                        },
                        {
                            xtype: 'combo',
                            itemId: 'cmbThanhPho',
                            queryMode: 'local',
                            anyMatch: true,
                            labelWidth: 78,
                            fieldLabel: 'Tỉnh, TP (' + '<span style="color:red">*</span>' + ')',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            displayField: 'name',
                            valueField: 'id',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.provinceid_link}',
                                store: '{OrgProvinceStore}'
                            }
                        },
                        {
                            xtype: 'combo',
                            labelWidth: 78,
                            queryMode: 'local',
                            anyMatch: true,
                            fieldLabel: 'Cấp bậc ',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            displayField: 'name',
                            valueField: 'id',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.levelid_link}',
                                store: '{LaborStore}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày kí HĐ TH:',
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex: 1,
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{personnel.date_limit_contract}'
                            }
                        },
                    ]
                },
                {
                    // row 3
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            itemId: 'NgaySinh',
                            fieldLabel: 'Ngày sinh:',
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex: 1,
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{personnel.birthdate}'
                            }
                        },
                        {
                            xtype: 'combo',
                            itemId: 'cmbQuanHuyen',
                            labelWidth: 78,
                            fieldLabel: 'Huyện (' + '<span style="color:red">*</span>' + ')',
                            queryMode: 'local',
                            anyMatch: true,
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            displayField: 'name',
                            valueField: 'id',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.districtid_link}',
                                store: '{OrgDistrictStore}'
                            }
                        },
                        {
                            xtype: 'combo',
                            labelWidth: 78,
                            queryMode: 'local',
                            anyMatch: true,
                            fieldLabel: 'Bậc lương ',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            displayField: 'name',
                            valueField: 'id',
                            flex: 1,
                            margin: 1,
                            // bind: {
                            //     value: '{personnel.orgid_link}',
                            //     store: '{OrgStore}'
                            // }
                        }, 
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'NK HĐ KTH:',
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex: 1,
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{personnel.date_unlimit_contract}'
                            }
                        },
                    ]
                },
                {
                    // row 4
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'combo',
                            labelWidth: 78,
                            fieldLabel: 'Giới tính (' + '<span style="color:red">*</span>' + ')',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            displayField: 'name',
                            valueField: 'id',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.gender}',
                                store: '{GenderStore}'
                            }
                        },
                        {
                            xtype: 'combo',
                            labelWidth: 78,
                            fieldLabel: 'Xã (' + '<span style="color:red">*</span>' + ')',
                            queryMode: 'local',
                            anyMatch: true,
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            displayField: 'name',
                            valueField: 'id',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.communeid_link}',
                                store: '{OrgCommuneStore}'
                            }
                        },
                        {
                            xtype: 'combo',
                            labelWidth: 78,
                            fieldLabel: 'Loại NV (' + '<span style="color:red">*</span>' + ')',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            displayField: 'name',
                            valueField: 'id',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.personnel_typeid_link}',
                                store: '{PersonnelTypeStore}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            itemId: 'TGCongTac',
                            fieldLabel: 'Thời gian CT',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            readOnly: true,
                            margin: 1,
                            bind: {
                                value: '{personnel.time_work}'
                            }
                        },
                    ]
                },
                {
                    // row 5
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            fieldLabel: 'Điện thoại',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            maskRe: /[0-9]/,
                            bind: {
                                value: '{personnel.tel}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            fieldLabel: 'Thôn (' + '<span style="color:red">*</span>' + ')',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.village}'
                            }
                        },
                        {
                            xtype: 'combo',
                            itemId: 'TrangThai',
                            labelWidth: 78,
                            fieldLabel: 'Trạng thái (' + '<span style="color:red">*</span>' + ')',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            displayField: 'name',
                            valueField: 'id',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.status}',
                                store: '{PersonnelStatus_Store}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            fieldLabel: 'Số sổ BH',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.insurance_number}'
                            }
                        },
                    ]
                },
                {
                    // row 6
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'numberfield',
                            labelWidth: 78,
                            fieldLabel: 'Tuổi:',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            readOnly: true,
                            bind: {
                                value: '{personnel.age}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            fieldLabel: 'Loại sức khỏe',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.healthinfo}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'NgayVaoCty',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày vào CT:',
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex: 1,
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{personnel.date_startworking}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            fieldLabel: 'Số sổ HK:',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.household_number}'
                            }
                        },
                    ]
                },
                {
                    // row 7
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            fieldLabel: 'Số CMT (' + '<span style="color:red">*</span>' + ')',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.idnumber}'
                            }
                        },
                        {
                            xtype: 'combo',
                            itemId: 'cmbDonViQuanLy',
                            queryMode: 'local',
                            anyMatch: true,
                            labelWidth: 78,
                            fieldLabel: 'ĐV Quản lý (' + '<span style="color:red">*</span>' + ')',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            displayField: 'name',
                            valueField: 'id',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.orgmanagerid_link}',
                                store: '{OrgManagerStore}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            itemId: 'NgayNghiViec',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày nghỉ việc:',
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex: 1,
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            maxValue: new Date(),
                            bind: {
                                value: '{personnel.date_endworking}'
                            },
                        },
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Cấp hộ khẩu:',
                            itemId: 'TGCapHoKhau' ,
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex: 1,
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{personnel.date_household_grant}'
                            }
                        },
                    ]
                },
                {
                    // row 8
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày cấp CMT:',
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex: 1,
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{personnel.dateof_idnumber}'
                            }
                        },
                        {
                            xtype: 'combo',
                            labelWidth: 78,
                            queryMode: 'local',
                            anyMatch: true,
                            fieldLabel: 'Phòng ban/tổ ',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            displayField: 'name',
                            valueField: 'id',
                            // readOnly: true,
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.orgid_link}',
                                store: '{OrgStore}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            fieldLabel: 'Lý do nghỉ:',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.reason}'
                            }
                        },
                        {
                            xtype: 'datefield',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            fieldLabel: 'Ngày đóng BH:',
                            labelAlign: 'left',
                            labelWidth: 78,
                            flex: 1,
                            margin: 1,
                            format: 'd/m/Y',
                            altFormats: "Y-m-d\\TH:i:s.uO",
                            bind: {
                                value: '{personnel.date_insurance}'
                            }
                        },
                    ]
                },
                {
                    // row 9
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            fieldLabel: 'Địa chỉ:',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            bind: {
                                value: '{personnel.address}'
                            },
                            flex: 2,
                            margin: 1,
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            fieldLabel: 'Nhãn xe',
                            itemId: 'bikeBrand',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            ///
                            bind: {
                                value: '{personnel.bike_brand}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            fieldLabel: 'Biển số xe',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.bike_number}',
                                editable: '{personnel.is_motobike}'
                            }
                        },
                    ]
                },
                {
                    // row 10
                    layout: 'hbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            fieldLabel: 'Số tài khoản:',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            maskRe: /[0-9]/,
                            bind: {
                                value: '{personnel.account_number}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            fieldLabel: 'Ngân hàng',
                            itemId: 'bankName',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            ///
                            bind: {
                                value: '{personnel.bankname}'
                            }
                        },
                        {
                            xtype: 'textfield',
                            labelWidth: 78,
                            fieldLabel: 'Màu xe',
                            itemId: 'bikeColor',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            flex: 1,
                            margin: 1,
                            ///
                            bind: {
                                value: '{personnel.bike_color}'
                            }
                        },
                        {
                            xtype: 'combo',
                            itemId: 'bikeType',
                            labelWidth: 78,
                            fieldLabel: 'Loại xe',
                            labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                            fieldStyle: 'font-size:11px;',
                            displayField: 'name',
                            valueField: 'id',
                            flex: 1,
                            margin: 1,
                            bind: {
                                value: '{personnel.biketype}',
                                store: '{PersonnelBikeTypeStore}'
                            }
                        },
                        // {
                        //     xtype: 'checkbox',
                        //     labelWidth: 78,
                        //     fieldLabel: 'Xe đạp',
                        //     labelStyle: "font-size:11px;padding: 5px 0px 0px 2px;",
                        //     fieldStyle: 'font-size:11px;',
                        //     flex: 1,
                        //     margin: 1,
                        //     inputValue: true,
                        //     itemId: 'checkmoto',
                        //     bind: {
                        //         value: '{personnel.isbike}'
                        //     }
                        // }
                    ]
                },
            ]
        },
        {
            layout: 'vbox',
            items: [{
                xtype: 'image',
                itemId: 'img',
                width: 130,
                height: 130,
                margin: 1,
                bind: {
                    src: 'data:image/gif;base64,' + '{personnel.image}'
                },
                listeners: {
                    afterrender: function (img, a, obj) {
                        img.getEl().dom.style.border = '1px solid black';
                    }
                }
            }, {
                xtype: 'filefield',
                buttonText: '+',
                buttonOnly: true,
                itemId: 'btnFile',
                tooltip: 'Upload File',
                accept: 'image/*',
                hidden: true
            }, {
                xtype: 'button',
                itemId: 'btnUploadImage',
                ui: 'header',
                margin: '10 5 0 0',
                text: 'Tải ảnh',
                iconCls: 'x-fa fa-upload'
            }]
        },
    ]
})
