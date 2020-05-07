import API from "./data.js";
import entries from "./entriesDOM.js";
import fieldset from "./fieldset.js";

fieldset.writeDom();

const entriesHolder = document.querySelector(".entryLog");

document.querySelector("#submitBtn").addEventListener("click", function () {
    let date = document.querySelector("#journalDate").value;
    let concepts = document.querySelector("#conceptsCovered").value;
    let content = document.querySelector("#journalEntry").value;
    let mood = document.querySelector("#mood").value;
    let newJournalEntry = createEntry(date, concepts, content, mood);
    let regex = /^[(){};:,\w\s]+$/;
    if (date == "" || concepts == "" || content == "" || mood == "") {
        alert("Please fill out all fields.");
    } else if (!regex.test(concepts) || !regex.test(content)) {
        alert("Please only use allowed characters. A-Z, 0-9, (), {}, :, and ;.");
    } else {
        alert("Success!");
        API.saveJournalEntry(newJournalEntry);
        entriesArr = [];
        entriesArr.push(newJournalEntry);
        entries.renderJournalEntries(entriesArr);
    }
});

let conceptsInput = document.querySelector("#conceptsCovered");
conceptsInput.addEventListener("keyup", function () {
    let words = conceptsInput.value.match(/\b[-?(\w+)?]+\b/gi);
    if (words) {
        if (words.length >= 10) {
            alert('Please reduce word count.')
        } else {
            document.querySelector("#wordCount").innerHTML = words.length;
        }
    } else {
        document.querySelector("#wordCount").innerHTML = 0;
    }
});

let radioButton = document.querySelectorAll('input[type="radio"')
radioButton.forEach(button => button.addEventListener("click", () => {
    entriesHolder.innerHTML = ""
    let mood = event.target.value
    API.getJournalEntries()
    .then(entry => {
        let filtered = entry.filter(entry => entry.mood == mood)
        entries.renderJournalEntries(filtered)
    })}));
    
    entriesHolder.addEventListener('click', ()=> {
        if (event.target.id.startsWith("delete--")) {
            let journalId = event.target.id.split("--")[1]
            entriesHolder.innerHTML = ""
            API.deleteJournalEntry(journalId).then(loadContent)
        }
    })
    
    function loadContent () {
        entriesHolder.innerHTML = ""
        API.getJournalEntries().then(entries.renderJournalEntries);
    }
    
    const createEntry = (date, concepts, content, mood) => ({
        date,
        concepts,
        content,
        mood,
    });
    
    loadContent()