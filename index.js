//Create references to the number buttons, operator buttons, and output box
const outputBar = document.querySelector('.output-bar');
const numBtns = document.querySelectorAll('.num-btn');
const opBtns = document.querySelectorAll('.operator');
const enterBtn = document.querySelector('.enter-btn');
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
        console.log(tempInput)
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
    //Make an array with the equations, using the getEquation() array

    //Use a for loop to implement order of operations, and while the input has the operand, perform the according function on it. Set the outputValue to the answer

    //Declare getEquation(), which returns an array of objects with operator, num1, and num2 as properties
    function getEquation(){
        console.log(inputArray)
        //Declare equations array
        const equations = [];
        for(let i=0; i<inputArray.length; i++){
            //Check if the current index in the array is an operator
            if(isOperator(inputArray[i])){
                console.log(inputArray[i-1]);
                //Push an object with the number before the operator as "num1", the operator as "operator", and the number after the operator as "num2"
                equations.push({
                    num1: parseFloat(inputArray[i-1]),
                    operator: inputArray[i],
                    num2: parseFloat(inputArray[i+1])
                })
            }
        }
        //Return the equations array
        return equations;
    }

    //Declare the finalizeEquation() function. THis function simply prevents repeated code when solving the simplified equations above
    function finalizeEquation(answer){
        outputValue = answer;
        output()
    }
}


//Declare isOperator, which just returns true if the argument is an operator
function isOperator(item){
    return item == '+' || item == '-' || item == '*' || item == '/';
}
//If the clear button is pressed, clear the output value, inputArray, and tempInput.

//Declare the output() function, which makes the outputBar's textContent the output
function output(){
    outputBar.textContent = outputValue;
}