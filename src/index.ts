const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Paris", "Rome", "Madrid"],
    answer: 1
  },
  {
    question: "What is the largest planet in the solar system?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: 2
  },
  // add more questions here
];

class Quiz {
  private readonly quizContainer: HTMLElement;
  private readonly questionElement: HTMLElement;
  private readonly optionElements: NodeListOf<Element>;
  private readonly scoreElement: HTMLElement;
  private questionIndex: number;
  private score: number;

  constructor() {
    this.quizContainer = document.getElementById("quiz");
    this.questionElement = document.getElementById("question");
    this.optionElements = document.querySelectorAll(".option");
    this.scoreElement = document.getElementById("score");
    this.questionIndex = 0;
    this.score = 0;

    this.loadQuestion();
    this.setOptionClickHandlers();
  }

  private loadQuestion(): void {
    const currentQuestion = quizData[this.questionIndex];
    this.questionElement.textContent = currentQuestion.question;
    this.optionElements.forEach((option, index) => {
      option.textContent = currentQuestion.options[index];
    });
  }

  private setOptionClickHandlers(): void {
    this.optionElements.forEach((option) => {
      option.addEventListener("click", () => {
        const currentQuestion = quizData[this.questionIndex];
        const isCorrect = currentQuestion.answer === Array.from(this.optionElements).indexOf(option);
        if (isCorrect) {
          this.score++;
          this.scoreElement.textContent = `Score: ${this.score}`;
        }
        this.questionIndex++;
        if (this.questionIndex >= quizData.length) {
          this.showResults();
        } else {
          this.loadQuestion();
        }
      });
    });
  }

  private showResults(): void {
    this.quizContainer.innerHTML = `
      <h2>Your Score: ${this.score} / ${quizData.length}</h2>
      <button onclick="location.reload()">Reload</button>
    `;
  }
}

new Quiz();
