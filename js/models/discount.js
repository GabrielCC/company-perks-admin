  // Our basic Todo model has `content`, `order`, and `done` attributes.
  var Discount = Parse.Object.extend("Discount", {
    // Default attributes for the todo.
    defaults: {
      merchantId: "",
      discount: ""
    },

    // Ensure that each todo created has `content`.
    initialize: function() {
      if (!this.get("merchantId")) {
        this.set({"merchantId": this.defaults.merchantId});
      }
      if (!this.get("discount")) {
        this.set({"discount": this.defaults.discount});
      }
    },

  });