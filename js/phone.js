//get the array/object data from api 
const loadPhoneData = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    ProcessData(data.data, dataLimit);

}

//process array/object 
const getContainer = document.getElementById('card-container')

const ProcessData = (phoneData, dataLimit) => {

    //no phone found
    const noPhone = document.getElementById('noPhoneNotification');
    if (phoneData.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }

    //slice data    
    if (phoneData.length && dataLimit > 10) {
        const sliceData = phoneData.slice(0, 10);
        showData(sliceData);
        showAllButton(true);
    }
    else {
        showData(phoneData);
        showAllButton(false);
    }

}

//showAll button
const showButton = document.getElementById('showAll');
const showAllButton = (term) => {

    if (term === true) {
        showButton.classList.remove('d-none');
    }
    else {
        showButton.classList.add('d-none');
    }
}
//when we will click the show all button then this function will pass value 0 the the if condition will not execute the else condition will show the all phone data.
const showAll = () => {
    searchPhone();

}
//use slice array/object  to show the data
const showData = (phoneData) => {
    getContainer.innerHTML = ' '; //to clear previous data after search
    phoneData.forEach(phone => {
        const addDiv = document.createElement('div');
        addDiv.innerHTML = `
            <div class="col">
                <div class="card h-100 p-3">
                    <img src="${phone.image}" class="card-img-top img-fluid " alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <!-- Button trigger modal -->
                    <button onclick="phoneDataLoadById('${phone.slug}')" type="button" class="btn btn-primary w-25" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Details
                    </button>
                </div>
            </div>
        `;
        getContainer.appendChild(addDiv);

    });
    toggleSpinner(false);//loading end here.
}

//get the search  phone
const searchPhone = (dataLimit) => {
    toggleSpinner(true);//loading start form here
    const phoneName = document.getElementById('inputField').value;
    loadPhoneData(phoneName, dataLimit);
    console.log(dataLimit);

}

//button search
document.getElementById('searchButton').addEventListener('click', function () {
    searchPhone(11);
});
//enter key search
document.getElementById('inputField').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        searchPhone(11);
    }
});

//data loading spinner
const toggleSpinner = (condition) => {
    const spinner = document.getElementById('toggleSpinner');
    if (condition === true) {
        spinner.classList.remove('d-none');
    }
    else {
        spinner.classList.add('d-none');
    }
}
const phoneDataLoadById = async (id) => {
    url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    showModal(data.data)
}

const showModal = (modalData) => {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    modalTitle.innerText = modalData.name;
    modalBody.innerHTML = `
    <p>Release Date:${modalData.releaseDate}</p>
    <p>Storage:     ${modalData.mainFeatures.storage}</p>
    <p>Memory:      ${modalData.mainFeatures.memory}</p>
    <p>Sensor:      ${modalData.mainFeatures.sensors}</p>
    `
    console.log(modalData);
}
loadPhoneData('iphone');
