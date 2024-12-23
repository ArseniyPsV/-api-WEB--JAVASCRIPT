async function getCurrencyRate(currencyCode, paramMode = 2) {
    const url = `https://api.nbrb.by/exrates/rates/${currencyCode}?parammode=${paramMode}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

async function fetchAndDisplayRates() {
    const usdRateData = await getCurrencyRate('USD');
    const eurRateData = await getCurrencyRate('EUR');
    const rubRateData = await getCurrencyRate('RUB');
    
    document.getElementById('usd-rate').innerText = `Курс доллара к белорусскому рублю: ${usdRateData.Cur_OfficialRate}`;
    document.getElementById('eur-rate').innerText = `Курс евро к белорусскому рублю: ${eurRateData.Cur_OfficialRate}`;
    document.getElementById('rub-rate').innerText = `Курс российского рубля к белорусскому рублю: ${rubRateData.Cur_OfficialRate}`;

    const usdToEurRate = (usdRateData.Cur_OfficialRate / eurRateData.Cur_OfficialRate).toFixed(4);
    const eurToUsdRate = (eurRateData.Cur_OfficialRate / usdRateData.Cur_OfficialRate).toFixed(4);

    document.getElementById('usd-to-eur').innerText = `Курс доллара к евро: ${usdToEurRate}`;
    document.getElementById('eur-to-usd').innerText = `Курс евро к доллару: ${eurToUsdRate}`;
}

window.onload = fetchAndDisplayRates;
