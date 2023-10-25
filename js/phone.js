//get the array/object data from api 
const loadPhoneData = async (searchText) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);
    ProcessData(data.data);

}

//process array/object 
const getContainer = document.getElementById('card-container')

const ProcessData = (phoneData) => {

    //no phone found
    const noPhone = document.getElementById('noPhoneNotification');
    if (phoneData.length === 0) {
        noPhone.classList.remove('d-none')
    }
    else {
        noPhone.classList.add('d-none')
    }
    console.log(phoneData.length);

    //slice data 
    if (phoneData.length > 12) {
        const sliceData = phoneData.slice(0, 12);
        console.log(sliceData.length);
        showData(sliceData);
        showAllButton(true);
    }
    else {
        showData(phoneData);
        showAllButton(false);
    }

}

//showAll button
const showAllButton = (term) => {
    const showButton = document.getElementById('showAll');
    if (term === true)
    {
        showButton.classList.remove('d-none');
    }
    else {
        showButton.classList.add('d-none');
    }
}

const showAll=()=>{

}
//use slice array/object  to show the data
const showData = (phoneData) => {
    getContainer.innerHTML = ' '; //to clear previous data after search
    phoneData.forEach(phone => {
        const addDiv = document.createElement('div');
        // addDiv.classList.add('')
        addDiv.innerHTML = `
            <div class="col">
                <div class="card h-100 p-3">
                    <img src="${phone.image}" class="card-img-top img-fluid " alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${phone.phone_name}</h5>
                        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                    </div>
                    <button class="btn btn-primary w-25">Details</button>
                </div>
            </div>
        `;
        getContainer.appendChild(addDiv);
    });
    toggleSpinner(false);//loading end here.
}

//get the search  phone
const searchPhone = () => {
    toggleSpinner(true);//loading start form here
    const phoneName = document.getElementById('inputField').value;
    loadPhoneData(phoneName);
}

//button search
document.getElementById('searchButton').addEventListener('click', function () {
    searchPhone();
});
//enter key search
document.getElementById('inputField').addEventListener('keyup', function (event) {
    if(event.key==='Enter')
    {
        searchPhone();
    }
});

//data loading spinner
const toggleSpinner = (condition) => {
    const spinner = document.getElementById('toggleSpinner');
    if (condition === true) {
        spinner.classList.remove('d-none');
        // console.log('true');
    }
    else {
        spinner.classList.add('d-none');
        // console.log('false');
    }
}

loadPhoneData('iphone');