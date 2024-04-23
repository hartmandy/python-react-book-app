from config import db
from sqlalchemy import Enum
from datetime import datetime  

class Book(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(80), nullable=False)
    author_name = db.Column(db.String(80), nullable=False)
    image_url = db.Column(db.String(255), nullable=True) 
    read_date = db.Column(db.Date, nullable=True) 
    genre = db.Column(db.String(80), nullable=False)  
    status = db.Column(db.Enum('Read', 'To Read', 'Currently Reading'), nullable=False)  

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "authorName": self.author_name,
            "imageUrl": self.image_url,
            "readDate": self.read_date.isoformat() if self.read_date else None,  
            "genre": self.genre,
            "status": self.status 
        }