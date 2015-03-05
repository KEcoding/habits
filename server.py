from flask import Flask, render_template
from api import api_blueprint

app = Flask(__name__)
app.register_blueprint(api_blueprint, url_prefix='/api')

@app.route('/')
def main():
    return render_template('app.html')

if __name__ == '__main__':
    app.run(debug=True)