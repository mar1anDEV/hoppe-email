'use strict';

let plzArray = [];

function fetchJSONData() {
    fetch("./tabelle.json")
        .then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        })
        .then((data) => {
            const plzData = data.PostalCode;
            plzData.forEach(item => {
                const plz = parseInt(item.PLZ, 10); 
                plzArray.push(plz);  
            });
            console.log(typeof plzArray, plzArray); 
        })
        .catch((error) => {
            console.error("Unable to fetch data:", error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submitForm').addEventListener('submit', function (event) {
        event.preventDefault();
        const emailResponse = "ralf.ahndorf@hofmei.de";
        const inputValue = document.querySelector('.inputText').value.trim();
        const resultResponse = document.querySelector('.result');
        
      
        if (!inputValue || isNaN(inputValue)) {
            resultResponse.style.color = 'red';
            resultResponse.textContent = "Bitte eine gültige Postleitzahl eingeben";
            return;
        }
        
        const inputNumber = parseInt(inputValue, 10);
        
        if (plzArray.includes(inputNumber)) {  
            resultResponse.style.color = 'black'; 
            resultResponse.textContent = emailResponse;
        } else {
            resultResponse.style.color = 'red';
            resultResponse.textContent = "Postleitzahl ungültig";
        }
    });
});


fetchJSONData();






