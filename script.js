const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentInput = "";
let operator = null;
let operand1 = null;
let operand2 = null;

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.getAttribute("data-value");

        if (value === "clear") {
            // Clear display and reset calculator
            display.innerText = "0";
            currentInput = "";
            operator = null;
            operand1 = null;
            operand2 = null;
        } else if (value === "=") {
            // Perform calculation
            if (operand1 !== null && operator) {
                operand2 = parseFloat(currentInput);
                let result = 0;

                if (operator === "+") result = operand1 + operand2;
                else if (operator === "-") result = operand1 - operand2;
                else if (operator === "*") result = operand1 * operand2;
                else if (operator === "/") {
                    if (operand2 === 0) {
                        display.innerText = "Error";
                        currentInput = "";
                        return;
                    }
                    result = operand1 / operand2;
                }

                display.innerText = result;
                currentInput = result.toString();
                operand1 = result;
                operator = null;
            }
        } else if (["+", "-", "*", "/"].includes(value)) {
            // Set operator and operand1
            if (currentInput) {
                operand1 = parseFloat(currentInput);
                operator = value;
                currentInput = "";
            }
        } else {
            // Append digit or decimal to current input
            if (currentInput === "0" && value === "0") return; // Prevent leading zeros
            currentInput += value;
            display.innerText = currentInput;
        }
    });
});
