(function (modules, root, factory) {
  root["todos/toggle"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "todos")];
  }));
})(["./widget"], this, function (widget) {
  return widget.extend({
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
