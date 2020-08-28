const seatsContainer = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const seatCount = document.getElementById('count');
let totalCost = document.getElementById('total');
const movieSelect = document.getElementById('movie');
let ticketPrice = parseInt(movieSelect.value);

function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }
    
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    movieSelect.selectedIndex = selectedMovieIndex;
}

function saveMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

function updateUI() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    
    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
    
    seatCount.innerText = selectedSeatsCount;
    totalCost.innerText = selectedSeatsCount * ticketPrice;
    totalCost.innerText = localStorage.getItem('selectedMoviePrice') * seatsIndex.length;
    
}

movieSelect.addEventListener('change', e => {
    ticketPrice = parseInt(e.target.value);
    saveMovieData(e.target.selectedIndex, e.target.value);
    updateUI();
});

seatsContainer.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateUI();
    }
});

// on load:
populateUI();
updateUI();