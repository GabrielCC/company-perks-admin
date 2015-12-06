  // The main view for the app
  var AppView = Parse.View.extend({
    // Instead of generating a new element, bind to the existing skeleton of
    // the App already present in the HTML.
    el: $("#todoapp"),

    initialize: function() {
      this.render();
      state.on("change", this.changeView, this);
    },

    render: function() {
      if (Parse.User.current()) {
        new ManageCompaniesView();
      } else {
        new LogInView();
      }
    },
    changeView: function() {
      var section = state.get('section');
      var companyId = state.get('companyId');
      var views = {
        'companies': 'ManageCompaniesView',
        'discounts': 'ManageDiscountsView',
        'employees': 'ManageEmployeesView'
      };
      var view = views[section];
      new window[view];

    }
  });