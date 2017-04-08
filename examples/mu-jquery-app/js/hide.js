(function (modules, root, factory) {
  root["todos/hide"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "todos")];
  }));
})(["./widget"], this, function (widget) {
  return widget.extend({
    "hub/todos/change": function (tasks) {
      this.$element.toggle(tasks.length !== 0);
    }
  });
});
