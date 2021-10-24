const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const allClear = document.querySelector(".AC");
const deleteResult = document.querySelector(".delete");
const equal=document.querySelector(".equal");
const previousResult = document.querySelector(".previous-result");
const currentResult = document.querySelector(".current-result");


let currentAction = '';
let previousAction = '';
let operation = undefined;

const solution = () => {
    let action
    if(!previousAction || !currentAction){
        return 
    }

    const previous = parseFloat(previousAction)
    const current = parseFloat(currentAction)

    if(isNaN(previous) || isNaN(current)){
        return
    }

    switch (operation){
        case '+':
            action = previous + current
            break;
        case '-':
            action = previous - current
            break;
        case '×':
            action = previous * current
            break;
        case '÷':
        if(current === 0){
            eraseResult()
            return
        }
            action = previous / current
            break;
        case '%':
            action = previous /100 * current
            break;
        default:
            return
    }
    currentAction = action;
    operation = undefined;
    previousAction = '';
}



const chooseOperation = (operator) =>{
    if(currentAction === ''){
        return 
    }
    if(previousAction !==''){
        const previous = previousResult.innerHTML
        if(currentAction.toString()=== '0' && previous[previous.length-1]==='÷'){
            eraseResult()
            return
        }
        solution()
    }
    operation = operator
    previousAction = currentAction
    currentAction = ''
}


const updateTheResult = () =>{
    currentResult.innerHTML = currentAction
    if(operation != null){
        previousResult.innerHTML = previousAction + operation
    } else {
        previousResult.innerHTML = ''
    }
}

const addNumber = (number) =>{
    if(number ==="•"){
        if(currentAction.includes('.')) {
            return
        }
        number = '.'
    }
    currentAction = currentAction.toString() + number.toString()
}

const deleteTheNumber = () => {
    currentAction = currentAction.toString().slice(0, -1)
}

const eraseResult = () => {
    currentAction = '';
    previousAction = '';
    operation = undefined;
}

numbers.forEach((number)=>{
    number.addEventListener('click', () => {
        addNumber(number.innerHTML)
        updateTheResult()
    })
});

deleteResult.addEventListener('click', () =>{
    deleteTheNumber()
    updateTheResult()
})

operators.forEach((operator)=>{
    operator.addEventListener('click',( )=>{
        chooseOperation(operator.innerHTML)
        updateTheResult()
    })
})

equal.addEventListener('click', () => {
    solution()
    updateTheResult()
})

allClear.addEventListener('click',() => {
    eraseResult()
    updateTheResult()
})