  var ManageDiscountsView = Parse.View.extend({

    // Delegated events for creating new items, and clearing completed ones.
    events: {
      "click #add-new-discount": "createOnEnter",
      "click .log-out": "logOut",
    },

    el: ".content",

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved to Parse.
    initialize: function(companyId) {
      var self = this;
      self.company = new Company();
      self.company.id = companyId;

      _.bindAll(this, 'addOne', 'addAll', 'addSome', 'render', 'toggleAllComplete', 'logOut', 'createOnEnter');

      // Main todo management template
      this.$el.html(_.template($("#manage-discounts-template").html()));
      
      this.merchantIdNew = this.$("#merchant-id-new");
      this.discountNew = this.$("#discount-new");
      this.allCheckbox = this.$("#toggle-all")[0];

      // Create our collection of Todos
      this.model = new DiscountList;

      // Setup the query for the collection to look for todos from the current user
      this.model.query = new Parse.Query(Discount);
      this.model.query.equalTo("companyId", self.company);
      this.model.bind('add',     this.addOne);
      this.model.bind('reset',   this.addAll);
      this.model.bind('all',     this.render);

      // Fetch all the todo items for this user
      this.model.fetch();

    },

    // Logs out the user and shows the login view
    logOut: function(e) {
      Parse.User.logOut();
      new LogInView();
      this.undelegateEvents();
      delete this;
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {

      // // this.$('#todo-stats').html(this.statsTemplate({
      // //   total:      this.model.length,
      // //   done:       done,
      // //   remaining:  remaining
      // // }));

      this.delegateEvents();

      // this.allCheckbox.checked = !remaining;
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
      var view = new DiscountView({model: todo});
      this.$("#discounts-list").append(view.render().el);
    },

    // Add all items in the Todos collection at once.
    addAll: function(collection, filter) {
      this.$("#discounts-list").html("");
      this.model.each(this.addOne);
    },

    // Only adds some todos, based on a filtering function that is passed in
    addSome: function(filter) {
      var self = this;
      this.$("#discounts-list").html("");
      this.model.chain().filter(filter).each(function(item) { self.addOne(item) });
    },

    // If you hit return in the main input field, create new Todo model
    createOnEnter: function(e) {
      var self = this;
      var company = new Company();
      company.id = state.get('companyId');
      try {
      this.model.create({
        merchantId: this.merchantIdNew.val(),
        discount: parseInt(this.discountNew.val()),
        companyId: company
      });
      } catch(err) {
        debugger;
      }
      debugger;
      this.merchantIdNew.val('');
      this.discountNew.val('');
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
      _.each(this.model.done(), function(todo){ todo.destroy(); });
      return false;
    },

    toggleAllComplete: function () {
      var done = this.allCheckbox.checked;
      this.model.each(function (todo) { todo.save({'done': done}); });
    }
  });
