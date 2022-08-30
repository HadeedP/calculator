//Class to hold all calc operations

class Calculator{
    constructor(previousText, currentText){
        this.previousText = previousText;
        this.currentText = currentText;
        this.clear();
    }
    
    clear(){
        this.currOperand = "";
        this.previousOperand ="";
        this.operation = undefined

    }

    delete(){
        //slice off last number off the number 
        this.currOperand = this.currOperand.toString().slice(0,-1)


    }

    appendNumber(number){
        //making sure only one decimal can be used
        if(number === "." && this.currOperand.includes(".")) return
        this.currOperand= this.currOperand.toString() + number.toString();

    }

    chooseOperation(operation){
        //checking if empty
        if(this.currOperand === "") return
        // if the prev operand already exists or not if it doesnt we need to compute before moving on
        if(this.previousOperand !==""){
            this.compute();
        }
        //setting the operation 
        this.operation = operation;
        this.previousOperand = this.currOperand;
        this.currOperand = "";
    }

    compute(){

        let computation
        //number of prev and current operand and since its a string we need to convert it to a number
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currOperand)
        //check if user doesn't enter a number
        if(isNaN(prev) || isNaN(current)) return
        //create a bunch of switch statments for the operations to see which one user selects 
        switch (this.operation){
            case "+":
                computation = prev + current
                break
            case "-":
                computation = prev - current
                break
            case "*":
                computation = prev * current
                break
            case "/":
                computation = prev / current
                break 
            default:
                return  
        }
        
        this.currOperand = computation
        this.operation = undefined;
        this.previousOperand = ""



    }

    update(){
        this.currentText.innerText = this.currOperand;
        this.previousText.innerText = this.previousOperand;


    }
}

//Getting the buttons into javascript
const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation ]")
const equalsButton = document.querySelector("[data-equals]")
const previousText = document.querySelector("[data-previous]")
const currentText = document.querySelector("[data-current]")
const clearButton = document.querySelector("[data-all-clear]")
const deleteButton = document.querySelector("[data-delete]")

//Creating the calculator class
const calculator = new Calculator(previousText,currentText);

//Looping through each button on the calculator that are numbers
numberButtons.forEach(button =>{
    button.addEventListener("click", ()=>{
        //innerText is the number like 1 2 4 5 etc
        calculator.appendNumber(button.innerText)
        //update the calc screen with the number chosen
        calculator.update()
    })
})

//Looping through each button on the calculator that are operations
operationButtons.forEach(button =>{
    button.addEventListener("click", ()=>{
        //inner Text is the number like 1 2 4 5 etc
        calculator.chooseOperation(button.innerText)
        //update the calc screen with the number chosen
        calculator.update()
    })
})

equalsButton.addEventListener("click", button =>{
    //call the compute function once user hits enter
    calculator.compute();
    //update display
    calculator.update();
})

//clear 
clearButton.addEventListener("click", button =>{
    //call the compute function once user hits enter
    calculator.clear();
    //update display
    calculator.update();
})
//deleting last character button
deleteButton.addEventListener("click", button =>{
    //call the compute function once user hits enter
    calculator.delete();
    //update display
    calculator.update();
})
