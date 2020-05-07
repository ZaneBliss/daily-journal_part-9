const component = {
    makeJournalEntryComponent: (journalEntry) => {
        return `
        <h1>${journalEntry.concepts}</h1>
        <p>${journalEntry.content}</p>
        <p>${journalEntry.date}</p>
        <p>${journalEntry.mood}</p>
        <button id="delete--${journalEntry.id}">delete</button>
        `
    }
}

export default component