(function (modules, root, factory) {
	root["todos/app"] = factory.apply(root, modules.map(function (m) {
		return this[m] || root[m.replace(/^\./, "todos")];
	}, {
			"jquery": root.jQuery
		}));
})(["jquery", "mu-jquery-loom/jquery.loom", "mu-jquery-hub/hub"], this, function (jQuery, loom, hub) {
	var root = this;

	jQuery.fn.loom = loom;

	function load(module) {
		return root[module];
	}

	jQuery(function ($) {
		$(document)
			.loom("[mu-widget]", "mu-widget", load, {
				"hub": hub.call($, "memory", "stopOnFalse")
			})
			.weave()
			.fail(console.error.bind(console));
	});
});
