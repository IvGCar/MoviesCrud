import AddMovieComponent from "./components/add-movie.js";
import EditMovieComponent from "./components/edit-movie.js";

export default class View {
    constructor(){
        this.model = null;
        this.table = document.getElementById('table');

        this.addMovieComponent = new AddMovieComponent();
        this.addMovieComponent.onClick( (t,y) => this.addMovie(t,y) );

        this.editMovieComponent = new EditMovieComponent();
        this.editMovieComponent.onClick( (i,t,y) => this.editMovie(i,t,y) );
    }

    setModel(model){
        this.model = model;
    }

    render() {
        const movies = this.model.getMovies();
        movies.forEach(movie => this.createRow(movie));
    }

    addMovie(title, year){
        const movie = this.model.addMovie(title, year);
        this.createRow(movie);
    }

    removeMovie(id){
        this.model.removeMovie(id);
        this.removeRow(id);
    }

    setId(id){
        var currentId = id;
        const modal = document.getElementById('editModal');
        modal.setAttribute('caller-index', currentId);
    }

    editMovie(index, title, year){
        this.model.editMovie(index, title, year);
        this.reloadRows();
    }

    toogleViewIt(id){
        this.model.toogleViewIt(id);
    }

    createRow(movie){

        const row = this.table.insertRow();
        row.setAttribute('id', movie.id);
        row.innerHTML = `
            <td>${movie.title}</td>
            <td>${movie.year}</td>
            <td class="text-center"></td>
            <td class="text-right"></td>
        `;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = movie.viewIt;
        checkbox.onclick = () => this.toogleViewIt(movie.id);
        row.children[2].appendChild(checkbox);

        const editBtn = document.createElement('button');
        editBtn.classList.add('btn', 'btn-primary', 'mb-1', 'ml-1');
        editBtn.setAttribute('data-bs-toggle', 'modal');
        editBtn.setAttribute('data-bs-target', '#editModal');  
        editBtn.innerHTML = '<i class="fa fa-pencil"></i>';
        editBtn.onclick = () =>this.setId(movie.id);
        row.children[3].appendChild(editBtn);

        const removeBtn = document.createElement('button');
        removeBtn.classList.add('btn', 'btn-danger', 'mb-1', 'ml-1');
        removeBtn.innerHTML = '<i class="fa fa-trash"></i>';
        removeBtn.onclick = () => this.removeMovie(movie.id);
        row.children[3].appendChild(removeBtn);

    }

    removeRow(id){
        document.getElementById(id).remove();
    } 

    reloadRows(){
        this.model.getMovies().forEach(e => {
            this.removeRow(e.id);
        });
        this.render();
    }    
}