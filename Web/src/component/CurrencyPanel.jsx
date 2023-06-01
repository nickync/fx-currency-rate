import { Form, InputGroup, Table } from "react-bootstrap";
import { getDefinition, getRate } from "../api/curencyAPI";
import { useEffect, useState } from "react";
import Conversion from "./Conversion";
import LineGraph from "./LineGraph";

export default function CurrencyPanel() {
  const [data, setData] = useState([])
  const [date, setDate] = useState(new Date())
  const [filter, setFilter] = useState("")
  const [show, setShow] = useState(false)
  const [definition, setDefinition] = useState({})

  useEffect( () => {
    getDefinition().then(res => {
    setDefinition(res.data);
  })
  },[])

  const handleDateChange = (event) => {
    setDate(event.target.value)
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

  useEffect(() => {
    const formattedDate = format(date)
    getRate(formattedDate).then(res => {
      if (res.status === 200){
        const arr = Object.entries(res.data.usd)
        // setData(res.data.usd)
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
    }

    const [option, setOption] = useState({})
    const [btnColor, setBtnColor] = useState('btn btn-success')

    useEffect(() => {
      let date = new Date("2022-01-02")
      const arr = []
      while (date < new Date()){
          const first = format(date)
          let obj = {}
          obj['label'] = first

          getRate(first).then(res => {
              obj['y'] = res.data.usd[ccy]
          })

          arr.push(obj)
          let newDate = new Date(date)
          newDate.setDate(date.getDate() + 7)
          date = newDate
      }

      const ops = {
        title: {
            text: ccy
        },
        data: [{
            type:"line",
            dataPoints:arr
        }]
    }
    setOption(ops)
  },[ccy])

  useEffect(() => {
    console.log(option.data)
  },[option])

  return (
    <>
      <Conversion data={data}/>
      <div className="bg-secondary text-center mt-5 mb-1 text-white fw-bold p-2">All Rate Information</div>
      <div className="d-flex mx-auto my-1">
        <InputGroup size="sm" className="pe-1">
          <InputGroup.Text>Enter a date: </InputGroup.Text>
          <Form.Control placeholder="today" type="date" onChange={handleDateChange}></Form.Control>
        </InputGroup>

        <InputGroup size="sm">
          <InputGroup.Text>Filter a currency</InputGroup.Text>
          <Form.Control placeholder="Type in a currency" type="text" onChange={handleCurrencyChange}/>
        </InputGroup>
      </div>
      {show ? <div className="alert alert-danger text-center w-50 mx-auto mt-1">Free version of this app only contains data from 01-01-2022, some dates might be unavailable.</div> : ""}
      <div className="mx-auto my-1 w-75" style={{maxHeight:"70vh", overflowY:"auto"}}>
        <Table striped bordered hover className="w-100 mx-auto text-center">
          <thead>
            <tr className="table-dark">
              <th>Currency</th>
              <th>Rate ( 1 USD equals )</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter(row => {
                if(row[0].includes(filter.toLowerCase())){
                  return true
                } else if (definition[row[0]].toLowerCase().includes(filter.toLocaleLowerCase())){
                  return true
                }
              })
              .map( row => 
                          <tr key={row[0]}>
                            <th>{row[0]}</th>
                            <th>{row[1]}</th>
                            <th><button className={btnColor} onClick={() => onClic(row[0])}>Show chart</button></th>
                          </tr>)}
          </tbody>
        </Table>
      </div>
      <LineGraph ccy={ccy} option={option}/>
    </>
  )
}