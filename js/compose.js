
(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["todos/compose"] = factory.apply(root, modules.map(function(m) {
      return {
        "jquery": root.jQuery
      }[m = m.replace(/^\./, "todos")] || root[m];
    }));
  }
})([
  "mu-compose/regexp",
  "mu-jquery-app/compose"
], this, function(regexp, compose) {
    var go = regexp(/^go\/(.+)/, function(result, data, route) {
        (result.go = result.go || []).push({
            "route": route,
            "value": data.value
        });

        return false;
    });

	return compose.extend(go);
});