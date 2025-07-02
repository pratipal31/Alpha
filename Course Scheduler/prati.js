// Sample data
const timetableData = [
    { day: 'monday', time: '09:00', subject: 'Math', teacher: 'Dr. Smith', room: 'Room 101' },
    { day: 'monday', time: '10:00', subject: 'Science', teacher: 'Prof. Johnson', room: 'Lab 1' },
    { day: 'tuesday', time: '09:00', subject: 'English', teacher: 'Ms. Davis', room: 'Room 102' },
    // Add more entries as needed
];

const subjects = [
    { name: 'Mathematics', teacher: 'Dr. Smith', code: 'MATH101' },
    { name: 'Science', teacher: 'Prof. Johnson', code: 'SCI201' },
    { name: 'English Literature', teacher: 'Ms. Davis', code: 'ENG301' },
    { name: 'History', teacher: 'Mr. Brown', code: 'HIS401' },
    { name: 'Art', teacher: 'Mrs. Wilson', code: 'ART101' },
];

const teachers = ['Dr. Smith', 'Prof. Johnson', 'Ms. Davis', 'Mr. Brown', 'Mrs. Wilson'];

// DOM Elements
const timetableSection = document.getElementById('timetableSection');
const subjectsSection = document.getElementById('subjectsSection');
const teachersSection = document.getElementById('teachersSection');
const addTimetableSection = document.getElementById('addTimetableSection');
const timetableBtn = document.getElementById('timetableBtn');
const subjectsBtn = document.getElementById('subjectsBtn');
const teachersBtn = document.getElementById('teachersBtn');
const addTimetableBtn = document.getElementById('addTimetableBtn');
const timetableBody = document.querySelector('#timetable tbody');
const subjectsList = document.getElementById('subjectsList');
const teacherSelect = document.getElementById('teacherSelect');
const teacherScheduleBody = document.querySelector('#teacherSchedule tbody');
const addTimetableForm = document.getElementById('addTimetableForm');

// Navigation
function showSection(sectionToShow) {
    [timetableSection, subjectsSection, teachersSection, addTimetableSection].forEach(section => {
        section.classList.remove('active');
    });
    sectionToShow.classList.add('active');
}

timetableBtn.addEventListener('click', () => showSection(timetableSection));
subjectsBtn.addEventListener('click', () => showSection(subjectsSection));
teachersBtn.addEventListener('click', () => showSection(teachersSection));
addTimetableBtn.addEventListener('click', () => showSection(addTimetableSection));

// Populate timetable
function populateTimetable() {
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

    timetableBody.innerHTML = '';

    times.forEach(time => {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = time;
        row.appendChild(timeCell);

        days.forEach(day => {
            const cell = document.createElement('td');
            const entry = timetableData.find(e => e.day === day && e.time === time);
            if (entry) {
                cell.innerHTML = `${entry.subject}<br>${entry.teacher}<br>${entry.room}`;
            }
            row.appendChild(cell);
        });

        timetableBody.appendChild(row);
    });
}

// Populate subjects
function populateSubjects() {
    subjectsList.innerHTML = '';
    subjects.forEach(subject => {
        const card = document.createElement('div');
        card.className = 'subject-card';
        card.innerHTML = `
            <h3>${subject.name}</h3>
            <p><strong>Teacher:</strong> ${subject.teacher}</p>
            <p><strong>Code:</strong> ${subject.code}</p>
        `;
        subjectsList.appendChild(card);
    });
}

// Populate teacher select
function populateTeacherSelect() {
    teacherSelect.innerHTML = '';
    teachers.forEach(teacher => {
        const option = document.createElement('option');
        option.value = teacher;
        option.textContent = teacher;
        teacherSelect.appendChild(option);
    });
}

// Populate teacher schedule
function populateTeacherSchedule(teacher) {
    teacherScheduleBody.innerHTML = '';
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
    const times = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00'];

    times.forEach(time => {
        const row = document.createElement('tr');
        const timeCell = document.createElement('td');
        timeCell.textContent = time;
        row.appendChild(timeCell);

        days.forEach(day => {
            const cell = document.createElement('td');
            const entry = timetableData.find(e => e.day === day && e.time === time && e.teacher === teacher);
            if (entry) {
                cell.innerHTML = `${entry.subject}<br>${entry.room}`;
            }
            row.appendChild(cell);
        });

        teacherScheduleBody.appendChild(row);
    });
}

// Event Listeners
teacherSelect.addEventListener('change', (e) => {
    populateTeacherSchedule(e.target.value);
});

addTimetableForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const newEntry = {
        day: document.getElementById('day').value,
        time: document.getElementById('time').value,
        subject: document.getElementById('subject').value,
        teacher: document.getElementById('teacher').value,
        room: document.getElementById('room').value
    };
    timetableData.push(newEntry);
    populateTimetable();
    addTimetableForm.reset();
    showSection(timetableSection);
});

// Initial setup
populateTimetable();
populateSubjects();
populateTeacherSelect();
populateTeacherSchedule(teachers[0]);