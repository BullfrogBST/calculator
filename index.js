//Create references to the number buttons, operator buttons, and output box
const outputBar = document.querySelector('.output-bar');
const numBtns = document.querySelectorAll('.num-btn');
const opBtns = document.querySelectorAll('.operator');
const enterBtn = document.querySelector('.enter-btn');
const clearBtn = document.querySelector('.clear-btn');
//Create an array for the numbers and operators entered, and one for the whole input
let inputArray = [];
let tempInput = [];

let outputValue = '';
//Create the add function that takes an array
function add(num1, num2){
    return num1 + num2;
}
//Create the subtract function that takes an array
function subtract(num1, num2){
    return num1 - num2;
}
//Create the multiply function that takes an array
function multiply(num1, num2){
    return num1 * num2;
}
//Create the divide function that takes an array
function divide(num1, num2){
    return num1 / num2;
}
//Every time a button is pressed, send the cooresponding value to the input array and set the output value to the button pressed
let outputLength = 1;
numBtns.forEach(button =>{
    button.addEventListener('click', (e) =>{
        if(outputLength <= 12){
            input = e.target.getAttribute('id');
            tempInput.push(input)
            outputValue += input;
            output();
            outputLength++
        }
    })
})
document.addEventListener('keydown', (e) =>{
    if(outputLength <= 12){
        if(e.key >= 0 && e.key <= 9){
            input = e.key;
            tempInput.push(input)
            outputValue += input;
            output();
            outputLength++
        }
    }
})

opBtns.forEach(button =>{
    button.addEventListener('click', (e) =>{
        switch(e.target.getAttribute('id')){
            case 'plus': outputValue = '';
            output();
            inputArray.push(tempInput.join(''), '+');
            tempInput = [];
            outputLength = 0;
            break;
            case 'minus': outputValue = '';
            output();
            inputArray.push(tempInput.join(''), '-');
            tempInput = [];
            outputLength = 0;
            break;
            case 'times': outputValue = '';
            output();
            inputArray.push(tempInput.join(''), '*');
            tempInput = [];
            outputLength = 0;
            break;
            case 'divide': outputValue = '';
            output();
            inputArray.push(tempInput.join(''), '/');
            tempInput = [];
            outputLength = 0;
            break;
        }
    })
})
document.addEventListener('keydown', (e) =>{
    if(isOperator(e.code)){
        switch(e.key){
            case '+': outputValue = '';
            output();
            inputArray.push(tempInput.join(''), '+');
            tempInput = [];
            outputLength = 0;
            break;
            case '-': outputValue = '';
            output();
            inputArray.push(tempInput.join(''), '-');
            tempInput = [];
            outputLength = 0;
            break;
            case '*': outputValue = '';
            output();
            inputArray.push(tempInput.join(''), '*');
            tempInput = [];
            outputLength = 0;
            break;
            case '/': outputValue = '';
            output();
            inputArray.push(tempInput.join(''), '/');
            tempInput = [];
            outputLength = 0;
            break;
        }
    }
})

//Every time the enter button is pressed, or when enter is pressed, call the operate function
enterBtn.addEventListener('click', () =>{
    inputArray.push(tempInput.join(''));
    tempInput = [];
    operate();
})

document.addEventListener('keyup', (e) =>{
    if(e.code == 'Enter'){
    inputArray.push(tempInput.join(''));
    tempInput = [];
    operate();
    }
})

