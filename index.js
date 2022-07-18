//Create references to the number buttons, operator buttons, and output box
const outputBar = document.querySelector('.output-bar');
const numBtns = document.querySelectorAll('.num-btn');
const opBtns = document.querySelectorAll('.operator');
const enterBtn = document.querySelector('.enter-btn');
//Create an array for the numbers and operators entered, and one for the whole input
let inputArray = [];
let tempInput = [];

let output = '';
//Create the add function that takes an array
function add(num1, num2){
    console.log('added')
    return parseFloat(num1) + parseFloat(num2);
}
//Create the subtract function that takes an array
function subtract(num1, num2){
    return parseFloat(num1) - parseFloat(num2);
}
//Create the multiply function that takes an array
function multiply(num1, num2){
    return parseFloat(num1) * parseFloat(num2);
}
//Create the divide function that takes an array
function divide(num1, num2){
    return parseFloat(num1) / parseFloat(num2);
}
//Every time a button is pressed, send the cooresponding value to the input array and set the output value to the button pressed
let outputLength = 1;
numBtns.forEach(button =>{
    button.addEventListener('click', (e) =>{
        if(outputLength <= 12){
            input = e.target.getAttribute('id');
            tempInput.push(input)
            outputBar.textContent += input;
            outputLength++
        }
    })
})
document.addEventListener('keydown', (e) =>{
    if(outputLength <= 12){
        if(e.key >= 0 && e.key <= 9){
            input = e.key;
            tempInput.push(input)
            outputBar.textContent += input;
            outputLength++
        }
    }
})

opBtns.forEach(button =>{
    button.addEventListener('click', (e) =>{
        switch(e.target.getAttribute('id')){
            case 'plus': outputBar.textContent = '';
            inputArray.push(tempInput.join(''), '+');
            tempInput = [];
            outputLength = 0;
            break;
            case 'minus': outputBar.textContent = '';
            inputArray.push(tempInput.join(''), '-');
            tempInput = [];
            outputLength = 0;
            break;
            case 'times': outputBar.textContent = '';
            inputArray.push(tempInput.join(''), '*');
            tempInput = [];
            outputLength = 0;
            break;
            case 'divide': outputBar.textContent = '';
            inputArray.push(tempInput.join(''), '/');
            tempInput = [];
            outputLength = 0;
            break;
        }
    })
})
document.addEventListener('keydown', (e) =>{
    switch(e.key){
        case '+': outputBar.textContent = '';
        inputArray.push(tempInput.join(''), '+');
        tempInput = [];
        outputLength = 0;
        break;
        case '-': outputBar.textContent = '';
        inputArray.push(tempInput.join(''), '-');
        tempInput = [];
        outputLength = 0;
        break;
        case '*': outputBar.textContent = '';
        inputArray.push(tempInput.join(''), '*');
        tempInput = [];
        outputLength = 0;
        break;
        case '/': outputBar.textContent = '';
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
    if(e.key == 'enter'){
        inputArray.push(tempInput.join());
        tempInput = [];
        operate();
    }
})
//Declare the operate function that takes an operator and two numbers
function operate(){
    //Declare an array that is equal to the return value of getEquation()

    //For each item in the equations array, check what the operator is and if it's '*' or '/', call the appropriate function on the numbers in the array. Set the output value to the answer

    //Then, do the same thing again but check if the operator is '+' or '-'

    //Call the output() function
    
}

//If the clear button is pressed, clear the output box.

//Declare the output() function, which makes the outputBar's textContent the output