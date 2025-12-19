let api = `https://v6.exchangerate-api.com/v6/f713b5f6c40883ea255da9c7/latest/USD`;

const fromsection = document.getElementById("from-section");
const tosection = document.getElementById("to-section");
const amount = document.getElementById("amount");
const exchangeBtn = document.getElementById("exchange-btn");


fetch(api)
    .then(res => res.json())
    .then(data => {
        let currrencies = Object.keys(data.conversion_rates);

        currrencies.forEach(currency => {
            let option1 = document.createElement("option");
            option1.textContent = currency;
            fromsection.appendChild(option1);
        });

        currrencies.forEach(currency => {
            let option2 = document.createElement("option");
            option2.textContent = currency;
            tosection.appendChild(option2);
        });

        // default values AFTER adding options
        fromsection.value = "USD";
        tosection.value = "EUR";

        convertCurrency()
    })
    .catch(() => alert("Failed to load currencies"));


let convertCurrency = () => {
         /*const amt = amount.value.trim()
         if(amt === "" || isNaN(amt) || Number(amt) <= 0){
            alert("please enter a valid number")
            return
         }*/


    const fromcurrency = fromsection.value;
    const tocurrency = tosection.value;

    if (amount.value.length != 0) {

        
        fetch(api)
            .then(res => res.json())
            .then(data => {

                let fromExchnageRate = data.conversion_rates[fromcurrency];
                let toExchnageRate = data.conversion_rates[tocurrency];

                let convertedAmount = (amount.value * toExchnageRate) / fromExchnageRate;
                convertedAmount = convertedAmount.toFixed(2);

                const result = document.querySelector(".exchange-loading");
                result.textContent = `${amount.value} ${fromcurrency} = ${convertedAmount} ${tocurrency}`;
            })
            .catch(() => alert("Error fetching API"));

    } else {
        alert("Please fill the amount you want to convert");
    }

  
};

exchangeBtn.addEventListener("click", function(e){
    e.preventDefault();  
    convertCurrency();
});

  const exicon = document.getElementById("exicon")

    exicon.addEventListener("click", () =>{
        let temp = fromsection.value
    fromsection.value = tosection.value
    tosection.value = temp

    convertCurrency()
    })

