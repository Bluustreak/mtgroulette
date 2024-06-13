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

    let deck = [];

    let keywords = (document.getElementById("id_keywordsTextField").value).split(" ");

    let checkboxW = document.getElementById("CBW");
    let checkboxB = document.getElementById("CBB");
    let checkboxG = document.getElementById("CBG");
    let checkboxU = document.getElementById("CBU");
    let checkboxR = document.getElementById("CBR");

    let UI_commanderColors = "";
    if (checkboxW.checked)
        UI_commanderColors+="W";
    if (checkboxB.checked)
        UI_commanderColors+="B";
    if (checkboxG.checked)
        UI_commanderColors+="G";
    if (checkboxU.checked)
        UI_commanderColors+="U";
    if (checkboxR.checked)
        UI_commanderColors+="R";
    alert(UI_commanderColors);

    // default values for a deck, based on grave danger
    let n_cre = 29;
    let n_sor = 12;
    let n_art = 9;
    let n_ins = 5;
    let n_enc = 4;
    let n_pla = 1;

    UI_order=ASCENDING;

    // adding each card type to the deck
    deck.push(getCommander(UI_commanderColors, UI_order, keywords))
    deck.push(getCards(CREATURE, n_cre, UI_commanderColors, UI_order, keywords))
    //deck.push(getCards(SORCERY, n_sor, keywords))
    //deck.push(getCards(ARTIFACT, n_art, keywords))
    //deck.push(getCards(INSTANT, n_ins, keywords))
    //deck.push(getCards(ENCHANTMENT, n_enc, keywords))
    //deck.push(getCards(PLANESWALKER, n_pla, keywords))




    

    
    




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
    const response = await fetch(`https://api.scryfall.com/cards/search?${(query)}`);
    alert("trying the query: \n"+`https://api.scryfall.com/cards/search?${(query)}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    reply = response.json();
    sleep(0.5);
    return await reply;
}

function parseJSON(JSONdata)
{
    // parses raw JSON into card names
    return json.data.map(card => ({
        name: card.name
    }));
}

function getCards(cardType, N, UI_commanderColors, UI_order, UIkeywords)
{
        let query = queryComposer(UI_order, cardType, UI_commanderColors, UIkeywords);
        let JSONdata = sendRequest(query);
        let cards = parseJSON(JSONdata);
        cards = getNcards(cards, N)

        return cards; // returns names, basically
    
    if (commander == true)
    {
        let query = `https://scryfall.com/search?as=grid&extras=true&lang=any&order=${UI_order}}&q=type%3A${UI_cardtype}+commander%3A${UI_commanderColors}+%28game%3Apaper%29${KWplaceholder}&unique=cards`;
    }
}
function getCommander(UI_commanderColors, UI_order, UIkeywords)
{
        let KWplaceholder=""
        for(let kw of UIkeywords)
        {
            KWplaceholder+=`+lore%3A${kw}`
        }
        let query = `https://api.scryfall.com/cards/search?as=grid&extras=true&lang=any&order=${UI_order}&q=type%3A${"creature"}+type%3A${"legendary"}+c%3D${UI_commanderColors}+%28game%3Apaper%29${KWplaceholder}&unique=cards`;
        let JSONdata = sendRequest(query);
        alert(query);
        let cards = parseJSON(JSONdata);
        card = getOneRandomCard(cards);
        deck.push(card);
        alert(card);
}

function queryComposer(UI_order, UI_cardtype, UI_commanderColors, UIkeywords)
{
    // if the user has picked any keywords, those will be added, if not, just a empty string litteral
    let KWplaceholder=""
    for(let kw of UIkeywords)
    {
        KWplaceholder+=`+lore%3A${kw}`;
    }
        let query = `https://api.scryfall.com/cards/search?as=grid&extras=true&lang=any&order=${UI_order}&q=type%3A${UI_cardtype}+commander%3A${UI_commanderColors}+%28game%3Apaper%29${KWplaceholder}&unique=cards`;
}

function sleep(milliseconds) {
  const date = Date.now();
  while(Date.now()-date < milliseconds){}
}

function getOneRandomCard(cards)
{
    let randnum = Math.floor(Math.random()*60);
    return cards[randnum];
}
function getNcards(cards, N)
{
    // does not repeat cards
    let local_cards = [];
    while(local_cards.length() < N)
    {
        card=getOneRandomCard(cards)
        if (local_cards.find(card) == undefined) // if the card is not in the deck, add it
        {
            local_cards.push(card);
        }
    } 
    return local_cards;
}