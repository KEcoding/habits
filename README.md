# habits
A lightweight habit tracker with a simple REST API.

## Features
* Support for SQLite, MySQL, and Postgres databases
* Simple web interface
* [A REST-ful JSON API](#api)
* Easy full JSON export

![](http://i.imgur.com/IINq7ly.jpg)

## Installation and Usage
```bash
pip install habits # install via pip
habits # start the web server, browse to localhost:5000
```

## API
```
Base URL: http://<your-habits-instance-hostname>/api/

Endpoints:
GET /habits - Get all habits
GET /habits/names - Get a mapping of habit slugs to names
GET /habits/<habit_slug> - Get the slug and name for a habit
POST /habits/<habit_slug> - Make a new habit
GET /entries/export - Get all entries
GET /entries/<YYYY-MM-DD date string> - Get entry for a day
POST /entries/<YYYY-MM-DD date string> - Set entry for a day
POST /entries/<YYYY-MM-DD>/<habit_slug> - Set the value for a habit on a day
```

## Install from Source
```bash
git clone https://github.com/csu/habits.git
cd habits
pip install -r requirements.txt
bower install
python habits/server.py
```