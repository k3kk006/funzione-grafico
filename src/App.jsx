import React, { useState } from 'react';
import InputFunzione from './InputFunzione';
import CanvasGrafico from './CanvasGrafico';
import './App.css';

export default function App() {
  const [datiGrafico, setDatiGrafico] = useState([]);
  const [limiti, setLimiti] = useState({
    limiteX: 10,
    limiteY: 10
  });

  return (
    <div className="pagina">
      <div className="colonna sinistra">
        <InputFunzione setDatiGrafico={setDatiGrafico} limiti={limiti} />
      </div>
      <div className="colonna destra">
       <CanvasGrafico dati={datiGrafico} limiti={limiti} setLimiti={setLimiti} />
      </div>
    </div>
  );
}
