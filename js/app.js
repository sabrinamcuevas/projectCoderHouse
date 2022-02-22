/* EL SIGUIENTE PROYECTO SE TRATA DE UNA 'TIENDA' DE CRIPTOMONEDAS.
EN ESTA TIENDA SE PUEDE COMPRAR CRIPTOS DE ACUERDO AL SALDO DISPONIBLE
EN LA BILLETERA VIRTUAL, ESTE SALDO SE ENCUENTRA EN MONEDA (1)FIAT */
class Cryptos {
    constructor(currency, to_convert, value) {
        this.currency = currency
        this.to_convert = to_convert
        this.value = value
    }

    equivalence(j) {
        return this.value[j]
    }
}

const cryptos = []
cryptos.push(new Cryptos('BTC', ['USD', 'ARS', 'EUR', 'JPY', 'CNY'], [43979.16, 4658225, 38401.00, 5087557, 280422]))
cryptos.push(new Cryptos('ETH', ['USD', 'ARS', 'EUR', 'JPY', 'CNY'], [2884.31, 305820, 2537.78, 332476, 18328.65]))
cryptos.push(new Cryptos('USDT', ['USD', 'ARS', 'EUR', 'JPY', 'CNY'], [1, 106.25, 0.881683, 115.51, 6.36]))
cryptos.push(new Cryptos('BNB', ['USD', 'ARS', 'EUR', 'JPY', 'CNY'], [401.45, 42624.62, 353.55, 46318.42, 2529.04]))
cryptos.push(new Cryptos('SOL', ['USD', 'ARS', 'EUR', 'JPY', 'CNY'], [96.01, 10218.78, 84.91, 11142.00, 611.65]))
cryptos.push(new Cryptos('LUNA', ['USD', 'ARS', 'EUR', 'JPY', 'CNY'], [52.71, 5604.53, 46.47, 6088.63, 334.98]))

const availables = [
    { fiat: 'USD', quantity: 150000, img: 'img/bg-img/usa.png' },
    { fiat: 'ARS', quantity: 200000, img: 'img/bg-img/ars.png' },
    { fiat: 'EUR', quantity: 2270, img: 'img/bg-img/euro.png' },
    { fiat: 'JPY', quantity: 0, img: 'img/bg-img/japan.png' },
    { fiat: 'CNY', quantity: 0, img: 'img/bg-img/yen.png' }
]

//guardo en el store el listado de monedas fiat con los saldos disponibles
const infoLS = (key, value) => { localStorage.setItem(key, value) }
infoLS('listAvailables', JSON.stringify(availables))
const fiatAvailable = JSON.parse(localStorage.getItem('listAvailables'))

//variables para el armado del menu de criptos y fiats en el frontend
let div_top = document.getElementById('available_top')
let div_modal = document.getElementById('available')
let div_crypto_top = document.getElementById('available_crypto_top')
let div_crypto = document.getElementById('available_crypto')
let menuList = ''
let menuCrypto = ''

//listado de fiats que se ve en el header de la pagina y en el modal cuando se va a comprar una cripto
for (const obj of fiatAvailable) {
    menuList += `<a href="#" style="padding: 0 0 0 37px;"><span id="${obj.fiat}">${obj.quantity}</span><img src="${obj.img}"></a>`
}

div_top.innerHTML = menuList
div_modal.innerHTML = menuList

//armo una clase y un array auxiliar para setear luego el valor de la cantidad disponible y luego 
//actualizar el localstorage
const resultAvailable = []
class Available {
    constructor(obj) {
        this.fiat = obj.fiat
        this.quantity = obj.quantity
        this.img = obj.img
    }
    setQuantity(v) {
        return this.quantity = v
    }
}

for (const obj of fiatAvailable) {
    resultAvailable.push(new Available(obj))
}

//selects para llenar el front con la data de criptos y fiats usando la class Crypto
selectCurrencyBuy = document.getElementById('select_currencies_buy')
selectFiatBuy = document.getElementById('select_fiat_buy')

