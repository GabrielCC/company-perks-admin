var ManageEmployeesView = Parse.View.extend({


    // Delegated events for creating new items, and clearing completed ones.
    events: {
        "keypress #new-employee":  "createOnEnter",
        "click #clear-completed": "clearCompleted",
        "click #toggle-all": "toggleAllComplete",
        "click .log-out": "logOut",
        "click .back-btn": "back",
        "click ul#filters a": "selectFilter"
    },

    el: ".content",

    // At initialization we bind to the relevant events on the `Todos`
    // collection, when items are added or changed. Kick things off by
    // loading any preexisting todos that might be saved to Parse.
    initialize: function(companyId) {
        var self = this;

        _.bindAll(this, 'addOne', 'addAll', 'addSome', 'render', 'toggleAllComplete', 'logOut', 'createOnEnter');

        // Main todo management template
        this.$el.html(_.template($("#manage-employees-template").html()));

        this.input = this.$("#new-employee");
        this.allCheckbox = this.$("#toggle-all")[0];

        // Create our collection of Todos
        this.employees = new EmployeeList;

        // Setup the query for the collection to look for todos from the current user
        this.employees.query = new Parse.Query(Employee);
        this.employees.query.include("companyId")

        this.employees.bind('add',     this.addOne);
        this.employees.bind('reset',   this.addAll);
        this.employees.bind('all',     this.render);

        // Fetch all the todo items for this user
        this.employees.fetch();

        state.on("change", this.filter, this);
    },

    // Logs out the user and shows the login view
    logOut: function(e) {
        Parse.User.logOut();
        new LogInView();
        this.undelegateEvents();
        delete this;
    },

    // Logs out the user and shows the login view
    back: function(e) {
        this.undelegateEvents();
        router.navigate("/", {trigger: true, replace: true});
        delete this;
    },

    // Re-rendering the App just means refreshing the statistics -- the rest
    // of the app doesn't change.
    render: function() {

        // // this.$('#todo-stats').html(this.statsTemplate({
        // //   total:      this.companies.length,
        // //   done:       done,
        // //   remaining:  remaining
        // // }));

        // this.delegateEvents();

        // this.allCheckbox.checked = !remaining;
    },

    // Filters the list based on which type of filter is selected
    selectFilter: function(e) {
        var el = $(e.target);
        var filterValue = el.attr("id");
        state.set({filter: filterValue});
        Parse.history.navigate(filterValue);
    },

    filter: function() {
        var filterValue = state.get("filter");
        this.$("ul#filters a").removeClass("selected");
        this.$("ul#filters a#" + filterValue).addClass("selected");
        if (filterValue === "all") {
            this.addAll();
        } else if (filterValue === "completed") {
            this.addSome(function(item) { return item.get('done') });
        } else {
            this.addSome(function(item) { return !item.get('done') });
        }
    },

    // Resets the filters to display all todos
    resetFilters: function() {
        this.$("ul#filters a").removeClass("selected");
        this.$("ul#filters a#all").addClass("selected");
        this.addAll();
    },

    // Add a single todo item to the list by creating a view for it, and
    // appending its element to the `<ul>`.
    addOne: function(todo) {
        //debugger;
        var view = new EmployeeView({model: todo});
        this.$("#employees-list").append(view.render().el);
    },

    // Add all items in the Todos collection at once.
    addAll: function(collection, filter) {
        this.$("#employees-list").html("");
        this.employees.each(this.addOne);
    },

    // Only adds some todos, based on a filtering function that is passed in
    addSome: function(filter) {
        var self = this;
        this.$("#employees-list").html("");
        this.employees.chain().filter(filter).each(function(item) { self.addOne(item) });
    },

    // If you hit return in the main input field, create new Todo model
    createOnEnter: function(e) {
        var firstName, lastName, names = this.input.val();
        var company = new Company();
        company.id = state.get('companyId');
        company.set('name', state.get('companyName'));

        if(names === ""){
            names = "John Doe";
        }
        firstName = names.split(" ")[0];
        lastName = names.split(" ").slice(1).join(" ");
        if (e.keyCode != 13){
            return;
        }
        this.employees.create({
            firstName: firstName,
            lastName: lastName,
            companyId: company
        });

        this.input.val('');
        this.resetFilters();
    },

    // Clear all done todo items, destroying their models.
    clearCompleted: function() {
        _.each(this.employees.done(), function(todo){ todo.destroy(); });
        return false;
    },

    toggleAllComplete: function () {
        var done = this.allCheckbox.checked;
        this.employees.each(function (todo) { todo.save({'done': done}); });
    }
});

