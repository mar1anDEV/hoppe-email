document.addEventListener("DOMContentLoaded", function () {
    const countryName = "Deutschland";
    const apiKey = "ctMrmSANgw9XL0qEqRyVCO-rWcOY59jxTWe3ps2LMxQ";

    const zentralen = {
        BremenZentrale: "28279",
        BerlinZentrale: "14974",
        BielefeldZentrale: "33699",
        BremenHavenZentrale: "27572",
        DresdenZentrale: "01723",
        HamburgZentrale: "22113",
        HockenheimZentrale: "68766",
        KitzingenZentrale: "97318"
    };

    async function getData(postalCode) {
        const geolocationURL = `https://geocode.search.hereapi.com/v1/geocode?q=${postalCode},${countryName}&apiKey=${apiKey}`;
        try {
            const response = await fetch(geolocationURL);
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            const json = await response.json();
            console.log(json); // Log the response for debugging
            return json; // Return the JSON data
        } catch (error) {
            console.error(error.message);
        }
    }

    document.getElementById('submitBtn').addEventListener('click', async function () {
        const postalCode = document.querySelector('.inputText').value;
    
        // Call getData with await to handle asynchronous behavior
        const result = await getData(postalCode);
        for item in items
    
        // Display result if available, or handle case where no result is returned
        if (result) {
            document.querySelector('.result').innerHTML = `Result: ${JSON.stringify(result)}`;
        } else {
            document.querySelector('.result').innerHTML = "No data found for the provided postal code.";
        }
    });
});






