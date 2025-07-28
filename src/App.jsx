import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const [word, setWord] = useState("");
  const [definitions, setDefinitions] = useState([]);
  const [wordType, setWordType] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showWOTD, setShowWOTD] = useState(true);
  const [wotd, setWotd] = useState("");
  const [wotdDef, setWotdDef] = useState("");
  const [showWotdDef, setShowWotdDef] = useState(false);
  const [history, setHistory] = useState([]);

const fetchRandomWord = async () => {
  for (let i = 0; i < 10; i++) {
    const res = await fetch("https://random-word-api.herokuapp.com/word");
    const data = await res.json();
    const randomWord = data[0];

    try {
      const defRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
      if (!defRes.ok) continue; // try again

      const defData = await defRes.json();
      const firstMeaning = defData[0].meanings[0];
      setWotd(randomWord);
      setWotdDef(firstMeaning.definitions[0].definition);
      return;
    } catch {
      continue;
    }
  }

  // if all attempts fail
  setWotd("No valid word");
  setWotdDef("Could not find a definition today.");
};


  const fetchDefinition = async (selectedWord = word, isWOTD = false) => {
    if (!selectedWord.trim()) {
      setError("please enter a word.");
      setDefinitions([]);
      return;
    }

    setError("");
    if (!isWOTD) setLoading(true);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${selectedWord}`
      );
      if (!response.ok) throw new Error("no definition found.");
      const data = await response.json();

      const type = data[0].meanings[0].partOfSpeech;
      const defs = data[0].meanings[0].definitions
        .map((d) => d.definition)
        .slice(0, 5);

      if (isWOTD) {
        setWotdDef(defs[0]);
        setShowWotdDef(true);
        setDefinitions([]);
        setWordType("");
      } else {
        setDefinitions(defs);
        setWordType(type);
        setShowWotdDef(false);
        updateHistory(selectedWord);
      }
    } catch (err) {
      setError(err.message);
      if (!isWOTD) {
        setDefinitions([]);
        setWordType("");
      }
    }

    if (!isWOTD) setLoading(false);
  };

  const updateHistory = (newWord) => {
    setHistory((prev) => {
      const updated = [newWord, ...prev.filter((w) => w !== newWord)].slice(0, 8);
      localStorage.setItem("searchHistory", JSON.stringify(updated));
      return updated;
    });
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("searchHistory")) || [];
    setHistory(stored);
    fetchRandomWord();
  }, []);

  return (
    <>
      {showWOTD && (
        <div className="wotd-banner">
          <span>
            word of the day:&nbsp;
            <button
              className="wotd-word"
              onClick={() => {
                setWord(wotd);
                fetchDefinition(wotd, true);
              }}
            >
              {wotd}
            </button>
          </span>
          <button className="wotd-close" onClick={() => setShowWOTD(false)}>
            ×
          </button>
        </div>
      )}

      <div className="container">
        <h1>Dictionary</h1>

        <div className="input-group">
          <input
            type="text"
            placeholder="enter a word"
            value={word}
            onChange={(e) => setWord(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") fetchDefinition();
            }}
          />
          <button onClick={() => fetchDefinition()} disabled={loading}>
            {loading ? "searching..." : "search"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}

        {definitions.length > 0 && (
          <div className="result fade-in">
            <strong>type:</strong> <em>{wordType}</em>
            <ol>
              {definitions.map((def, idx) => (
                <li key={idx}>{def}</li>
              ))}
            </ol>
          </div>
        )}

        {showWotdDef && (
          <div className="wotd-definition fade-in">
            <strong>{wotd}</strong>: {wotdDef}
          </div>
        )}

        {history.length > 0 && (
          <div className="history">
            {history.map((item, idx) => (
              <button
                key={idx}
                className="history-tag"
                onClick={() => {
                  setWord(item);
                  fetchDefinition(item);
                }}
              >
                {item.toLowerCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default App;

//run `npm run dev` to start the app