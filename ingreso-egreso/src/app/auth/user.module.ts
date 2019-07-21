

export class User {
    constructor(public nombre: string,
        public email: string,
        public uid: string) {
        this.nombre = nombre;
        this.email = email;
        this.uid = uid;
    }
}
