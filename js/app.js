(function (modules, root, factory) {
  root["todos/app"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "todos")];
  }, {
      "jquery": root.jQuery
    }));
})(["jquery", "mu-jquery-capture/add", "mu-jquery-loom/jquery.loom", "mu-jquery-hub/hub"], this, function (jQuery, add, loom, hub) {
  var root = this;

  function load(module) {
    return root[module];
  }

  // Replace jQuery.event.add with a version that captures results
  jQuery.event.add = add(jQuery);

  // Extend jQuery.fn with .crank/.twist/.weave
  loom.call(jQuery.fn, "[mu-widget]", "mu-widget", load, {
    "hub": hub.call(jQuery, "memory", "stopOnFalse")
  });

  // Wait for document.ready and weave the document
  jQuery(function ($) {
    $(document).weave().fail(console.error.bind(console));
  });
});
