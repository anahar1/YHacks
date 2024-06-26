from flask import Flask, request
from flask_cors import CORS
from openai import OpenAI
import os
from environs import Env


app = Flask(__name__)
CORS(app)

@app.route('/hello')
def hello():
    env = Env()
    env.read_env() # read .env file, if it exists
    api_key = os.getenv("TEST_API_KEY")
    # Get the prompt string from the query parameters
    prompt = request.args.get('prompt', '')
    test = "Based on your profile, I would rate it a solid 8 out of 10. Your extensive work experience at Google as a Senior Engineer, coupled with a perfect GPA from Yale in Computer Science, speaks volumes about your expertise and dedication. Your project, Gemini, adds further credibility to your profile. To improve, consider highlighting specific achievements or impactful projects within your work experience. Additionally, showcasing any leadership roles or collaboration experiences could enhance your profile. It's also beneficial to quantify your accomplishments where possible to provide tangible evidence of your skills and contributions. Overall, your profile is impressive, but adding more detail and specificity can make it even stronger."
    print("HELLO", prompt)
    # Create an instance of the OpenAI client with your API key
    client = OpenAI(api_key=api_key)

    # Generate a completion using the GPT-3.5 model
    completion = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt}   # Use the provided prompt as the user's message
        ]
    )

    # Return the response generated by the AI model
    if completion.choices[0].message.content:
        return test
    return completion.choices[0].message.content

if __name__ == '__main__':
    app.run(debug=True)
