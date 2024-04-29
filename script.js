arrProduct = []
index = 0

function buttonClick() {
  nameOfTheProduct = "50% membership";
  arrProduct.push(nameOfTheProduct)
}

function buttonClick2nd() {
  nameOfTheProduct = "Coke";
  arrProduct.push(nameOfTheProduct)
}



function addToCart() {
  var productName = "Product Name"; // Replace with the actual product name
  // var quantity = document.getElementById("quantity").value;

  var quantity = arrProduct.length
  for (var i = 0; i < arrProduct.length; i++) {
    item = arrProduct[i];


  }

  // Create a new list item
  var listItem = document.createElement("li");
  listItem.textContent = productName + " x " + quantity;

  // Append the list item to the cart
  document.getElementById("cart-items").appendChild(listItem);

  // Optionally, you can reset the quantity input field
  document.getElementById("quantity").value = 1;
}


document.addEventListener("DOMContentLoaded", function() {
  const calendarGrid = document.getElementById("calendarGrid");
  const eventForm = document.getElementById("eventForm");
  const eventInput = document.getElementById("eventInput");
  const addEventButton = document.getElementById("addEvent");
  const currentMonthElement = document.getElementById("currentMonth");
  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");

  // Initialize the calendar
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  renderCalendar(currentYear, currentMonth);

  function renderCalendar(year, month) {
    // Clear previous month's content
    calendarGrid.innerHTML = "";

    // Set the current month in the header
    currentMonthElement.textContent = new Date(year, month, 1).toLocaleString('default', { month: 'long', year: 'numeric' });

    // Get the current date
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();

    // Calculate the number of days in the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Generate calendar cells for the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const cell = document.createElement("div");
      cell.textContent = day;
      cell.className = "calendar-cell";
      cell.addEventListener("click", () => openEventForm(year, month, day));

      // Highlight the current day
      if (year === currentYear && month === currentMonth && day === currentDay) {
        cell.classList.add("current-day");
      }

      calendarGrid.appendChild(cell);

      // Retrieve and display events for the current day
      displayEvents(year, month, day, cell);
    }
  }

  function openEventForm(year, month, day) {
    eventForm.style.display = "block";

    addEventButton.onclick = function() {
      const eventText = eventInput.value;
      if (eventText) {
        // Create an event element
        const eventElement = document.createElement("div");
        eventElement.className = "event";
        eventElement.textContent = eventText;

        // Create a delete button for the event
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", () => deleteEvent(year, month, day, eventText, eventElement));
        eventElement.appendChild(deleteButton);

        // Append the event to the calendar cell
        const cell = calendarGrid.children[day - 1];
        cell.appendChild(eventElement);

        // Save the event to localStorage
        saveEvent(year, month, day, eventText);

        // Clear the input and hide the form
        eventInput.value = "";
        eventForm.style.display = "none";
      }
    };
  }

  function saveEvent(year, month, day, eventText) {
    // Retrieve existing events or initialize an empty array
    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];

    // Add the new event
    const newEvent = { year, month, day, eventText };
    existingEvents.push(newEvent);

    // Save the updated events to localStorage
    localStorage.setItem("events", JSON.stringify(existingEvents));
  }

  function displayEvents(year, month, day, cell) {
    // Retrieve events for the current day
    const events = getEventsForDay(year, month, day);

    // Display each event
    events.forEach(event => {
      const eventElement = document.createElement("div");
      eventElement.className = "event";
      eventElement.textContent = event.eventText;

      // Create a delete button for the event
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete-button";
      deleteButton.addEventListener("click", () => deleteEvent(year, month, day, event.eventText, eventElement));
      eventElement.appendChild(deleteButton);

      cell.appendChild(eventElement);
    });
  }

  function deleteEvent(year, month, day, eventText, eventElement) {
    // Retrieve existing events or initialize an empty array
    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];

    // Find and remove the selected event
    const updatedEvents = existingEvents.filter(event =>
      !(event.year === year && event.month === month && event.day === day && event.eventText === eventText)
    );

    // Save the updated events to localStorage
    localStorage.setItem("events", JSON.stringify(updatedEvents));

    // Remove the event element from the calendar cell
    eventElement.remove();
  }

  function getEventsForDay(year, month, day) {
    // Retrieve existing events or return an empty array
    const existingEvents = JSON.parse(localStorage.getItem("events")) || [];

    // Filter events for the current day
    return existingEvents.filter(event => event.year === year && event.month === month && event.day === day);
  }

  prevMonthButton.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
  });

  nextMonthButton.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
  });
});

let text = document.getElementById('text');
let leaf = document.getElementById('leaf');
let hill1 = document.getElementById('hill1');
let hill4 = document.getElementById('hill4');
let hill5 = document.getElementById('hill5');
let home = document.getElementById('home');

window.addEventListener('scroll', () => {
  let value = window.scrollY;

  text.style.marginTop = value * 2.5 + 'px';
  if (value > 300) {
    text.style.color = 'rgba(0,0,0, 0)'; 
    text.style.textShadow = '2px 2px 4px rgba(51, 51, 51, 0)'; 
   } else {        
    text.style.color = 'rgba(0,0,0, 1)';
    text.style.textShadow = '2px 2px 4px rgba(0, 0, 0, 0.7)';
  }
  leaf.style.top = value * -1.5 + 'px';
  leaf.style.left = value * 1.5 + 'px';
  hill5.style.left = value * 1.5 + 'px';
  hill4.style.left = value * -1.5 + 'px';
});
