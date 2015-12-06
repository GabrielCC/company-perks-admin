  // Our basic Todo model has `content`, `order`, and `done` attributes.
  var Company = Parse.Object.extend("Company", {
    // Default attributes for the todo.
    defaults: {
      name: ""
    },

    // Ensure that each todo created has `content`.
    initialize: function() {
      // if (!this.get("name")) {
      //   this.set({"name": this.defaults.name});
      // }
    },

  });