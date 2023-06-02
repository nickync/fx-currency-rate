import { useEffect, useState } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";

export default function Conversion({data}) {
    const [ccy, setCcy] = useState(data)
    const [selected, setSelected] = useState('')
    const [selectedBase, setSelectedBase] = useState('')  
    const [calculated, setCalculated] = useState(0)
    const [amount, setAmount] = useState(1)

    const handleAmountChange = (event) => {
        setAmount(event.target.value)
    }

    useEffect(() => {
        const arr = []
        data.forEach(i => arr.push(i[0]))
        setCcy(arr)
    },[data])

    const calculate = (base, over) => {
        if (base !== '' && over !== ''){
            let rate1, rate2

            data.filter(i => {
                if (i[0] == base){
                    return rate1 = i[1]
                } else if (i[0] == over){
                    return rate2 = i[1]
                }
            })
    
            if (base === "usd"){
                setCalculated(amount * rate2)
            } else if (over ==="usd"){
                setCalculated(amount * (1 / rate1))
            }else {
                setCalculated(amount * ((1 / rate1) * rate2))
            }
        }
    }

    useEffect(() => {
        calculate(selected, selectedBase)
    },[selected, selectedBase, amount])

  return (
    <div className="d-flex flex-column align-items-center mx-auto mt-3 bg-secondary p-2">
        <div className="text-center mt-3 mb-1 text-white fw-bold">Conversion</div>
        <div className="d-flex flex-wrap justify-content-center pb-5">
            <div className="d-flex flex-row">
                <div>
                    <InputGroup.Text>Amount</InputGroup.Text>
                    <Form.Control type="number" placeholder="Enter an amount" value={amount} onChange={handleAmountChange}/>
                </div>
                <div>
                    <InputGroup.Text>Base Currency</InputGroup.Text>
                    <Typeahead className="text-uppercase" id="valid" options={ccy} selected={selected} onChange={setSelected}/>
                </div>
            </div>
            <div className="d-flex flex-row">
                <div>
                    <InputGroup.Text>Converted amount</InputGroup.Text>
                    <Form.Control type="number" disabled value={calculated}/>
                </div>
                <div>
                    <InputGroup.Text>Counter Currency</InputGroup.Text>
                    <Typeahead className="text-uppercase" id="valid" options={ccy} selected={selectedBase} onChange={setSelectedBase}/>
                </div>
            </div>
        </div>
    </div>
  )
}