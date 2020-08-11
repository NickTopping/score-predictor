import React, { useState, useEffect } from "react"; //useState is a hook, manages state in a functional component

export default function ScoresTestTemp() {

    const [testAPI, setTestAPI] = useState("");
    const url = "http://localhost:9000/testAPI";

    useEffect(() => {
        fetch(url)
          .then(response => response.text())
          .then(data => setTestAPI(data));
      }, []);

      //can update state later using useState("hello")
    return (
        <div className="App">
            <header className="App-header">
                <h1 className="App-title">Welcome to React</h1>
            </header>
            <p className="App-intro">{testAPI}</p>
        </div>
    );
}