
// EVENTS ARRAY
let events = [
    {
        title: "Cake Picnic",
        date: new Date("2025-02-01"),
        location: "Nairobi",
        attendees: new Set(["Alice", "Bob"])
    },
    {
        title: "School Reunion",
        date: new Date("2025-02-05"),
        location: "Westlands",
        attendees: new Set(["James"])
    },
    {
        title: "Annual Thanksgiving",
        date: new Date("2025-02-10"),
        location: "Kilimani",
        attendees: new Set(["Mary", "John"])
    }
];

// WeakMap (for organizers)
let organizers = new WeakMap();
organizers.set(events[0], "Manager A");
organizers.set(events[1], "Sarah");
organizers.set(events[2], "Pastor Mike");


// Display events in table form
function displayEvents(eventList = events) {
    const tableBody = document.querySelector("#eventsTable tbody");
    tableBody.innerHTML = "";

    eventList.forEach(event => {
        const { title, date, location, attendees } = event;

        const row = `
            <tr>
                <td>${title}</td>
                <td>${date.toDateString()}</td>
                <td>${location}</td>
                <td>${[...attendees].join(", ")}</td>
                <td>
                    <button onclick="deleteEvent('${title}')">Delete</button>
                </td>
            </tr>
        `;

        tableBody.innerHTML += row;
    });
}

displayEvents();

// SHOW UPCOMING 7-DAY EVENTS
function showUpcomingEvents() {
    let now = new Date();
    let next7 = new Date();
    next7.setDate(now.getDate() + 7);

    let upcoming = events.filter(event => {
        return event.date >= now && event.date <= next7;
    });

    displayEvents(upcoming);
}


// ADD ATTENDEE
function addAttendee() {
    let eventTitle = document.getElementById("eventTitleInput").value.trim();
    let attendeeName = document.getElementById("attendeeNameInput").value.trim();

    if (!eventTitle || !attendeeName) {
        alert("Please fill both inputs.");
        return;
    }

    let foundEvent = events.find(e => e.title === eventTitle);

    if (foundEvent) {
        foundEvent.attendees.add(attendeeName);
        alert("Attendee added!");
        displayEvents(events);
    } else {
        alert("Event not found!");
    }
}


// Event 1 properties
function showFirstEventProperties() {
    let first = events[0];

    console.log("Object.keys:", Object.keys(first));
    console.log("Object.values:", Object.values(first));
    console.log("Object.entries:", Object.entries(first));

    alert("Properties logged to console.");
}


// LOG EVENTS (forEach)
function logAllEvents() {
    events.forEach(event => {
        console.log("Event:", event.title, "| Date:", event.date);
    });

    alert("Events logged to console.");
}


// DELETE EVENT (Bonus)
function deleteEvent(title) {
    const index = events.findIndex(e => e.title === title);

    if (index !== -1) {
        events.splice(index, 1);
        displayEvents(events);
        alert("Event deleted!");
    } else {
        alert("Event not found.");
    }
}


// MOST ATTENDEES (Bonus)
function showMostAttendees() {
    if (events.length === 0) {
        document.getElementById("mostAttendeesDisplay").innerText =
            "No events available.";
        return;
    }

    let result = events.reduce((maxEvent, currentEvent) => {
        return currentEvent.attendees.size > maxEvent.attendees.size
            ? currentEvent
            : maxEvent;
    });

    document.getElementById("mostAttendeesDisplay").innerText =
        `Event with most attendees: ${result.title} (${result.attendees.size} attendees)`;
}