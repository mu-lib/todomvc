(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["todos/clear"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m = m.replace(/^\./, "todos")] || root[m];
    }));
  }
})([
  "jquery",
  "./compose",
  "mu-jquery-widget/widget",
  "mu-jquery-app/hub"
], this, function($, compose, widget, hub) {
  return compose(widget, hub, {
		'hub/todos/change': function (tasks) {
			var count = tasks
				.filter(function (task) {
					return task.completed;
				})
				.length;

			this.$element.toggle(count > 0);
		},

		"on/click": function () {
			this.publish("todos/clear");
		}
	});
});