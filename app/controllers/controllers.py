# from models.models import read_data, write_data
from flask import jsonify, request

# from app.controllers.customers_controller import json_store
from app.models.models import read_data, write_data
from app.controllers.customers_controller import json_store, customers_blueprint


def register_customer():
    data = request.json
    store = read_data()
    customer_id = len(store['customers']) + 1
    new_customer = {'id': customer_id, 'name': data['name'], 'email': data['email'], 'plan_id': None}
    store['customers'].append(new_customer)
    write_data(store)
    return jsonify(new_customer), 201

def choose_plan(customer_id):
    data = request.json
    store = read_data()
    for customer in store['customers']:
        if customer['id'] == customer_id:
            customer['plan_id'] = data['plan_id']
            write_data(store)
            return jsonify({"message": "Plan chosen successfully"}), 200
    return jsonify({"error": "Customer not found"}), 404

def renew_plan(customer_id):
    # Implement renewal logic here using the JSON store
    return jsonify({"message": "Plan renewed successfully"}), 200

def list_customers():
    customers = json_store.get_customers()
    return jsonify(customers), 200


@customers_blueprint.route('/listplans', methods=['GET'])
def get_plans():
    plans = json_store.get_plans()
    return jsonify(plans), 200

def change_plan(customer_id):
    data = request.json
    store = read_data()
    for customer in store['customers']:
        if customer['id'] == customer_id:
            customer['plan_id'] = data['plan_id']
            write_data(store)
            return jsonify({"message": "Plan changed successfully"}), 200
    return jsonify({"error": "Customer not found"}), 404
