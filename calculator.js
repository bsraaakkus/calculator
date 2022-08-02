const display = document.querySelector('.form-control'); //input textteki elemanlara ulaştık    
const keys = document.querySelector('.group2');  //butonların hepsine ulaşmak için

var displayValue = '';
var num1= null;
var operator = null;
var secondSelectNum = false;

updateDisplay();

function updateDisplay(){
    display.value = displayValue;
}

keys.addEventListener('click',function(e)
{
    const element =e.target;
    if(!element.matches('button'))  
    return; //tıklanan yerin buton olması durumunda çalışmasını istiyoruz.
   
    
    //operator buton kontrolü
    if(element.classList.contains('operator')){
        //console.log('operator', element.value);
        inputOperator(element.value);
        updateDisplay();
        return;
    }
    // decimal buton kontrolü(class adında decimal içeriyorsa)
    if(element.classList.contains('decimal')){
        inputDecimal(element.value);
        updateDisplay();
        return;
    }
    //clear buton kontrolü
    if(element.classList.contains('btnclear')){
        //console.log('btnclear', element.value);
        inputClear();
        updateDisplay();
        return;
    }
   
        inputNumber(element.value);
        updateDisplay();

});


function inputDecimal(){
    //ekranda "." değeri olmadığı durumda "." ekleme 
    if(!displayValue.includes('.'))
    displayValue = displayValue+'.';
}

function inputOperator(selectOperator){
    const value =   parseFloat(displayValue);

    if(num1 === null){
        num1 = value;
    }
    else if(operator){
        const result = calculate(num1 , value , operator);
        //ekrana yazılan kısmın , sonrası max 8 basamak olsun
        displayValue = `${parseFloat(result.toFixed(8))}`;
        num1 = result;
    }
    //operatöre tıklandığı için ikinci sayının alınmasını beklediğimiz için true yaptık
    secondSelectNum =true;
    operator =selectOperator;
    
    
}
function inputNumber(num){
    //operatöre tıklanmış ikinci sayı girilecekse ekrana yeni girilenleri basar
    if(secondSelectNum){
        displayValue = num;
        secondSelectNum = false;
    }
    else{

    displayValue = displayValue + num;
}
    
}
function calculate( firstNum , secondNum , operatorValue){
    if(operatorValue === "+"){
        return firstNum + secondNum;
    }
    if(operatorValue === "-"){
        return firstNum - secondNum;
    }
    if(operatorValue === "/"){
        return firstNum / secondNum;
    }
    if(operatorValue === "*"){
        return firstNum * secondNum;
        
    }
    //hafızadaki son sayıyı eşittir olarak ekrana yazar
    return secondNum;

}
function inputClear(){
    const newDisplay ="";
    displayValue = newDisplay;
    return displayValue;
    
}


