(function (modules, root, factory) {
  root["todos/widget"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "todos")];
  }));
})(["./create", "mu-jquery-app-hub/widget", "mu-jquery-widget/extended"], this, function (create, widget, extended) {
  return create(widget.concat(), extended.concat());
});
