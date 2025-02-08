from flask import Flask, request, jsonify
from openai import OpenAI
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")


@app.route('/chat', methods=['GET'])
def chat():
    prompt = request.args.get('prompt')
    if not prompt:
        return jsonify({"error": "Missing prompt parameter"}), 400

    completion = client.chat.completions.create(
        model="llama-3.2-1b-instruct",
        messages=[{"role": "user", "content": " you are an AI assistant from 'Research in Action Association'  that summarizes and recommends articles or events and that the prompt of the user : "+str(prompt)}],
        temperature=0.7,
    )

    response_content = completion.choices[0].message.content

    return jsonify({"response": response_content})


@app.route("/") 
def hello(): 
    return render_template('index.html',  
                           message=message) 


if __name__ == '__main__':
    app.run(debug=True)
