from flask import Flask, jsonify, request,Blueprint
from services.service import Service
from services.service import search_product
from flask_jwt_extended import jwt_required,get_jwt_identity

ab = Blueprint('api', __name__)
service_instance = Service()

@ab.route('/api/v1/register', methods=['POST'])
def register():
    try:
        return service_instance.register()
    except Exception as e:
        return jsonify({"error":str(e)})


@ab.route('/api/v1/login', methods=['POST'])
def login():
    try:
        return service_instance.login()
    except Exception as e:
        return jsonify({"error":str(e)})


@ab.route('/api/v1/viewproducts', methods=['GET'])
def view_products():
    try:
        return service_instance.viewproducts()
    except Exception as e:
        return jsonify({"error":str(e)})

    
@ab.route('/api/v1/add_to_wishlist/<user_id>/<product_id>', methods=['POST'])
@jwt_required()
def add_to_wishlist(user_id, product_id):
    try:
        current_user_id = get_jwt_identity()
        if current_user_id != user_id:
            return jsonify({'message': 'Unauthorized access. User ID in access token does not match user ID in URL.'}), 401
        return service_instance.add_to_wishlist(user_id, product_id)
    except Exception as e:
        return jsonify({"error": str(e)})


@ab.route('/api/v1/get_wishlist/<user_id>', methods=['GET'])
@jwt_required()
def get_wishlist(user_id):
    try:
            current_user_id = get_jwt_identity()
            if current_user_id != user_id:
                return jsonify({'message': 'Unauthorized access. User ID in access token does not match user ID in URL.'}), 401
            return service_instance.get_wishlist(user_id)
    except Exception as e:
            return jsonify({"error": str(e)})


@ab.route('/api/v1/deletewishlist/<user_id>/<product_id>', methods=['DELETE'])
@jwt_required()
def deletewishlist(user_id, product_id):
    try:
     current_user_id = get_jwt_identity()
     if current_user_id != user_id:
            return jsonify({'message': 'Unauthorized access. User ID in access token does not match user ID in URL.'}), 401
     return service_instance.delete_wishlist(user_id, product_id)
    except Exception as e:
        return jsonify({"error": str(e)})

@ab.route('/api/v1/update_wishlist_quantity/<user_id>/<product_id>', methods=['PUT'])
@jwt_required()
def update_wishlist_quantity(user_id, product_id):
    try:
        current_user_id = get_jwt_identity()
        if current_user_id != user_id:
            return jsonify({'message': 'Unauthorized access. User ID in access token does not match user ID in URL.'}), 401
        
        quantity = request.json.get('quantity')
        if not quantity:
            return jsonify({'message': 'Quantity not provided!'}), 400
        
        return service_instance.update_wishlist_quantity(user_id, product_id, quantity)
    except Exception as e:
        return jsonify({"error": str(e)})
    
@ab.route('/api/v1/add_to_orderitems/<user_id>/<order_id>', methods=['POST'])
@jwt_required()
def add_to_orderitems(user_id, order_id):
    try:
        current_user_id = get_jwt_identity()
        if current_user_id != user_id:
            return jsonify({'message': 'Unauthorized access. User ID in access token does not match user ID in URL.'}), 401
        
        return service_instance.add_to_orderitems(user_id,order_id )
    except Exception as e:
        return jsonify({"error": str(e)})
    

@ab.route('/api/v1/create_address', methods=['POST'])
@jwt_required()
def create_address():
    try:
        return service_instance.create_address()
    except Exception as e:
        return jsonify({"error": str(e)})

@ab.route('/api/v1/orders/<string:user_id>/<string:address_id>', methods=['POST'])
@jwt_required()
def create_order(user_id, address_id):
    try:
        current_user_id = get_jwt_identity()
        print(current_user_id)
        if current_user_id != user_id:
            return jsonify({'message': 'Unauthorized access. User ID in access token does not match user ID in URL.'}), 401
        
        return service_instance.create_order(user_id,address_id )
    except Exception as e:
        return jsonify({"error": str(e)})
    
@ab.route('/api/v1/updateorderitems/<orderitem_id>', methods=['PUT'])
@jwt_required()
def updateorderitems(orderitem_id):
    try:
        return service_instance.update_orderitem_quantity(orderitem_id)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@ab.route('/search', methods=['GET'])
def search():
    name = request.args.get('name')
    result = search_product(name)
    if result:
        return jsonify(result), 200
    else:
        return jsonify({'error': 'Product not found'}), 404 

@ab.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    try:
        return service_instance.logout()
    except Exception as e:
        return jsonify({"error": str(e)})

@ab.route('/bank', methods=['POST'])
@jwt_required()
def bank():
    try:
        return service_instance.bank()
    except Exception as e:
        return jsonify({"error": str(e)})
    

@ab.route('/api/v1/match_credit_card', methods=['POST'])
@jwt_required()
def match_credit_card():
    try:
        return service_instance.match_credit_card()
    except Exception as e:
        return jsonify({"error": str(e)})
