  var AppRouter = Parse.Router.extend({
    routes: {
      "": "companies",
      "companies": "companies",
      "discounts/:companyId/:companyName": "discounts",
      "employees/:companyId/:companyName": "employees"
    },

    initialize: function(options) {
    },

    companies: function() {
      state.set({ section: "companies", companyId: "" });
    },

    discounts: function(companyId, companyName) {
      state.set({ section: "discounts", companyId: companyId, companyName: companyName });
    },

    employees: function(companyId, companyName) {
      state.set({ section: "employees", companyId: companyId, companyName: companyName });
    }
  });