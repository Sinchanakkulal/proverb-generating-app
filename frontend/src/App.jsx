import { useEffect, useState } from "react";
import { getProverbs, getRandom, addProverb, deleteProverb } from "./api";

function App() {
  const [proverbs, setProverbs] = useState([]);
  const [randomP, setRandomP] = useState(null);
  const [text, setText] = useState("");
  const [author, setAuthor] = useState("");

  const load = async () => {
    setProverbs(await getProverbs());
  };

  const loadRandom = async () => {
    setRandomP(await getRandom());
  };

  const handleAdd = async () => {
    if (!text) return;
    await addProverb({ text, author });
    setText("");
    setAuthor("");
    load();
  };

  const handleDelete = async (id) => {
    await deleteProverb(id);
    load();
  };

  useEffect(() => {
    load();
    loadRandom();
  }, []);

  return (
    <div style={{ padding: 60, fontFamily: "sans-serif", textAlign: "center"}}>
      <h1 style={
        {
          fontSize: "3rem",
          marginBottom: "90px",
          fontWeight: "800",
          color: "#333",
          textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
        }

      }>     Proverb Generator</h1>

      <button
        onClick={loadRandom}
        style={{
          padding: "10px 30px",
          marginBottom: 20,
          fontSize: "1rem",
          cursor: "pointer",
          backgroundColor: "#007BFF",
          color: "black",}}
      >
        Get Random
      </button>

      {randomP && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              background: "#f9f9f9",
              padding: "20px",
              borderRadius: "12px",
              maxWidth: "600px",
              width: "100%",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              border: "2px solid #333", // ✅ Added border
            }}
          >
            <p
              style={{
                fontSize: "2rem",
                fontWeight: "bold",
                margin: "10px 0",
              }}
            >
              “{randomP.text}”
            </p>
            <p
              style={{
                fontSize: "1.2rem",
                fontStyle: "italic",
                color: "#555",
              }}
            >
              — {randomP.author || "Unknown"}
            </p>
          </div>
        </div>
      )}

      <h2>Add a Proverb</h2>
      <div style={{ marginBottom: 20 }}>
        <input
          placeholder="Text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ marginRight: 10, padding: 5 }}
        />
        <input
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{ marginRight: 10, padding: 5 }}
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <h2>All Proverbs</h2>
      {proverbs.map((p) => (
        <div
          key={p.id}
          style={{
            marginBottom: 10,
            padding: "10px",
            borderBottom: "1px solid #ddd",
          }}
        >
          “{p.text}” — {p.author || "Unknown"}
          <button
            onClick={() => handleDelete(p.id)}
            style={{
              marginLeft: 10,
              background: "red",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              padding: "2px 8px",
            }}
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
