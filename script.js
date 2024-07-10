const buttons = document.querySelectorAll("button");
const inputValue = document.querySelector("#input-area");

function add(a,b){
    if(a+b > 999999999 || a+b < -999999999 ){
        return (a+b).toPrecision(5);
    }
    return (a+b);
}

function sub(a,b){
    if(a-b > 999999999 || a-b < -999999999 ){
        return (a-b).toPrecision(5);
    }
    return (a-b);
}

function mul(a,b){
    if(a*b > 999999999 || a*b < -999999999 ){
        return (a*b).toPrecision(5);
    }
    return (a*b);
}

function div(a,b){
    if(b == 0){
        return "ERROR";
    }
    if(a/b > 999999999 || a/b < -999999999 ){
        return (a/b).toPrecision(5);
    }
    return (a/b);
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

/*CALCULATOR ALGORITHM
    i/o :
            0 + = --> ERROR
            1+1 = --> End Value
            1+1 + --> 2 (end Value) and addnew Num
            1+1 - 2 = 0 --> end value
    Procedure:
        operands = {first, second}
        operators = {operation}
        
        CLICK = 
            IF operands.length != 2 ERROR
            IF operands.length == 2 THEN operate()
        
        CLICK +,-,*,/
            IF operators.length == 0 THEN 
                push(operation)
                first = value
                second = null
            IF operators.length != 0 THEN 
                value = operate()
                first = value
                second = null  
                push(operation)
        CLICK C
            operands = [first, second]
            operators = []

        Click anynum
            UPDATE second = {second}{enteredValue}
            OUTPUT--> second
 */

function calculator(){
    let operands = {
        first : "",
        second : "",
        getFirst(){
            return parseInt(this.first);
        },
        getSecond(){
            return parseInt(this.second);
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
    }

  
    inputValue.value = "0"

    buttons.forEach((button)=>{
        button.addEventListener("click", (e)=>{
            let selectedButton = e.target.textContent;

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

                case "Clear":
                    operands.setDefault();
                    operators.setDefault();
                    inputValue.value = "0"
                    break;

                default:
                    if(inputValue.value.length != 9){
                        operands.updateSecond(`${operands.second}${selectedButton}`);
                        inputValue.value = operands.second;
                    }
            }
        })
    })
}

calculator();