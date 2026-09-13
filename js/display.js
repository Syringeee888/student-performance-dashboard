import {
  calculateFinalGrade,
  getAcademicStatus,
  getPerformanceRemark,
  calculateClassAverage,
  countPassingStudents,
  getTopStudent
} from "./gradeUtils.js";

function statusToSlug(status) {
  return status.toLowerCase().replace(/\s+/g, "-");
}

export function displayStudents(students) {
  const listEl = document.getElementById("studentList");
  listEl.innerHTML = "";

  if (students.length === 0) {
    listEl.innerHTML = '<p class="no-results">No students found</p>';
    displayMessage("No students found");
    return;
  }

  displayMessage("");

  students.forEach((student) => {
    const { id, name, block, quiz, lab, exam } = student;
    const finalGrade = calculateFinalGrade(student);
    const status = getAcademicStatus(finalGrade);
    const remark = getPerformanceRemark(finalGrade);
    const slug = statusToSlug(status);

    const card = document.createElement("article");
    card.className = "student-card";
    card.dataset.id = id;

    card.innerHTML = `
      <header class="card-top">
        <div class="card-heading">
          <h3 class="student-name">${name}</h3>
          <span class="student-block">${block}</span>
        </div>
        <div class="grade-badge status-${slug}">
          <span class="grade-value">${finalGrade.toFixed(2)}</span>
          <span class="grade-caption">final grade</span>
        </div>
      </header>
      <dl class="score-rows">
        <div class="score-row">
          <dt>Quiz</dt>
          <dd>${quiz}</dd>
        </div>
        <div class="score-row">
          <dt>Laboratory</dt>
          <dd>${lab}</dd>
        </div>
        <div class="score-row">
          <dt>Prelim Exam</dt>
          <dd>${exam}</dd>
        </div>
      </dl>
      <footer class="card-bottom">
        <span class="status-pill status-${slug}">${status}</span>
        <span class="remark">${remark}</span>
      </footer>
    `;

    listEl.appendChild(card);
  });
}

export function displaySummary(students) {
  const average = calculateClassAverage(students);
  const passing = countPassingStudents(students);
  const top = getTopStudent(students);

  document.getElementById("displayedCount").textContent = students.length;
  document.getElementById("classAverage").textContent = average.toFixed(2);
  document.getElementById("passingCount").textContent = passing;
  document.getElementById("topStudent").textContent = top
    ? `${top.name} (${calculateFinalGrade(top).toFixed(2)})`
    : "—";
}

export function displayMessage(message) {
  document.getElementById("messageArea").textContent = message;
}