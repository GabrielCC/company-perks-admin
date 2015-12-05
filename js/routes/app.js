  var AppRouter = Parse.Router.extend({
    routes: {
      "companies": "companies",
      "discounts/:companyId": "discounts",
      "employees/:companyId": "employees"
    },

    initialize: function(options) {
    },

    companies: function() {
      state.set({ section: "companies", companyId: "" });
    },

    discounts: function(companyId) {
      state.set({ section: "discounts", companyId: companyId });
    },

    employees: function(companyId) {
      state.set({ section: "employees", companyId: companyId });
    }
  });