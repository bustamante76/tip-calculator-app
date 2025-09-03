const price = document.querySelector('#price');
const btn = document.querySelectorAll('.btn-tip');
const custom = document.querySelector('#custom');
const people = document.querySelector('#people');
const resultTip = document.querySelector('#tip-amount');
const resultTotal = document.querySelector('#total-amount');
const btnReset = document.querySelector('#reset');
const errorPrice = document.querySelector('.error-price');
const errorPeoples = document.querySelector('.error-peoples');

let valuePeople = 0;
let tipAmount = 0;

function activarReset() {
    btnReset.removeAttribute('disabled');
}

price.addEventListener('input', activarReset);
people.addEventListener('input', activarReset);
custom.addEventListener('input', activarReset);
btn.forEach(item => item.addEventListener('click', activarReset));

function calcularPropina(value, tip, nPeoples) {
    if (!isNaN(value) && !isNaN(nPeoples)) {
        valuePeople = parseFloat((value / nPeoples).toFixed(2));
        tipAmount = parseFloat((valuePeople * tip / 100).toFixed(2));
        resultTip.textContent = '$' + tipAmount;
        resultTotal.innerHTML = '$' + parseFloat((valuePeople + tipAmount).toFixed(2));
    }
    // validar price
    if (!value || parseFloat(value) <= 0) {
        price.style.border = '2px solid red';
        errorPrice.style.display = 'initial';
    } else {
        price.style.border = '';
        errorPrice.style.display = 'none';
    }
    // Validar number peoples
    if (!people.value || parseInt(people.value) <= 0) {
        people.style.border = '2px solid red';
        errorPeoples.style.display = 'initial';
    } else {
        people.style.border = '';
        errorPeoples.style.display = 'none';
    }

}

btn.forEach(item => {
    item.addEventListener('click', function () {
        btn.forEach(btnTip => btnTip.classList.remove('btn-active'));
        item.classList.add('btn-active');
        custom.value = '';
        calcularPropina(parseFloat(price.value), parseFloat(item.value), parseFloat(people.value));
    });
});

custom.addEventListener('input', function () {
    btn.forEach(btnTip => btnTip.classList.remove('btn-active'));
    console.log('custom: ' + !isNaN(custom.value));
    if (!isNaN(parseInt(custom.value))) {
        calcularPropina(parseFloat(price.value), parseFloat(custom.value), parseFloat(people.value));
    }
});

btnReset.addEventListener('click', function () {
    price.value = '';
    custom.value = '';
    people.value = '';
    resultTip.textContent = '$0.00';
    resultTotal.textContent = '$0.00';
    errorPrice.style.display = 'none';
    price.style.border = '';
    btn.forEach(btnTip => btnTip.classList.remove('btn-active'));
    errorPeoples.style.display = 'none';
    people.style.border = '';
    btnReset.setAttribute('disabled', true);
});