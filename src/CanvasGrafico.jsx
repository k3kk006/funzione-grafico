import React, { useRef, useEffect } from 'react';
import './CanvasGrafico.css';

export default function CanvasGrafico({ dati, limiti, setLimiti }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;

    // Calcoliamo le unità prima di disegnare tutto
    const unitX = width / (2 * limiti.limiteX);
    const unitY = height / (2 * limiti.limiteY);

    // Inizializziamo la trasformazione del canvas
    ctx.clearRect(0, 0, width, height);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.translate(width / 2, height / 2);
    
    // Griglia blu (prima degli assi)
    ctx.strokeStyle = '#bbdefb';
    ctx.lineWidth = 0.5;
    
    // Disegniamo la griglia orizzontale
    for (let x = -limiti.limiteX; x <= limiti.limiteX; x++) {
      const px = x * unitX;
      ctx.beginPath();
      ctx.moveTo(px, -height / 2);
      ctx.lineTo(px, height / 2);
      ctx.stroke();
    }
    
    // Disegniamo la griglia verticale
    for (let y = -limiti.limiteY; y <= limiti.limiteY; y++) {
      const py = -y * unitY;
      ctx.beginPath();
      ctx.moveTo(-width / 2, py);
      ctx.lineTo(width / 2, py);
      ctx.stroke();
    }
    
    // Assi
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-width / 2, 0);
    ctx.lineTo(width / 2, 0);
    ctx.moveTo(0, -height / 2);
    ctx.lineTo(0, height / 2);
    ctx.stroke();

    // Tacche degli assi
    ctx.fillStyle = '#444';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';

    for (let x = -limiti.limiteX; x <= limiti.limiteX; x++) {
      const px = x * unitX;
      ctx.beginPath();
      ctx.moveTo(px, -4);
      ctx.lineTo(px, 4);
      ctx.stroke();
      if (x !== 0) ctx.fillText(x, px, 6);
    }

    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';

    for (let y = -limiti.limiteY; y <= limiti.limiteY; y++) {
      const py = -y * unitY;
      ctx.beginPath();
      ctx.moveTo(-4, py);
      ctx.lineTo(4, py);
      ctx.stroke();
      if (y !== 0) ctx.fillText(y, -6, py);
    }

    ctx.textAlign = 'right';
    ctx.fillText('y', -6, -(limiti.limiteY * unitY - 10));
    ctx.textAlign = 'left';
    ctx.fillText('x', limiti.limiteX * unitX - 10, 6);

    // Dati
    if (dati?.length > 1) {
      ctx.beginPath();
      ctx.strokeStyle = '#1976d2';
      ctx.lineWidth = 2;
      dati.forEach((p, i) => {
        const x = p.x * unitX;
        const y = -p.y * unitY;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      });
      ctx.stroke();
    }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }, [dati, limiti]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLimiti((prev) => ({ ...prev, [name]: Number(value) }));
  };
  
  return (
  <>
    <div className="quaderno-wrapper">
      <div className="copertina-quaderno"></div>
      <div className="doppia-pagina">
        <div className="pagina-sinistra">
        <h1>Rappresentazione grafica di funzioni in forma esplicita</h1>
        <div className="limiti-input">
          <label>
           Val. massimo X:
            <input type="number" name="limiteX" value={limiti.limiteX} onChange={handleChange} />
          </label>
          <label>
          Val. massimo Y:
            <input type="number" name="limiteY" value={limiti.limiteY} onChange={handleChange} />
          </label> 
        
        </div>
            <canvas width={340} height={340} ref={canvasRef} className="grafico-canvas" />
        </div>
       
        <div className="pagina-destra">
          <div className="teoria-funzione">
            <h2>📘 Teoria sulla funzione</h2>

            <p><strong>Definizione:</strong><br />
              Una <strong>funzione</strong> è una relazione che associa a <em>ogni</em> valore di un insieme di partenza (dominio) <strong>uno e un solo</strong> valore nell’insieme di arrivo (codominio).
            </p>

            <p>
              Formalmente, se <code>f</code> è una funzione da ℝ a ℝ:<br />
              <code>y = f(x)</code> associa ad ogni <code>x ∈ ℝ</code> un solo <code>y ∈ ℝ</code>.
            </p>

            <h3>✏️ Esempi di funzioni:</h3>
            <ul>
              <li><code>f(x) = 2x + 1</code></li>
              <li><code>f(x) = x²</code></li>
              <li><code>f(x) = √x</code> (solo per <code>x ≥ 0</code>)</li>
            </ul>

            <h3>📐 Rappresentazione grafica:</h3>
            <p>
              In un piano cartesiano, ogni punto <code>(x, y)</code> rappresenta l’associazione data da <code>y = f(x)</code>.
              Il grafico della funzione è l’insieme dei punti che soddisfano questa relazione.
            </p>
          </div>

        </div>
      </div>

      
    </div>
    <div className="oggetti">
    
    
    <div className="righello-mm">
      {[...Array(201)].map((_, i) => {
        const top = 10 + i * 3.5; 
        if (top > 690) return null; 

        const isCm = i % 10 === 0;
        const isMezzo = i % 5 === 0 && !isCm;

        return (
          <div
            key={i}
            className={`tacca ${isCm ? 'cm' : isMezzo ? 'mezzo' : 'mm'}`}
            style={{ top: `${top}px` }}
          >
            {isCm && (
              <span className="numero">{i / 10 === 20 ? 20 : i / 10}</span>
            )}
          </div>
        );
      })}
    </div>
    <div className="colonna-oggetti">
      <div className="gomma"></div>
      <div className="matita">
        <div className="mina"></div>
      </div>
    </div>
  </div>
  </>
  );
}
