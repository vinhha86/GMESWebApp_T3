Ext.define("GSmartApp.view.workforceproductivity.Productivity", {
  extend: "Ext.Container",
  xtype: "Productivity",

  controller: "ProductivityController",
  viewModel: {
    type: "ProductivityViewModel",
  },

  cls: "Productivity",

  items: [
    {
      border: "true",
      layout: "vbox",
      items: [
        {
          xtype: "textfield",
          readOnly: true,

          label: "Mã nhân viên:",

          value: 123,
        },
        {
          xtype: "textfield",
          readOnly: true,

          label: "Tổ sản xuất:",
          value: 123,
        },
        {
          xtype: "textfield",
          readOnly: true,

          label: "Mã hàng:",
          value: 123,
        },
        {
          xtype: "textfield",
          readOnly: true,

          label: "Công đoạn:",
          value: 123,
        },
        {
          xtype: "textfield",
          readOnly: true,

          label: "Số lượng lũy kế:",
          value: 123,
        },
        {
          xtype: "textfield",
          readOnly: true,

          label: "Kế hoạch ngày:",
          value: 123,
        },
        {
          xtype: "textfield",
          readOnly: true,

          label: "Thực hiện ngày:",
          value: 123,
        },
        {
          xtype: "textfield",
          readOnly: true,

          label: "Hiệu suất:",
          value: 123,
        },
      ],
    },
    {
      border: "false",
      layout: "hbox",
      items: [
        {
          xtype: "button",
          text: "+1",
          flex: 1,
        },
        {
          xtype: "button",
          text: "+10",
          flex: 1,
        },
        {
          xtype: "button",
          text: "+50",
          flex: 1,
        },
      ],
    },
    {
      border: "false",
      layout: "hbox",
      items: [
        {
          xtype: "button",
          text: "-1",
          flex: 1,
        },
        {
          xtype: "button",
          text: "-10",
          flex: 1,
        },
        {
          xtype: "button",
          text: "-50",
          flex: 1,
        },
      ],
    },
  ],
});