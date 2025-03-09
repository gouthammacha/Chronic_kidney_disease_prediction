from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import pickle
import numpy as np

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Connect to MongoDB
client = MongoClient("mongodb+srv://goutham_chotu:dSDdFRbfXEZwncZp@cluster1.cfvos.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1")
db = client['ckd_database']
collection = db['ckd_data']

# Load the pre-trained model
model = pickle.load(open('./kmeans_model.pkl', 'rb'))

# Define the prediction endpoint
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Extract data from the request
        data = request.get_json()

        # Check if all required fields are in the data
        required_fields = [
            'name','gender','age', 'bp', 'gravity', 'albumin', 'sugar', 'rbc', 'pusCell',
            'pusCellClumps', 'bacteria', 'bloodUrea', 'serumCreatinine',
            'sodium', 'potassium', 'hemoglobin', 'pcv', 'wbcCount', 'rbcCount',
            'hypertension', 'diabetes', 'coronaryArtery', 'appetite',
            'pedalEdema', 'anemia','targetclass'
        ]

        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({'error': f'Missing fields: {", ".join(missing_fields)}'}), 400

        # Check if the data already exists in the database
        existing_data = collection.find_one({key: data[key] for key in required_fields})
        if existing_data:
            # If data already exists, make the prediction and return the result
            features = np.array([data['age'], data['bp'], data['gravity'], data['albumin'], data['sugar'],
                                 data['rbc'], data['pusCell'], data['pusCellClumps'], data['bacteria'],
                                 data['bloodUrea'], data['serumCreatinine'], data['sodium'], data['potassium'],
                                 data['hemoglobin'], data['pcv'], data['wbcCount'], data['rbcCount'],
                                 data['hypertension'], data['diabetes'], data['coronaryArtery'], data['appetite'],
                                 data['pedalEdema'], data['anemia'],data['targetclass']]).reshape(1, -1)

            prediction = model.predict(features)
            prediction_result = prediction.item()  # Convert to native Python int

            prediction_label = "NO CKD" if prediction_result == 1 else "CKD"

            return jsonify({'prediction': prediction_label, 'message': 'Data already exists'})

        # If data does not exist, convert the data to a format suitable for the model
        features = np.array([data['age'], data['bp'], data['gravity'], data['albumin'], data['sugar'],
                             data['rbc'], data['pusCell'], data['pusCellClumps'], data['bacteria'],
                             data['bloodUrea'], data['serumCreatinine'], data['sodium'], data['potassium'],
                             data['hemoglobin'], data['pcv'], data['wbcCount'], data['rbcCount'],
                             data['hypertension'], data['diabetes'], data['coronaryArtery'], data['appetite'],
                             data['pedalEdema'], data['anemia'],data['targetclass']]).reshape(1, -1)

        # Make the prediction
        prediction = model.predict(features)
        prediction_result = prediction.item()  # Convert to native Python int

        # Map the prediction to "CKD" or "NO CKD"
        prediction_label = "NO CKD" if prediction_result == 1 else "CKD"

        # Add the prediction result to the data dictionary
        data['prediction'] = prediction_label

        # Insert the data (with the prediction result) into MongoDB
        collection.insert_one(data)

        # Return the prediction result and a success message
        return jsonify({'prediction': prediction_label, 'data_stored': True})

    except Exception as e:
        # Log the exception for debugging
        print(f"Error: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)




