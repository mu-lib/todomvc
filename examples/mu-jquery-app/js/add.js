(function (modules, root, factory) {
  root["todos/add"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "todos")];
  }));
})(["./widget"], this, function (widget) {
  var enter = 13;

  return widget.extend({
    "on/keyup": function ($event) {
      var me = this;
      var value;

      if ($event.keyCode === enter) {
        value = me
          .val()
          .trim();

        if (value !== "") {
          me.val("");
          me.publish("todos/add", value);
        }
      }
    }
  });
});
