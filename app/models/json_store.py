import json
import os

class JSONStore:
    def __init__(self, filepath='data.json'):
        self.filepath = filepath
        self.data = self._load()

    def _load(self):
        if not os.path.isfile(self.filepath):
            self._save({'customers': [], 'plans': []})
        with open(self.filepath, 'r') as file:
            return json.load(file)

    def _save(self):
        with open(self.filepath, 'w') as file:
            json.dump(self.data, file, indent=4)

    def add_customer(self, customer):
        customer['id'] = len(self.data['customers']) + 1
        customer['registration_date'] = datetime.now().strftime("%Y-%m-%d")
        self.data['customers'].append(customer)
        self._save()

    def get_customers(self):
        return self.data['customers']

    def add_plan(self, plan):
        self.data['plans'].append(plan)
        self._save()

    def get_plans(self):
        return self.data['plans']

    def update_customer_plan(self, customer_id, new_plan_name):
        # Locate the customer and update their plan details
        for customer in self.data['customers']:
            if customer['id'] == customer_id:
                for plan in self.data['plans']:
                    if plan['plan_name'] == new_plan_name:
                        customer.update(plan)
                        customer['plan_status'] = 'Active'
                        self._save()
                        return customer
        return None

    def find_plan_by_name(self, plan_name):
        return next((plan for plan in self.data['plans'] if plan['plan_name'] == plan_name), None)

    def upgrade_downgrade_plan(self, customer_id, new_plan):
        customer = next((cust for cust in self.data['customers'] if cust['id'] == customer_id), None)
        if customer and new_plan:
            customer['plan_name'] = new_plan['plan_name']
            customer['plan_cost'] = new_plan['plan_cost']
            customer['validity'] = new_plan['validity']
            customer['plan_status'] = new_plan['plan_status']
            self._save()
            return customer
        return None
