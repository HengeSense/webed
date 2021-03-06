Ext.define ('Webed.view.AddFileBox', {
    extend: 'Ext.window.Window',
    alias: 'widget.add-file-box',

    requires: [
        'Ext.form.Panel'
    ],

    border: false,
    iconCls: 'icon-page_white_add-16',
    layout: 'fit',
    modal: true,
    resizable: false,
    title: 'Add Document',
    width: 320,

    items: [{
        xtype: 'form',
        layout: 'vbox',
        bodyPadding: '4px',

        items: [{
            allowBlank: false,
            enableKeyEvents: true,
            emptyText: 'Enter document name ..',
            name: 'name',
            value: 'file.txt',
            width: '100%',
            xtype: 'textfield'
        },{
            allowBlank: false,
            emptyText: 'Select type ..',
            name: 'mime',
            style: 'margin: 0;',
            value: 'text/plain',
            width: '100%',
            xtype: 'add-file-box-mime'
        }]
    }],

    buttons: [{
        text: 'Confirm',
        iconCls: 'icon-tick-16',
        action: 'confirm'
    },{
        text: 'Cancel',
        iconCls: 'icon-cross-16',
        action: 'cancel'
    }]
});

Ext.define ('Webed.view.AddFileBoxMime', {
    extend: 'Ext.form.field.ComboBox',
    alias: 'widget.add-file-box-mime',

    store: {
        fields: ['mime', 'name'],
        data : [{
            'mime':'text/plain',
            'name':'Plain Text'
        },{
            'mime':'text/x-rst',
            'name':'reStructuredText'
        },{
            'mime':'text/x-yaml',
            'name':'YAML configuration'
        }]
    },

    queryMode: 'local',
    displayField: 'name',
    valueField: 'mime',
    typeAhead: true,

    tpl:'<tpl for=".">' +
        '<div class="x-boundlist-item">{name}' +
        '<div class="w-boundlist-item-rhs">{mime}</div>' +
        '</div>' +
        '</tpl>'
});
