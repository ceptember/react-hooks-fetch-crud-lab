import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([]) 

  useEffect( ()=> {
    fetch('http://localhost:4000/questions')
    .then(resp => resp.json())
    .then(data => setQuestions(data))
  }, [])

  function deleteQuestions(id){
    const updatedQuestions = questions.filter( (q) => q.id !== id );
    setQuestions(updatedQuestions)
  }

  function updateQuestions(item){
    const updatedQuestions = questions.map( q => {
      if (q.id === item.id){
        return item
      }
      else {
        return q; 
      }
    })
    setQuestions(updatedQuestions)
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{/* display QuestionItem components here after fetching */}
        {questions.map( q => <QuestionItem question={q} key={q.id} onDelete={deleteQuestions} onUpdate={updateQuestions}/>)}
      </ul>
    </section>
  );
}

export default QuestionList;

