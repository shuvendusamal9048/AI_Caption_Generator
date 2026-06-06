import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);

  const uploadImage = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/caption",
        formData
      );

      setCaption(response.data.caption);
    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <div className="card">

        <h1>AI Image Caption Generator</h1>

        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <button onClick={uploadImage}>
          Generate Caption
        </button>

        {loading && <p>Analyzing Image...</p>}

        {caption && (
          <div className="result">
            <h3>Caption</h3>
            <p>{caption}</p>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;