//en el mismo for para llenar el select de criptos lo uso para armar un array auxiliar con 
//la cantidad de criptos disponibles inicialmente cero.
availableCrypto = []

for (const [i, crypto] of cryptos.entries()) {
    var optCrypto = document.createElement('option')
    optCrypto.value = i
    optCrypto.innerHTML = crypto.currency
    selectCurrencyBuy.appendChild(optCrypto);
    availableCrypto.push({ currency: crypto.currency, quantity: 0, img: `img/bg-img/${crypto.currency}.png` })
}

//guardo el listado de criptos en el localStorage
const cryptoLS = (key, value) => { localStorage.setItem(key, value) }
cryptoLS('listCryptos', JSON.stringify(availableCrypto))
const cryptosAvailable = JSON.parse(localStorage.getItem('listCryptos'))

//clase auxiliar para setear luego el valor del disponible en criptos
class AvailableCrypto {
    constructor(obj) {
        this.currency = obj.currency
        this.quantity = obj.quantity
        this.img = obj.img
    }
    setQuantity(v) {
        return this.quantity = v
    }
}

// for donde se llena con el listado de monedas cripto que seran visualizadas en el front en el header y el modal
const resultAvailableCrypto = []
for (const obj of cryptosAvailable) {
    resultAvailableCrypto.push(new Available(obj))
    menuCrypto += `<a href="#" style="padding: 0 0 0 37px;"><span id="${obj.currency}"></span>${obj.quantity}</span><img src="${obj.img}"></a>`
}

div_crypto_top.innerHTML = menuCrypto
div_crypto.innerHTML = menuCrypto


// for para llenar el select de monedas fiats
for (let i = 0; i < cryptos[0].to_convert.length; i++) {
    var optFiat = document.createElement('option')
    optFiat.value = i
    optFiat.innerHTML = cryptos[0].to_convert[i]
    selectFiatBuy.appendChild(optFiat);
}

let inputCryptoBuy = document.getElementById('value_crypto_buy')
let inputFiatBuy = document.getElementById('value_fiat_buy')

inputFiatBuy.onchange = () => { conversion(inputFiatBuy.value, selectCurrencyBuy, selectFiatBuy) }
selectFiatBuy.onchange = () => { conversion(inputFiatBuy.value, selectCurrencyBuy, selectFiatBuy) }


/* Funcion para comprar cryptos dependiendo del saldo disponible que tengas segun la moneda FIAT */
function conversion(value, currency, convert) {
    currencyName = convert.options[convert.selectedIndex].text
    switch (currencyName) {
        case 'USD':
            purchaseLimit(convert.value, currency, value, convert)
            break;
        case 'ARS':
            purchaseLimit(convert.value, currency, value, convert)
            break;
        case 'EUR':
            purchaseLimit(convert.value, currency, value, convert)
            break;
        case 'JPY':
            purchaseLimit(convert.value, currency, value, convert)
            break;
        case 'CNY':
            purchaseLimit(convert.value, currency, value, convert)
            break;
        default:
            break;
    }
}

function purchaseLimit(i, currency, value, convert) {
    let available = JSON.parse(localStorage.getItem('listAvailables'))
    available = available[i].quantity

    if (available > value) {
        price = cryptos[currency.value].equivalence(convert.value)
        total = value / price
        inputCryptoBuy.value = total
    } else {
        inputFiatBuy.value = 0
        alert('Su saldo es insuficiente para realizar la operación')
    }
}

//funcion donde se realizan los calculos en cual se va restando el disponible segun la moneda
//fiat que se elija y se suma el saldo en la moneda cripto,  usando los arrays auxiliares 
//correspondientes a cada moneda y seteando la data en el localStorage

