const buttons = document.querySelectorAll("button");
const inputValue = document.querySelector("#input-area");

function add(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

function mul(a,b){
    return a*b;
}

function div(a,b){
    if(b == 0){
        return "ERROR";
    }
    return a/b;
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
    // initializing values
    let num1 = "";
    let num2 = "";
    const operations = ["+","-","*","/"]
    let operator = "ERROR";
    inputValue.value = "0";

    buttons.forEach(button => {
        button.addEventListener("click", (e)=>{
            let buttonFunction = e.target.textContent;

            // executing operations depending on the clicked button
            if(buttonFunction == "="){
                inputValue.value = operate(parseInt(num1), operator, parseInt(num2));
            }else if(operations.includes(buttonFunction)){
                operator = buttonFunction;
                num1 = inputValue.value;
                num2 = "";
                inputValue.value = num2;
            }else if(buttonFunction == "C"){
                num1 = "";
                num2 = "";
                operator = "ERROR";
                inputValue.value = "0";
            }else{
                num2 = `${num2}${buttonFunction}`; 
                inputValue.value = num2;
            }
        })
    });
}

calculator();