const { DateTime, Interval } = luxon;

// Setup flatpickr date picker
flatpickr("#birthdate", {
    dateFormat: "Y-m-d",
    maxDate: "today",
    altInput: true,
    altFormat: "F j, Y",
});

const form = document.getElementById("ageForm");
const resultDiv = document.getElementById("result");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const birthdateStr = document.getElementById("birthdate").value;
    if (!birthdateStr) {
        resultDiv.textContent = "⚠️ Please select a valid birthdate.";
        return;
    }

    const birthdate = DateTime.fromISO(birthdateStr);
    const now = DateTime.now();

    if (!birthdate.isValid || birthdate > now) {
        resultDiv.textContent = "⚠️ Please enter a valid date in the past.";
        return;
    }

    const diff = now.diff(birthdate, ["years", "months", "days"]).toObject();

    resultDiv.textContent = `You are ${Math.floor(
        diff.years
    )} years, ${Math.floor(diff.months)} months, and ${Math.floor(
        diff.days
    )} days old.`;
});