function formSubmit() {
    menuList = ''
    menuCrypto = ''
    let fiatValue = document.getElementById('value_fiat_buy').value
    let currencyValue = inputCryptoBuy.value
    let disposable = JSON.parse(localStorage.getItem('listAvailables'))
    let disposableCrypto = JSON.parse(localStorage.getItem('listCryptos'))

    disposable = disposable[selectFiatBuy.value].quantity
    disposableCrypto = disposableCrypto[selectCurrencyBuy.value].quantity

    let total = Number(disposable) - Number(fiatValue)
    let totalCrypto = Number(disposableCrypto) + Number(currencyValue)
    
    if (total >= 0) {
        resultAvailable[selectFiatBuy.value].setQuantity(total)
        localStorage.setItem('listAvailables', JSON.stringify(resultAvailable))
        const remainderResult = JSON.parse(localStorage.getItem('listAvailables'))
        
        resultAvailableCrypto[selectCurrencyBuy.value].setQuantity(totalCrypto.toFixed(3))
        localStorage.setItem('listCryptos', JSON.stringify(resultAvailableCrypto))
        const remainderCryptoResult = JSON.parse(localStorage.getItem('listCryptos'))

        //actualizo el listado de saldos para que se visualicen en el front
        for (const obj of remainderResult) {
            menuList += `<a href="#" style="padding: 0 0 0 37px;"><span id="${obj.fiat}">${obj.quantity}</span><img src="${obj.img}"></a>`
        }

        div_top.innerHTML = menuList
        div_modal.innerHTML = menuList

        for (const obj of remainderCryptoResult) {
            menuCrypto += `<a href="#" style="padding: 0 0 0 37px;"><span id="${obj.currency}">${obj.quantity}</span><img src="${obj.img}"></a>`
        }

        div_crypto.innerHTML = menuCrypto
        div_crypto_top.innerHTML = menuCrypto
    } else {
        alert('Su saldo es insuficiente para realizar la operación')
    }
}


/* Calculadora convertidora de criptomonedas: es una herramienta para convertir el valor de una 
criptomoneda en la moneda FIAT que se elija.*/

selectCurrency = document.getElementById('select_currencies')
selectFiat = document.getElementById('select_fiat')

for (const [i, crypto] of cryptos.entries()) {
    var optCrypto = document.createElement('option')
    optCrypto.value = i
    optCrypto.innerHTML = crypto.currency
    selectCurrency.appendChild(optCrypto);
}

for (let i = 0; i < cryptos[0].to_convert.length; i++) {
    var optFiat = document.createElement('option')
    optFiat.value = i
    optFiat.innerHTML = cryptos[0].to_convert[i]
    selectFiat.appendChild(optFiat);
}

let inputCrypto = document.getElementById('value_crypto')
let inputFiat = document.getElementById('value_fiat')

inputCrypto.onchange = () => { calculator(inputCrypto.value, selectCurrency, selectFiat) }
selectCurrency.onchange = () => { calculator(inputCrypto.value, selectCurrency, selectFiat) }
selectFiat.onchange = () => { calculator(inputCrypto.value, selectCurrency, selectFiat) }

function calculator(value, currency, convert) {
    currencyName = currency.options[currency.selectedIndex].text

    switch (currencyName) {
        case 'BTC':
            operation(value, currency, convert)
            break;
        case 'ETH':
            operation(value, currency, convert)
            break;
        case 'USDT':
            operation(value, currency, convert)
            break;
        case 'BNB':
            operation(value, currency, convert)
            break;
        case 'SOL':
            operation(value, currency, convert)
            break;
        case 'LUNA':
            operation(value, currency, convert)
            break;
        default:
            break;
    }
}

function operation(value, currency, convert) {
    price = cryptos[currency.value].equivalence(convert.value)
    total = value * price
    inputFiat.value = total
}

/*GLOSARIO: El dinero FIAT, en pocas palabras, es dinero de curso legal cuyo valor no
deriva del hecho de ser un bien físico o mercancía, sino por ser emitido y respaldado por un gobierno. */