const seatsContainer = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const seatCount = document.getElementById('count');
const totalCost = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = parseInt(movieSelect.value);

function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    seatCount.innerText = selectedSeatsCount;
    totalCost.innerText = selectedSeatsCount * ticketPrice;
}

movieSelect.addEventListener('change', e => ticketPrice = parseInt(e.target.value));

seatsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});