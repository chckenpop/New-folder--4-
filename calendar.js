// script.js

document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.querySelector('#calendar');
    const timetableModal = document.querySelector('#timetableModal');
    const eventDetailModal = document.querySelector('#eventDetailModal');
    const closeModal = document.querySelector('#closeModal');
    const closeEventDetailModal = document.querySelector('#closeEventDetailModal');
    const prevMonthBtn = document.querySelector('#prevMonth');
    const nextMonthBtn = document.querySelector('#nextMonth');
    const monthYearDisplay = document.querySelector('#monthYear');
    const dailyDateDisplay = document.querySelector('#dailyDate');
    const saveEventBtn = document.querySelector('#saveEvent');
    const eventTitleInput = document.querySelector('#eventTitle');
    const eventTimeInput = document.querySelector('#eventTime');
    const eventDescriptionInput = document.querySelector('#eventDescription');
    const timetable = document.querySelector('.timetable');
    const scheduleEventsContainer = document.querySelector('.schedule-events');

    let selectedTimeSlot = null; // Track the selected time slot
    let events = {}; // Object to store events by date and time

    // Calendar setup
    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    function updateCalendar() {
        const firstDay = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
        const daysContainer = document.querySelector('.days');
        daysContainer.innerHTML = '';

        for (let i = 0; i < firstDay; i++) {
            daysContainer.innerHTML += `<div></div>`;
        }

        for (let i = 1; i <= daysInMonth; i++) {
            daysContainer.innerHTML += `<div>${i}</div>`;
        }

        monthYearDisplay.textContent = `${new Date(currentYear, currentMonth).toLocaleString('default', { month: 'long' })} ${currentYear}`;
    }

    function showTimetableModal(date) {
        dailyDateDisplay.textContent = date;
        populateTimetable();
        displayEvents(date);
        timetableModal.style.display = 'flex';
    }

    function showEventDetailModal(title, description) {
        const eventDetailTitle = document.querySelector('#eventDetailTitle');
        const eventDetailDescription = document.querySelector('#eventDetailDescription');
        eventDetailTitle.textContent = title;
        eventDetailDescription.textContent = description;
        eventDetailModal.style.display = 'flex';
    }

    function closeModalFunc() {
        timetableModal.style.display = 'none';
        eventDetailModal.style.display = 'none';
        selectedTimeSlot = null; // Reset the selected time slot
        clearSelectedTimeSlot(); // Clear any highlight on the time slot
    }

    function saveEvent() {
        const title = eventTitleInput.value;
        const time = selectedTimeSlot ? selectedTimeSlot.textContent : eventTimeInput.value; // Use selected time or input value
        const description = eventDescriptionInput.value;

        if (title && time) {
            const date = dailyDateDisplay.textContent;

            if (!events[date]) {
                events[date] = {};
            }
            events[date][time] = { title, description };

            // Clear inputs
            eventTitleInput.value = '';
            eventTimeInput.value = '';
            eventDescriptionInput.value = '';

            // Close the modal
            closeModalFunc();
        }
    }

    function populateTimetable() {
        timetable.innerHTML = '';
        for (let i = 0; i < 24; i++) {
            const hour = i < 10 ? `0${i}:00` : `${i}:00`;
            const timeSlot = document.createElement('div');
            timeSlot.className = 'timetable-hour';
            timeSlot.textContent = hour;
            timeSlot.addEventListener('click', () => {
                selectTimeSlot(timeSlot);
            });
            timetable.appendChild(timeSlot);
        }
    }

    function selectTimeSlot(slot) {
        if (selectedTimeSlot) {
            clearSelectedTimeSlot(); // Clear previous selection
        }
        selectedTimeSlot = slot;
        slot.classList.add('selected');
        eventTimeInput.value = slot.textContent; // Update the input field
    }

    function clearSelectedTimeSlot() {
        if (selectedTimeSlot) {
            selectedTimeSlot.classList.remove('selected');
        }
    }

    function displayEvents(date) {
        scheduleEventsContainer.innerHTML = '';
        if (events[date]) {
            Object.keys(events[date]).forEach(time => {
                const event = events[date][time];
                const eventElement = document.createElement('div');
                eventElement.className = 'event-item';
                eventElement.textContent = `${time} - ${event.title}`;
                eventElement.addEventListener('click', () => {
                    showEventDetailModal(event.title, event.description);
                });
                scheduleEventsContainer.appendChild(eventElement);
            });
        }
    }

    prevMonthBtn.addEventListener('click', () => {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        updateCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        updateCalendar();
    });

    calendar.addEventListener('click', (event) => {
        if (event.target.tagName === 'DIV' && event.target.textContent) {
            const date = `${new Date(currentYear, currentMonth, event.target.textContent).toLocaleDateString()}`;
            showTimetableModal(date);
        }
    });

    closeModal.addEventListener('click', closeModalFunc);
    closeEventDetailModal.addEventListener('click', closeModalFunc);

    saveEventBtn.addEventListener('click', saveEvent);

    // Initial calendar setup
    updateCalendar();
});
