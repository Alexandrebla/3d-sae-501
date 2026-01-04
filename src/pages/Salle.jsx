import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as THREE from "three";
import Menu from "../components/ui/Menu";
import Salle3D from "../components/three/Salle3D";
import "../style/Salle.css";
import { ModelData } from "../data/ModelData"; // pour le menu/zoom
import { ModelDataVisi } from "../data/ModelDataVisi"; // pour la visibilité


export default function Salle() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [backfaceCulling, setBackfaceCulling] = useState(true);
  const [backgroundColor, setBackgroundColor] = useState("#cccccc");

  // Visibilité des éléments
  // créer l’état initial en inversant la logique de masquage

const defaultVisible = ["PC", "tableau", "eleves"]; // IDs visibles par défaut

const initialVisibility = Object.fromEntries(
  ModelDataVisi.map((item) =>
    defaultVisible.includes(item.id) ? [item.id, true] : [item.id, false]
  )
);
const [visibleElements, setVisibleElements] = useState(initialVisibility);



  const menuWidth = 300;
  const navigate = useNavigate();
  const controlsRef = useRef();

  const salle3DRef = useRef();

 const [zoomTarget, setZoomTarget] = useState(null);
 const [helpOpen, setHelpOpen] = useState(false);



  // Easing pour déplacement fluide
  const easeOutQuad = (t) => t * (2 - t);

  const goToPositionSmooth = (targetPos, targetLookAt = [0, 0, 0], duration = 1000) => {
    if (!controlsRef.current) return;

    const controls = controlsRef.current;
    const startPos = controls.object.position.clone();
    const startTarget = controls.target.clone();

    const endPos = new THREE.Vector3(...targetPos);
    const endTarget = new THREE.Vector3(...targetLookAt);

    let startTime = null;

    const animate = (time) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const t = Math.min(elapsed / duration, 1);
      const easedT = easeOutQuad(t);

      controls.object.position.lerpVectors(startPos, endPos, easedT);
      controls.target.lerpVectors(startTarget, endTarget, easedT);
      controls.update();

      if (t < 1) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  };

  return (
    <div className="salle-container">
      {/* Menu */}
      <div
        className="menu-wrapper"
        style={{ transform: menuOpen ? "translateX(0)" : `translateX(-${menuWidth}px)` }}
      >
        <Menu
          backfaceCulling={backfaceCulling}
          setBackfaceCulling={setBackfaceCulling}
          backgroundColor={backgroundColor}
          setBackgroundColor={setBackgroundColor}
          visibleElements={visibleElements}
          setVisibleElements={setVisibleElements}
          onSelectObject={(objectName) => setZoomTarget(objectName)}
        />

      </div>

      {/* Boutons flottants */}
      <div className="side-buttons" style={{ left: menuOpen ? menuWidth : 0 }}>
        <button className="side-button" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "←" : "→"}
        </button>
        <button className="side-button" onClick={() => goToPositionSmooth([0, 1, 2])}>
          2
        </button>
        <button className="side-button" onClick={() => goToPositionSmooth([10, 5, 10])}>
          3
        </button>
        <button className="side-button" onClick={() => goToPositionSmooth([10, 5, 0])}>
          4
        </button>
        <button className="side-button" onClick={() => goToPositionSmooth([0, 25, 0])}>
          5
        </button>
        <button className="side-button" onClick={() => setHelpOpen(prev => !prev)} title="Aide clavier">
          ⌨️
        </button>
        <button className="side-button side-button-exit" onClick={() => navigate("/")}>
          ⬅
        </button>
      </div>

      {/* Canvas 3D */}
      <Salle3D
  backgroundColor={backgroundColor}
  backfaceCulling={backfaceCulling}
  visibleElements={visibleElements}
  controlsRef={controlsRef}
  zoomTarget={zoomTarget}   // <-- passe le targetName ici
  
/>

{helpOpen && (
  <div className="help-popup">
    <div className="help-popup-header">
      <span>🎮 Aide – Commandes</span>
      <button onClick={() => setHelpOpen(false)}>✖</button>
    </div>

    <div className="help-popup-content">

      <h4>⌨️ Clavier</h4>
      <ul>
        <li><strong>Z / W</strong> : Avancer</li>
        <li><strong>S</strong> : Reculer</li>
        <li><strong>Q / A</strong> : Aller à gauche</li>
        <li><strong>D</strong> : Aller à droite</li>
        <li><strong>Espace</strong> : Monter</li>
        <li><strong>Shift</strong> : Descendre</li>
      </ul>

      <h4>🖱️ Souris</h4>
      <ul>
        <li><strong>Clic gauche</strong> : Rotation caméra</li>
        <li><strong>Clic droit</strong> : Déplacement latéral</li>
        <li><strong>Molette</strong> : Zoom</li>
      </ul>

      <h4>🔢 Boutons</h4>
      <ul>
        <li><strong>1</strong> : Ouvrir / fermer le menu</li>
        <li><strong>2</strong> : Vue rapprochée</li>
        <li><strong>3</strong> : Vue générale (vue par defaut)</li>
        <li><strong>4</strong> : Vue latérale</li>
        <li><strong>5</strong> : Vue du dessus</li>
        <li><strong>6</strong> : Aide (ce panneau)</li>
        <li><strong>⬅</strong> : Quitter / revenir a la page précédente</li>
      </ul>

    </div>
  </div>
)}


    </div>
  );
}
