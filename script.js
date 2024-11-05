const zentralen = {
    BremenZentrale: { postalCode: "28279", email: "bestellungen-bremen@hofmei.de", lat: 53.0793, lon: 8.8017 },
    BerlinZentrale: { postalCode: "14974", email: "berlin@hofmei.de", lat: 52.5200, lon: 13.4050 },
    BielefeldZentrale: { postalCode: "33699", email: "bielefeld@hofmei.de", lat: 52.0302, lon: 8.5325 },
    BremenHavenZentrale: { postalCode: "27572", email: "bremerhaven@hofmei.de", lat: 53.5396, lon: 8.5809 },
    DresdenZentrale: { postalCode: "01723", email: "dresden@hofmei.de", lat: 51.0504, lon: 13.7373 },
    HamburgZentrale: { postalCode: "22113", email: "hamburg@hofmei.de", lat: 53.5511, lon: 9.9937 },
    HockenheimZentrale: { postalCode: "68766", email: "hockenheim@hofmei.de", lat: 49.3227, lon: 8.5428 },
    KitzingenZentrale: { postalCode: "97318", email: "kitzingen@hofmei.de", lat: 49.7395, lon: 10.1517 }
};

async function getData(postalCode) {
    const countryName = "Deutschland";
    const apiKey = "ctMrmSANgw9XL0qEqRyVCO-rWcOY59jxTWe3ps2LMxQ";
    const geolocationURL = `https://geocode.search.hereapi.com/v1/geocode?q=${postalCode},${countryName}&apiKey=${apiKey}`;

    try {
        const response = await fetch(geolocationURL);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const json = await response.json();

        
        if (json.items.length === 0) {
            throw new Error("Invalid postal code");
        }

       
        const returnedPostalCode = json.items[0].address.postalCode;

        
        if (returnedPostalCode !== postalCode) {
            throw new Error("Postal code mismatch: invalid code");
        }

        // Return the coordinates if valid
        return { lat: json.items[0].position.lat, lon: json.items[0].position.lng };
    } catch (error) {
        console.error("Error fetching geolocation data:", error.message);
        return null; 
    }
}

function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * 
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
}

function findNearestZentrale(inputLat, inputLon) {
    let closestZentrale = null;
    let smallestDistance = Infinity;

    for (const [zentrale, zentraleInfo] of Object.entries(zentralen)) {
        const distance = calculateDistance(inputLat, inputLon, zentraleInfo.lat, zentraleInfo.lon);

        if (distance < smallestDistance) {
            smallestDistance = distance;
            closestZentrale = zentrale;
        }
    }

    return closestZentrale;
}

document.getElementById('submitBtn').addEventListener('click', async function () {
    const postalCode = document.querySelector('.inputText').value;
    let resultResponse =  document.querySelector('.result');
    if (postalCode) {
        const coordinates = await getData(postalCode);

        if (coordinates) {
            const nearestZentrale = findNearestZentrale(coordinates.lat, coordinates.lon);
            const email = zentralen[nearestZentrale].email;
            resultResponse.textContent = `${email}`;
            resultResponse.style.color = 'green';
        } else {
            resultResponse.textContent = 'Postleitzahl ungültig';
            resultResponse.style.color = 'red'

        }
    } else {
        document.querySelector('.result').textContent = "Postleitzahl ungültig";
    }
});






