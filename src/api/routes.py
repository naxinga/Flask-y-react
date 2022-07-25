"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)

@api.route('/singup', methods=['POST'])
def singup():
    body=request.get_json()
    comprobando = User.filter_by(email=body["email"]).first()
    if comprobando != None:
        return ("El email ya existe")
    user = User(username=body["username"], email=body["email"], password=body["password"])
    db.session.add(user)
    db.session.commit()
    token=create_access_token(identity=user.id)
    return jsonify(token)

@api.route('/token', methods=['POST'])
def create_token():
    username= request.json.get("username", None)
    email= request.json.get("email",None)
    password= request-json.get("password", None)

    user= User.filter.query(email=email,password=password,username= username).first()
    if User is None:
        return jsonify({"msg": "Invalid email or password"}), 401

    access_token = create_access_token(identity=user.id)

    return jsonify({"token": access_token , "user": user.id}), 200

@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user_id = get_jwt_identity()
    user = User.filter.get(current_user_id)
    
    return jsonify({"id": user.id, "username": user.username }), 200

@api.route('/login', methods=['POST'])
def login():
    body=request.get_json()
    comprobando = User.filter_by(email=body["email"]).first()
    if comprobando = None:
        return ("El usuario no existe")
    elif 
    db.session.add(user)
    db.session.commit()
    token=create_access_token(identity=user.id)
    return jsonify(token)