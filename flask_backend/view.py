from flask import Blueprint, render_template

view = Blueprint(
    "view",
    __name__,
    static_folder="flask_backend/static",
    template_folder="flask_backend/templates",
)


@view.route("/")
def view_page():
    return render_template("index.html")
