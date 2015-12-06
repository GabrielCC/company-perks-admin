// The DOM element for a todo item...
var EmployeeView = Parse.View.extend({

    //... is a list tag.
    tagName:  "li",

    // Cache the template function for a single item.
    template: _.template($('#employee-template').html()),

    // The DOM events specific to an item.
    events: {
        "click .toggle"              : "toggleDone",
        "dblclick label.todo-content" : "edit",
        "click .todo-destroy"   : "clear",
        "keypress .edit"      : "updateOnEnter",
        "blur .edit"          : "close"
    },

    // The CompanyView listens for changes to its model, re-rendering. Since there's
    // a one-to-one correspondence between a Todo and a CompanyView in this
    // app, we set a direct reference on the model for convenience.
    initialize: function() {
        _.bindAll(this, 'render', 'close', 'remove');
        this.model.bind('change', this.render);
        this.model.bind('destroy', this.remove);
    },

    // Re-render the contents of the todo item.
    render: function() {
        $(this.el)
            .html(
                this.template(
                    this.model.toJSON()
                )
        );
        this.input = this.$('.edit');
        return this;
    },

    // Toggle the `"done"` state of the model.
    toggleDone: function() {
        this.model.toggle();
    },

    // Switch this view into `"editing"` mode, displaying the input field.
    edit: function() {
        $(this.el).addClass("editing");
        this.input.focus();
    },

    // Close the `"editing"` mode, saving changes to the todo.
    close: function() {
        var firstName, lastName, names = this.input.val();
        if(names === ""){
            names = "John Doe";
        }
        firstName = names.split(" ")[0];
        lastName = names.split(" ").slice(1).join(" ");
        this.model.save({firstName: firstName, lastName: lastName});
        $(this.el).removeClass("editing");
    },

    // If you hit `enter`, we're through editing the item.
    updateOnEnter: function(e) {
        if (e.keyCode == 13){
            this.close();
        }
    },

    // Remove the item, destroy the model.
    clear: function() {
        this.model.destroy();
    }
});