//Declare the operate function that takes an operator and two numbers
function operate(){
    console.log(inputArray)
    //Make an array with the equations and sort it, and also make an array with the equations in the original order
    let equations = getEquation();
    let sortedEquations = getEquation();
    sortedEquations = sortEquations(sortedEquations);

    function sortEquations(toSort){
        return toSort.sort((item) =>{
            return item.operator == '*' || item.operator == '/' ? 0 :
            item.operator == '+' || item.operator == '-' ? 1 : 0
        })
    }
    //Use a for loop to implement order of operations, and while the input has the operand, perform the according function on it. Set the outputValue to the answer and declare the equation as solved
    let answer = null;
    for(let i=0; i<sortedEquations.length; i++){
        console.log(sortedEquations[i-1] || sortedEquations[i])
        for(let j=0; j<equations.length; j++){
            //Check if the current equation is equivelant to the current unsorted equation
            //Make temporary arrays that will be checked and stringified later, so the original objects won't be altered
            const tempSortedEquations = {...sortedEquations, answer: undefined};
            const tempEquations = {...equations, answer: undefined};
            //Check if they are identical
            if(JSON.stringify(tempEquations[j]) == JSON.stringify(tempSortedEquations[i])){
                //If the next question answer isn't null, then make num2 of sortedEquation[i] the answer. Do the same with the one before it
                if(j < equations.length - 1){
                    console.log(Object.values(equations[j+1]));
                    console.log('a')
                    if(equations[j+1].answer != null){
                        console.log('Checked')
                        equations[j].num2 = equations[j+1].answer;
                    }
                } 
                if(j > 0){
                    console.log('b');
                    if(equations[j-1].answer != null){
                        equations[j].num1 = equations[j-1].answer;
                    }
                }
                //Sync sortedEquations with equations
                sortedEquations[i] = equations[j];
            }
        }
        switch(sortedEquations[i].operator){
            case '*': answer = multiply(sortedEquations[i].num1, sortedEquations[i].num2);
            sortedEquations[i].answer = answer;
            break;
            case '/': answer = divide(sortedEquations[i].num1, sortedEquations[i].num2);
            sortedEquations[i].answer = answer;
            break;
            case '+': answer = add(sortedEquations[i].num1, sortedEquations[i].num2);
            sortedEquations[i].answer = answer;
            break;
            case '-': answer = subtract(sortedEquations[i].num1, sortedEquations[i].num2)
            sortedEquations[i].answer = answer;
        }
        //Sync equations and sortedEquations answers
        for(let j=0; j<equations.length; j++){
            const tempSortedEquation = {...sortedEquations[i], answer: undefined};
            const tempEquation = {...equations[j], answer: undefined};
            
            if(JSON.stringify(tempSortedEquation) == JSON.stringify(tempEquation)){
                equations[j].answer = sortedEquations[i].answer;
                console.log(equations)
            }
        }
    }
    //Set the inputArray to an array with the stringified answer, and in the getEquation() function, remove empty strings from the array before getting the equations
    inputArray = [answer.toString()]
    console.log(inputArray)

    outputValue = answer;
    output();
    //Declare getEquation(), which returns an array of objects with operator, num1, and num2 as properties
    function getEquation(){
        //Declare equations array
        const equations = [];
        for(let i=0; i<inputArray.length; i++){
            //Remove empty strings from inputArray, to fix problems with extra empty items being added to it
            if(inputArray[i] == ''){
                inputArray.splice(i, 1);
            }
            //Check if the current index in the array is an operator
            if(isOperator(inputArray[i])){
                //Push an object with the number before the operator as "num1", the operator as "operator", and the number after the operator as "num2"
                equations.push({
                    num1: parseFloat(inputArray[i-1]),
                    operator: inputArray[i],
                    num2: parseFloat(inputArray[i+1]),
                    answer: null
                })
            }
        }
        //Return the equations array
        return equations;
    }
}

//Add a clear() function, and call it when the CLEAR button is pressed


//Declare isOperator, which just returns true if the argument is an operator
function isOperator(item){
    return item == '+' || item == '-' || item == '*' || item == '/';
}
//If the clear button is pressed, clear the output value, inputArray, and tempInput.
clearBtn.addEventListener('click', clear);

function clear(){
    outputValue = '';
    output();

    inputArray = [];
    tempInput = [];
}
//Declare the output() function, which makes the outputBar's textContent the output
function output(){
    outputBar.textContent = outputValue;
}