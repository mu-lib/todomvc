(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["todos/add"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\./, "todos")];
    }, {
      "jquery": root.jQuery
    }));
  }
})([
  "jquery",
  "./create",
  "mu-jquery-app/widget"
], this, function ($, create, widget) {
  var enter = 13;

  return create(widget, {
    "on/keyup": function ($event) {
      var me = this;
      var value;

      if ($event.keyCode === enter) {
        value = me.$element
          .val()
          .trim();

        if (value !== "") {
          me.$element.val("");
          me.publish("todos/add", value);
        }
      }
    }
  });
});