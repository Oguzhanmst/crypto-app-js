//HMTL Etiketleri seçme işlemleri
const allCryptosDiv = document.querySelector(".all-cryptos")

//Coingecko API URL
const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=true&price_change_percentage=1h"

// // Döviz kurlarının API den çekilmesi
const a = document.querySelectorAll("a")

a.forEach(item => {
    item.addEventListener("click", e => {
        e.preventDefault()

        a.forEach(choice => {
            const ainp = choice.querySelector("p")
            ainp.style.color = "#717171"
            const img = choice.querySelector("img")
            const imgAttribute = img.getAttribute("data-default-src")
            img.setAttribute("src", imgAttribute)
        })

        const itemP = item.querySelector("p")
        itemP.style.color = "#FFFFFF"

        const itemImg = item.querySelector("img")
        const itemAtribute = itemImg.getAttribute("data-selected-src")
        itemImg.setAttribute("src", itemAtribute)

    })
})

async function exchangeData() {

    const usdtTryText = document.querySelector(".usd-to-try-text")
    const usdtEurtext = document.querySelector(".usd-to-eur-text")
    const usdtGbpText = document.querySelector(".usd-to-gbp-text")

    const exchangeCurrency = ["USDTTRY", "EURUSDT", "GBPUSDT"]
    const elements = [usdtTryText, usdtEurtext, usdtGbpText]


    for (let i = 0; i < exchangeCurrency.length; i += 1) {
        try {
            const exchangeURL = `https://api.binance.com/api/v3/ticker/price?symbol=${exchangeCurrency[i]}`
            const res = await fetch(exchangeURL)
            const data = await res.json()

            if (i == 0) {
                elements[i].textContent = `1$ = ${parseFloat(data.price).toFixed(3)}₺`
            } else if (i == 1) {
                elements[i].textContent = `1$ = ${parseFloat(1 / data.price).toFixed(3)}€`
            } else if (i == 2) {
                elements[i].textContent = `1$ = ${parseFloat(1 / data.price).toFixed(3)}£`
            }

        } catch (error) {
            console.error(`Hata: ${exchangeCurrency[i]} verisi alınamadı`, error);
        }
    }
}

exchangeData()
setInterval(exchangeData, 12000)


