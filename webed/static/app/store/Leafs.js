Ext.define ('Webed.store.Leafs', {
    extend: 'Ext.data.Store',
    requires: 'Webed.model.Leaf',
    model: 'Webed.model.Leaf',

    listeners: {
        prefetch: function (store, records, successful, eOpts) {
            if (records && successful) {
                records.forEach (function (record) {
                    this.decorate (record);
                }, this);
            }
        }
    },

    decorate: function (leaf) {
        var mime = leaf.get ('mime');
        assert (mime);
        var icon = MIME.to_icon (mime, '-16');
        assert (icon);

        leaf.set ('iconCls', icon);
    },

    leadingBufferZone: 250,
    remoteFilter: true,
    remoteSort: true,
    buffered: true,
    autoLoad: true,
    pageSize: 25
});
