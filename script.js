const container = document.querySelector('.container');
const seats = container.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movie = document.getElementById('movie');
let ticketPrice = +movie.value;

populateUI();

function setMovieData(movieIndex) {
  localStorage.setItem('movieIndex', movieIndex);
}

function updateSelectedCount() {
  const selectedSeats = container.querySelectorAll('.row .seat.selected');
  const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = String(selectedSeats.length);
  total.innerText = String(selectedSeats.length * ticketPrice);
}

function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats) {
    selectedSeats.forEach((seat) => seats[seat].classList.add('selected'));
  }

  movie.selectedIndex = localStorage.getItem('movieIndex');
  ticketPrice = movie.options[movie.selectedIndex].value;
  updateSelectedCount();
}

movie.addEventListener('change', (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})

container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected');
  }

  updateSelectedCount();
})