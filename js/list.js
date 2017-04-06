(function (modules, root, factory) {
  if (typeof define === "function" && define.amd) {
    define(modules, factory);
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory.apply(root, modules.map(require));
  } else {
    root["todos/list"] = factory.apply(root, modules.map(function (m) {
      return this[m] || root[m.replace(/^\./, "todos")];
    }));
  }
})(["./widget"], this, function (widget) {
  var enter = 13;
  var esc = 27;
  var storage = window.localStorage;

  return widget.extend({
    "hub/todos/change": function (tasks, skip) {
      var me = this;
			var $element = me.$element;

      // Serialize `tasks` to JSON and store in `storage.todos-mu-jquery-app`
      storage.setItem("todos-mu-jquery-app", JSON.stringify(tasks));

      // Check if we should skip update
      if (!skip) {
        // `empty` element and `.append` the output from `$.map(tasks)`
        $element
          .empty()
          .append(me.$.map(tasks, function (task) {
            return me.template(task.title, task.completed);
          }));
      }
    },

    "hub/todos/add": function (title) {
      var me = this;

      // Append list from `.template` to `me.$element` and trigger `sync`
      me.$element
        .append(me.template(title))
        .trigger("sync");
    },

    "hub/todos/toggle": function (toggle) {
      this.$element
        // Find `.toggle`, set `checked` property to `toggle`
        .find(".toggle")
        .prop("checked", toggle)
        // Trigger `change` event with `skip`
        .trigger("change", true)
        // Backtrack and trigger `sync`
        .end()
        .trigger("sync");
    },

    "hub/todos/clear": function () {
      this.$element
        // Find and remove `li:has(.toggle:checked)`
        .find("li:has(.toggle:checked)")
        .remove()
        // Backtrack and trigger `sync`
        .end()
        .trigger("sync");
    },

    "hub/todos/filter": function (filter) {
      // Toggle CSS classes depending on `filter`
      this.$element
        .toggleClass("filter-completed", filter === "completed")
        .toggleClass("filter-active", filter === "active");
    },

    "on/initialize": function () {
      var me = this;
			var $element = me.$element;

      // Get detatched `$template` for future usage
      var $template = $element
        .find(".template")
        .detach()
        .removeClass("template");

      // Create `.template` method for generating items
      me.template = function (title, completed) {
        return $template
          .clone()
          .addClass(completed ? "completed" : "active")
          .find("input.toggle")
          .prop("checked", !!completed)
          .end()
          .find("label")
          .text(title)
          .end();
      };

      // Check if we have data in the DOM to start out with, if so trigger `sync` to persist
      if ($element.children("li").length) {
        $element.trigger("sync", true);
      }
      // Publish `todos/change` with deserialized tasks from `storage.todos-mu-jquery-app` or `[]`
      else {
        me.publish("todos/change", JSON.parse(storage.getItem("todos-mu-jquery-app")) || []);
      }
    },

    "on/sync": function ($event, update) {
      var me = this
			var $ = me.$;
      var tasks = me.$element
        // Find all `li` `.children`
        .children("li")
        // `.map` to JSON
        .map(function (index, task) {
          var $task = $(task);

          return {
            title: $task
              .find("label")
              .text(),
            completed: $task
              .find(".toggle")
              .prop("checked")
          };
        })
        // Get underlying Array
        .get();

      // Publish `todos/change` with the new `tasks`
      me.publish("todos/change", tasks, !update);
    },

    "on/change(.toggle)": function ($event, skip) {
      var me = this;
      var $target = me.$($event.target);
      var toggle = $target.prop("checked");

      // Toggle CSS classes depending on `toggle`
      $target
        .closest("li")
        .toggleClass("completed", toggle)
        .toggleClass("active", !toggle);

      // Trigger `sync` if not `skip`
      if (!skip) {
        me.$element.trigger("sync");
      }
    },

    "on/click(.destroy)": function ($event) {
      var me = this;

      // `.remove` `.closest` `li`
      me.$($event.target)
        .closest("li")
        .remove();

      // Trigger `sync`
      me.$element.trigger("sync");
    },

    "on/doubletap(label)": function ($event) {
      var $target = this.$($event.target);

      $target
        // Add class `editing` to `.closest` `li`,
        .closest("li")
        .addClass("editing")
        // `.find` `.edit` and update `.val` with `$target.text()`,
        .find(".edit")
        .val($target.text())
        // `.focus` to trigger event
        .focus();
    },

    "on/keyup(.edit)": function ($event) {
			var $ = this.$;
      var $target = $($event.target);

      switch ($event.keyCode) {
        case esc:
          // Restore "task title" `.val` from `label`
          $target.val(function () {
            return $(this)
              .closest("li")
              .find("label")
              .text();
          });
        // falls through

        case enter:
          // Trigger `focusout` event
          $target.focusout();
          break;
      }
    },

    "on/focusout(.edit)": function ($event) {
      // Remove class `editing` from `.closest` `li`
      this.$($event.target)
        .closest("li")
        .removeClass("editing");
    },

    "on/change(.edit)": function ($event) {
      var me = this;
      var $target = me.$($event.target);
      // Get and `.trim` `.val`
      var title = $target
        .val()
        .trim();

      // If `title` is empty find `.closest` `li` ascendant, and `.remove`
      if (title === "") {
        $target
          .closest("li")
          .remove();
      }
      // Otherwise update `val` with trimmed `title`, update `.closest` `li` descendant `label` `.text` with `title`
      else {
        $target
          .val(title)
          .closest("li")
          .find("label")
          .text(title);
      }

      // Trigger `sync`
      me.$element.trigger("sync");
    }
  });
});
