import { useEffect, useState } from "react";
import ApiCall from "../api-call/apiCall";
import '../layout/layout.css'
import { Chart } from "react-google-charts"

import Coin from '../images/Coin.jpg'
import moment from "moment";

interface ArrayCoin {
    ask: string
}

export default function Layout() {
    const c = (cl: any) => document.querySelector(cl)

    const [saveCoins1, setSaveCoins1] = useState('USD')
    const [saveCoins2, setSaveCoins2] = useState('BRL')
    const [savePrice, setSavePrice] = useState<any>([])

    const [options, setOptions] = useState({
        chartArea: {
            left: 40,
            width: '100%'
        },
    })

    const [data, setData] = useState([
        ['Dias', 'Preço'],
    ])

    async function getCoin1(e: any) {
        setSaveCoins1( e.target.value )

        if( e.target.value === saveCoins2 ) {
            setSaveCoins2( saveCoins1 )
            for( let i in document.getElementsByName('coinsOptions2')[0].getElementsByTagName('option')) {

                if( document.getElementsByName('coinsOptions2')[0].getElementsByTagName('option')[i].getAttribute !== undefined  ) {
                    if( document.getElementsByName('coinsOptions2')[0].getElementsByTagName('option')[i].getAttribute('selected') === 'selected' ) {
                        document.getElementsByName('coinsOptions2')[0].getElementsByTagName('option')[i].removeAttribute('selected')
                    }
                }

                if( document.getElementsByName('coinsOptions2')[0].getElementsByTagName('option')[i].value === saveCoins1 ) {
                    document.getElementsByName('coinsOptions2')[0].getElementsByTagName('option')[i].setAttribute('selected', 'selected')
                }
            }
        }
        
        if( e.target.value !== saveCoins1 ) {
            if( c('.priceCoin1').value === '' ) {
                c('.priceCoin1').value = 1
                console.log('dsdgdfg')
            }

        }

        if( e.target.value !== saveCoins1 ) {
            setData([
                ['Dias', 'Preço'],
            ])
        }
    }

    async function getCoin2(e: any) {
        setSaveCoins2( e.target.value )

        if( e.target.value === saveCoins1 ) {
            setSaveCoins1( saveCoins2 )
            for( let i in document.getElementsByName('coinsOptions1')[0].getElementsByTagName('option')) {

                if( document.getElementsByName('coinsOptions2')[0].getElementsByTagName('option')[i].getAttribute !== undefined  ) {
                    if( document.getElementsByName('coinsOptions2')[0].getElementsByTagName('option')[i].getAttribute('selected') === 'selected' ) {
                        document.getElementsByName('coinsOptions2')[0].getElementsByTagName('option')[i].removeAttribute('selected')
                        console.log( 'fdgkjdf' )
                    }
                }

                if( document.getElementsByName('coinsOptions1')[0].getElementsByTagName('option')[i].value === saveCoins2 ) {
                    document.getElementsByName('coinsOptions1')[0].getElementsByTagName('option')[i].setAttribute('selected', 'selected')
                }
            }
        }

        if( e.target.value !== saveCoins2 ) {
            if( c('.priceCoin1').value === '' ) {
                c('.priceCoin1').value = 1
            }
        }
            
        if( e.target.value !== saveCoins2 ) {
            setData([
                ['Dias', 'Preço'],
            ])
        }
    }

    function valueCoin(e: any) {
        let savePriceMult = parseFloat(e.target.value) * parseFloat(savePrice[0].ask)
        c('.priceCoin2').value = savePriceMult.toLocaleString('pt-br', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        })

        if( c('.priceCoin1').value === '' ) {
            c('.priceCoin2').value = 0
        }
    }

    useEffect(() => {
        const getPrice = async (e: any) => {
            let url = `https://economia.awesomeapi.com.br/json/${e}`
            let fetchData = await fetch(url)
            let dataJson = await fetchData.json()



            let saveNumDays = 15
            if( window.screen.width <= 480 ) {
                saveNumDays = 5
            }

            let url2 = `https://economia.awesomeapi.com.br/json/daily/${saveCoins1}-${saveCoins2}/${saveNumDays}`
            let fetchData2 = await fetch(url2)
            let dataJson2 = await fetchData2.json()
            console.log( dataJson2 )

            dataJson2.toReversed().map((item:any) => setData((prevState:any) => ([
                ...prevState,
                [moment.unix(parseInt( item.timestamp )).format("DD/MM"), parseFloat( item.high )],
            ])))

            c('.priceInReal').innerHTML = parseFloat( dataJson[0].ask ).toLocaleString('pt-BR', {style: 'currency', currency: `${saveCoins2}`})
            c('.nameCoin').innerHTML = '1 ' + dataJson[0].name.split('/')[0] + ' hoje'
            c('.priceCoin2').value = parseFloat( dataJson[0].ask ).toLocaleString('pt-br', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
            setSavePrice( dataJson )

            console.log('fdgdgdfg')

            if( c('.priceCoin1').value > 1 ) {
                let priceMoreThanOne = c('.priceCoin1').value * parseFloat(dataJson[0].ask)
                c('.priceCoin2').value = priceMoreThanOne.toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                })
            }
        }

        if( saveCoins1 !== saveCoins2 ) {
            getPrice(saveCoins1+'-'+saveCoins2)
        }

    }, [saveCoins1, saveCoins2])

    return (
        <div className="main-exchange" style={{backgroundImage: `url("${Coin}")`}}>
            <div className="main-container">
                <div className="first-section">
                    <div className="priceInReal"></div>
                    <div className="nameCoin"></div>
                </div>
                
                <div className="section-coins">
                    <div className="box-coin1">
                        <select name="coinsOptions1" onClick={getCoin1}>
                            <option id="Dólar Americano" className="getCoin" value="USD">
                                Dólar Americano
                            </option>
                            <option className="getCoin" value="BRL">
                                Real Brasileiro
                            </option>
                            <option className="getCoin" value="EUR">
                                Euro
                            </option>
                            <option className="getCoin" value="GBP">
                                Libra
                            </option>
                        </select>
                        <input className="priceCoin1" type="number" defaultValue='1' onChange={valueCoin} />
                            
                    </div>
                    <div className="box-coin2">
                        <select name="coinsOptions2" onClick={getCoin2}>
                            <option className="getCoin" value="BRL">
                                Real Brasileiro
                            </option>
                            <option className="getCoin" value="USD" >
                                Dólar Americano
                            </option>
                            <option className="getCoin" value="EUR">
                                Euro
                            </option>
                            <option className="getCoin" value="GBP">
                                Libra
                            </option>
                        </select>
                        <input className="priceCoin2" disabled />
                        
                    </div>
                </div>
            </div>

            <div className="chart">
                <Chart
                    width={'100%'}
                    height={'100%'}
                    chartType="LineChart"
                    data={data}
                    options={options}
                />
            </div>
        </div>
    )
}
