from flask import Flask

from flask_backend.api import api
from flask_backend.view import view

app = Flask(
    __name__,
    static_folder="flask_backend/static",
    template_folder="flask_backend/templates",
)
app.register_blueprint(api, url_prefix="/api")
app.register_blueprint(view)

if __name__ == "__main__":
    app.run()
