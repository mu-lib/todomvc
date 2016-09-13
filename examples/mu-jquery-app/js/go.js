(function(modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["todos/go"] = factory.apply(root, modules.map(function(m) {
      return {
          "jquery": root.jQuery,
          "director": root.Router
      }[m = m.replace(/^\./, "todos")] || root[m];
    }));
  }
})(["jquery", "director"], this, function($, Router) {

  return function($element, ns, hub) {
    var self = this;
    var routes = {};

    $.each(this.constructor.go, function (index, go) {
      routes[go.route] = $.proxy(go.value, self);
    });

    this.router = new Router(routes).init();
  }
});