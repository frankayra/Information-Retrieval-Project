


let terms_frequency_table = [];
let terms_weight_table = [];                                   
let terms_indexes = {};
let terms_indexes_length = 0;
let max_frecuencies = [];
let terms_occurence_in_docs = [];

//#region ///////////////////////////////// TF & IDF & sim(d, q) /////////////////////////////////
const tf = (j_doc, i_term)=>{
    let ij_term_frec = terms_frequency_table[j_doc][i_term];
    if(max_frecuencies[j_doc] === undefined){
        var doc_j_max_frec = ij_term_frec;
        for (let i = 0; i < terms_frequency_table[j_doc].length; i++) {
            const current_frec = terms_frequency_table[j_doc][i];
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
        for (let j = 0; j < terms_frequency_table.length; j++) {
            const frec = terms_frequency_table[j][i_term];
            if(frec > 0){
                n_i++;
            }
        }
    }
    else n_i = terms_occurence_in_docs[i_term];
    return Math.log10(terms_frequency_table.length / n_i);
}
const vec_sim = (doc_vect, q_vect) => {
    let doc_norm = 0;
    let q_norm = 0;
    let scalar_product = 0;
    for (let i = 0; i < q_vect.length; i++) { 
        const doc_i_word_evalation = doc_vect[i] === undefined ? 0 : doc_vect[i];
        const q_i_word_evalation = q_vect[i] === undefined ? 0 : q_vect[i];

        doc_norm += doc_i_word_evalation**2;
        q_norm += q_i_word_evalation**2;

        scalar_product += doc_i_word_evalation * q_i_word_evalation;
    }
    return scalar_product / (Math.sqrt(doc_norm) * Math.sqrt(q_norm));
}   
const sim = (doc_index, q_array, q_alpha) => {
    let terms_occurence_in_q = {};
    let q_max_frec = 1;
    let q_weights_vect = [];
    let doc_weights_vect = terms_weight_table[doc_index];

    for(const term of q_array){
        if(term in terms_occurence_in_q) {
            terms_occurence_in_q[term]++;
            if(terms_occurence_in_q[term] > q_max_frec){
                q_max_frec++;
            }
        }
        else terms_occurence_in_q[term] = 1;
    }
    let scalar_product = 0;
    let q_norm = 0;
    let doc_norm = 0;
    for (const term in terms_indexes) {
        console.log(`término: \"${term}\"`);
        

        const term_weight_on_doc = doc_weights_vect[terms_indexes[term]] === undefined ? 0 : doc_weights_vect[terms_indexes[term]];
        const term_weight_on_q = (term in terms_occurence_in_q ? ((q_alpha + (1 - q_alpha)*(terms_occurence_in_q[term]/q_max_frec))) : q_alpha) * idf(terms_indexes[term]);        // idf = Math.log10(terms_frequency_table.length / terms_occurence_in_docs[terms_indexes[term]]
        // const term_weight_on_q = term in terms_occurence_in_q ? (q_alpha + (1 - q_alpha)*(terms_occurence_in_q[term]/q_max_frec)) * idf(terms_indexes[term]) : 0;

        console.log(`peso en el documento: ${term_weight_on_doc}`);
        console.log(`peso en la consulta: ${term_weight_on_q}`);

        scalar_product += term_weight_on_doc * term_weight_on_q;
        
        q_norm += term_weight_on_q ** 2;
        doc_norm += term_weight_on_doc ** 2;
        
    }
    return scalar_product / (Math.sqrt(q_norm) * Math.sqrt(doc_norm));


    // for (const term of q_array) {
    //     if(!(term in terms_indexes)){
    //         continue;
    //     }
        
    //     q_weights_vect[terms_indexes[term]] = (q_alpha + (1 - q_alpha)*(terms_occurence_in_q[term]/q_max_frec)) * idf(terms_indexes[term]);     
    // }
    // return vec_sim(terms_weight_table[doc_index], q_weights_vect);
}

//#endregion


// #region ///////////////////////////////// fill_terms_frequency_table(docs: String[]) /////////////////////////////////
const fill_terms_frequency_table  = (docs)  =>{
    for (let j = 0; j < docs.length; j++) {
        const current_doc = docs[j];
        if(terms_frequency_table.length <= j){
            terms_frequency_table[j] = [];
        }
        for (const term of current_doc.split(" ")) {
            if(term in terms_indexes){
                // console.log(`ya habia encontrado este termino: ${term}, indice: ${terms_indexes[term]}`);
                if(terms_frequency_table[j][terms_indexes[term]] === undefined){
                    terms_frequency_table[j][terms_indexes[term]] = 0;
                    if(terms_occurence_in_docs[terms_indexes[term]] === undefined){
                        terms_occurence_in_docs[terms_indexes[term]] = 0;
                    }
                    terms_occurence_in_docs[terms_indexes[term]]++;
                }
                terms_frequency_table[j][terms_indexes[term]]++;
                
                if(max_frecuencies[j] === undefined){
                    max_frecuencies[j] = 1;
                }
                else if (max_frecuencies[j] < terms_frequency_table[j][terms_indexes[term]]){
                    max_frecuencies[j]++;
                }
            }
            else{
                if(max_frecuencies[j] === undefined){
                    max_frecuencies[j] = 1;
                }
                terms_indexes[term] = terms_indexes_length;
                terms_frequency_table[j][terms_indexes_length] = 1;
                terms_indexes_length++;
                if(terms_occurence_in_docs[terms_indexes[term]] === undefined){
                    terms_occurence_in_docs[terms_indexes[term]] = 0;
                }
                terms_occurence_in_docs[terms_indexes[term]]++;

            } 
        }
    }
    fill_weights_matrix_having_terms_frecuency_table();
} 
const fill_weights_matrix_having_terms_frecuency_table = () =>{
    for (let j = 0; j < terms_frequency_table.length; j++) {
        terms_weight_table[j] = [];
        for (let i = 0; i <= terms_indexes_length; i++) {
            i_idf = idf(i);
            let ij_term_frec = terms_frequency_table[j][i];
            if(ij_term_frec === undefined) terms_frequency_table[j][i] = 0;

            terms_weight_table[j][i] = terms_frequency_table[j][i] === undefined ? 0 : tf(j, i) * i_idf;
        }
    }
}
//#endregion



//#region ///////////////////////////////// Exports /////////////////////////////////
module.exports = {
    sim,
    termsFrequency: terms_frequency_table,
    termsWeight: terms_weight_table,
    UpdateDocs: fill_terms_frequency_table
}
//#endregion



//#region ///////////////////////////////// Tests /////////////////////////////////


// const doc1 = "lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam mollitia voluptates atque consectetur, reprehenderit libero beatae? Tenetur, praesentium distinctio consectetur repellat voluptatem rerum error ab inventore ad facilis quidem necessitatibus.";
// const doc2 = "Un objeto como éste se denomina literal object en este ejemplo está escrito literalmente el contenido del objeto tal y como lo hemos creado. Esto es diferente en comparación con los objetos instanciados a partir de constructores.";
// const doc3 = "lorem lorem ipsum lorem";

// fill_terms_frequency_table([doc1, doc2, doc3]);

// const term = "lorem";
// const doc = 2;
// const query = "consectetur";

// console.log(`TF de \"${term}\": ${tf(0, terms_indexes[term])}`);
// console.log(`IDF de \"${term}\": ${idf(terms_indexes[term])}`);
// console.log(`query: \"${query}\"`);
// console.log(`similitud entre doc ${doc} y la query \"${query}\": ${sim(doc, query.split(" "), 0.5)}`);


//#endregion
