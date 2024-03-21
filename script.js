async function init() {
    await includeHTML(); //  Die Funktion init wartet auf die Ausführung der Funktion includeHTML(), bevor sie fortfährt.
    document.getElementById('headline').innerHTML = 'Herzlich willkommen!'; // Nachdem includeHTML() ausgeführt wurde, wird der Inhalt des HTML-Elements mit der ID "headline" auf "Herzlich willkommen!" gesetzt.
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]'); // sucht alle HTML-Elemente auf der Seite, die das Attribut w3-include-html haben, und speichert sie in der Variablen includeElements.
    for (let i = 0; i < includeElements.length; i++) { // Es wird eine Schleife gestartet, um jedes gefundene Element in includeElements zu durchlaufen.
        const element = includeElements[i]; // Hier wird das aktuelle Element aus includeElements in einer Variablen namens element gespeichert.
        file = element.getAttribute("w3-include-html"); // "includes/header.html" Das Attribut w3-include-html des aktuellen Elements wird ausgelesen und in der Variablen file gespeichert. Dieser Wert wird erwartet, um den Dateipfad der einzufügenden HTML-Datei zu enthalten, z.B. "includes/header.html".
        let resp = await fetch(file); // Hier wird die Datei über den Fetch-API-Call geladen. fetch() lädt die Datei und gibt ein Promise zurück, auf das mit await gewartet wird.
        if (resp.ok) { // Überprüfung, ob die Antwort erfolgreich war.
            element.innerHTML = await resp.text(); // Wenn die Antwort erfolgreich ist, wird der HTML-Inhalt der Datei in das aktuelle Element eingefügt.
        } else { 
            element.innerHTML = 'Page not found'; // // Wenn die Antwort nicht erfolgreich ist (z.B. 404-Fehler), wird der Text "Page not found" in das Element eingefügt.
        }
    }
}