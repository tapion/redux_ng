interface Action {
    type: string;
    payload?: any;
}

const incrementarAction: Action = {
    type: 'INCREMENTAR'
}
const restarAction: Action = {
    type: 'RESTAR'
}
const multiplicarAction: Action = {
    type: 'MULTIPLICAR',
    payload: 2
}
const dividirAction: Action = {
    type: 'DIVIDIR',
    payload: 3
}

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
        default:
            return state;
    }
}
console.log(reduce(9, incrementarAction)); //10
console.log(reduce(9, restarAction)); //8
console.log(reduce(9, multiplicarAction)); //18
console.log(reduce(9, dividirAction)); //3