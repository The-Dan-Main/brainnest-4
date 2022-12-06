'strict use'
const allButtons = document.querySelectorAll("button.calculator-button"),
    functionButtons = document.querySelectorAll("button.function-button"),
    operatorButtons = document.querySelectorAll("button.operator-button"),
    numberButtons = document.querySelectorAll("button.number-button"),
    display = document.querySelector("aside#display")

//  allButtons.forEach(button => {
//      button.addEventListener("click", (e) => {
//         //  console.log(e.target.textContent);
//      })
//  });



let total,
    subtotal,
    previousInputNumber,
    currentInputNumber,
    currentOperator,
    output

const updateDisplay = () => { 
    display.textContent = <output></output>
 }






























const handleKeyboardInput = (e) => {
console.log(e);
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(e.key)) {
        console.log(`Number pressed: ${e.key}`)
    } else if (e.key === "=") {
        console.log(`Evaluate pressed: ${e.key}`)
    } else if (["+", "-", "*", "/"].includes(e.key)) {
        console.log(`Operator pressed: ${e.key}`)
    } else if (e.key === "Delete") {
        console.log(`clear pressed!`);
    }
}












window.addEventListener("keyup", (e) => {
    handleKeyboardInput(e)
})

functionButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        console.log(`I am a function: ${e.target.textContent}`);
    })
});

operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        console.log(`I am a operator: ${e.target.textContent}`);
    })
});

numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        console.log(`I am a number: ${e.target.textContent}`);
    })
});