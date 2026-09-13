const QUIZ_WEIGHT = 0.25;
const LAB_WEIGHT = 0.35;
const EXAM_WEIGHT = 0.40;

export function calculateFinalGrade(student) {
  const { quiz, lab, exam } = student;
  return quiz * QUIZ_WEIGHT + lab * LAB_WEIGHT + exam * EXAM_WEIGHT;
}

export function getAcademicStatus(grade) {
  if (grade >= 90) {
    return "Excellent";
  } else if (grade >= 75) {
    return "Passed";
  } else if (grade >= 70) {
    return "Needs Improvement";
  } else {
    return "Failed";
  }
}

export function searchStudents(students, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) {
    return students;
  }
  return students.filter((student) => student.name.toLowerCase().includes(normalizedQuery));
}

export function filterStudentsByBlock(students, block) {
  if (block === "All") {
    return students;
  }
  return students.filter((student) => student.block === block);
}

export function filterStudentsByStatus(students, status) {
  if (status === "All") {
    return students;
  }
  return students.filter((student) => getAcademicStatus(calculateFinalGrade(student)) === status);
}

export function calculateClassAverage(students) {
  if (students.length === 0) {
    return 0;
  }
  const total = students.reduce((sum, student) => sum + calculateFinalGrade(student), 0);
  return total / students.length;
}

export function countPassingStudents(students) {
  return students.filter((student) => calculateFinalGrade(student) >= 75).length;
}

export function getTopStudent(students) {
  if (students.length === 0) {
    return null;
  }
  return students.reduce((top, student) => (
    calculateFinalGrade(student) > calculateFinalGrade(top) ? student : top
  ), students[0]);
}

export function getPerformanceRemark(grade) {
  switch (true) {
    case grade >= 90:
      return "Outstanding";
    case grade >= 85:
      return "Very Good";
    case grade >= 80:
      return "Good";
    case grade >= 75:
      return "Satisfactory";
    default:
      return "Unsatisfactory";
  }
}