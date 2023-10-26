//get the array/object data from api 
const loadPhoneData = async (searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data.data);
    // console.log(dataLimit,'start');
    ProcessData(data.data,dataLimit);

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
    console.log(phoneData.length);
    

    //slice data    
    console.log(phoneData.length);
    // if (phoneData.length && dataLimit> 10)
    console.log(dataLimit, 'dataLimit');
    if (phoneData.length && dataLimit > 10) {

        // console.log(dataLimit);
        const sliceData = phoneData.slice(0, 10);
        // console.log(sliceData.length);
        showData(sliceData);
        showAllButton(true);
        console.log('sliced')
    }
    else {
        showData(phoneData);
        showAllButton(false);
        console.log('not sliced');
    }

}

//showAll button
const showButton = document.getElementById('showAll');
const showAllButton = (term) => {
    
    if (term === true) {
        showButton.classList.remove('d-none');
        // console.log(term)
    }
    else {
        // console.log(term)
        showButton.classList.add('d-none');
    }
}

const showAll = () => {
    searchPhone();
   
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
        // console.log('true');
    }
    else {
        spinner.classList.add('d-none');
        // console.log('false');
    }
}

loadPhoneData('iphone');