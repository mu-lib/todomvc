(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["todos/hide"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\./, "todos")];
    }));
  }
})([
  "./create",
  "mu-jquery-app-hub/widget"
], this, function (create, widget) {
  return create(widget, {
    "hub/todos/change": function (tasks) {
      this.$element.toggle(tasks.length !== 0);
    }
  });
});
