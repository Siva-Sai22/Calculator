const add = (a,b)=>a+b;
const subtract = (a,b)=>a-b;
const multiply = (a,b)=>a*b;
const divide = (a,b)=>a/b;

let expression='';
let equal_active=false;
const expression_div = document.querySelector('.expression');
const answer_div = document.querySelector('.answer');

const performOperation = () => {
    expression+='=';
    let eval = expression.slice(0,expression.length-1);
    let ans=0;
    let i=0;
    while(i<eval.length){
        let a='',b='';
        while((eval[i]<='9' && eval[i]>='0') || eval[i]=='.'){
            a=a+eval[i];
            i++;
        }
        a=parseFloat(a);
        let op=eval[i++];
        while((eval[i]<='9' && eval[i]>='0') || eval[i]=='.'){
            b=b+eval[i];
            i++;
        }
        b=parseFloat(b);
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
    if(!Number.isInteger(ans)) ans = ans.toFixed(6);
    answer_div.textContent=ans;
}

const updateExpression = (a) => {
    let check = a==='+' || a==='x' || a==='-' || a==='÷';

    if(equal_active && a!== '='){
        if(a<='9' && a>='0'){
            expression='';
        }else if(check){
            expression = `${answer_div.textContent}`;
        }else if(a==='.'){
            expression='0';
        }
        equal_active=false;
    }

    if(a === 'Clear') {
        expression='';
        answer_div.textContent='0';
        equal_active=false;
    }else if(a === 'Delete') {
        expression = expression.slice(0,expression.length-1);
    }else if(a === '=') {
        if(expression[expression.length-1]!='='){
            performOperation();
            equal_active=true;
        }
    }else if(check && expression !== '') {
        if(expression[expression.length-1]==='+' || expression[expression.length-1]==='x' || expression[expression.length-1]==='-' || expression[expression.length-1]==='÷'){
            expression = expression.slice(0,expression.length-1);
            expression+=a;
        }else{
            expression+=a;
        }
    }else if(a<='9' && a>='0'){
        expression+=a;
    }else if(a === '.'){
        let dot=false;
        let exp_check=expression;
        let i=exp_check.length;
        while(i>=0 ){
            if(exp_check[i]=='.'){
                dot=true;
                break;
            }
            if((exp_check[i]==='+' || exp_check[i]==='x' || exp_check[i]==='-' || exp_check[i]==='÷') && !dot){
                break;
            }
            i--;
        }
        if(!dot){
            if(!(expression[expression.length-1]>='0' && expression[expression.length-1]<='9')){
                expression+='0';
            }
            expression+=a;
        }
    }

    expression_div.textContent=expression;
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', (e) =>{
        updateExpression(button.textContent);
    });
});

window.addEventListener('keydown',(e)=>{
    let key = e.key;
    if(key==='/'){
        key='÷';
    }else if(key==='Enter'){
        key='=';
    }else if(key==='Backspace'){
        key='Delete';
    }else if(key==='*'){
        key='x';
    }
    updateExpression(key);
});