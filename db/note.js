const util = require("util");
const fs = require("fs");

const { v4: uuidv4 } = require('uuid')
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Notes {
  read() {
    return readFileAsync("./db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("./db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      return [].concat(JSON.parse(notes));
    });
    try {
      parsedNotes = [].concat(JSON.parse(notes));
    } catch (err) {
      parsedNotes = [];
    }
    return parsedNotes;
  }
  addNotes(note) {
    const { title, text } = note;
    if (!title || !text) {
      throw new Error("Note title and text cannot be blank");
    }

    const newNotes = { title, text, id: uuidv4() };
    return this.getNotes()
      .then((notes) => [...notes, newNotes])
      .then((updatedNotes) => this.write(updatedNotes))
      .then(() => newNotes);
  }
  removeNote(id) {
    return this.getNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.write(filteredNotes));
  }
}

module.exports = new Notes();
