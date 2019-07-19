import { multiplicarAction, incrementarAction, restarAction, dividirAction, resetAction } from "./contador/contador.actions";
import { Action } from "./ngrx-fake/ngrx";


function reduce(state = 10, action: Action) {

    switch (action.type) {
        case 'INCREMENTAR':
            return state += 1;
        case 'RESTAR':
            return state -= 1;
        case 'MULTIPLICAR':
            return state * action.payload;
        case 'DIVIDIR':
            return state / action.payload;
        case 'RESET':
            return 0;
        default:
            return state;
    }
}
console.log(reduce(9, incrementarAction)); //10
console.log(reduce(9, restarAction)); //8
console.log(reduce(9, multiplicarAction)); //18
console.log(reduce(9, dividirAction)); //3
console.log(reduce(9, resetAction)); //0