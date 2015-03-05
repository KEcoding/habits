from flask import Flask
from flask.ext.restful import Resource, Api, reqparse
import dataset

db = dataset.connect('sqlite:///habits.db')
db['habits'].create_index(['slug'])
db['entries'].create_index(['date'])

app = Flask(__name__)
api = Api(app)

class Habit(Resource):
    def get(self, slug):
        return db['habits'].find_one(slug=slug)

    def post(self, slug):
        parser = reqparse.RequestParser()
        parser.add_argument('name', type=str, required=True)
        args = parser.parse_args()

        habit_id = db['habits'].insert(dict(name=args['name'], slug=slug))
        return db['habits'].find_one(id=habit_id)

class Entry(Resource):
    def get(self, date):
        return list(db['entries'].find(date=date))

    def post(self, date):
        parser = reqparse.RequestParser()
        parser.add_argument('habit', type=str, action='append', required=True)
        args = parser.parse_args()

        entry = dict()
        entry['date'] = date
        for habit in args['habit']:
            entry[habit] = True
        entry_id = db['entries'].insert(entry)
        return db['entries'].find_one(id=entry_id)

api.add_resource(Habit, '/<string:slug>')
api.add_resource(Entry, '/entries/<string:date>')

if __name__ == '__main__':
    app.run(debug=True)