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
    console.log('added')
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
})

//Every time the enter button is pressed, or when enter is pressed, call the operate function
enterBtn.addEventListener('click', () =>{
    inputArray.push(tempInput.join());
    tempInput = [];
    operate();
})

document.addEventListener('keyup', (e) =>{
    if(e.code == 'Enter'){
        inputArray.push(tempInput.join());
        tempInput = [];
        operate();
    }
})
//Declare the operate function that takes an operator and two numbers
function operate(){
    //Declare an array that is equal to the return value of getEquation()
    let equations = getEquation();
    console.log(equations);
    //For each item in the equations array, check what the operator is and if it's '*' or '/', call the appropriate function on the numbers in the array. Make the outputValue the answer, and make num1 of the next equation the answer
    let answer = null;
    for(let i=0; i<equations.length; i++){
        //If the previous answer isn't null, make that the value of num1
        if(answer != null){
            equations[i].num1 = answer;
        }
        switch(equations[i].operator){
            case '*': answer = multiply(equations[i].num1, equations[i].num2)
            finalizeEquation(answer);
            break;
            case '/': answer = divide(equations[i].num1, equations[i].num2)
            finalizeEquation()
            console.log(answer);
            break;
        }
    }
    //Then, do the same thing again but check if the operator is '+' or '-'
    for(let i=0; i<equations.length; i++){
        //If the previous answer isn't null, make that the value of num1
        if(answer != null){
            equations[i].num1 = answer;
        }
        switch(equations[i].operator){
            case '+': answer = add(equations[i].num1, equations[i].num2)
            finalizeEquation()
            console.log(answer);
            break;
            case '/': answer = subtract(equations[i].num1, equations[i].num2)
            finalizeEquation()
            console.log(answer);
            break;
        }
    }

    //Declare the finalizeEquation() function. THis function simply prevents repeated code when solving the simplified equations above
    function finalizeEquation(answer){
        outputValue = answer;
        output()
    }
}

//Declare getEquation(), which returns an array of objects with operator, num1, and num2 as properties
function getEquation(){
    console.log(inputArray);
    let equationsArr = [];
    for(let i=0; i<inputArray.length; i++){
        if(inputArray[i] == '+' || inputArray[i] == '-' || inputArray[i] == '*' || inputArray[i] == '/'){
            equationsArr.push({ 
                num1: parseFloat(inputArray[i-1]),
                operator: inputArray[i],
                num2: parseFloat(inputArray[i+1])
            })
        }
    }
    return equationsArr;
}
//If the clear button is pressed, clear the output value, inputArray, and tempInput.

//Declare the output() function, which makes the outputBar's textContent the output
function output(){
    console.log('output')
    outputBar.textContent = outputValue;
}