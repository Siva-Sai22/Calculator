const add = (a,b)=>a+b;
const subtract = (a,b)=>a-b;
const multiply = (a,b)=>a*b;
const divide = (a,b)=>a/b;

expression='';
const expression_div = document.querySelector('.expression');

const performOperation = (exp) => {
    expression='';
}

const updateExpression = (a) => {
    if(a === 'Clear')expression='';
    else if(a === 'Delete') expression = expression.slice(0,expression.length-1);
    else if(a === '=') performOperation(expression);
    else expression+=a;
    expression_div.textContent=expression;
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) =>{
        updateExpression(button.textContent);
    });
});