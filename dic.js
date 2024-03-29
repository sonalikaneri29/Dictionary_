 let searchInput = document.getElementById("searchInput");
 let searchBtn = document.getElementById("searchBtn");

 
const getData = async (searchValue) => {

    try{
        let data = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`);
        let jsonData =await data.json();
        console.log(jsonData);
    
        document.querySelector(".text").innerHTML="";
        let div = document.createElement("div");
        div.classList.add("details");
        div.innerHTML=`
        <h2>Word : <span>${jsonData[0].word} </span></h2>
        <h4>Type : <span>${jsonData[0].meanings[0].partOfSpeech} </span></h4>
        <p>Meaning : <span>${jsonData[0].meanings[0].definitions[0].definition}</span></p>
        <p>definations: <span>${jsonData[0].meanings[0].definitions[0].example === undefined ? "Not Found" : jsonData[0].meanings[0].definitions[0].example}</span></p>
        
        <p>Synonyms: <span>${jsonData[0].meanings[0].synonyms && jsonData[0].meanings[0].synonyms.length > 0 ? jsonData[0].meanings[0].synonyms.join(', ') : "Not Found"}</span></p>`;

    
      
   
        document.querySelector(".text").appendChild(div);
    }
    catch(error){
        document.querySelector(".text").innerHTML="<h1>Not Found</h1>"
    };

 
};
function getLimitedSynonyms(synonyms) {
    if (synonyms && synonyms.length > 0) {
        // Get only 2 or 3 synonyms
        const limitedSynonyms = synonyms.slice(0, 3).join(', ');
        return limitedSynonyms;
    } else {
        return "Not Found";
    }
}

 searchBtn.addEventListener("click", function(){
    let searchValue = searchInput.value;
    if(searchValue == ""){
        alert("First Enter Something")
    }else{
        getData(searchValue)
    };
});