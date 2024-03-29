import { Card, Form, InputGroup, Table } from "react-bootstrap";
import { getDefinition, getRate } from "../api/curencyAPI";
import { useEffect, useRef, useState } from "react";
import Conversion from "./Conversion";
import LineGraph from "./LineGraph";
import Marquee from "react-fast-marquee";

export default function CurrencyPanel() {
  const [data, setData] = useState([])
  const [date, setDate] = useState(new Date())
  const [filter, setFilter] = useState("")
  const [show, setShow] = useState(false)
  const [definition, setDefinition] = useState({})
  const [future, setFuture] = useState(false)
  const [day, setDay] = useState(7)
  const viewChart = useRef(null)

  const scrollToChart = () => viewChart.current.scrollIntoView()

  useEffect( () => {
    getDefinition().then(res => {
    setDefinition(res.data);
  })
  },[])

  const handleDateChange = (event) => {
    const inputDate = new Date(event.target.value)
    if (inputDate > new Date()){
      setFuture(true)
    } else {
      setDate(event.target.value)
      setFuture(false)
    }
  }

  const handleCurrencyChange = (event) => {
    setFilter(event.target.value)
  }

  function format (date) {  
    if (!(date instanceof Date)) {
      return date
    }
  
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
  
    return `${year}-${month}-${day}`
  }

  const cardCCY = ['jpy', 'eur', 'cny', 'aud', 'btc', 'cad', 'gbp']
  const flag = {'jpy':'/JP.svg', 'eur':'/EU.svg', 'cny':'/CN.svg', 'aud':'/AU.svg','btc':'/btc.svg', 'cad':'/CA.svg', 'gbp':'GB.svg'}

  useEffect(() => {
    const formattedDate = format(date)
    getRate(formattedDate).then(res => {
      if (res.status === 200){
        const arr = Object.entries(res.data.usd)
        setData(arr)
        setShow(false)
      } else {
        console.log("Something is wrong with the API")
      }}
    ).catch(e => {
        setShow(true)
    })
    }, [date])

    const [ccy, setCcy] = useState('')

    const onClic = (ccy) => {
      setCcy(ccy)
      setTimeout(() => {
        setBtnColor('btn btn-secondary')
      }, 1000);
      setBtnColor("btn btn-success")
      scrollToChart()
    }

    const onClickDay = (day) => {
      setDay(day)
      setTimeout(() => {
        setBtnColor('btn btn-secondary')
      }, 1000);
      setBtnColor("btn btn-success")
    }

    const [option, setOption] = useState({})
    const [btnColor, setBtnColor] = useState('btn btn-success')

    useEffect(() => {
      let date = new Date("2022-01-02")
      const arr = []
      while (date <= new Date()){
          const first = format(date)
          let obj = {}
          obj['label'] = first

          getRate(first).then(res => {
              obj['y'] = res.data.usd[ccy]
          }).catch(e => {
            console.log("skipping " + first)
          })

          arr.push(obj)
          let newDate = new Date(date)
          newDate.setDate(date.getDate() + day)
          date = newDate
      }

      const ops = {
        title: {
            text: ccy.toUpperCase()
        },
        data: [{
            type:"line",
            dataPoints:arr
        }]
    }

    setOption(ops)
  },[ccy, day])

  useEffect(() => {
    // console.log(vol)
  },[option])

  return (
    <>
      <Marquee className="mt-5">
        {
          data.filter(ccy => {
            if (cardCCY.includes(ccy[0])){
              return true
            }
          }).map(ccy =>       
            <Card className="rolling-card me-2">
              <Card.Body className="bg-success bg-gradient text-center">
                <img className="mb-1" src={flag[ccy[0]]} style={{width: '3rem', height:'4rem'}}/>
                {ccy[0] == 'btc' ? <Card.Title className="text-uppercase text-light">USD/{ccy[0]}</Card.Title> : <Card.Title className="text-uppercase text-light">{ccy[0]}/USD</Card.Title>}
                
                <Card.Text className="text-warning d-inline-flex align-items-end">{ccy[0] == 'btc' ? 
                <>
                  <div className="fs-6 fw-bold">{(1/ccy[1]).toFixed(8).toString().split('.')[0]}.</div>
                  <div className="fs-6">{(1/ccy[1]).toFixed(8).toString().split('.')[1]}</div>
                </> 
                :
                <>
                  <div className="fs-6 fw-bold">{ccy[1].toString().split('.')[0]}.</div>
                  <div className="fs-6">{ccy[1].toString().split('.')[1]}</div>
                </>
                }</Card.Text>
              </Card.Body>
            </Card>
            )
          }
      </Marquee>

      <Conversion data={data}/>
      <div className="bg-secondary text-center mb-1 text-white fw-bold p-2">All Rate Information</div>
      <div className="d-flex mx-auto my-1 rate-filter">
        <InputGroup size="sm" className="pe-1">
          <InputGroup.Text>Enter a date: </InputGroup.Text>
          <Form.Control placeholder="today" type="date" onChange={handleDateChange}></Form.Control>
        </InputGroup>

        <InputGroup size="sm">
          <InputGroup.Text>Filter a currency</InputGroup.Text>
          <Form.Control placeholder="Type in a currency" type="text" onChange={handleCurrencyChange}/>
        </InputGroup>
      </div>
      { future ? <div className="alert alert-danger text-center w-50 mx-auto mt-1">Who doesnt like Back to the Future!!!!</div> :
        show && !future ? <div className="alert alert-danger text-center w-50 mx-auto mt-1">Free version of this app only contains data from 01-01-2022, and some dates might be unavailable from provider.</div> :
         "" }
      <div className="container" style={{maxHeight:"70vh", overflowY:"auto"}}>
        <Table striped bordered hover className="w-100 mx-auto text-center">
          <thead>
            <tr className="table-dark">
              <th>Currency</th>
              <th>Rate (1 USD equals)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter(row => {
                if(row[0].includes(filter?.toLowerCase())){
                  return true
                } else if (definition[row[0]].toLowerCase().includes(filter.toLocaleLowerCase())){
                  return true
                }
              })
              .map( row => 
                          <tr key={row[0]}>
                            <th className="text-uppercase">{row[0]}</th>
                            <th>{row[1]}</th>
                            <th><button className={btnColor} onClick={() => onClic(row[0])}>Show chart</button></th>
                          </tr>)}
          </tbody>
        </Table>
      </div>
      <div ref={viewChart} className="bg-secondary text-center mt-3 mb-1 text-white fw-bold">Historical Rate Information</div>
      <div className="d-flex justify-content-center">
        <button className="btn btn-sm btn-secondary bg-gradient mx-1" onClick={() => onClickDay(1)}>Daily</button>
        <button className="btn btn-sm btn-secondary bg-gradient mx-1" onClick={() => onClickDay(7)}>Weekly</button>
        <button className="btn btn-sm btn-secondary bg-gradient mx-1" onClick={() => onClickDay(31)}>Monthly</button>
      </div>

      <LineGraph ccy={ccy} option={option}/>
    </>
  )
}