// Our basic Todo model has `content`, `order`, and `done` attributes.
var Employee = Parse.Object.extend("Employee", {
    // Default attributes for the todo.
    defaults: {
        firstName: "",
        lastName: "",
        companyId: ""
    },

    // Ensure that each todo created has `content`.
    initialize: function() {
        if (!this.get("firstName")) {
            this.set({"firstName": this.defaults.firstName});
        }
        if (!this.get("lastName")) {
            this.set({"lastName": this.defaults.lastName});
        }
        if (!this.get("companyId")) {
            this.set({"companyId": this.defaults.companyId});
        }
    }
});