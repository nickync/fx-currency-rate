import { useEffect, useState } from "react";
import { Form, FormControl, InputGroup } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

export default function Conversion({data}) {
    const [ccy, setCcy] = useState(data)
    const [isValid, setValid] = useState(null)
    const [selected, setSelected] = useState([])
    const [selectedBase, setSelectedBase] = useState([])  
    const [calculated, setCalculated] = useState(0)
    const [amount, setAmount] = useState(1)

    const handleAmountChange = (event) => {
        console.log(event.target.value)
        setAmount(event.target.value)
    }

    useEffect(() => {
        const arr = []
        data.forEach(i => arr.push(i[0]))
        setCcy(arr)
    },[data])

    const calculate = (base, over) => {
        let rate1, rate2

        data.filter(i => {
            if (i[0] == base){
                rate1 = i[1]
            } else if (i[0] == over){
                rate2 = i[1]
            }
        })

        if (base == "usd"){
            setCalculated(amount * rate2)
        } else if (over == "usd"){
            setCalculated(amount * (1 / rate1))
        }else {
            setCalculated(amount * ((1 / rate1) * rate2))
        }

        console.log((1 / rate1) * rate2)
    }

    useEffect(() => {
        calculate(selected, selectedBase)
    },[selected, selectedBase, amount])

  return (
    <div className="mx-auto mt-3 bg-secondary p-2">
        <div className="text-center mt-3 mb-1 text-white fw-bold">Conversion</div>
        <div className="d-flex">
            <InputGroup size="sm">
                <InputGroup.Text>Amount</InputGroup.Text>
                <Form.Control type="number" placeholder="Enter an amount" value={amount} onChange={handleAmountChange}/>
            </InputGroup>
            <InputGroup size="sm">
                <InputGroup.Text>Currency</InputGroup.Text>
                <Typeahead id="valid" options={ccy} selected={selected} onChange={setSelected}/>
            </InputGroup>
            <InputGroup size="sm">
                <InputGroup.Text>Converted amount</InputGroup.Text>
                <Form.Control type="number" disabled value={calculated}/>
            </InputGroup>
            <InputGroup size="sm">
                <InputGroup.Text>Currency</InputGroup.Text>
                <Typeahead id="valid" options={ccy} selected={selectedBase} onChange={setSelectedBase}/>
            </InputGroup>
        </div>
    </div>
  )
}