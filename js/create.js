(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["todos/create"] = factory.apply(root, modules.map(function(m) {
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
  var enter = 13;

  return compose(widget, hub, {
		"on/keyup": function ($event) {
      var me = this;
			var value;

			if ($event.keyCode === enter) {
				value = me.$element
					.val()
					.trim();

				if (value !== "") {
					me.publish("todos/add", value);
          me.$element.val("");
				}
			}
		}
	});
});