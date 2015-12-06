  // The DOM element for a todo item...
  var DiscountView = Parse.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#discount-template').html()),

    // The DOM events specific to an item.
    events: {
      "dblclick label.merchant-id-edit" : "edit",
      "dblclick label.discount-edit": "edit",
      "click .todo-destroy"   : "clear",
      "click input.submit"          : "close"
    },

    // The CompanyView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a Todo and a CompanyView in this
    // app, we set a direct reference on the model for convenience.
    initialize: function(company) {
      this.company = company;
      _.bindAll(this, 'render', 'close', 'remove');
      // this.model.bind('change', this.render);
      this.model.bind('destroy', this.remove);
    },

    // Re-render the contents of the todo item.
    render: function() {
      $(this.el).html(this.template(this.model.toJSON()));
      this.merchantId = this.$('#merchant-id');
      this.discount = this.$('#discount');
      this.companyId = this.$('#company-id');
      return this;
    },


    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
      $(this.el).addClass("editing");
      this.merchantId.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
      // var company = new Company();
      // company.id = state.get('companyId');
      // this.model.set('companyId', company);
      this.model.save({
        merchantId: this.merchantId.val(),
        discount: parseInt(this.discount.val()),
      });
      this.render();
      $(this.el).removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
      if (e.keyCode == 13) this.close();
    },

    // Remove the item, destroy the model.
    clear: function() {
      this.model.destroy();
    }

  });