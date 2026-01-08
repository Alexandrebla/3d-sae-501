import { useEffect, useRef } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader";

/**
 * Gère le background de la scène :
 * - Couleur unie
 * - HDR (ciel, ville, studio, intérieur...)
 */
export default function BackgroundController({
  color = "#cccccc",
  backgroundMode = "color", // "color" | "hdr"
  selectedHDR = "sky",
}) {
  const { scene } = useThree();
  const hdrTextureRef = useRef(null);

  // Mapping des presets HDR
  const HDR_MAP = {
    sky: "/images/citrus_orchard_road_puresky_1k.hdr",
    city: "/images/quattro_canti_1k.hdr",
    studio: "/images/sunny_rose_garden_1k.hdr",
    interior: "/images/university_workshop_1k.hdr",
  };

  useEffect(() => {
    if (!scene) return;

    // 🔵 MODE COULEUR
    if (backgroundMode === "color") {
      scene.background = new THREE.Color(color);
      scene.environment = null;

      // Nettoyage HDR précédent
      if (hdrTextureRef.current) {
        hdrTextureRef.current.dispose();
        hdrTextureRef.current = null;
      }

      return;
    }

    // 🌅 MODE HDR
    if (backgroundMode === "hdr") {
      const hdrPath = HDR_MAP[selectedHDR];

      if (!hdrPath) {
        console.warn("HDR non trouvé :", selectedHDR);
        return;
      }

      const loader = new HDRLoader();

      loader.load(
        hdrPath,
        (texture) => {
          if (!texture) return;

          texture.mapping = THREE.EquirectangularReflectionMapping;

          scene.background = texture;
          scene.environment = texture;

          hdrTextureRef.current = texture;
        },
        undefined,
        (error) => {
          console.error("❌ Erreur chargement HDR :", error);
          scene.background = new THREE.Color(color);
          scene.environment = null;
        }
      );
    }
  }, [backgroundMode, selectedHDR, color, scene]);

  return null; // composant invisible
}
