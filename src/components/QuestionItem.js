import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete(){
    
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE"
    })
      .then(() => onDelete(id))
  }

  function handleAnswerChange(event){
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {"Content-Type" : "application/json" },
      body: JSON.stringify({"correctIndex": event.target.value})
    })
      .then(resp => resp.json())
      .then(updatedItem => onUpdate(updatedItem))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
