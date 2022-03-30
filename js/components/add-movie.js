import Alert from "./alert.js";

export default class AddMovieComponent {
    constructor(){
        this.btn = document.getElementById('add');
        this.titleInput = document.getElementById('title');
        this.yearInput = document.getElementById('year');

        this.alert = new Alert();
    }

    onClick( callback ){
        this.btn.onclick = () => {
            if(this.titleInput.value === '' || this.yearInput.value === ''){
                this.alert.show('Title and year are required');
            } else {
                this.alert.hide();
                callback(this.titleInput.value, this.yearInput.value);
            }
        };
    }
}