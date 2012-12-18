Ext.define ('Webed.controller.Leaf', {
    extend: 'Ext.app.Controller',

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    models: ['Leaf'],
    stores: ['Leafs'],

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    init: function () {
        this.application.on ({
            set_leaf: this.set_leaf, scope: this
        });

        this.application.on ({
            get_leaf: this.get_leaf, scope: this
        });
    },

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////

    set_leaf: function (source, args) {
        if (source == this) return;

        assert (args);
        assert (args.leaf);
        assert (args.leaf.length >= 0);

        for (var index in args.leaf) {
            var leaf = args.leaf[index];

            assert (leaf);
            assert (leaf.root_uuid);
            assert (leaf.uuid||true);
            assert (leaf.mime);
            assert (leaf.name);

            var model = Ext.create ('Webed.model.Leaf', leaf);
            assert (model);

            var model = model.save ({
                scope: args.scope||this, callback: function (rec, op) {
                    if (args.callback && args.callback.call) {
                        args.callback.call (args.scope||this, rec, op, index);
                    }
                }
            });

            assert (model);
        }
    },

    get_leaf: function (source, args) {
        if (source == this) return;

        assert (args);
        assert (args.leaf);
        assert (args.leaf.length >= 0);
        assert (args.callback);
        assert (args.callback.call);

        var store = this.getLeafsStore ();
        assert (store);

        var array = Ext.Array.map (args.leaf, function () {
            return [];
        });

        store.queryBy (function (leaf) {
            Ext.Array.each (args.leaf, function (object, index) {
                Ext.Object.each (object, function (key, value) {
                    if (leaf.get (key) != value) { index = -1; return false; }
                });

                if (index >= 0) array[index].push (leaf);
            });
        });

        Ext.Array.each (array, function (recs, index) {
            if (recs.length > 0) {
                args.callback.call (args.scope||this, recs, index);
            } else {
                store.load ({
                    scope: args.scope||this, callback: function (recs) {
                        args.callback.call (args.scope||this, recs, index);
                    }, params: args.property[index], addRecords: true
                });
            }
        });
    }

    ///////////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////////
});
