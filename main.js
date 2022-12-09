'strict use'
const
    allButtons = document.querySelectorAll("button.calculator-button"),
    functionButtons = document.querySelectorAll("button.function-button"),
    operatorButtons = document.querySelectorAll("button.operator-button"),
    numberButtons = document.querySelectorAll("button.number-button"),
    deleteButton = document.querySelector("button#delete"),
    display = document.querySelector("aside#display"),
    operatorIndicator = document.querySelector("#operator-indicator"),
    messagefield = document.querySelector("em#message-field"),
    historyfield = document.querySelector("aside#history")

let
    total,
    leftInputNumber,
    rightInputNumber,
    currentOperator,
    output,
    history = []

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
            if (leftInputNumber.includes(".") && number === ".") {
                messagefield.textContent = "You have already a period there, buddy!"
                setTimeout(() => {
                    messagefield.textContent = ""
                }, 1000);
                return null
            }
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
            if (rightInputNumber.includes(".") && number === ".") {
                messagefield.textContent = "You have already a period there, buddy!"
                setTimeout(() => {
                    messagefield.textContent = ""
                }, 1000);
                return null
            }
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
    } else if (inputFunction === "%") {
        changeToPercentage()
    }
}

const revertPolationOfNumber = () => {
    if (leftInputNumber === undefined) { return null }
    else if (rightInputNumber === undefined) {
        leftInputNumber = `${leftInputNumber * (-1)}`
        output = leftInputNumber
        updateDisplay()
    } else {
        rightInputNumber = `${rightInputNumber * (-1)}`
        output = `${leftInputNumber}   ${currentOperator}   ${rightInputNumber}`
        updateDisplay()
    }
}

const changeToPercentage = () => { 
    if (leftInputNumber === undefined) { return null }
    else if (rightInputNumber === undefined) {
        leftInputNumber = `${leftInputNumber / 100}`
        output = leftInputNumber
        updateDisplay()
    } else {
        rightInputNumber = `${rightInputNumber / 100}`
        output = `${leftInputNumber}   ${currentOperator}   ${rightInputNumber}`
        updateDisplay()
    }
 }

const updateHistory = (newHistoryInput) => { 
    history.push(newHistoryInput)
    historyfield.textContent = ""
    history.forEach((entry) => {
        const newEntry = document.createElement("p")
        const deleteButton = document.createElement("span")
        deleteButton.textContent = "X"
        deleteButton.classList.add("history-entry-deletion")
        deleteButton.addEventListener("click", (e) => {
            historyfield.removeChild(newEntry)
            let itemContent = e.target.parentElement.textContent
            itemContent = itemContent.substring(0, itemContent.length -1)
            history = history.filter((item) => item != itemContent)
        })
        newEntry.addEventListener("dblclick", (e) => {
            console.log();
            let historyItem = e.target.textContent
            historyItem = historyItem.substring(0, historyItem.length - 1)
            console.log(historyItem);
            output = historyItem
            updateDisplay()
        })
        newEntry.textContent = entry
        newEntry.classList.add("history-entry")
        historyfield.appendChild(newEntry)
        newEntry.appendChild(deleteButton)
    })
 }

const evaluateTotal = () => {
    if (output === undefined || output === "") return null
    updateHistory(output)
    const newTotal = `${eval(output)}`
    if (newTotal == "NaN" || newTotal == Infinity) {
        messagefield.textContent = "Your math just created a wormhole!"
        output = "Dividing by zero? Really?"
        updateDisplay()
        setTimeout(() => {
            messagefield.textContent = ""
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

const deleteLastCharacter = () => {
    if (rightInputNumber === undefined) {
        console.log(leftInputNumber);
        leftInputNumber = leftInputNumber.substring(0, leftInputNumber.length - 1)
        output = leftInputNumber
        updateDisplay()
    } else {
        rightInputNumber = rightInputNumber.substring(0, rightInputNumber.length - 1)
        output = `${leftInputNumber}   ${currentOperator}   ${rightInputNumber}`
        updateDisplay()
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
        deleteLastCharacter()
    } else if (key === "%") {
        changeToPercentage()
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

deleteButton.addEventListener("click", () => {
    deleteLastCharacter()
})