//SIMPLE CALCULATOR FUNCTION
let input1 = "";
let operator= "";
let input2 = "";
function appendnumber(num){    
    
    input1 += num;
    document.getElementById("num1").value=input1;
    
}
document.addEventListener("keydown",
    function(event){
        if(event.key >= "0" && event.key <= "9"){
            appendnumber(Number(event.key));
        }
    });
function setoperator(op){
    if(input1 === ""){
        return;
    }
    if(input2 !==""){
        calculate();
    }
    input2 = input1;
    operator = op;
    input1 = "";
}
document.addEventListener("keydown",
    function(operator){
        if(operator.key === "+"){
            setoperator("+");
        }
        if(operator.key === "*"){
            setoperator("*");
        }if(operator.key === "/"){
            setoperator("/");
        }if(operator.key === "-"){
            setoperator("-");
        }if(operator.key === "="){
            calculate();
        }
    });
    document.addEventListener("keydown",
        function(enter){
            if(enter.key === "Enter"){
                calculate();
            }
        }
    )


function calculate(){
    let num1 = Number(input2);
    let num2 = Number(input1);
    let num3;
    if(operator==="+"){
        num3 = num1+num2;
    }
    else if(operator==="-"){
        num3 = num1-num2;
    }else if(operator==="*"){
        num3 = num1*num2;
    }else if(operator==="/"){
        if(num2 === 0){
            alert("cannot divide by zero");
            return;
        }
        num3 = num1/num2;
    }
    if(operator===""){return;}
    input1=num3.toString();
    input2 = "";
    operator = "";
    document.getElementById("num1").value = input1;   
}
function displayClear(){
    input1 = "";
    input2 = "";
    operator = "";
    document.getElementById("num1").value = "";
}
document.addEventListener("keydown",
    function(event){
        if(event.key === "Delete"){
            displayClear();
        }
    });
    document.addEventListener("keydown",
    function(event){
        if(event.key === "Backspace"){
            deletenumber();
            
        }
    });

function deletenumber(num){
    input1 = input1.slice(0,-1); 
        document.getElementById("num1").value=input1;
    

}