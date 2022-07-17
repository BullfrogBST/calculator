//Create references to the number buttons, operator buttons, and output box
const outputBar = document.querySelector('.output-bar');
const numBtns = document.querySelectorAll('.num-btn');
const opBtns = document.querySelectorAll('.operator');
const enterBtn = document.querySelector('.enter-btn');
//Create an array for the numbers and operators entered, and one for the whole input
let inputArray = [];
let tempInput = [];
//Create the add function that takes an array
function add(arr){
    return arr.reduce((sum, item) =>{
        return sum + item;
    });
};
//Create the subtract function that takes an array
function subtract(arr){
    return arr.reduce((result, item) =>{
        return result - item;
    });
};
//Create the multiply function that takes an array
function multiply(arr){
    return arr.reduce((product, item) =>{
        return product * item;
    });
};
//Create the divide function that takes an array
function divide(arr){
    return arr.reduce((quotient, item) =>{
        return quotient / item;
    });
};
//Every time a button is pressed, send the cooresponding value to the input array and display it to the output box
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
            outputLength = 0;
            break;
            case 'minus': outputBar.textContent = '';
            inputArray.push(tempInput.join(''), '-');
            outputLength = 0;
            break;
            case 'times': outputBar.textContent = '';
            inputArray.push(tempInput.join(''), '*');
            outputLength = 0;
            break;
            case 'divide': outputBar.textContent = '';
            inputArray.push(tempInput.join(''), '/');
            outputLength = 0;
            break;
        }
    })
})
document.addEventListener('keydown', (e) =>{
    console.log(inputArray)
    switch(e.key){
        case '+': outputBar.textContent = '';
        inputArray.push(tempInput.join(''), '+');
        outputLength = 0;
        break;
        case '-': outputBar.textContent = '';
        inputArray.push(tempInput.join(''), '-');
        outputLength = 0;
        break;
        case '*': outputBar.textContent = '';
        inputArray.push(tempInput.join(''), '*');
        outputLength = 0;
        break;
        case '/': outputBar.textContent = '';
        inputArray.push(tempInput.join(''), '/');
        outputLength = 0;
        break;
    }
})

//Every time the enter button is pressed, or when enter is pressed, call the operate function and pass the input array

//Declare the operate function that takes the input array

//For each item in the input array, if the next item is an operator, then add the previous number to an array

//Call the function that the operator matches

//If the input array's empty, display the result to the output box and exit the function

//If there's any more items in the array, repeat the process


//If the clear button is pressed, clear the output box.
