
(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["todos/toggle"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m = m.replace(/^\./, "todos")] || root[m];
    }));
  }
})([
  "jquery",
  "mu-jquery-app/compose",
  "mu-jquery-widget/widget",
  "mu-jquery-app/hub"
], this, function($, compose, widget, hub) {
	return compose(widget, hub, {
		"hub/todos/change": function (tasks) {
			this.$element.prop("checked", tasks.every(function (task) {
				return task.completed;
			}, true));
		},

		"on/change": function () {
			this.publish("todos/complete", this.$element.prop("checked"));
		}
	});
});