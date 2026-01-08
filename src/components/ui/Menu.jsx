import { ModelData } from "../../data/ModelData";
import { ModelDataVisi } from "../../data/ModelDataVisi";

export default function Menu({
  backfaceCulling,
  setBackfaceCulling,
  backgroundColor,
  setBackgroundColor,
  backgroundMode,
  setBackgroundMode,
  selectedHDR,
  setSelectedHDR,
  visibleElements,
  setVisibleElements,
  onSelectObject,
}) {

  const HDR_PRESETS = [
  { id: "sky", label: "🌤️ Ciel", file: "citrus_orchard_road_puresky_1k.hdr" },
  { id: "city", label: "🏙️ Ville", file: "quattro_canti_1k.hdr" },
  { id: "studio", label: "🎥 Studio", file: "studio.hdr" },
  { id: "interior", label: "🏠 Intérieur", file: "university_workshop_1k.hdr" },
];

  return (
    <div className="h-screen w-[300px] bg-indigo-600 text-white flex flex-col p-4">
      
      {/* Header */}
      <div className="mb-4 border-b border-indigo-400 pb-3">
        <h2 className="text-xl font-bold">Salle de classe</h2>
        <p className="text-sm opacity-90">Capacité : 30 élèves</p>
        <p className="text-sm opacity-90">Mode : Présentiel</p>
      </div>

      {/* Options */}
      <div className="space-y-4">
        {/* Mur invisible */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={backfaceCulling}
            onChange={(e) => setBackfaceCulling(e.target.checked)}
            className="accent-white"
          />
          <span>Mur Invisible</span>
        </label>

       {/* Background */}
      <div className="space-y-2">
        <p className="text-sm font-semibold">Fond de la scène</p>

        {/* Mode */}
        <div className="flex gap-2">
          <button
            onClick={() => setBackgroundMode("color")}
            className={`
              flex-1 px-2 py-1 rounded text-sm border
              ${
                backgroundMode === "color"
                  ? "bg-white text-indigo-600 border-white"
                  : "bg-indigo-700 text-white border-white/40 hover:bg-indigo-800"
              }
            `}
          >
            🎨 Couleur
          </button>

          <button
            onClick={() => setBackgroundMode("hdr")}
            className={`
              flex-1 px-2 py-1 rounded text-sm border
              ${
                backgroundMode === "hdr"
                  ? "bg-white text-indigo-600 border-white"
                  : "bg-indigo-700 text-white border-white/40 hover:bg-indigo-800"
              }
            `}
          >
            🌅 HDR
          </button>
        </div>

        {/* Color picker */}
        {backgroundMode === "color" && (
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            className="w-full h-8 rounded cursor-pointer"
          />
        )}

        {/* HDR presets */}
        {backgroundMode === "hdr" && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {HDR_PRESETS.map((hdr) => (
              <button
                key={hdr.id}
                onClick={() => setSelectedHDR(hdr.id)}
                className={`
                  px-2 py-1 text-xs rounded border
                  ${
                    selectedHDR === hdr.id
                      ? "bg-white text-indigo-600 border-white"
                      : "bg-indigo-700 text-white border-white/40 hover:bg-indigo-800"
                  }
                `}
              >
                {hdr.label}
              </button>
            ))}
          </div>
        )}
      </div>


        {/* Visibilité */}
        <div>
          <h3 className="font-semibold mb-2">Éléments à afficher</h3>
          <div className="space-y-1">
            {ModelDataVisi.map((item) => (
              <label
                key={item.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={visibleElements[item.id]}
                  onChange={() =>
                    setVisibleElements({
                      ...visibleElements,
                      [item.id]: !visibleElements[item.id],
                    })
                  }
                  className="accent-white"
                />
                <span className="capitalize">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Cartes – scroll dans une zone limitée */}
      <div className="mt-6">
        <h3 className="font-semibold mb-3">Éléments de la classe</h3>

        {/* Zone scrollable avec bord et padding */}
        <div className="border border-white/30 rounded p-2 overflow-y-auto max-h-[340px]">
          <div className="grid grid-cols-2 gap-3">
            {ModelData.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectObject(item.objectName)}
                className="
                  bg-indigo-700
                  hover:bg-indigo-800
                  border border-white/70
                  rounded-sm
                  p-1
                  text-center
                  shadow-md
                  transition
                  duration-200
                  ease-out
                  hover:scale-105
                "
              >
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-20 object-cover rounded mb-2"
                />
                <span className="text-[12px] font-medium">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
