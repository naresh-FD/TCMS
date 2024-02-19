from flask import Blueprint, request, jsonify
from datetime import datetime

from app.models.json_store import JSONStore

customers_blueprint = Blueprint('customers', __name__)
json_store = JSONStore()


@customers_blueprint.route('/register_customer', methods=['POST'])
def register_customer():
    data = request.json
    new_customer = {
        'name': data['name'],
        'dob': data['dob'],
        'email': data['email'],
        'adhar_number': data['adhar_number'],
        'mobile_number': data['mobile_number']
    }
    json_store.add_customer(new_customer)
    return jsonify(new_customer), 201


@customers_blueprint.route('/choose_plan/<int:customer_id>', methods=['POST'])
def choose_plan(customer_id):
    data = request.json
    updated_customer = json_store.update_customer_plan(customer_id, data['plan_name'])
    if updated_customer:
        return jsonify({"message": "Plan chosen successfully", "customer": updated_customer}), 200
    return jsonify({"error": "Customer or plan not found"}), 404


@customers_blueprint.route('/getallcustomers', methods=['GET'])
def display_customers():
    customers = json_store.get_customers()
    return jsonify(customers), 200


@customers_blueprint.route('/listplans', methods=['GET'])
def get_plans():
    plans = json_store.get_plans()
    return jsonify(plans), 200


@customers_blueprint.route('/change_plan/<int:customer_id>', methods=['PUT'])
def change_plan(customer_id):
    data = request.json
    new_plan_data = {
        'plan_name': data['new_plan_name'],
        'plan_cost': data['plan_cost'],  # This could be fetched from the plans data instead of provided by the user
        'validity': data['validity'],  # Same as above
        'plan_status': data['plan_status']  # And this as well
    }
    updated_customer = json_store.change_plan(customer_id, new_plan_data)
    if updated_customer:
        return jsonify({"message": "Plan updated successfully", "customer": updated_customer}), 200
    return jsonify({"error": "Customer or plan not found"}), 404


@customers_blueprint.route('/change_plan/<int:customer_id>', methods=['POST'])
def upgrade_downgrade_plan(customer_id):
    data = request.json
    new_plan = json_store.find_plan_by_name(data['new_plan_name'])
    if not new_plan:
        return jsonify({"error": "New plan not found"}), 404

    updated_customer = json_store.upgrade_downgrade_plan(customer_id, new_plan)
    if updated_customer:
        return jsonify({"message": "Plan updated successfully", "customer": updated_customer}), 200

    return jsonify({"error": "Customer not found or update failed"}), 404
