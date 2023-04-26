from pymongo import MongoClient
import os
from gridfs import GridFS
from dotenv import load_dotenv
from faker import Faker

load_dotenv()
class MongoDB:
    def __init__(self):
        mongo_uri = os.getenv('MONGO_URI')
        self.client = MongoClient(mongo_uri)
        self.db = self.client[os.getenv("DB_NAME")]
        self.clientusers = self.db[os.getenv("DB_CLIENTUSERS")]
        self.products = self.db[os.getenv("DB_PROD")]
        self.orders = self.db[os.getenv("DB_ORDERS")]
        self.orderitems = self.db[os.getenv("DB_ORDERITEMS")]
        self.logs = self.db[os.getenv("DB_LOGS")]
        self.fs = GridFS(self.db)
        self.fake = Faker('en_US')
        self.bank = self.db[os.getenv("DB_BANK")]
        self.cart = self.db[os.getenv("DB_CART")]
        self.cartproducts   = self.db[os.getenv("DB_CARTPRODUCTS")]
        self.wishlist = self.db[os.getenv("DB_WISHLIST")]
        self.address =self.db[os.getenv("DB_ADDRESS")]