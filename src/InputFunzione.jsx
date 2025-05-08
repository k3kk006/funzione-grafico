import React, { useState } from 'react';
import './InputFunzione.css';

export default function InputFunzione({ setDatiGrafico, limiti }) {
  const [funzione, setFunzione] = useState('y=');

  const handleClick = (val) => {
    if (val === '⌫') {
      setFunzione((prev) => prev.slice(0, -1));
    } else {
      setFunzione((prev) => prev + val);
    }
  };


  const calcolaPunti = () => {
    try {
      const expr = funzione.replace(/^y\s*=\s*/, '');
  
      const jsExpr = expr
        .replace(/\^/g, '**') 
        .replace(/√\(/g, 'Math.sqrt(') 
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/log\(/g, 'Math.log10(') 
        .replace(/ln\(/g, 'Math.log(') 
        .replace(/e/g, 'Math.E'); 

      const passo = limiti.limiteX / 1000;
  
      const punti = [];
  
      for (let x = -limiti.limiteX; x <= limiti.limiteX; x += passo) {
        try {
          const f = new Function('x', `return ${jsExpr};`);
  
          const y = f(x);
  
          if (typeof y === 'number' && isFinite(y)) {
            punti.push({ x, y });
          }
        } catch (err) {
        }
      }
  
      setDatiGrafico(punti);
      console.log(punti);
    } catch (e) {
      console.error('Errore nel calcolo dei punti:', e);
    }
  };
  
  
  

  const tasti = [
    ['7', '8', '9', '*', '/'],
    ['4', '5', '6', '+', '-'],
    ['1', '2', '3', '=', '⌫'],
    ['0', 'x'],
    ['(', ')', '√(', 'sin('],
    ['cos(', 'log(', 'ln(', 'e'],
    ['^']
  ];

  return (
    <div className="input-container">
      <input
        type="text"
        value={funzione}
        onChange={(e) => setFunzione(e.target.value)}
        placeholder="y=..."
        className="funzione-input"
      />

      <div className="calcolatrice">
        {tasti.map((row, i) => (
          <div key={i} className="rigaCalcolatrice">
            {row.map((tasto, j) => (
              <button key={j} onClick={() => handleClick(tasto)} className="bottoneCalcolatrice">
                {tasto}
              </button>
            ))}
          </div>
        ))}
      </div>

      <button onClick={calcolaPunti} className="bottoneDisegna">Disegna</button>
    </div>
  );
}
