//API Informations.
const SEARCHAPI = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=prix_des_carburants_j_7&q=&rows=100&sort=update&facet=cp&facet=pop&facet=city&facet=automate_24_24&facet=fuel&facet=shortage&facet=update&facet=services&facet=brand';

//Eléments HTML
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");
const city = document.getElementById("city");
const carburant = document.getElementById("carburant");
const valid = document.getElementById("valid");
let tab = document.getElementById('machinchose');
let tab_body = document.getElementById('tbody');
let data = null;

//Création des fonctions
function createNode(element) {
    return document.createElement(element);
};
function append(parent, el) {
  return parent.appendChild(el);
};


//Création d'une fonction de tri
function compare(a, b) {
    if (a.fields['price_'+ carburant.value.toLowerCase()] < b.fields['price_'+ carburant.value.toLowerCase()]){
       return -1;
    } else if (a.fields['price_'+ carburant.value.toLowerCase()] > b.fields['price_'+ carburant.value.toLowerCase()] ){
        return 1;
    } else {
        return 0;
    }
  };


function trierCarburant(data){
    fetch(data).then(e => e.json())
    .then(function(dataTab){  
        return dataTab.records.sort(compare).map(
            r =>{
                let truc = r.fields;
                let price = truc['price_'+ carburant.value.toLowerCase()];
                
                let tab_row = createNode('tr');
                append(tab_body , tab_row);
                
                let tab_title = createNode('th');
                tab_title.scope = "row";
                tab_title.innerHTML = `${truc.city}`; 
                console.log(tab_title);
                append(tab_row , tab_title);
                
                let tab_station = createNode('td');
                tab_station.innerHTML = `${truc.name}`;
                append(tab_row , tab_station);
                
                truc.name ? tab_station.innerHTML = truc.name : tab_station.innerHTML = "Sans nom" ;

                let tab_cell_address = createNode('td');
                tab_cell_address.innerHTML = `${truc.address}`;
                console.log(tab_cell_address);
                append(tab_row , tab_cell_address);             

                // let tab_cell_fuel = createNode('td');
                // tab_cell_fuel.innerHTML = carburant.value;
                // console.log(tab_cell_fuel);
                // append(tab_row , tab_cell_fuel);
                
                let tab_cell_price = createNode('td');
                tab_cell_price.textContent = price;
                console.log(tab_cell_price);
                append(tab_row , tab_cell_price);
                
        }); 
    });
};

//Evenement sur le bouton valider
valid.addEventListener('click', e => {
    e.preventDefault();


    let ville = '&refine.city=' + city.value.toUpperCase();
    let fuel = '&refine.fuel=' + carburant.value;
    const searchStation = SEARCHAPI + ville + fuel;
    console.log(searchStation);
    tab_body.innerHTML = "";

    if (city && carburant ) {
        trierCarburant(searchStation);
    } else {
        main.innerHTML = '<h1> Pas de station contenant le carburant sélectionné.</h1>'
    }
});



/*
function trierCarburant(data){
    fetch(data).then(e => e.json())
    .then(function(dataTab){  
        return dataTab.records.map(
            r =>{
                let truc = r.fields;
                let price = truc['price_'+ carburant.value.toLowerCase()];

                
                document.write(`${truc.city}`);
                document.write(`${truc.address}`);
                document.write(`${price}`);
                

               truc.name ? tab_station.innerHTML = truc.name : tab_station.innerHTML = "Sans nom" ;

                let tab_row = createNode('tr');
                append(tab , tab_row);

                let tab_title = createNode('th');
                tab_title.innerHTML = `${truc.city}`; //truc.city.value;
                console.log(tab_title);
                append(tab_row , tab_title);

                let tab_station = createNode('td');
                //truc.name ? tab_station.innerHTML = truc.name : tab_station.innerHTML = "Sans nom" ;
                tab_station.innerHTML = `${truc.name}`;
                append(tab_row , tab_station);

                let tab_cell_address = createNode('td');
                tab_cell_address.innerHTML = `${truc.address}`; //truc.address.value;
                console.log(tab_cell_address);
                append(tab_row , tab_cell_address);


                let tab_cell_fuel = createNode('td');
                tab_cell_fuel.innerHTML = carburant.value;
                console.log(tab_cell_fuel);
                append(tab_row , tab_cell_fuel);
                
                let tab_cell_price = createNode('td');
                tab_cell_price.textContent = price;
                console.log(tab_cell_price);
                append(tab_row , tab_cell_price);
                
        }); 
    });
};
*/