(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["todos/filter"] = factory.apply(root, modules.map(function (m) {
      return {
        "jquery": root.jQuery
      }[m = m.replace(/^\./, "todos")] || root[m];
    }));
  }
})([
  "jquery",
  "director",
  "./create",
  "mu-jquery-app/widget"
], this, function ($, Route, create, widget) {
  return create(widget, {
    "on/initialize": function () {
      var self = this;
      var routes = {};

      $.each(self.constructor.go, function (index, go) {
        routes[go.route] = $.proxy(go.value, self);
      });

      self.router = new Router(routes).init();
    },

    "hub/todos/filter": function (filter) {
      this.$element
        // Find all `a` elements with a `href` attribute staring with `#`
        .find('a[href^="#/"]')
        // Remove the `selected` class from matched elements
        .removeClass('selected')
        // Filter matched elements with a `href` attribute matching (`filter` || `/`)
        .filter('[href="#/' + (filter || '') + '"]')
        // Add the `selected` to matching elements
        .addClass('selected');
    },

    "go/\/(active|completed)?": function (filter) {
      this.publish("todos/filter", filter);
    }
  });
});