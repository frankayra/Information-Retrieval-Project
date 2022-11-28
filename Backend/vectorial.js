
var table_of_terms_frequency = [];
var table_of_terms_weight = [];
var terms_indexes = {};
var max_frecuencies = [];
var terms_occurence_in_docs = []


const tf = (j_doc, i_term)=>{
    const ij_term_frec = table_of_terms_frequency[j_doc][i_term];
    if(max_frecuencies[j_doc] === undefined){
        var doc_j_max_frec = ij_term_frec;
        for (let i = 0; i < table_of_terms_frequency[j_doc].length; i++) {
            const current_frec = table_of_terms_frequency[j_doc][i];
            if(current_frec > doc_j_max_frec){
                doc_j_max_frec = current_frec;
            }
        }
        return ij_term_frec / doc_j_max_frec;
    }
    return ij_term_frec / max_frecuencies[j_doc];
}
const idf = (i_term) => {

    let n_i;
    if(terms_occurence_in_docs[i_term] === undefined){
        n_i = 0;
        for (let j = 0; j < table_of_terms_frequency.length; j++) {
            const frec = table_of_terms_frequency[j][i_term];
            if(frec > 0){
                n_i++;
            }
        }
    }
    else n_i = terms_occurence_in_docs[i_term];
    return Math.log10(table_of_terms_frequency.length / n_i);
}

const fill_weights_matrix = (docs) =>{
    for (let j = 0; j < docs.length; j++) {
        const current_doc = docs[j];
        if(table_of_terms_frequency.length <= j){
            table_of_terms_frequency[j] = [];
        }
        for (const term of current_doc.split()) {
            if(term in terms_indexes){
                if(table_of_terms_frequency[j][terms_indexes[term]] === undefined){
                    table_of_terms_frequency[j][terms_indexes[term]] = 0;
                    if(terms_occurence_in_docs[terms_indexes[term]] === undefined){
                        terms_occurence_in_docs[terms_indexes[term]] = 0;
                    }
                    terms_occurence_in_docs[terms_indexes[term]]++;
                }
                table_of_terms_frequency[j][terms_indexes[term]]++;
                
                if(max_frecuencies[j] === undefined){
                    max_frecuencies[j] = 1;
                }
                else if (max_frecuencies[j] < table_of_terms_frequency[j][terms_indexes[term]]){
                    max_frecuencies[j]++;
                }
            }
            else{
                const new_term_index = terms_indexes.length;
                terms_indexes[term] = new_term_index;
                table_of_terms_frequency[j][new_term_index] = 1;
                if(terms_occurence_in_docs[terms_indexes[term]] === undefined){
                    terms_occurence_in_docs[terms_indexes[term]] = 0;
                }
                terms_occurence_in_docs[terms_indexes[term]]++;

            } 
            
        }
    }
    // for(let j=0; j<table_of_terms_frequency.length; j++){
    //     for (let i = 0; i < table_of_terms_frequency[j].length; i++) {
    //         const ij_tf = tf(j, i);
    //         if(j == 0){
                
    //         }
            
    //     }
    // }
}






const sim = (doc_vect, q_vect) => {
    var doc_norm = 0;
    var q_norm = 0;
    var scalar_product = 0;
    for (let i = 0; i < doc_vect.length; i++) {
        const doc_i_word_evalation = doc_vect[i];
        const q_i_word_evalation = q_vect[i];

        doc_norm += doc_i_word_evalation**2;
        q_norm += q_i_word_evalation**2;

        scalar_product += doc_i_word_evalation * q_i_word_evalation;
    }
    return scalar_product / (Math.sqrt(doc_norm) * Math.sqrt(q_norm));
}   

// console.log(sim([1, 2, 3], [1, 2, 3]));

const txt1 = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam mollitia voluptates atque consequuntur, reprehenderit libero beatae? Tenetur, praesentium distinctio consectetur repellat voluptatem rerum error ab inventore ad facilis quidem necessitatibus.";
const txt2 = "Un objeto como éste se denomina literal object en este ejemplo está escrito literalmente el contenido del objeto tal y como lo hemos creado. Esto es diferente en comparación con los objetos instanciados a partir de constructores.";
fill_weights_matrix([txt1, txt2]);

console.log(table_of_terms_frequency[0][0]);
console.log(terms_indexes);

console.log(`TF: ${tf(0, 1)}`);
console.log(`IDF: ${idf(1)}`);


module.exports = {
    sim,
    table_of_terms_frequency
}