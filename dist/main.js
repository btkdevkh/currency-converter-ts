"use strict";
// DOM Elements
const form = document.querySelector('form');
const selectIn = document.getElementById('devise_in');
const selectOut = document.getElementById('devise_out');
const exchangResult = document.querySelector('.result');
const dollar = {
    name: 'Dollar',
    code: 'DOL',
    symbol: '$',
    taux: 1
};
const euro = {
    name: 'Euro',
    code: 'EUR',
    symbol: '€',
    taux: 1.15
};
const riel = {
    name: 'Riel',
    code: 'RIE',
    symbol: '៛',
    taux: 0.00025
};
const deviseList = [dollar, euro, riel];
let amounts;
let deviseIn;
let deviseOut;
// Logics
const generateOptions = (devises) => {
    let opt = '';
    devises.forEach((devise) => {
        opt += `
      <option value="${devise.code}">
        ${devise.name} - ${devise.symbol}
      </option>
    `;
    });
    return opt;
};
const displayResult = () => {
    const deviseOutSymbol = deviseList.find((ds) => ds.code === deviseOut);
    exchangResult.innerHTML = calculResult(amounts, deviseIn, deviseOut).toFixed(2).toString() + (deviseOutSymbol === null || deviseOutSymbol === void 0 ? void 0 : deviseOutSymbol.symbol);
};
const calculResult = (amounts, devise_in, devise_out) => {
    const deviseIn = getDevise(devise_in, deviseList);
    const deviseOut = getDevise(devise_out, deviseList);
    let deviseInital;
    if (deviseIn)
        deviseInital = deviseIn;
    else
        throw { msg: "The initial devise is not correct" };
    let deviseFinal;
    if (deviseOut)
        deviseFinal = deviseOut;
    else
        throw { msg: "The final devise is not correct" };
    return (amounts * deviseInital.taux) / deviseFinal.taux;
};
const getDevise = (deviseCode, devises) => {
    const devise = devises.find((devise) => devise.code === deviseCode);
    return devise !== null && devise !== void 0 ? devise : null;
};
// Events
document.addEventListener('DOMContentLoaded', () => {
    selectIn.innerHTML = generateOptions(deviseList);
    selectOut.innerHTML = generateOptions(deviseList);
    selectIn.querySelectorAll('option')[1].selected = true;
    selectOut.querySelectorAll('option')[0].selected = true;
    form.addEventListener('keyup', () => {
        amounts = +form.amounts.value;
        deviseIn = form.devise_in.value;
        deviseOut = form.devise_out.value;
        displayResult();
    });
    form.addEventListener('change', () => {
        amounts = +form.amounts.value;
        deviseIn = form.devise_in.value;
        deviseOut = form.devise_out.value;
        displayResult();
    });
});
//# sourceMappingURL=main.js.map