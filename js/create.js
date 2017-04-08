(function (modules, root, factory) {
  root["todos/create"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "todos")];
  }));
})(["mu-create/regexp", "mu-jquery-app-hub/create"], this, function (regexp, create) {
  var go = regexp(/^go\/(.+)/, function (result, data, route) {
    (result.go = result.go || []).push({
      "route": route,
      "value": data.value
    });

    return false;
  });

  return create.extend(go);
});
