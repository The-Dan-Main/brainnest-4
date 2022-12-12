'strict use'
const
    allButtons = document.querySelectorAll("button.calculator-button"),
    functionButtons = document.querySelectorAll("button.function-button"),
    operatorButtons = document.querySelectorAll("button.operator-button"),
    numberButtons = document.querySelectorAll("button.number-button"),
    deleteButton = document.querySelector("button#delete"),
    periodButton = document.querySelector("button.period-button"),
    display = document.querySelector("aside#display"),
    operatorIndicator = document.querySelector("#operator-indicator"),
    messagefield = document.querySelector("em#message-field"),
    historyfield = document.querySelector("aside#history")

let
    total,
    leftInputNumber = 0,
    rightInputNumber,
    currentOperator,
    output,
    history = []

const updateDisplay = () => {
    display.textContent = `${leftInputNumber !== undefined ? leftInputNumber : ""} ${currentOperator !== undefined ? currentOperator : ""} ${rightInputNumber !== undefined ? rightInputNumber : ""}`
}
updateDisplay()

const handleNumberInput = (number) => {
    number = parseInt(number)
    if (currentOperator === undefined) {
        if (leftInputNumber === 0) {
            leftInputNumber = parseInt(number)
            updateDisplay()
        } else {
            if (leftInputNumber === 0 && number !== 0) {
                leftInputNumber = number
                updateDisplay()
            }
            else {
                leftInputNumber = `${leftInputNumber}${number}`
                leftInputNumber =  leftInputNumber.includes(".") ? parseFloat(leftInputNumber) : parseInt(leftInputNumber)
                updateDisplay()
            }
        }
    } else {
        operatorIndicator.textContent = ""
        if (rightInputNumber === undefined) {
            rightInputNumber = parseInt(number)
            output = `${leftInputNumber}   ${currentOperator}   ${rightInputNumber}`
            updateDisplay()
        } else {
            if (rightInputNumber === 0 && number === 0) return null
            else {
                rightInputNumber = `${rightInputNumber}${number}`
                rightInputNumber = rightInputNumber.includes(".") ? parseFloat(rightInputNumber) : parseInt(rightInputNumber)
                output = `${leftInputNumber}   ${currentOperator}   ${rightInputNumber}`
                updateDisplay()
            }
        }
    }
}

const handlePeriodInput = () => {
    if (leftInputNumber === 0) {
        leftInputNumber = `${leftInputNumber}.`
        updateDisplay()
        return null
    }
    if (leftInputNumber !== undefined && currentOperator === undefined) {
        if (leftInputNumber.toString().includes(".")) {
            messagefield.textContent = "You have already a period there, buddy!"
            setTimeout(() => {
                messagefield.textContent = ""
            }, 1000);
            return null
        }
        leftInputNumber = `${leftInputNumber}.`
        updateDisplay()
        return null
    } else {
        if (rightInputNumber.toString().includes(".")) {
            messagefield.textContent = "You have already a period there, buddy!"
            setTimeout(() => {
                messagefield.textContent = ""
            }, 1000);
            return null
        }
        rightInputNumber = `${rightInputNumber}.`
        updateDisplay()
        return null
    }
}


const handleOperatorInput = (operator) => {
    if (currentOperator !== undefined && rightInputNumber !== undefined) {
        caluateTotal()
        currentOperator = operator
        updateDisplay()
    } else {
        if (rightInputNumber !== undefined) {
            currentOperator = operator
            caluateTotal()
            updateDisplay()
        } else {
            currentOperator = operator
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
        caluateTotal()
    } else if (inputFunction === "%") {
        changeToPercentage()
    }
}

const revertPolationOfNumber = () => {
    if (leftInputNumber === undefined) return null
    if (rightInputNumber === undefined) {
        leftInputNumber = leftInputNumber * (-1)
        updateDisplay()
    } else {
        rightInputNumber = rightInputNumber * (-1)
        updateDisplay()
    }
}

const changeToPercentage = () => {
    if (leftInputNumber === undefined) return null
    if (rightInputNumber === undefined) {
        leftInputNumber = leftInputNumber / 100
        updateDisplay()
    } else {
        rightInputNumber = rightInputNumber / 100
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
        deleteButton.setAttribute("title", "click here to delete from history")
        deleteButton.addEventListener("click", (e) => {
            historyfield.removeChild(newEntry)
            let itemContent = e.target.parentElement.textContent
            itemContent = itemContent.substring(0, itemContent.length - 1)
            history = history.filter((item) => item != itemContent)
        })
        newEntry.textContent = entry
        newEntry.classList.add("history-entry")
        historyfield.appendChild(newEntry)
        newEntry.appendChild(deleteButton)
    })
}

