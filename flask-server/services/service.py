import datetime
from dotenv import load_dotenv
import re
import uuid
from flask import request, jsonify, session
from flask_jwt_extended import create_access_token
import jwt
from models.model import  MongoDB
import hashlib
import os
from hashlib import sha256
from flask import session
from pymongo import MongoClient
from  faker import Faker


load_dotenv()
mongo_uri = os.getenv('MONGO_URI')
client = MongoClient(mongo_uri)
db = client ['ShoppingCart']
collection = db['products']



class Service:
    
    
    def __init__(self):
        self.mongodb = MongoDB()
        self.fake = Faker()

    def register(self):
        data = request.get_json()
        email = data['email']
        username = data['username']
        password = data['password']

        # Check username requirements
        if len(username) < 8:
            return jsonify({'message': 'Username must be at least 8 characters long'})

        # Check password requirements
        if not re.search(r'[A-Z]', password) or \
        not re.search(r'[a-z]', password) or \
        not re.search(r'[!@#$%^&*(),.?":{}|<>]', password) or \
        len(password) < 8:
            return jsonify({'message': 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one special character, and one digit'})

        # Check if username already exists
        if self.mongodb.clientusers.find_one({'username': username}) is not None:
            return jsonify({'message': 'Username already exists'})

        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        user_id = str(uuid.uuid4())
        user = {
            '_id': user_id,
            'username': username,
            'password': hashed_password,
            'email':email
        }
        self.mongodb.clientusers.insert_one(user)
        return jsonify({'user_id':user_id,'message': 'User created successfully'})
    
    def login(self):
        data = request.get_json()
        email =data['email']
        username = data['username']
        password = data['password']
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()
        user = self.mongodb.clientusers.find_one({'username': username})
        if user and email==user['email'] and user['password'] == hashed_password:
            # Create access token
            access_token = create_access_token(identity=str(user['_id']))
            return jsonify({'access_token': access_token})
        else:
            return jsonify({'message': 'Invalid username or password or email'})
    
    def viewproducts(self):
        products = []
        try:
            for product in self.mongodb.products.find():
                product_data = {
                    'id': str(product['_id']) ,#converting  the ObjectId to a string
                    'name': product['name'],
                    'description': product['description'],
                    'quantity': product['inventoryLevel'],
                    'price': product['price'],
                    'image': None,
                }
                if 'image' in product and isinstance(product['image'], str):
                    product_data['image'] = product['image'] # assigning the image value to the image field in the dictionary
                products.append(product_data)
        except Exception as e:
            return jsonify({'message': f'An error occurred while retrieving product data: {e}'})

        return jsonify({'products': products})
    


    def add_to_wishlist(self, user_id, product_id):
        try:
            user = self.mongodb.clientusers.find_one({'_id': str(user_id)})
            if not user:
                return jsonify({'message': 'User not found !'})

            product = self.mongodb.products.find_one({'_id': product_id})
            if not product:
                return jsonify({'message': 'Product not found !'})
            
            # Check if product is already in cart
            existing_wishlist = self.mongodb.wishlist.find_one({'user_id':user_id,'product_id':product_id})
            if existing_wishlist:
                return jsonify({'msg': 'Product already added to wishlist' })
            
            # Create a new wishlist item
            wishlist_id = str(uuid.uuid4())
            wishlist_product = {
                '_id': wishlist_id,
                'user_id': user_id,
                'product_id': product_id,
                'created_at': datetime.datetime.utcnow(),
                'updated_at': datetime.datetime.utcnow()
            }
            self.mongodb.wishlist.insert_one(wishlist_product)
            return jsonify({'message': 'Product added to wishlist'})
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'})
        except (jwt.InvalidTokenError, KeyError):
            return jsonify({'message': 'Invalid token'})
        
    def get_wishlist(self,user_id):
        try:
            user = self.mongodb.clientusers.find_one({'_id': str(user_id)})
            if not user:
                return jsonify({'message': 'User not found !'})

            wishlist_products = []
            for wishlist_item in self.mongodb.wishlist.find({'user_id': user_id}):
                product = self.mongodb.products.find_one({'_id': wishlist_item['product_id']})
                if product:
                    wishlist_products.append(product)
                    #print(wishlist_products)

            return jsonify({'wishlist_products': wishlist_products})
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'})
        except (jwt.InvalidTokenError, KeyError):
            return jsonify({'message': 'Invalid token'})

    
    def delete_wishlist(self, user_id, product_id):
        try:
            user = self.mongodb.clientusers.find_one({'_id': str(user_id)})
            if not user:
                return jsonify({'message': 'User not found !'})

            product = self.mongodb.products.find_one({'_id': product_id})
            if not product:
                return jsonify({'message': 'Product not found !'})

            wishlist_item = self.mongodb.wishlist.find_one({'user_id': user_id, 'product_id': product_id})
            if not wishlist_item:
                return jsonify({'message': 'Product not found in wishlist !'})

            self.mongodb.wishlist.delete_one({'_id': wishlist_item['_id']})
            return jsonify({'message': 'Product deleted from wishlist'})
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'})
        except (jwt.InvalidTokenError, KeyError):
            return jsonify({'message': 'Invalid token'})

    def update_wishlist_quantity(self, user_id, product_id, quantity):
        try:
            user = self.mongodb.clientusers.find_one({'_id': str(user_id)})
            if not user:
                return jsonify({'message': 'User not found !'})

            wishlist_item = self.mongodb.wishlist.find_one({'user_id': user_id, 'product_id': product_id})
            if not wishlist_item:
                return jsonify({'message': 'Product not found in wishlist !'})

            self.mongodb.wishlist.update_one(
                {'_id': wishlist_item['_id']},
                {'$set': {'quantity': quantity, 'updated_at': datetime.datetime.utcnow()}}
            )

            return jsonify({'message': 'Wishlist item updated successfully!'})
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'})
        except (jwt.InvalidTokenError, KeyError):
            return jsonify({'message': 'Invalid token'})

    # def add_to_orderitems(self, user_id, order_id): 
    #     try:
    #         user = self.mongodb.clientusers.find_one({'_id': str(user_id)})
    #         if not user:
    #             return jsonify({'message': 'User not found !'})
            
    #         wishlist = self.mongodb.wishlist.find({'user_id': user_id})
    #         order_items = self.mongodb.orderitems.find({'user_id': user_id})
            
    #         for item in wishlist:
    #             product_id = item['product_id']
    #             product = self.mongodb.products.find_one({'_id': product_id})
    #             if not product:
    #                 return jsonify({'message': 'Product not found !'})
    #             orderitem_id = str(uuid.uuid4())
    #             orderitem = {
    #                 '_id': orderitem_id,
    #                 'order_id': order_id,  
    #                 'user_id': user_id,
    #                 'created_at': datetime.datetime.utcnow(),
    #                 'updated_at': datetime.datetime.utcnow(),
    #                 'price': product['price'],
    #                 'status': 'Pending'
    #             }
    #             self.mongodb.orderitems.insert_one(orderitem)
    #             total_price = float(sum([float(item['price']) * int(item['quantity']) for item in order_items]))
    #             print("total_price after multiplying and before updating")
    #             print(total_price)
    #             self.mongodb.orders.update_one({'_id': order_id, 'userId': user_id,},{'$set': {
    #             'totalPrice': total_price,'rowUpdatedAt': datetime.datetime.utcnow(),}}, upsert=True)
    #         print("records updated")
            
    #         return jsonify({'message': 'Products checked out to orderitems'})
    #     except jwt.ExpiredSignatureError:
    #         return jsonify({'message': 'Token has expired'})
    #     except (jwt.InvalidTokenError, KeyError):
    #         return jsonify({'message': 'Invalid token'})

    # def add_to_orderitems(self, user_id, order_id): 
    #     try:
    #         user = self.mongodb.clientusers.find_one({'_id': str(user_id)})
    #         if not user:
    #             return jsonify({'message': 'User not found !'})
            
    #         wishlist = self.mongodb.wishlist.find({'user_id': user_id})
    #         order_items = self.mongodb.orderitems.find({'user_id': user_id})
            
    #         for item in wishlist:
    #             product_id = item['product_id']
    #             product = self.mongodb.products.find_one({'_id': product_id})
    #             if not product:
    #                 return jsonify({'message': 'Product not found !'})
    #             orderitem_id = str(uuid.uuid4())
    #             orderitem = {
    #                 '_id': orderitem_id,
    #                 'order_id': order_id,  
    #                 'user_id': user_id,
    #                 'created_at': datetime.datetime.utcnow(),
    #                 'updated_at': datetime.datetime.utcnow(),
    #                 'price': product['price'],
    #                 #'quantity': request.json['quantity'],
    #                 'status': 'Pending'
    #             }
    #             self.mongodb.orderitems.insert_one(orderitem)
    #             total_price = float(sum([float(item['price']) * int(item['quantity']) for item in order_items]))
    #             print("total_price after multiplying and before updating")
    #             print(total_price)
    #             self.mongodb.orders.update_one({'_id': order_id, 'userId': user_id,},{'$set': {
    #             'totalPrice': total_price,'rowUpdatedAt': datetime.datetime.utcnow(),}}, upsert=True)
    #         print("records updated")
            
    #         return jsonify({'message': 'Products checked out to orderitems'})
    #     except jwt.ExpiredSignatureError:
    #         return jsonify({'message': 'Token has expired'})
    #     except (jwt.InvalidTokenError, KeyError):
    #         return jsonify({'message': 'Invalid token'})
    
    # def add_to_orderitems(self, user_id, order_id): minunari
    #     try:
    #         user = self.mongodb.clientusers.find_one({'_id': str(user_id)})
    #         if not user:
    #             return jsonify({'message': 'User not found !'})
            
    #         wishlist = self.mongodb.wishlist.find({'user_id': user_id})
            
    #         for item in wishlist:
    #             product_id = item['product_id']
    #             product = self.mongodb.products.find_one({'_id': product_id})
    #             if not product:
    #                 return jsonify({'message': 'Product not found !'})
    #             orderitem_id = str(uuid.uuid4())
    #             orderitem = {
    #                 '_id': orderitem_id,
    #                 'order_id': order_id,  
    #                 'user_id': user_id,
    #                 'created_at': datetime.datetime.utcnow(),
    #                 'updated_at': datetime.datetime.utcnow(),
    #                 'price': product['price'],
    #                 #'quantity': request.json['quantity'],
    #                 'status': 'Pending'
    #             }
    #             self.mongodb.orderitems.insert_one(orderitem)
    #             order_items = self.mongodb.orderitems.find({'user_id': user_id})
    #             #total_price = float(sum([float(item['price']) * int(item['quantity']) for item in order_items]))
    #             print("total_price after multiplying and before updating")
    #             #print(total_price)
    #             self.mongodb.orders.update_one({'_id': order_id, 'userId': user_id}, {'$set': {
    #                 #'totalPrice': total_price,
    #                 'rowUpdatedAt': datetime.datetime.utcnow()
    #             }}, upsert=True)
    #         print("records updated")
            
    #         return jsonify({'message': 'Products checked out to orderitems'})
    #     except jwt.ExpiredSignatureError:
    #         return jsonify({'message': 'Token has expired'})
    #     except (jwt.InvalidTokenError, KeyError):
    #         return jsonify({'message': 'Invalid token'})
   
    
    def create_order(self, user_id, address_id):    
        try:
            user = self.mongodb.clientusers.find_one({'_id': str(user_id)})
            if not user:
                return jsonify({'message': 'User not found !'})

            order_items = self.mongodb.orderitems.find({'user_id': user_id})
            total_price = float(sum([float(item['price']) * int(item['quantity']) for item in order_items]))
            print("total_price after multiplying and before updating")
            print(total_price)
            order_id = str(uuid.uuid4())
            order = {
                '_id': order_id,
                'userId': user_id,
                'addressId': address_id,
                'rowCreatedAt': datetime.datetime.utcnow(),
                'rowUpdatedAt': datetime.datetime.utcnow(),
                'totalPrice': total_price,
                'status': 'Completed'
            }
            print("after multiplying and before updating")
            print(order)
            self.mongodb.orders.insert_one(order)
            return jsonify({'order_id':order_id,'message': 'Order created successfully!'})
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'})
        except (jwt.InvalidTokenError, KeyError):
            return jsonify({'message': 'Invalid token'})
        
        
    def update_orderitem_quantity(self,orderitem_id):
        try:
            # Get the new quantity value from the request body
            quantity = request.json.get('quantity')
            if not quantity:
                return jsonify({'message': 'Quantity value is missing'})
            
            # Find the orderitem by id
            orderitem = self.mongodb.orderitems.find_one({'_id': orderitem_id})
            if not orderitem:
                return jsonify({'message': 'Orderitem not found'})
            
            # Update the quantity field
            self.mongodb.orderitems.update_one({'_id': orderitem_id}, {'$set': {'quantity': quantity}})
            
            return jsonify({'message': 'Quantity updated successfully'})
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token has expired'})
        except (jwt.InvalidTokenError, KeyError):
            return jsonify({'message': 'Invalid token'})

        
   
    def create_address(self):
        try:
            data = request.get_json()
            street = data['street']
            city=data['city']
            state= data['state']
            pincode=data['pincode']
            phone=data['phone']
            address_id = str(uuid.uuid4())
            address = {
                '_id': address_id,
                'street': street,
                'city': city,
                'state': state,
                'pincode': pincode,
                'phone':phone
            }
            self.mongodb.address.insert_one(address)
            return jsonify({'address_id':address_id,'message': 'Address created successfully'})
        except Exception as e:
            return jsonify({'message': str(e)})
        



    def logout(self):
        session.clear() # session obj in flask clears all the data stored in the session of the current user
        return jsonify({'message': 'Logged out successfully'})





    def bank(self):
        account_id = str(uuid.uuid4())
        credit_card_details = {
            '_id':account_id,
            'credit_card_provider':self.fake.credit_card_provider(),
            'card_number': self.fake.credit_card_number(),
            'card_holder': self.fake.name(),
            'expiration_date': self.fake.credit_card_expire(),
            'cvv': self.fake.credit_card_security_code(),
        }
        try:
            self.mongodb.bank.insert_one(credit_card_details)

            return jsonify({'credit_card_details':credit_card_details})
        except Exception as e:
            return f"Error inserting credit card details: {str(e)}"
   

        
    def match_credit_card(self):
        data = request.json
        _id =  data.get('_id')
        credit_card_provider =  data.get('credit_card_provider')
        card_number = data.get('card_number')
        card_holder = data.get('card_holder')
        expiration_date = data.get('expiration_date')
        cvv = data.get('cvv')
        try:
            # check if all required fields are present
            if not all([_id, credit_card_provider, card_number, card_holder, expiration_date, cvv]):
                #all -if all elements are true
                return "Error: Missing fields in request"
            else:
            # search for document with specified _id
                credit_card = self.mongodb.bank.find_one({"_id": _id})

            # check if credit card exists
            if credit_card is None:
                return "Error: Credit card not found"

            # compare values of other fields
            if (credit_card['credit_card_provider'] != credit_card_provider or
                credit_card['card_number'] != card_number or
                credit_card['card_holder'] != card_holder or
                credit_card['expiration_date'] != expiration_date or
                credit_card['cvv'] != cvv):
                return "Error: Credit card details do not match"
            else:
                return "Credit card details matched successfully"
        except Exception as e:
            return f"Error:{str(e)}"


    
def search_product(name):
        result = collection.find_one({'name': name})
        return result



