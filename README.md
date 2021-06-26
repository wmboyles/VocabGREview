# VocabGREview

VocabGREview is a website to help you review vocabulary words like you might find on the GRE.

## How to Run

If the Flask server is currently running in debug mode and you make any changes to Flask .py files, the Flask server will automatically restart.
If you have not yet started the Flask server, you can do so by going to the project root folder and running

```bash
py app.py
```

If you made any changes to React components, you'll need to build the project so that Flask can serve your changes.
Do this by going to the `react_frontend` folder and running

```bash
npm run build
```

If your Flask server is already running, these new changes will automatically be picked up by the Flask server without needing to restart it.
