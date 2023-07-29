import { FormEvent, useState } from 'react';
import './App.css'

import logo from "./assets/logo.png";

function App() {

  interface InfoProps {
    title: string;
    gasoline: string | number;
    alcohol: string | number;
  }

  const [gasoline, setGasoline] = useState(0);
  const [alcohol, setAlcohol] = useState(0);
  const [info, setInfo] = useState<InfoProps>();

  function calculate(event: FormEvent) {
    event.preventDefault();

    const calculation = alcohol / gasoline;

    if (calculation <= 0.7) {
      setInfo({
        title: "Compensa usar álcool!",
        gasoline: formatCoin(gasoline),
        alcohol: formatCoin(alcohol)
      })
    } else {
      setInfo({
        title: "Compensa usar gasolina!",
        gasoline: formatCoin(gasoline),
        alcohol: formatCoin(alcohol)
      })
    }
  }

  function formatCoin(value: number) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  return (
    <div>
      <main className="container">
        <img className="logo" src={logo} alt="logo" />
        <h1 className="title">Qual melhor opção?</h1>

        <form className="form" onSubmit={calculate}>
          <label>Álcool (preço por litro):</label>
          <input
            className="input"
            type="number"
            min="1"
            step="0.01"
            required
            value={alcohol}
            onChange={(e) => setAlcohol(Number(e.target.value))}
          />

          <label>Gasoline (preço por litro):</label>
          <input
            className="input"
            type="number"
            min="1"
            step="0.01"
            required
            value={gasoline}
            onChange={(e) => setGasoline(Number(e.target.value))}
          />

          <button
            className="button"
            type="submit">
            Calcular
          </button>
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className="result">
            <h2 className="result-title">
              {info.title}
            </h2>
            <span>Álcool {info.alcohol}</span>
            <span>Gasolina {info.gasoline}</span>
          </section>
        )}

      </main>
    </div>
  )
}

export default App
