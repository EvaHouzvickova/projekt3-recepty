
let receptyKopie = recepty;
let seznamReceptu = document.getElementById('recepty');

generovaniReceptu();
zobrazPoslednyRecept();

function vytvorRecept(i) {
    let recept = document.createElement('div');
    recept.classList.add('recept');

    let receptObrazek = document.createElement('div');
    receptObrazek.classList.add('recept-obrazek')

    let foto = document.createElement('img');
    foto.src = receptyKopie[i].img;
    foto.alt = receptyKopie[i].nadpis;

    let receptInfo = document.createElement('div');
    receptInfo.classList.add('recept-info');

    let receptNazev = document.createElement('h3');
    receptNazev.textContent = receptyKopie[i].nadpis;

    seznamReceptu.appendChild(recept);
    recept.appendChild(receptObrazek);
    receptObrazek.appendChild(foto);
    recept.appendChild(receptInfo);
    receptInfo.appendChild(receptNazev);

    recept.addEventListener('click', () => {
        zobrazDetailReceptu(i);
        uloženiPoslednihoReceptu(i);
    })
};

function generovaniReceptu() {
    for (i = 0; i < receptyKopie.length; i++) {
        vytvorRecept(i);
    }
};

/*Hledání receptů dle zadaného slova/spojení*/
const hledat = document.getElementById('hledat');

hledat.addEventListener("input", (e) => {
    let zadanyText = e.target.value.toLowerCase();
    seznamReceptu.innerHTML = '';

    for (let i = 0; i < recepty.length; i++) {
        if(receptyKopie[i].nadpis.toLowerCase().includes(zadanyText)) {
            vytvorRecept(i);
        }
    }
});

/*Filtrování receptů podle kategorie*/
const filterKategorie = document.getElementById('kategorie');

filterKategorie.addEventListener("input", (e) => {
    let vybranaKategorie = e.target.value;
    seznamReceptu.innerHTML = '';

    for (let i = 0; i < recepty.length; i++) {
        if(receptyKopie[i].kategorie.includes(vybranaKategorie)) {
            vytvorRecept(i);
        }
    }
});

/*Filtrování receptů podle hodnocení*/
const filterHodnoceni = document.getElementById('razeni');

filterHodnoceni.addEventListener('change', (e) => {
    let vybraneHodnoceni = e.target.value;
    seznamReceptu.innerHTML = '';

    receptyKopie = receptyKopie;
    if (vybraneHodnoceni == 1) {
        receptyKopie = [...receptyKopie].sort(function(a, b) {
            return b.hodnoceni - a.hodnoceni;
        });
    }
    else if  (vybraneHodnoceni == 2) {
        receptyKopie = [...receptyKopie].sort(function(a, b) {
            return a.hodnoceni - b.hodnoceni;
        });
    } else {
    receptyKopie = recepty;
    }
    generovaniReceptu();
});

/* uložení do Local storage*/
function uloženiPoslednihoReceptu(i) {
let vybranyRecept = receptyKopie[i];
localStorage.vybranyRecept = JSON.stringify(vybranyRecept);
};

/*po kliknutí se objeví detail receptu*/
function zobrazDetailReceptu(i) {
document.getElementById('recept-foto').src = receptyKopie[i].img;
document.getElementById('recept-foto').alt = 'Foto receptu';
document.getElementById('recept-kategorie').innerHTML = receptyKopie[i].kategorie;
document.getElementById('recept-hodnoceni').innerHTML = receptyKopie[i].hodnoceni;
document.getElementById('recept-nazev').innerHTML = receptyKopie[i].nadpis;
document.getElementById('recept-popis').innerHTML = receptyKopie[i].popis;
};

/* funkce pro zobrazení posledního receptu*/
function zobrazPoslednyRecept(i) {
    let poslednyRecept = localStorage.vybranyRecept;

    if (!(poslednyRecept === null || poslednyRecept === undefined)) {
        vybranyRecept = JSON.parse(poslednyRecept);
        console.log(vybranyRecept);
    }
    document.getElementById('recept-foto').src = vybranyRecept.img;
    document.getElementById('recept-foto').alt = 'Foto receptu';
    document.getElementById('recept-kategorie').innerHTML = vybranyRecept.kategorie;
    document.getElementById('recept-hodnoceni').innerHTML = vybranyRecept.hodnoceni;
    document.getElementById('recept-nazev').innerHTML = vybranyRecept.nadpis;
    document.getElementById('recept-popis').innerHTML = vybranyRecept.popis;
}; 