// Gelen veri için oluşturulan elementler için yazılmış fonksiyon
function createElement({ coinLogo,
    coinName, coinSymbol,
    coinEndPrice, coinEndPercentage, coinEndHighPrice, coinEndLowPrice,
    coinAllTimeHigh, coinAllTimeLow, coinChartArray, coinATHPercentage, coinATHPercentageDate,
    coinATLPercentage, coinATLPercentageDate, coinTotalSupply, coinMaxSupply, coinTotalVolume, coinMarketcapRank,
    coinMarketCap, coinMarketcapEnd, coinMarketCapPercantage, lastUpdate }) {



    //Coin listesi içerisine eklenecek div oluşturulması 
    const cryptoDiv = document.createElement("div")
    cryptoDiv.classList.add("crypto")
    cryptoDiv.setAttribute("data-symbol", coinSymbol)

    //Arama ile eşleşmiyorsa yeni gelen veriyi listeye eklemeden gizleme search value boşsa gizlemeyecektir.
    const currentSearchValue = document.querySelector(".crypto-list-search").value.toLowerCase();
    if (currentSearchValue) {
        const searcName = cryptoDiv.querySelector(".coin-name");
        const searcSymbol = cryptoDiv.querySelector(".coin-symbol");

        const nameText = searcName ? searcName.textContent.toLowerCase() : "";
        const symbolText = searcSymbol ? searcSymbol.textContent.toLowerCase() : "";

        if (!(nameText.includes(currentSearchValue) || symbolText.includes(currentSearchValue))) {
            cryptoDiv.style.display = "none";
        }
    }

    // Coin listesindeki elemanlar için logo-isim-sembol
    const coinImg = document.createElement("img")
    coinImg.width = 30
    coinImg.height = 30
    coinImg.src = coinLogo

    const nameSybolSpan = document.createElement("span")

    const coinNameP = document.createElement("p")
    coinNameP.classList.add("coin-name")
    coinNameP.textContent = coinName
    const coinSymbolP = document.createElement("p")
    coinSymbolP.classList.add("coin-symbol")
    coinSymbolP.textContent = coinSymbol.toUpperCase()


    cryptoDiv.appendChild(coinImg)
    nameSybolSpan.appendChild(coinNameP)
    nameSybolSpan.appendChild(coinSymbolP)
    cryptoDiv.appendChild(nameSybolSpan)
    allCryptosDiv.appendChild(cryptoDiv)

    //Info kısmı için element oluşturma ve text content düzenleme

    // Coin Info name-symbol
    const infoLogo = document.querySelector(".info-logo")
    infoLogo.width = 30
    infoLogo.height = 30

    // İnfo kısmı adı
    const infoName = document.querySelector(".details-crypto-name")
    const infoSymbol = document.querySelector(".details-crypto-symbol")

    // İnfo kısmı son 24 saatteki düşüş ve yükseliş
    const infoEndPrice = document.querySelector(".end-24h-price")
    const infoEndPercentage = document.querySelector(".end-24h-percentage")

    // İnfo kısmı son 24 saatteki en yüksek rakam ve en düşük rakam
    const infoEndCoinHigh = document.querySelector(".high-price")
    const infoEndCoinLow = document.querySelector(".low-price")

    // İnfo kısmı tüm zamanlardaki en yüksek ve en küçük değer
    const allTimeHigh = document.querySelector(".all-time-high")
    const allTimeLow = document.querySelector(".all-time-low")

    // İnfo kısmı ath bilgileri
    const coinATHper = document.querySelector(".info-cards-ath-percentage")
    const coinATHperDate = document.querySelector(".ath-percentage-date")

    // İnfo kısmı atl bilgileri
    const coinATLper = document.querySelector(".info-cards-atl-percentage")
    const coinATLperDate = document.querySelector(".atl-percentage-date")

    // İnfo Kısmı supply bilgileri
    const coinSupply = document.querySelector(".info-cards-supply")
    const coinTotalMaxSupply = document.querySelector(".info-cards-max-supply")

    // İnfo Kısmı volume bilgileri
    const coinVolume = document.querySelector(".info-cards-volume")

    // İnfo Kısmı marketcap bilgileri
    const coinMarketRank = document.querySelector(".info-cards-marketcap-rank")
    const coinMarket = document.querySelector(".info-cards-marketcap")
    const coinMarketChange = document.querySelector(".info-cards-marketcap-change")
    const coinMarketChangePercentage = document.querySelector(".info-cards-marketcap-change-percentage")

    //Listeden seçilen coin özelliklerini almak için listener
    cryptoDiv.addEventListener("click", e => {

        //Seçilen divin border düzenleme
        e.preventDefault()
        const crptoDivStroke = allCryptosDiv.querySelectorAll(".crypto")
        crptoDivStroke.forEach(stroke => {
            stroke.style.border = "1px solid var(--line-color)"
        })
        cryptoDiv.style.border = "1px solid var(--stroke-color)"

        //seçilen div özelliklerini aktarma
        infoLogo.src = coinLogo
        infoName.textContent = coinName
        infoSymbol.textContent = coinSymbol.toUpperCase()

        //Düşüş artış durumuna göre renk verme 
        if (coinEndPrice > 0) {
            infoEndPrice.style.color = "#04CE00"
        } else if (coinEndPrice < 0) {
            infoEndPrice.style.color = "#C12525"
        } else {
            infoEndPrice.style.color = "#FFFFFF"
        }

        if (coinEndPercentage > 0) {
            infoEndPercentage.style.color = "#04CE00"
        } else if (coinEndPercentage < 0) {
            infoEndPercentage.style.color = "#C12525"
        } else {
            infoEndPrice.style.color = "#FFFFFF"
        }

        //İnfo kısmındaki navın sağ kısmında bulunan değerlerin güncellenmesi
        infoEndPrice.textContent = `$${Number(coinEndPrice).toLocaleString("tr-TR")}`
        infoEndPercentage.textContent = `${Number(coinEndPercentage).toLocaleString("tr-TR")}%`

        infoEndCoinHigh.textContent = `$${Number(coinEndHighPrice).toLocaleString("tr-TR")}`
        infoEndCoinLow.textContent = `$${Number(coinEndLowPrice).toLocaleString("tr-TR")}`

        allTimeHigh.textContent = `$${Number(coinAllTimeHigh).toLocaleString("tr-TR")}`
        allTimeLow.textContent = `$${Number(coinAllTimeLow).toLocaleString("tr-TR")}`

        //Grafik için gelen tarih verisinin timestamp olarak düzenlenmesi
        const updateDateStr = lastUpdate
        const updateDate = new Date(updateDateStr)
        const startDate = new Date(updateDate.getTime() - (168 * 3600 * 1000)) //milisaniye olarak çevirme işlemi
        const pointStart = startDate.getTime()

        // Highcharts için uygun formata dönüştürme [timestamp, value]
        const formattedData = coinChartArray.map((price, date) => [
            startDate.getTime() + date * (3600 * 1000), // her veri noktası 1 saat arayla
            price
        ])


        // Highcharts yapılandırması
        Highcharts.chart('crypto-chart', {
            chart: {
                zoomType: 'x',
                backgroundColor: '#101010'
            },
            exporting: {
                buttons: {
                    contextButton: {
                        symbolStroke: '#232323', // ikonun rengi (beyaz yapıyoruz)
                        theme: {
                            fill: 'none',        // arka planı şeffaf yap
                            stroke: 'none',      // kenar çizgisini kaldır
                            states: {
                                hover: {
                                    fill: 'none', // hover'da da arka plan olmasın
                                    stroke: 'none'
                                },
                                select: {
                                    fill: 'none',
                                    stroke: 'none'
                                }
                            }
                        }
                    }
                }
            },
            title: {
                text: `${coinName} (${coinSymbol}) 7 Day Chart`
            },
            xAxis: {
                type: 'datetime',
                gridLineColor: '#232323', //  burada grafik çizgileri 232323 yapıyoruz
                labels: {
                    style: {
                        color: '#717171'
                    }
                }
            },
            yAxis: {
                title: {
                    text: 'Price (USD)',
                    style: {
                        color: '#ffffff'
                    }
                },
                gridLineColor: '#232323', //  burada da y ekseni çizgileri
                labels: {
                    style: {
                        color: '#717171'
                    }
                }
            },
            legend: {
                enabled: false
            },
            plotOptions: {
                area: {
                    fillColor: {
                        linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                        stops: [
                            [0, Highcharts.getOptions().colors[0]],
                            [1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                        ]
                    },
                    marker: {
                        radius: 5
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                }
            },
            series: [{
                type: 'area',
                name: 'BTC Price',
                data: formattedData,
                pointStart: pointStart, //Başlangıç noktasını grafik için oluşturduğumuz timestamp ile ekleme
                pointInterval: 3600 * 1000 // Grafik aralıklarını belirleme 1 saatlik olacağını ms cinsinden söylüyoruz.
            }]
        });

        //İnfo kısmındaki volume-supply-marketcap gibi değerlerin text content atanması
        coinATHper.textContent = `%${Number(coinATHPercentage).toLocaleString("tr-TR")}`
        coinATHperDate.textContent = `Last Update: ${coinATHPercentageDate}`


        coinATLper.textContent = `%${Number(coinATLPercentage).toLocaleString("tr-TR")}`
        coinATLperDate.textContent = coinATLPercentageDate

        coinSupply.textContent = `${Number(coinTotalSupply).toLocaleString("tr-TR")}`
        coinTotalMaxSupply.textContent = `Max Supply: ${Number(coinMaxSupply).toLocaleString("tr-TR")}`

        coinVolume.textContent = `${Number(coinTotalVolume).toLocaleString("tr-TR")}`

        coinMarketRank.textContent = `${coinMarketcapRank}🏆`
        coinMarket.textContent = `${Number(coinMarketCap).toLocaleString("tr-TR")}`
        coinMarketChange.textContent = `${Number(coinMarketcapEnd).toLocaleString("tr-TR")}`
        coinMarketChangePercentage.textContent = `%${Number(coinMarketCapPercantage).toLocaleString("tr-TR")}`

    })

}


//Liste içerisinde ara işlemi yapabilmek için oluşturulan listener
const search = document.querySelector(".crypto-list-search")

search.addEventListener("keyup", e => {
    const searchValue = e.target.value.toLowerCase();
    const searchCrypto = allCryptosDiv.querySelectorAll(".crypto"); // her keyup'ta güncel listeyi çekiyoruz

    searchCrypto.forEach(element => {
        const searcName = element.querySelector(".coin-name");
        const searcSymbol = element.querySelector(".coin-symbol");

        const nameText = searcName ? searcName.textContent.toLowerCase() : ""
        const symbolText = searcSymbol ? searcSymbol.textContent.toLowerCase() : ""

        if (nameText.includes(searchValue) || symbolText.includes(searchValue)) {
            element.style.display = "flex"; // eşleşiyorsa göster (flex olarak)
        } else if (!searchValue) {
            element.style.display = "flex";
            return
        } else {
            element.style.display = "none"; // eşleşmiyorsa gizle
        }
    });
});


//Coin gecko ve binanceden gelecek veriler için async fonskiyon
async function coinGeckoAndbinanceDatas() {

    const newMap = new Map() //map içerisinde saklamak için veri çekmeden önce map oluşturmak 

    await fetch(url)
        .then(res => res.json())
        .then(coinGeckoData => {
            coinGeckoData.forEach(element => {
                newMap.set(element.symbol, {
                    ath: element.ath,
                    athPercentage: element.ath_change_percentage,
                    athDate: element.ath_date,
                    atl: element.atl,
                    atlPercentage: element.atl_change_percentage,
                    altDate: element.atl_date,
                    highEnd: element.high_24h,
                    lowEnd: element.low_24h,
                    logo: element.image,
                    marketRank: element.market_cap_rank,
                    market: element.market_cap,
                    marketEnd: element.market_cap_change_24h,
                    marketPercentage: element.market_cap_change_percentage_24h,
                    name: element.name,
                    maxSupply: element.max_supply,
                    priceEnd: element.price_change_24h,
                    pricePercentage: element.price_change_percentage_24h,
                    chart: element.sparkline_in_7d.price,
                    totalSupply: element.total_supply,
                    totalVolume: element.total_volume,
                    lastUpdate: element.last_updated
                })
            })
        })

        
    const streamSymbol = Array.from(newMap.keys())
        .map(symbol => `${symbol.toLowerCase()}usdt@trade`)
        .join("/")

    const streamUrl = `wss://stream.binance.com:9443/ws/${streamSymbol}`

    const socket = new WebSocket(streamUrl)

    socket.onopen = () => {
        console.log("Bağlantı kuruldu.")
    };

    socket.onmessage = (event) => {
        const dataWeb = JSON.parse(event.data);
        const symbol = dataWeb.s;
        const price = dataWeb.p;

        //Binanceden gelen veriler sonu usdt ile bitiyor bu yüzden coin gecko ile eşleşmesi için sonu usdt ile bitenleri yeniden düzenleme 
        if (symbol.endsWith("USDT")) {
            const binanceSymbol = symbol.replace("USDT", "").toLowerCase()
            const newMapSymbol = newMap.get(binanceSymbol)
            if (newMapSymbol) {

                //crpyolarda eşleşmenin doğru olması için hepsine atadığmı attribute'lerin içeriğine coin sembolleri ekleme 
                const uniqDiv = document.querySelector(`.crypto[data-symbol="${binanceSymbol}"]`)

                if (!uniqDiv) {
                    createElement({
                        coinLogo: newMapSymbol.logo,
                        coinName: newMapSymbol.name,
                        coinSymbol: binanceSymbol,
                        coinEndPrice: newMapSymbol.priceEnd,
                        coinEndPercentage: newMapSymbol.pricePercentage,
                        coinEndHighPrice: newMapSymbol.highEnd,
                        coinEndLowPrice: newMapSymbol.lowEnd,
                        coinAllTimeHigh: newMapSymbol.ath,
                        coinAllTimeLow: newMapSymbol.atl,
                        coinChartArray: newMapSymbol.chart,
                        coinATHPercentage: newMapSymbol.athPercentage,
                        coinATHPercentageDate: newMapSymbol.athDate,
                        coinATLPercentage: newMapSymbol.atlPercentage,
                        coinATLPercentageDate: newMapSymbol.atlDate,
                        coinTotalSupply: newMapSymbol.totalSupply,
                        coinMaxSupply: newMapSymbol.maxSupply,
                        coinTotalVolume: newMapSymbol.totalVolume,
                        coinMarketcapRank: newMapSymbol.marketRank,
                        coinMarketCap: newMapSymbol.market,
                        coinMarketcapEnd: newMapSymbol.marketEnd,
                        coinMarketCapPercantage: newMapSymbol.marketPercentage,
                        lastUpdate: newMapSymbol.lastUpdate
                    })
                }

                //Eğer seçilen coin sembolleri içeriyorsa text contetni sürekli olarak güncelle
                const infoSymbol = document.querySelector(".details-crypto-symbol")

                if (infoSymbol.textContent.includes(binanceSymbol.toUpperCase())) {
                    const infoCurrentPrice = document.querySelector(".crypto-current-price")
                    if (infoCurrentPrice) {
                        infoCurrentPrice.textContent = `$${Number(price).toLocaleString("tr-TR")}`

                    }
                }
            }
        }
    }

    socket.onerror = (error) => {
        console.error("WebSocket Error:", error)
    }
      
      socket.onclose = () => {
        console.log("WebSocket Connection Closed")
    }
}

coinGeckoAndbinanceDatas()