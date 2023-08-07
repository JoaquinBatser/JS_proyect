const accBtn = document.getElementById('accBtn');
const closeBtn = document.querySelector('.close-btn');

accBtn.addEventListener('click', function() {
    document.querySelector('.form-div').style.display = 'flex';
})
closeBtn.addEventListener('click', function() {
    document.querySelector('.form-div').style.display = 'none';
})