let notes = JSON.parse(localStorage.getItem("Our array of notes") ?? "[]");

let currentNoteIndex = Number.parseInt(
    notes.length > 0 
    ? localStorage.getItem("Lastly checked note") ?? "0"
    : "-1",
);

const createButton = document.querySelector("#create-button");
const notesList = document.querySelector("#notes-list");
const noteEditor = document.querySelector("#note-editor");

const noteTitleInput = noteEditor.querySelector(`[name="title"]`);
const noteBodyInput = noteEditor.querySelector(`[name="body"]`);

const setCurrentNoteIndex = (index) => {
    currentNoteIndex = index;
    localStorage.setItem("Lastly checked note", index);
};
    
const setEditorInputValues = () => {
    noteTitleInput.value = notes[currentNoteIndex]?.title ?? "";
    noteBodyInput.value = notes[currentNoteIndex]?.body ?? "";
};
  
const setNotes = (newNotes = []) => {
    notes = newNotes;
    localStorage.setItem("Our array of notes", JSON.stringify(newNotes));
};





const renderNotes = () => {
  notesList.innerHTML = "";

  notes.forEach(({ title }, index) => {
      const listItem = document.createElement("li");

  listItem.addEventListener("click", () => {
      setCurrentNoteIndex(index);
      setEditorInputValues();
  });

  const span = document.createElement("span");
      span.textContent = title;

  const deleteButton = document.createElement("button");

  deleteButton.setAttribute("type", "button", "aria-label", "Delete");
  deleteButton.textContent = "✅";

  deleteButton.addEventListener("click", () => {
    if (currentNoteIndex === index) {
      setCurrentNoteIndex(currentNoteIndex - 1);
    }

    setNotes(notes.filter((_, noteIndex) => noteIndex !== index));
    renderNotes();
  });

  listItem.appendChild(span);
  listItem.appendChild(deleteButton);
  notesList.appendChild(listItem);
  });
};




createButton.addEventListener("click", () => {
    setNotes([
      ...notes,
      {
        title: "",
        body: "",
      },
    ]);
  
    setCurrentNoteIndex(notes.length - 1);
    setEditorInputValues();
  
    renderNotes();
  });




const handleInputChange = (fieldName) => (event) => {
    if (currentNoteIndex < 0) {
        setNotes([
          {
            [fieldName]: event.target.value,
          }
        ]);
    
        setCurrentNoteIndex(0);
    }
    else {
        setNotes(
          notes.map((note, index) => (
            index === currentNoteIndex ? {
              ...note,
              [fieldName]: event.target.value,
            } : note
          ))
        );
    }
    
  renderNotes();
};
    

noteTitleInput.addEventListener("change", handleInputChange("title"));
noteBodyInput.addEventListener("change", handleInputChange("body"));


renderNotes();
setEditorInputValues();