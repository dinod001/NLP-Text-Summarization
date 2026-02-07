from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
from textSummarizer.pipeline.prediction import PredictionPipeline
import os

app = Flask(__name__)
CORS(app)

# Pre-initialize pipeline for performance
pipeline_obj = PredictionPipeline()

class ClientApp:
    def __init__(self):
        self.filename = "input.txt"
        self.classifier = pipeline_obj

@app.route("/", methods=['GET'])
@cross_origin()
def index():
    return render_template('index.html')

@app.route("/train", methods=['GET','POST'])
@cross_origin()
def trainRoute():
    try:
        os.system("python main.py")
        return "Training successful !!"
    except Exception as e:
        return f"Error Occurred! {e}"

@app.route("/predict", methods=['POST'])
@cross_origin()
def predictRoute():
    try:
        text = request.json['data']
        obj = PredictionPipeline()
        predict = obj.predict(text)
        return jsonify({"summary": predict})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == "__main__":
    clApp = ClientApp()
    app.run(host='0.0.0.0', port=8080)
