'strict use'
const allButtons = document.querySelectorAll("button.calculator-button"),
    functionButtons = document.querySelectorAll("button.function-button"),
    operatorButtons = document.querySelectorAll("button.operator-button"),
    numberButtons = document.querySelectorAll("button.number-button"),
    display = document.querySelector("aside#display"),
    operatorIndicator = document.querySelector("#operator-indicator")

let total,
    leftInputNumber,
    rightInputNumber,
    currentOperator,
    output

const updateDisplay = () => {
    display.textContent = output
}

const handleNumberInput = (number) => {
    if (currentOperator === undefined) {
        if (leftInputNumber === undefined) {
            leftInputNumber = number
            output = leftInputNumber
            updateDisplay()
        } else {
            if (leftInputNumber.includes(".") && number === ".") return console.log("already a period there buddy!")
            leftInputNumber += number
            output = leftInputNumber
            updateDisplay()
        }
    } else {
        operatorIndicator.textContent = ""
        if (rightInputNumber === undefined) {
            rightInputNumber = number
            output = `${leftInputNumber}   ${currentOperator}   ${rightInputNumber}`
            updateDisplay()

        } else {
            if (rightInputNumber.includes(".") && number === ".") return console.log("already a period there buddy!")
            rightInputNumber += number
            output = `${leftInputNumber}   ${currentOperator}   ${rightInputNumber}`
            updateDisplay()
        }
    }
}

const handleOperatorInput = (operator) => {
    if (currentOperator !== undefined && rightInputNumber !== undefined) {
        evaluateTotal()
        currentOperator = operator
        operatorIndicator.textContent = operator
        updateDisplay()
    } else {
        if (leftInputNumber !== undefined) {
            operatorIndicator.textContent = operator
            currentOperator = operator
            output = eval(output)
            updateDisplay()
        } else {
            output = "Please enter a number first"
            updateDisplay()
        }
    }

}

const handleFunctionInput = (inputFunction) => {
    if (inputFunction === "AC") {
        clearDisplay()
    } else if (inputFunction === "+/-") {
        revertPolationOfNumber()
    } else if (inputFunction === "=") {
        evaluateTotal()
    }
}

const revertPolationOfNumber = () => {
    if (leftInputNumber === undefined) { return null }
    else if (rightInputNumber === undefined) {
        leftInputNumber = leftInputNumber * (-1)
        output = leftInputNumber
        updateDisplay()
    } else {
        rightInputNumber = rightInputNumber * (-1)
        output = `${leftInputNumber}   ${currentOperator}   ${rightInputNumber}`
        updateDisplay()
    }

}

const evaluateTotal = () => {
    if (output === undefined || output === "") return null
    const newTotal = `${eval(output)}`
    console.log(newTotal);
    if (newTotal == NaN || newTotal == Infinity) {
        output = "Your math just destroyed a city!"
        updateDisplay()
        setTimeout(() => {
            clearDisplay()
        }, 1000);
        return null
    }
    const lengthAfterPeriod = newTotal.length - newTotal.indexOf(".") - 1
    if (newTotal.includes(".") && lengthAfterPeriod > 10) {
        output = eval(output).toFixed(10)
    } else if (newTotal.includes(".") && lengthAfterPeriod < 10) {
        output = eval(output).toFixed(lengthAfterPeriod)
    } else {
        output = eval(output)
    }

    total = `${output}`
    leftInputNumber = `${output}`
    rightInputNumber = undefined
    currentOperator = undefined
    operatorIndicator.textContent = ""
    updateDisplay()
}

const clearDisplay = () => {
    if (output !== undefined) {
        output = "erasing calculation..."
        updateDisplay()
        setTimeout(() => {
            total = undefined
            leftInputNumber = undefined
            rightInputNumber = undefined
            currentOperator = undefined
            output = undefined
            operatorIndicator.textContent = ""
            updateDisplay()
        }, 1000);
    }
}






















const handleInput = (key) => {
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."].includes(key)) {
        handleNumberInput(key)
    } else if (key === "=" || key === "Enter") {
        evaluateTotal()
    } else if (["+", "-", "*", "/"].includes(key)) {
        handleOperatorInput(key)
    } else if (key === "Delete") {
        clearDisplay()
    } else if (key === "Backspace") {
        console.log(`backspace pressed!`);
    }
}

window.addEventListener("keyup", (e) => {
    handleInput(e.key)
})

functionButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        handleFunctionInput(e.target.textContent)
    })
});

operatorButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        handleOperatorInput(e.target.textContent)
    })
});

numberButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        handleNumberInput(e.target.textContent)
    })
});