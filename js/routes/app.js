  var AppRouter = Parse.Router.extend({
    routes: {
      "companies": "companies",
      "discounts/:companyId": "discounts",
      "employees": "employees"
    },

    initialize: function(options) {
    },

    companies: function() {
      state.set({ section: "companies" });
    },

    discounts: function(companyId) {
      state.set({ section: "discounts", companyId: companyId });
    },

    employees: function(companyId) {
      state.set({ section: "employees", companyId: companyId });
    }
  });