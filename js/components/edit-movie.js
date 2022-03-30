import Alert from "./alert.js";

export default class EditMovieComponent {
    constructor(){
        this.modal = document.getElementById('editModal');
        this.btn = document.getElementById('saveEdit');
        this.titleInputEdit = document.getElementById('titleEdit');
        this.yearInputEdit = document.getElementById("yearEdit");

        this.alert = new Alert();
    }

    onClick( callback ){
        this.btn.onclick = () => {
            if(this.titleInputEdit.value === '' || this.yearInputEdit.value === ''){
                window.alert('Title and year must be filled');
            } else {
                callback(this.modal.getAttribute('caller-index'), this.titleInputEdit.value, this.yearInputEdit.value);
            }
        };
    }
}