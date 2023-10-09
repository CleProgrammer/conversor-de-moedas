import { useEffect, useState } from "react"
import { FunctionComponent } from "react"

/*interface ApiCallProps {
    urlprop: string
}*/

export default async function ApiCall(urlprop: string) {
    const [saveData, setSaveData] = useState([])

    let url = `https://economia.awesomeapi.com.br/json/last/${urlprop}`
    let fetchData = await fetch(url)
    let dataJson = await fetchData.json()
    console.log( dataJson )
    return dataJson
}


/*const ApiCall: FunctionComponent<ApiCallProps> = ({urlprop}) => {
    const [saveData, setSaveData] = useState([])

    useEffect(() => {
        async function getData() {
            let url = `https://economia.awesomeapi.com.br/json/last/${urlprop}`
            let fetchData = await fetch(url)
            let dataJson = await fetchData.json()
            setSaveData( dataJson )
        }

        getData()

        console.log( saveData )
    }, [])

    return getData()
}*/
