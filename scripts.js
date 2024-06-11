const ORDER = {
        NAME: "name",
        RELEASED: "released",
        SET: "set",
        RARITY: "rarity",
        COLOR: "color",
        USD: "usd", 
        TIX: "tix", 
        EURO: "eur", 
        CONVERTED_MANA_COST: "cmc", 
        POWER: "power", 
        TOUGHNESS: "toughness", 
        ARTIST: "artist", 
        EDHREC: "edhrec", 
        REVIEW: "review" 
    }; 
    // valid values are: name, released, set, rarity, color, usd, tix, eur, cmc, power, toughness, artist, edhrec, review 

    const DIRECTION = {
        ASCENDING: "asc", 
        DESCENDING: "desc"
    }; // valid are: asc, desc

        const CARDTYPES = {
        ARTIFACT: 'artifact',
        CREATURE: 'creature',
        ENCHANTMENT: 'enchantment',
        INSTANT: 'instant',
        LAND: 'land',
        PLANESWALKER: 'planeswalker',
        SORCERY: 'sorcery',
        TRIBAL: 'tribal'
    };

    let COMMANDERCOLORS={
        W:"W",
        WHITE:"W",
        B:"B",
        BLACK:"B",
        G:"G",
        GREEN:"G",
        U:"U",
        BLUE:"U",
        R:"R",
        RED:"R"
    };


function buttonClick()
{
    let inputField=document.getElementById("colors");
    if (containsOnlyCorrectColors(inputField))
    {
        let deck=[];

        let keywords=(document.getElementById("id_keywordsTextField").value).split(" ");

        // default values for a deck, based on grave danger
        let n_cre = 29;
        let n_sor = 12;
        let n_art = 9;
        let n_ins = 5;
        let n_enc = 4;
        let n_pla = 1;

        // adding each card type to the deck
        deck.push(getCommander(keywords))
        deck.push(getCards(CREATURE, n_cre, keywords))
        deck.push(getCards(SORCERY, n_sor, keywords))
        deck.push(getCards(ARTIFACT, n_art, keywords))
        deck.push(getCards(INSTANT, n_ins, keywords))
        deck.push(getCards(ENCHANTMENT, n_enc, keywords))
        deck.push(getCards(PLANESWALKER, n_pla, keywords))
        



        

        
       
    }
    else if(!containsOnlyCorrectColors(inputField))
        alert("Incorrect colors")



}

function containsOnlyCorrectColors(text)
{
    // checks a text field if it only contains WBGUR
    const allowed= ["WBGUR"];
    for(let UI_col of text)
    {
        console.log(UI_col)
        if (allowed.indexOf(UI_col) == -1)
        {
            return false;
        }
    }
    return true;
}

async function sendRequest(query)
{
    const response = await fetch(`https://api.scryfall.com/cards/search?order=set&q=${encodeURIComponent(query)}&unique=prints`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    reply = response.json();
    sleep(0.5)
    return await reply;
}

function parseJSON(JSONdata)
{
    // parses raw JSON into card names
    return json.data.map(card => ({
        name: card.name
    }));
}

function getCards(cardType, N, UI_order=ASCENDING, UIkeywords)
{
    
        let query = queryComposer(ASCENDING, cardType, "WUBGR", UIkeywords.split(" "));
        let JSONdata = sendRequest(query);
        let cards = parseJSON(JSONdata);
        cards = getNcards(cards, N)

        return cards; // returns names, basically
    
    if (commander == true)
    {
        let query = `https://scryfall.com/search?as=grid&extras=true&lang=any&order=${UI_order}}&q=type%3A${UI_cardtype}+commander%3A${UI_commanderColors}+%28game%3Apaper%29${KWplaceholder}&unique=cards`;
    }
}
function getCommander(UI_order=ASCENDING, UIkeywords)
{
        let KWplaceholder=""
        for(kw in UIkeywords)
        {
            KWplaceholder+=`+lore%3A${kw}`
        }
        let JSONdata = sendRequest(query);
        let cards = parseJSON(JSONdata);
        cards = getNcards(cards, N)
            // change various things including color
        let query = `https://scryfall.com/search?as=grid&extras=true&lang=any&order=${UI_order}}&q=type%3A${UI_cardtype}+commander%3A${UI_commanderColors}+%28game%3Apaper%29${KWplaceholder}&unique=cards`;
    
}

function queryComposer(UI_order=ASCENDING, UI_cardtype, UI_commanderColors, UIkeywords)
{
    // if the user has picked any keywords, those will be added, if not, just a empty string litteral
    let KWplaceholder=""
    for(kw in UIkeywords)
    {
        KWplaceholder+=`+lore%3A${kw}`
    }
    let query = `https://scryfall.com/search?as=grid&extras=true&lang=any&order=${UI_order}}&q=type%3A${UI_cardtype}+commander%3A${UI_commanderColors}+%28game%3Apaper%29${KWplaceholder}&unique=cards`;
}

function sleep(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

function getNcards(cards, N)
{
    // does not repeat cards
    let counter=0;
    let local_cards = [];
    while(counter < N)
    {
        let randnum = Math.floor(Math.random()*60);
        let card = cards[randnum];
        if (local_cards.find(card) == undefined)
        {
            local_cards.push(card);
        }
    } 
    return local_cards;
}