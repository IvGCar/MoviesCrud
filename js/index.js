import MovieModel from './model.js';
import View from './view.js';

document.addEventListener('DOMContentLoaded', () => {
    const model = new MovieModel();
    const view = new View();

    view.setModel(model);
    model.setView(view);

    view.render();
});