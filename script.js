const buttons = document.querySelectorAll("button");

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
    let num1 = "0";
    let num2;
    let operator = "ERROR";

    
    buttons.forEach(button => {
        button.addEventListener("click", (e)=>{
            let buttonFunction = e.target.textContent;
            
        })
    });
}

calculator();