import { Container } from "react-bootstrap";

export default function About() {
  return (
    <Container className="mt-3 pt-5 vh-100 bg-light bg-gradient">
        <div className="mx-auto">
            <div className="text-info">Where am I getting the rate from?</div>
            <div className="text-dark fst-italic">The rate data is provided by "<a href="https://github.com/fawazahmed0/currency-api#free-currency-rates-api">Free Currency Rates API</a>".</div>

            <div className="text-info mt-3">What is this site built on?</div>
            <div className="text-dark fst-italic">This site is built with React, Bootstrap, and it's deployed on render.com. The desktop version is built with JavaFX.</div>
        </div>
    </Container>
  )
}