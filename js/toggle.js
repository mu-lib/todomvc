(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["todos/toggle"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\./, "todos")];
    }, {
      "jquery": root.jQuery
    }));
  }
})([
  "./create",
  "mu-jquery-widget/widget",
  "mu-jquery-app-hub/widget"
], this, function (create, widget, hub) {
  return create(widget, hub, {
    "hub/todos/change": function (tasks) {
      this.$element.prop("checked", tasks.every(function (task) {
        return task.completed;
      }, true));
    },

    "on/change": function () {
      this.publish("todos/toggle", this.$element.prop("checked"));
    }
  });
});
