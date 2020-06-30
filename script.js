var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');
var myQuestions = [
	  {
      question: "What is part of a database that holds only one type of information?",
      answers: {
        a: 'Report',
        b: 'Field',
        c: 'Record',
        d: 'File'
      },
      correctAnswer: 'b'
    },
    {
      question: "	'OS' computer abbreviation usually means ?",
      answers: {
        a: 'Order of Significance',
        b: 'Open Software',
        c: 'Operating System',
        d: 'Optical Sensor'
      },
      correctAnswer: 'c'
    },
    {
      question: "'.MOV' extension refers usually to what kind of file?",
      answers: {
        a: 'Image file',
        b: 'Animation/movie file',
        c: 'Audio file',
        d: 'MS Office document'
      },
      correctAnswer: 'b'
	  },
	  {
      question: "Which of the following is not a type of constructor?",
      answers: {
        a: 'Copy Constructor',
        b: 'Friend Constructor',
        c: 'Default Constructor',
        d: 'Parameterized Constructor'
      },
      correctAnswer: 'b'
    },
    {
      question: "Which of the following access specifier is used as a default in a class definition?",
      answers: {
        a: 'Protected',
        b: 'Public',
        c: 'private',
        d: 'friend'
      },
      correctAnswer: 'a'
    }   
];
var total_seconds = 30;
var rem_minutes = parseInt(total_seconds/60);
var rem_seconds = parseInt(total_seconds%60);

function checkTime()
{
    document.getElementById("quizTime").innerHTML='Time left : '+rem_minutes+' Min '+rem_seconds+' Sec ';
    if(total_seconds<=0){
		//show result when time is over
		alert("time's up");
	   showResults()	
    }
    else{
        total_seconds=total_seconds - 1;
        rem_minutes = parseInt(total_seconds/60);
        rem_seconds = parseInt(total_seconds%60);
		setTimeout("checkTime()",1000);
		
    }
}
//start timer
setTimeout("checkTime()",1000);

//definition of Quiz builder function
function buildQuiz(){
	// variable to store the HTML output
	const output = [];
  
	// for each question...
	myQuestions.forEach(
	  (currentQuestion, questionNumber) => {
  
		// variable to store the list of possible answers
		const answers = [];
  
		// and for each available answer...
		for(letter in currentQuestion.answers){
  
		  // ...add an HTML radio button
		  answers.push(
			`<label>
			  <input type="radio" name="question${questionNumber}" value="${letter}">
			  ${letter} :
			  ${currentQuestion.answers[letter]}
			</label>`
		  );
		}
  
		// add this question and its answers to the output
		output.push(
		  `<div class="question"> ${currentQuestion.question} </div>
		  <div class="answers"> ${answers.join('')} </div>`
		);
	  }
	);
  
	// finally combine our output list into one string of HTML and put it on the page
	quizContainer.innerHTML = output.join('');
  }

//function to calculate and show result
  function showResults(){

	// gather answer containers from our quiz
	const answerContainers = quizContainer.querySelectorAll('.answers');
  
	// keep track of user's answers
	let numCorrect = 0;
  
	// for each question...
	myQuestions.forEach( (currentQuestion, questionNumber) => {
  
	  // find selected answer
	  const answerContainer = answerContainers[questionNumber];
	  const selector = `input[name=question${questionNumber}]:checked`;
	  const userAnswer = (answerContainer.querySelector(selector) || {}).value;
  
	  // if answer is correct
	  if(userAnswer === currentQuestion.correctAnswer){
		// add to the number of correct answers
		numCorrect++;
  
		//color the answers green
		answerContainers[questionNumber].style.color = 'blue';
	  }
	  // if answer is wrong or blank
	  else{
		// color the answers red
	    answerContainers[questionNumber].style.color = 'red';
	  }
	});
  
	// show number of correct answers out of total
	resultsContainer.innerHTML = `Your score is : ${numCorrect} out of ${myQuestions.length}`;
  }
  //build quiz
  buildQuiz();
  //show result on submit
  submitButton.addEventListener('click', showResults);