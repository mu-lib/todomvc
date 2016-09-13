
(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["todos/filter"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m = m.replace(/^\./, "todos")] || root[m];
    }));
  }
})([
  "jquery",
	"./compose",
  "mu-jquery-widget/widget",
  "mu-jquery-app/hub",
	"./go",
], this, function($, compose, widget, hub, go) {
	return compose(widget, hub, go, {
		"go/\/(active|completed)?": function (filter) {
			this.publish("todos/filter", filter);
		},

		"hub/todos/filter": function (filter) {
			this.$element
				// Find all `a` elements with a `href` attribute staring with `#`
				.find('a[href^="#/"]')
				// Remove the `selected` class from matched elements
				.removeClass('selected')
				// Filter matched elements with a `href` attribute matching (`filter` || `/`)
				.filter('[href="#/' + (filter || '') + '"]')
				// Add the `selected` to matching elements
				.addClass('selected');
		}
	});
});