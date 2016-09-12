(function(modules, root, factory) {
    factory.apply(root, modules.map(function(m) {
        return {
            "jquery": jQuery
        }[m] || root[m];
    }));
})([
    "jquery",
    "mu-jquery-widget/jquery.weave",
    "mu-jquery-hub/hub"
], this, function (jQuery, weave, hub) {
    var slice = Array.prototype.slice;
    var self = this;

    hub = hub("memory", "stopOnFalse");

    function load(module) {
        return self[module];
    }

    jQuery.fn.weave = function() {
        return weave.apply(this.find("[mu-widget]"), ["mu-widget", load, hub].concat(slice.call(arguments)));
    };

    jQuery(function ($) {
        $(document)
        .weave()
        .fail(console.error.bind(console));
    });
});
