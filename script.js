const buttons = document.querySelectorAll("button");
const inputValue = document.querySelector("#input-area");

function add(a,b){
    let value = a+b;
    if(value > 999999999 || value < -999999999) return value.toPrecision(5);
    if(Number.isInteger(value)) return value;
    return value.toFixed(7);     
}

function sub(a,b){
   let value = a-b;
    if(value > 999999999 || value < -999999999) return value.toPrecision(5);
    if(Number.isInteger(value)) return value;
    return value.toFixed(7);     
}

function mul(a,b){
   let value = a*b;
    if(value > 999999999 || value < -999999999) return value.toPrecision(5);
    if(Number.isInteger(value)) return value;
    return value.toFixed(7);     
}

function div(a,b){
    if(b == 0){
        return "ERROR";
    }
    let value = a/b;
    if(value > 999999999 || value < -999999999) return value.toPrecision(5);
    if(Number.isInteger(value)) return value;
    return value.toFixed(7);     
}

function operate(num1, operator, num2 ){
    let value = 0;
    switch (operator) {
        case "+":
            value  = add(num1, num2);
            break;
        case "-":
            value = sub(num1,num2);
            break;
        case "*":
            value = mul(num1,num2);
            break;
        case "/":
            value = div(num1,num2);
            break;
        default:
            value = "ERROR"
            break;
    }
    return value;
}

function calculator(){
    //  Initializing starting values
    let operands = {
        first : "",
        second : "",
        getFirst(){
            if(Number.isInteger(this.first)){
                return parseInt(this.first);
            }
            return parseFloat(this.first);
        },
        getSecond(){
            if(Number.isInteger(this.second)){
                return parseInt(this.second);
            }
            return parseFloat(this.second);
        },
        setDefault(){
            this.first = "";
            this.second = "";
        },
        updateSecond(value){
            this.second = value;
        }, 
        updateFirst(value){
            this.first = value;
        },
        isEmpty(){
            if(this.first == ""|| (this.second == "")){
                return true
            }
            return false;
        }

    };
    let operators = {
        operator : "",
        getOperator(){
            return this.operator;
        },
        isEmpty(){
            if (this.operator == ""){
                return true;
            }
            return false;
        },
        setDefault(){
            this.operator = "";
        },
        error(){
            this.operator = "ERROR";
        },
        updateOperator(operator){
            this.operator = operator;
        },
    };

    inputValue.value = "0"

// Function that would react to each button clicked  
function calculate(selectedButton){
    switch(selectedButton){
        case "=":
            if(operators.isEmpty()){
                if(operands.second == ""){
                    inputValue.value = "0";
                }else{
                    inputValue.value = operands.second;
                }
            }else{
                inputValue.value = operate(operands.getFirst(), operators.operator, operands.getSecond());
                operators.setDefault();
                operands.first = inputValue.value;
                operands.second = "";
            }
            break;

        case "+":
        case "-":
        case "*":
        case "/":
            if(operators.isEmpty()){
                operators.updateOperator(selectedButton);
                operands.updateFirst(inputValue.value);
                operands.updateSecond(""); 
                inputValue.value = operands.second;
            }else{
                if(operands.isEmpty()){
                    operators.updateOperator(selectedButton);
                }else{
                    inputValue.value = operate(operands.getFirst(), operators.operator, operands.getSecond());
                    operators.updateOperator(selectedButton);
                    operands.updateFirst(inputValue.value);
                    operands.updateSecond("");
                } 
            }
            break;

        case ".":
            let calculatedValue = inputValue.value;
            if(operands.second.includes(".") && inputValue.value.length != 9 ){
                break;
            }else if( (operands.first == calculatedValue) &&(operands.isEmpty())){
                operands.second = operands.first;
                operands.first = "";
                operands.updateSecond(`${operands.second}${selectedButton}`);
                inputValue.value = operands.second;
            }else{
                operands.updateSecond(`${operands.second}${selectedButton}`);
                inputValue.value = operands.second;
            }
            break;

        case "Clear":
            operands.setDefault();
            operators.setDefault();
            inputValue.value = "0"
            break;

        case "Backspace":
            operands.second =  operands.second.slice(0,-1);
            inputValue.value = operands.second;
            break;    

        default:
            if(inputValue.value.length != 9){
                operands.updateSecond(`${operands.second}${selectedButton}`);
                inputValue.value = operands.second;
            }
    }
}    

    // Keyboard support
    window.addEventListener("keydown", (e)=>{
        console.log(e);
        const acceptedValues = "0123456789+-*/."
        let pressedButton = e.key;
        let isitRightButton = acceptedValues.includes(pressedButton);
        if(pressedButton == "Backspace"){
            calculate("Backspace");
        }else if(pressedButton == "c" || pressedButton == "C"){
            calculate("Clear")
        }else if(isitRightButton){
            calculate(pressedButton);
        }else if (pressedButton == "Enter"){
            calculate("=");
        }else{
            
        }
    })

    // Button support
    buttons.forEach((button)=>{
        button.addEventListener("click", (e)=>{
            let selectedButton = e.target.textContent;
            calculate(selectedButton);
        })
    })
}

calculator();