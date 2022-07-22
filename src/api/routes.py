"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask_jwt_extended import create_access_token
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

app.config["JWT_SECRET_KEY"] = "DoingTokens" 
jwt = JWTManager(app)

api = Blueprint('api', __name__)



@api.route('/token', methods=['POST'])
def create_token():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

