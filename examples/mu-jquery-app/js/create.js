
(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["todos/create"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m = m.replace(/^\./, "todos")] || root[m];
    }));
  }
})([
  "mu-create/regexp",
  "mu-jquery-app/create"
], this, function(regexp, create) {
    var go = regexp(/^go\/(.+)/, function(result, data, route) {
        (result.go = result.go || []).push({
            "route": route,
            "value": data.value
        });

        return false;
    });

	return create.extend(go);
});