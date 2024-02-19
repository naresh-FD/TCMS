from flask import request, jsonify

from app.controllers.controllers import register_customer, choose_plan, renew_plan, change_plan, list_customers, \
    get_plans


def register_routes(app):
    app.route('/register_customer', methods=['POST'])(register_customer)
    app.route('/choose_plan/<int:customer_id>', methods=['POST'])(choose_plan)
    app.route('/renew_plan/<int:customer_id>', methods=['POST'])(renew_plan)
    app.route('/change_plan/<int:customer_id>', methods=['POST'])(change_plan)
    app.route('/getallcustomers', methods=['POST'])(list_customers)
    app.route('/listplans', methods=['POST'])(get_plans)

