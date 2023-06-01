import CanvasJSReact from "@canvasjs/react-charts"

export default function LineGraph({option}) {
    var CanvasJS = CanvasJSReact.CanvasJS;
    var CanvasJSChart = CanvasJSReact.CanvasJSChart;
    
    // function format (date) {  
    //     if (!(date instanceof Date)) {
    //       return date
    //     }
    
    //     const year = date.getFullYear()
    //     const month = String(date.getMonth() + 1).padStart(2, '0')
    //     const day = String(date.getDate()).padStart(2, '0')
      
    //     return `${year}-${month}-${day}`
    // }

    // const [cccy, setCcy] = useState("")
    // const [dataPoints, setDataPoints] = useState([])
    // const [option, setOption] = useState({})
    
    // useEffect(() => {
    //     if (ccy !== ""){
    //         setCcy(ccy)
    //     }
    // },[ccy])

    // useEffect(() => {
    //     let date = new Date("2022-01-02")
    //     const arr = []
    //     while (date < new Date()){
    //         const first = format(date)
    //         let obj = {}
    //         obj['label'] = first

    //         getRate(first).then(res => {
    //             obj['y'] = res.data.usd[ccy]
    //         })

    //         arr.push(obj)
    //         let newDate = new Date(date)
    //         newDate.setDate(date.getDate() + 7)
    //         date = newDate
    //     }
    //     console.log(arr)
    //     setDataPoints(arr)
    //     console.log(dataPoints)

    //     const ops = {
    //         title: {
    //             text: ccy
    //         },
    //         data: [{
    //             type:"line",
    //             dataPoints:dataPoints
    //         }]
    //     }
    //     setOption(ops)
    // },[cccy])

  return (
    <div className="pb-3">
        <div className="bg-secondary text-center mt-3 mb-1 text-white fw-bold">Historical Rate Information</div>
        <CanvasJSChart options={option} />
    </div>
  )
}