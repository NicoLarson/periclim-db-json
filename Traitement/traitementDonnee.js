const { ifError } = require('assert')
const fs = require('fs')
const dataCsv = fs.readFileSync('./ZOTEROCSV.csv', 'utf8')

const lbreak = dataCsv.split("\n")

// Extraction des titres
let header = lbreak[0].split("\"")
const haveCommas = (str) => {
    return str != ','
}
header = header.filter(haveCommas)
header.shift()
header.pop()

for (let i = 0; i < header.length; i++) {
    header[i] = header[i].toLocaleLowerCase()
    for (let j = 0; j < header[i].length; j++) {
        if (header[i][j] == ' ') {
            header[i] = header[i].replace(' ', '_')
        }
    }
}

// Traitement des données
let data = []

for (let i = 1; i < lbreak.length; i++) {
    let ligne = lbreak[i].split("\"")
    ligne = ligne.filter(haveCommas)
    ligne.shift()
    ligne.pop()
    let document = new Object()

    for (let j = 0; j < ligne.length; j++) {
        if (header[j] == 'key' || header[j] == 'item_type' || header[j] == 'publication_year' || header[j] == 'author' || header[j] == 'title' || header[j] == 'publication_title' || header[j] == 'issn' || header[j] == 'doi' || header[j] == 'url' || header[j] == 'abstract_note' || header[j] == 'date_added' || header[j] == 'date_modified' || header[j] == 'pages' || header[j] == 'language' || header[j] == 'tags') {
            document[header[j]] = ligne[j]
            data.push(document)
        }
    }
}

const documents = {documents : data}

// Création du fichier json
let datas = JSON.stringify(documents)
fs.writeFileSync('db.json', datas)