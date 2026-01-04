import "../../style/menu.css";
import { ModelData } from "../../data/ModelData";
import { ModelDataVisi } from "../../data/ModelDataVisi"; // <-- ajouter cet import


export default function Menu({
  backfaceCulling,
  setBackfaceCulling,
  backgroundColor,
  setBackgroundColor,
  visibleElements,
  setVisibleElements,
  onSelectObject
}) {
  const toggleVisibility = (id) => {
    setVisibleElements({ ...visibleElements, [id]: !visibleElements[id] });
  };

  return (
    <div className="menu">
      {/* Partie 1 : Header */}
      <div className="menu-section menu-header">
        <h2 className="menu-title">Salle de classe</h2>
        <p className="menu-info">Capacité : 30 élèves</p>
        <p className="menu-info">Mode : Présentiel</p>
      </div>

      {/* Partie 2 : Fonctions */}
      <div className="menu-functions">
        <label className="menu-checkbox">
          <input
            type="checkbox"
            checked={backfaceCulling}
            onChange={(e) => setBackfaceCulling(e.target.checked)}
          />
          <span>Mur Invisible</span>
        </label>

        <div style={{ marginTop: "10px" }}>
          <label>
            Couleur du fond :{" "}
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </label>
        </div>

        {/* Section afficher/masquer éléments */}
        <div style={{ marginTop: "15px" }}>
  <h3>Éléments à afficher</h3>
  {ModelDataVisi.map((item) => (
    <label key={item.id} className="menu-checkbox">
      <input
        type="checkbox"
        checked={visibleElements[item.id]}
        onChange={() =>
          setVisibleElements({
            ...visibleElements,
            [item.id]: !visibleElements[item.id],
          })
        }
      />
      <span>{item.label}</span>
    </label>
  ))}
</div>

      </div>

      {/* Partie 3 : Cards dynamiques */}
      <h3>Éléments de la classe</h3>
      <div className="menu-section menu-cards">
        <div className="cards-container">
          {ModelData.map((item) => (
  <div
    key={item.id}
    className="card"
   onClick={() => onSelectObject(item.objectName)}
  >
    <div className="card-image">
      <img src={item.image} alt={item.label} />
    </div>
    <div className="card-title">{item.label}</div>
  </div>
))}

        </div>
      </div>
    </div>
  );
}

