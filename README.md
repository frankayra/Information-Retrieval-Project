# Information-Retrieval-Project

Project designed for retrieving information from local files and shows results of best assertions in a friendly interface imitating Google's one.
It has 2 models, vectorial and boolean. To use them, intuitively we can change it in the top of the interface, as well.

> **Vectorial Model**: It has some formulas, which are used for calculate the relevance of a document related to a specific query, it use measurement formulas like **tf** and **idf** for the mentioned purpose.

> **Boolean Model**: It is a particular case of the vectorial model. It measure the relevance of a term, only having a table of ocurrence for each document for each term.

## How to use
- Go inside the "Backend" folder, once within it, using `node server.ja` command, start the local server.
- Type this in your browser: `http://localhost:3000/`