const add = (a,b)=>a+b;
const subtract = (a,b)=>a-b;
const multiply = (a,b)=>a*b;
const divide = (a,b)=>a/b;

let expression='';
const expression_div = document.querySelector('.expression');
const answer_div = document.querySelector('.answer');

const performOperation = () => {
    expression+='=';
    let eval = expression.slice(0,expression.length-1);
    let ans=0;
    let i=0;
    while(i<eval.length){
        let a=0,b=0;
        while(eval[i]<='9' && eval[i]>='0'){
            a=a*10+parseInt(eval[i]);
            i++;
        }
        let op=eval[i++];
        while(eval[i]<='9' && eval[i]>='0'){
            b=b*10+parseInt(eval[i]);
            i++;
        }
        switch(op){
            case '+':
                ans=add(a,b);
                break;
            case '-':
                ans=subtract(a,b);
                break;
            case 'x':
                ans=multiply(a,b);
                break;
            case '÷':
                ans=divide(a,b);
                break;
        }
        if(i<eval.length){
            eval = eval.slice(i,eval.length);
            eval = `${ans}${eval}`;
            i=0;
        }
    }
    answer_div.textContent=ans;
}

const updateExpression = (a) => {
    let check = a==='+' || a==='x' || a==='-' || a==='÷';
    if(a === 'Clear') {
        expression='';
        answer_div.textContent='0';
    }else if(a === 'Delete') {
        expression = expression.slice(0,expression.length-1);
    }else if(a === '=') {
        performOperation();
    }else if(check && expression !== '') {
        if(expression[expression.length-1]==='+' || expression[expression.length-1]==='x' || expression[expression.length-1]==='-' || expression[expression.length-1]==='÷'){
            expression = expression.slice(0,expression.length-1);
            expression+=a;
        }else{
            expression+=a;
        }
    }else if(a<='9' && a>='0'){
        expression+=a;
    }
    expression_div.textContent=expression;
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) =>{
        updateExpression(button.textContent);
    });
});