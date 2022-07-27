"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User
#from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_jwt_extended import create_access_token
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
#from models import Person



ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

app.config["JWT_SECRET_KEY"] = "naxinga"  # Change this!
jwt = JWTManager(app)

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app,origins=["*"])

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
#app.register_blueprint(api, url_prefix='/')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

@app.route('/signup', methods=['POST'])
def signup():
    print("Se esta ejecutando signup")
    body=request.get_json()
    comprobando = User.query.filter_by(email=body["email"]).first()
    if comprobando != None:
        return ("El email ya existe")
    user = User(username=body["username"], email=body["email"], password=body["password"])
    db.session.add(user)
    db.session.commit()
    token=create_access_token(identity=user.id)
    return jsonify(token)

@app.route('/login', methods=['POST'])
def login():
    body=request.get_json()
    username= body["username"]
    password= body["password"]
    comprobando = User.query.filter_by(username=body["username"]).first()
    psw = User.query.filter_by(password=body["password"]).first()
    if comprobando == None:
        raise APIException('Usuario no encontrado')
    if psw == None:
        raise APIException('PSW no encontrado')
    print(comprobando)
    print(psw)
    token=create_access_token(identity=comprobando.id)
    return jsonify(token)

@app.route('/token', methods=['POST'])
def create_token():
    username= request.json.get("username", None)
    email= request.json.get("email",None)
    password= request-json.get("password", None)
    user= User.query.filter_by(email=email,password=password,username= username).first()
    if username is None:
        return jsonify({"msg": "Invalid username or password"}), 401
    access_token = create_access_token(identity=user.id)

    return jsonify({"token": access_token , "user": user.id}), 200

@app.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    return "Esta pagina es privada"

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
