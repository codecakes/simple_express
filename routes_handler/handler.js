//http://bulkan-evcimen.com/using_express_router_instead_of_express_namespace.html

exports.handler = function handle_routes (app) {
    
    require('../routes').indexNamespace(app);
    require('../routes/users.js').userNamespace(app);
    require('../routes/test.js').testNamespace(app);
    require("../routes/counter.js").counterNamespace(app);
};