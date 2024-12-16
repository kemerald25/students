const asyncHandler = require("express-async-handler");
const { getAllStudents, addNewStudent, getStudentDetail, setStudentStatus, updateStudent } = require("./students-service");

// Get all students
const handleGetAllStudents = asyncHandler(async (req, res) => {
    const students = await getAllStudents();
    if (!students) {
        return res.status(404).json({ message: "No students found" });
    }
    res.status(200).json(students);
});

// Add a new student
const handleAddStudent = asyncHandler(async (req, res) => {
    const { name, age, grade, email } = req.body;
    if (!name || !age || !grade || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const newStudent = await addNewStudent({ name, age, grade, email });
    if (!newStudent) {
        return res.status(500).json({ message: "Failed to add new student" });
    }

    res.status(201).json(newStudent);
});

// Update a student
const handleUpdateStudent = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const { name, age, grade, email } = req.body;
    if (!name || !age || !grade || !email) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const updatedStudent = await updateStudent(studentId, { name, age, grade, email });
    if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json(updatedStudent);
});

// Get student details
const handleGetStudentDetail = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const student = await getStudentDetail(studentId);
    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }
    res.status(200).json(student);
});

// Set student status
const handleStudentStatus = asyncHandler(async (req, res) => {
    const studentId = req.params.id;
    const { status } = req.body;

    if (status === undefined || (status !== 0 && status !== 1)) {
        return res.status(400).json({ message: "Status must be 0 (inactive) or 1 (active)" });
    }

    const updatedStudent = await setStudentStatus(studentId, status);
    if (!updatedStudent) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({ message: "Student status updated successfully", student: updatedStudent });
});

module.exports = {
    handleGetAllStudents,
    handleGetStudentDetail,
    handleAddStudent,
    handleStudentStatus,
    handleUpdateStudent,
};
