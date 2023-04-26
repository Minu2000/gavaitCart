import os
from datetime import timedelta
from flask import Flask
from datetime import timedelta
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from routes.route import ab
#from models.model import SECRET_KEY
from flask_login import LoginManager
app = Flask(__name__)
CORS(app)
load_dotenv()

from flask_login import LoginManager
login_manager = LoginManager()
login_manager.init_app(app)


app.config['SECRET_KEY'] ='minunarikrethick'
app.config['JWT_SECRET_KEY'] = 'super-secret'  


jwt = JWTManager(app)

app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(hours=2)


app.register_blueprint(ab)
#base_url ='http://localhost:5000'

if __name__ == "__main__":
   app.run(debug=True)
  

