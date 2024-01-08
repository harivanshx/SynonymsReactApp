import React, { useState } from "react";

export default function App() {
  const [words, setWords] = useState();
  const [word, setWord] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const getDefinition = async () => {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const data = await response.json();
      setWords(data[0]);
      console.log(data[0]);
    };

    getDefinition();
    setWord("");
  };

  return (
    <>
    <section className="max-w-3xl mx-auto p-5 bg-white" >
        <h1 className="text-3xl text-slate-800 font-bold mb-8 text-center">
          Get Synonyms
        </h1>

        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search for the synonyms of a word"
            required
            className="py-2 px-4 border-b-2 border-blue-400 outline-none focus:border-blue-600 transition w-full text-xl lg:text-2xl"
            value={word}
            onChange={(e) => setWord(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white text-xl lg:text-2xl py-2 px-4 rounded shadow mt-4 hover:bg-blue-800 transition-all duration-200 align-middle"
          >
            Get Synoyms
          </button>
        </form>

        {words && (
          <div className="mt-20">
            <h2 className="capitalize text-slate-700 font-bold text-5xl">
              {words.word}{" "}
              <span className="text-xl text-slate-500 inline-block ml-4">
                {words.phonetic}
              </span>
            </h2>

         
         

            <ol className="my-5 flex flex-col">
              {words.meanings.map((meaning, index) => (
                <div key={index} className="mt-8">
               

                  <ul className="flex items-center justify-start flex-wrap gap-2 mt-4">
                    {meaning.synonyms.map((syn, index) => (
                      <li
                        key={index}
                        className="bg-slate-200 py-2 px-3 rounded shadow text-sm"
                      >
                        {syn}
                      </li>

                      
                    ))}
                    
                  </ul>
                </div>
              ))}
            </ol>
          </div>
        )}
      </section>
    </>
  )
}
