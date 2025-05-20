const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdownS = document.querySelectorAll(".dropdown select");
const btn = document.getElementById('btn');
const fromCurrency = document.querySelector('.from select');
const toCurrency = document.querySelector('.to select');
const msg = document.querySelector('.msg');

// for(currencyCode in countryList){
//     let countryCode = countryList[currencyCode];
//     console.log(currencyCode, currencyCode) //INR: "IN"
// }

for(let select of dropdownS){
    for(let currencyCode in countryList){
        let newOption = document.createElement('option');
        newOption.innerText = currencyCode;
        newOption.value = currencyCode;

        if(select.name === 'from' && currencyCode === 'USD'){
            newOption.selected = 'selected';
        }else if(select.name === 'to' && currencyCode === 'INR'){
            newOption.selected = 'selected';
        }
        select.append(newOption);
    }
    select.addEventListener("change", (evt) =>{ /* Why evt is passes or any paranmeter -  The event object contains     information about the event that has occurred. For example, if the event is a change event on a select element, the event object will contain information about that change.


        Common properties of the event object include:
        target: The element that triggered the event.
        type: The type of the event (e.g., "change", "click").
        currentTarget: The element to which the event handler is attached.
        preventDefault(): A method that can be called to prevent the default action associated with the event.
        stopPropagation(): A method that can be called to stop the event from bubbling up to parent elements. */

        updateFlag(evt.target);
    })
}

function updateFlag(element){
    console.log(element);

    let currencyCode = element.value; //Bcoz newOption.value = currencyCode;
    // console.log(currencyCode);

    let countryCode = countryList[currencyCode];
    // console.log(countryCode);

    let newFlagLink  = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector('img');
    img.src = newFlagLink;
}

btn.addEventListener('click', async (evt) => {
    evt.preventDefault();
    let amount = document.getElementById('amount').value;
    // console.log(amount);
    
    const response = await fetch(`https://open.exchangerate-api.com/v6/latest/${fromCurrency.value}`);
    // console.log(response);
    const data = await response.json();
    console.log(data);

    const rate = data.rates[toCurrency.value];
    console.log(rate);
    
    let finalAmount = amount * rate;
    msg.innerHTML = `<h4>${amount} ${fromCurrency.value} = ${finalAmount} ${toCurrency.value}</h4>`;
    // console.log(msg);

})