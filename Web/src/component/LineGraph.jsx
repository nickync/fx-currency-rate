import CanvasJSReact from "@canvasjs/react-charts"
import { getRate } from "../api/curencyAPI";
import { useEffect, useState } from "react";

export default function LineGraph({ccy}) {
    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    

    function format (date) {  
        if (!(date instanceof Date)) {
          return date
        }
    
        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
      
        return `${year}-${month}-${day}`
    }
    const [cccy, setCcy] = useState('')
    const [dataPoints, setDataPoints] = useState([])
    const [option, setOption] = useState({})
    
    useEffect(() => {
        if (ccy !== ""){
            setCcy(ccy)
        }
    })

    useEffect(() => {
        let date = new Date("2022-01-02")
        const arr = []
        while (date < new Date()){
            const first = format(date)
            getRate(first).then(res => {
                let obj = {}
                obj['label'] = first
                obj['y'] = res.data.usd[ccy]
                arr.push(obj)
            })
            let newDate = new Date(date)
            newDate.setDate(date.getDate() + 7)
            date = newDate
        }
        setDataPoints(arr)
        console.log(dataPoints)
    },[cccy])

    useEffect(() => {
        const ops = {
            title: {
                text: "Line chart"
            },
            data: [{
                type:"line",
                dataPoints:dataPoints
            }]
        }
        setOption(ops)
        
    }, [dataPoints])

  return (
    <div>
        <CanvasJSChart options={option} />
    </div>
  )
}