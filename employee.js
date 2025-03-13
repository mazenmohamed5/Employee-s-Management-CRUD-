var nameInput = document.getElementById("name");
var ageInput = document.getElementById("age");
var salaryInput = document.getElementById("salary");
var currencyInput = document.getElementById("currency");
var inputsForm = document.getElementsByClassName("form-control");
var search = document.getElementById("search");

var addBtn = document.getElementById("addBtn");

var tableBody = document.getElementById("tableBody");

var employess = [];
var currentIndex;



addBtn.disabled = true;

addBtn.onclick = function () {
    duplicatedData();
    addProduct();
    displayData();
    reset();
}


function addProduct() {
    var employee = {
        name: nameInput.value,
        age: ageInput.value,
        salary: salaryInput.value,
        currency: currencyInput.value,
    }

    employess.push(employee);
    localStorage.setItem("employess-List", JSON.stringify(employess));

}

if (JSON.parse(localStorage.getItem("employess-List")) != null) {
    employess = JSON.parse(localStorage.getItem("employess-List"));
    displayData();
}

function displayData() {

    var box = "";
    for (var i = 0; i < employess.length; i++) {
        box +=
            `
        <tr>
        <td>${i+1}</td>
        <td>${employess[i].name}</td>
        <td>${employess[i].age}</td>
        <td>${employess[i].salary}</td>
        <td>${employess[i].currency}</td>
        <td><button class="btn btn-info" onclick="deleteData(${i})"><i class="fa-solid fa-user-xmark"></i></button></td>
        <td><button class="btn btn-warning" onclick="getProductInfo(${i})"><i class="fa-solid fa-wrench"></i></button></td>
        </tr>
        `
    }

    document.getElementById("tableBody").innerHTML = box;

}

function reset() {
    for (var i = 0; i < inputsForm.length; i++) {
        inputsForm[i].value = "";
        inputsForm[i].classList.remove("is-valid");
        inputsForm[i].classList.remove("is-invalid");
    }

    formValidation();
}



function deleteData(index) {
    employess.splice(index, 1);
    displayData();
    localStorage.setItem("employess-List", JSON.stringify(employess));
}

function updateProduct(){
    var employee = {
        name: nameInput.value,
        age: ageInput.value,
        salary: salaryInput.value,
        currency: currencyInput.value,
    }
    employess[currentIndex]=employee;
    localStorage.setItem("employees-list",JSON.stringify(employess))
 }
 
 function getProductInfo(index){
    nameInput.value=employess[index].name;
    ageInput.value=employess[index].age;
    salaryInput.value=employess[index].salary;
    currencyInput.value=employess[index].currency;
    addBtn.innerHTML="Add Employee";
    currentIndex=index;
 }


search.onkeyup = function () {
    var val = search.value;
    var box = "";
    for (var i = 0; i < employess.length; i++) {
        if (employess[i].name.toLowerCase().includes(val.toLowerCase())) {
            box +=
                `
                    <tr>
                    <td>${i+1}</td>
                    <td>${employess[i].name}</td>
                    <td>${employess[i].age}</td>
                    <td>${employess[i].salary}</td>
                    <td>${employess[i].currency}</td>
                    <td><button class="btn btn-info" onclick="deleteData(${i})"><i class="fa-solid fa-user-xmark"></i></button></td>
                    <td><button class="btn btn-warning" onclick="getProductInfo(${i})"><i class="fa-solid fa-wrench"></i></button></td>
                    </tr>
                `
        }
    }

    document.getElementById("tableBody").innerHTML = box;
}




//Validation


nameInput.onkeyup = function () {
    validateField(nameInput, /^[A-Za-z]+([_-][A-Za-z]+)*$/);
};
ageInput.onkeyup = function () {
    validateField(ageInput, /^(?:1[6-9]|[2-8][0-9]|90)$/);
};
salaryInput.onkeyup = function () {
    validateField(salaryInput, /^\d+(\.\d{1,2})?$/);
};
currencyInput.onkeyup = function () {
    validateField(currencyInput, /^(\$|€|£|¥|₹|₣|₤|₩|₽|₺)$/);
};

function validateField(inputElement, regex) {
    if (!regex.test(inputElement.value)) {
        inputElement.classList.add("is-invalid");
        inputElement.classList.remove("is-valid");
    } else {
        inputElement.classList.remove("is-invalid");
        inputElement.classList.add("is-valid");
    }
    formValidation();
}

function formValidation() {

    if (nameInput.classList.contains("is-valid") && ageInput.classList.contains("is-valid") &&
        salaryInput.classList.contains("is-valid") && currencyInput.classList.contains("is-valid")) {
        addBtn.disabled = false;
    } else {
        addBtn.disabled = true;
    }
}