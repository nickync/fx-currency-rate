import { Container } from "react-bootstrap";

export default function About() {
  return (
    <Container className="mt-3 pt-5 vh-100 bg-light bg-gradient">
        <div className="mx-auto">
            <h1>The rate data is provided by "<a href="https://github.com/fawazahmed0/currency-api#free-currency-rates-api">Free Currency Rates API</a>".</h1>
        </div>
    </Container>
  )
}