from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows React frontend to talk to Flask backend

@app.route('/registration', methods=['POST'])
def registration():
    data = request.get_json()
    print("Received registration data:", data)

    # Do whatever you want: Save to DB, print, email, etc.

    return {"message": "Registration successful"}, 200

if __name__ == "__main__":
    app.run(debug=True)
