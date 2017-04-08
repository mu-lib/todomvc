(function (modules, root, factory) {
	root["todos/filter"] = factory.apply(root, modules.map(function (m) {
		return this[m] || root[m.replace(/^\./, "todos")];
	}));
})(["./widget", "director"], this, function (widget, Route) {
	return widget.extend({
		"hub/todos/filter": function (filter) {
			this.$element
				// Find all `a` elements with a `href` attribute staring with `#`
				.find('a[href^="#/"]')
				// Remove the `selected` class from matched elements
				.removeClass("selected")
				// Filter matched elements with a `href` attribute matching (`filter` || `/`)
				.filter('[href="#/' + (filter || '') + '"]')
				// Add the `selected` to matching elements
				.addClass("selected");
		},

		"go/\/(active|completed)?": function (filter) {
			this.publish("todos/filter", filter);
		},

		"on/initialize": function () {
			var me = this;
			var $ = me.$;
			var routes = {};

			$.each(me.constructor.go, function (index, go) {
				routes[go.route] = $.proxy(go.value, me);
			});

			me.router = new Router(routes).init();
		}
	});
});
