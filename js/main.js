import { students } from "./students.js";
import {
  searchStudents,
  filterStudentsByBlock,
  filterStudentsByStatus
} from "./gradeUtils.js";
import { displayStudents, displaySummary, displayMessage } from "./display.js";

const searchInput = document.getElementById("searchInput");
const blockFilter = document.getElementById("blockFilter");
const statusFilter = document.getElementById("statusFilter");
const applyBtn = document.getElementById("applyBtn");
const resetBtn = document.getElementById("resetBtn");

function renderResults(list) {
  displayStudents(list);
  displaySummary(list);
}

function applyFilters() {
  const query = searchInput.value;
  const block = blockFilter.value;
  const status = statusFilter.value;

  let result = searchStudents(students, query);
  result = filterStudentsByBlock(result, block);
  result = filterStudentsByStatus(result, status);

  renderResults(result);
}

function resetAll() {
  searchInput.value = "";
  blockFilter.value = "All";
  statusFilter.value = "All";
  displayMessage("");
  renderResults(students);
}

applyBtn.addEventListener("click", applyFilters);
resetBtn.addEventListener("click", resetAll);
searchInput.addEventListener("input", applyFilters);
blockFilter.addEventListener("change", applyFilters);
statusFilter.addEventListener("change", applyFilters);

renderResults(students);