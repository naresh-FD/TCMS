from flask import Flask
from flask_cors import CORS

from app.controllers.customers_controller import customers_blueprint

app = Flask(__name__)
CORS(app)
app.register_blueprint(customers_blueprint, url_prefix='/api')

if __name__ == '__main__':
    app.run(debug=True)
