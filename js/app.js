(function (modules, root, factory) {
  root["todos/app"] = factory.apply(root, modules.map(function (m) {
    return this[m] || root[m.replace(/^\./, "todos")];
  }, {
      "jquery": root.jQuery
    }));
})(["jquery", "mu-jquery-capture/add", "mu-jquery-loom/jquery.loom", "mu-jquery-hub/hub"], this, function (jQuery, add, loom, hub) {
  var root = this;
  var $event = jQuery.event;

  function load(module) {
    return root[module];
  }

  $event.add = add.call(jQuery, $event.add);

  loom.call(jQuery.fn, "[mu-widget]", "mu-widget", load, {
    "hub": hub.call(jQuery, "memory", "stopOnFalse")
  });

  jQuery(function ($) {
    $(document).weave().fail(console.error.bind(console));
  });
});
