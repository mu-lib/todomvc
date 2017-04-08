(function (modules, root, factory) {
  root["todos/widget"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "todos")];
  }));
})(["./create", "mu-jquery-app-hub/widget"], this, function (create, widget) {
  return create(widget.concat());
});