const caluateTotal = () => {
    updateHistory(`${leftInputNumber !== undefined ? leftInputNumber : ""} ${currentOperator !== undefined ? currentOperator : ""} ${rightInputNumber !== undefined ? rightInputNumber : ""}`)
    switch (currentOperator) {
        case "-":
            leftInputNumber = leftInputNumber - rightInputNumber
            break;
        case "+":
            leftInputNumber = leftInputNumber + rightInputNumber
            break;
        case "/":
            leftInputNumber = leftInputNumber / rightInputNumber
            break;
        case "*":
            leftInputNumber = leftInputNumber * rightInputNumber
            break;
    }
    const leftNumberString = leftInputNumber.toString()
    const lengthAfterPeriod = leftNumberString.length - leftNumberString.indexOf(".") - 1
    if (leftNumberString.includes(".") && lengthAfterPeriod > 5) {
        leftInputNumber = parseFloat(leftNumberString).toFixed(5)
    } else if (leftNumberString.includes(".") && lengthAfterPeriod < 5) {
        leftInputNumber = parseFloat(leftNumberString).toFixed(lengthAfterPeriod)
    }
    if (leftInputNumber === undefined || leftInputNumber === "") return 0
    if (leftInputNumber == "NaN" || leftInputNumber == Infinity) {
        messagefield.textContent = "Your math just created a wormhole!"
        rightInputNumber, currentOperator = ""
        leftInputNumber = "Dividing by zero? Really?"
        updateDisplay()
        setTimeout(() => {
            messagefield.textContent = ""
            clearDisplay()
        }, 1000);
        return 0
    }
    rightInputNumber = undefined
    currentOperator = undefined
    updateDisplay()
}

const clearDisplay = () => {
    total = undefined
    leftInputNumber = 0
    rightInputNumber = undefined
    currentOperator = undefined
    output = undefined
    operatorIndicator.textContent = ""
    updateDisplay()
}

const deleteLastCharacter = () => {
    if (rightInputNumber === undefined) {
        leftInputNumber = leftInputNumber.toString().slice(0, -1) === "" ? 0 : parseFloat(leftInputNumber.toString().slice(0, -1))
        updateDisplay()
    } else {
        rightInputNumber = rightInputNumber.toString().slice(0, -1) === "" ? 0 : parseFloat(rightInputNumber.toString().slice(0, -1))
        updateDisplay()
    }
}

const visualizeKeyPress = (key) => { 
    allButtons.forEach(button => {
        if (button.dataset.value.includes(key)) {
            button.classList.add("activeKeyPress")
            setTimeout(() => {
                button.classList.remove(("activeKeyPress"))
            }, 200);
        }
    });
 }

const handleInput = (key) => {
    visualizeKeyPress(key)
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].includes(key)) {
        handleNumberInput(key)
    } else if (key === "." || key === ",") {
        handlePeriodInput()
    } else if (key === "=" || key === "Enter") {
        caluateTotal()
    } else if (["+", "-", "*", "/"].includes(key)) {
        handleOperatorInput(key)
    } else if (key === "Delete") {
        clearDisplay()
    } else if (key === "Backspace") {
        deleteLastCharacter()
    } else if (key === "%") {
        changeToPercentage()
    } else if (key === "i") {
        revertPolationOfNumber()
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

periodButton.addEventListener("click", () => {
    handlePeriodInput()
})