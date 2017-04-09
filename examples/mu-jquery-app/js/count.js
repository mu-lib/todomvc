(function (modules, root, factory) {
  root["todos/count"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "todos")];
  }));
})(["./widget"], this, function (widget) {
  return widget.extend({
    "hub/todos/change": function (tasks) {
      var count = tasks
        .filter(function (task) {
          return !task.completed;
        })
        .length;

      this.html("<strong>" + count + "</strong> " + (count === 1 ? "item" : "items") + " left");
    }
  });
});
