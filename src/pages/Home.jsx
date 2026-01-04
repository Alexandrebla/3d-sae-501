import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button
        onClick={() => navigate("/salle")}
        style={{
          padding: "15px 30px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Entrer dans la salle
      </button>
    </div>
  );
}
