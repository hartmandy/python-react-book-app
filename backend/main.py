from flask import request, jsonify
from config import app, db
from models import Book  

@app.route("/books", methods=["GET"])
def get_books():
    books = Book.query.all()
    json_books = [book.to_json() for book in books]  
    return jsonify({"books": json_books})

@app.route("/create_book", methods=["POST"])
def create_book():
    title = request.json.get("title")
    author_name = request.json.get("authorName")
    image_url = request.json.get("imageUrl")  
    genre = request.json.get("genre")

    if not title or not author_name:
        return jsonify({"message": "You must include both title and author name"}), 400

    new_book = Book(title=title, author_name=author_name, image_url=image_url, genre=genre)
    try:
        db.session.add(new_book)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Book created!"}), 201

@app.route("/update_book/<int:book_id>", methods=["PATCH"])
def update_book(book_id):
    book = Book.query.get(book_id)

    if not book:
        return jsonify({"message": "Book not found"}), 404

    data = request.json
    book.title = data.get("title", book.title)
    book.author_name = data.get("authorName", book.author_name)
    book.image_url = data.get("imageUrl", book.image_url)
    book.genre = data.get("genre", book.genre)

    db.session.commit()

    return jsonify({"message": "Book updated."}), 200

@app.route("/delete_book/<int:book_id>", methods=["DELETE"])
def delete_book(book_id):
    book = Book.query.get(book_id)

    if not book:
        return jsonify({"message": "Book not found"}), 404

    db.session.delete(book)
    db.session.commit()

    return jsonify({"message": "Book deleted!"}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)