const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(` https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    const phones = data.data;
    // console.log(phones)
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) => {
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container');

    // clear search
    phoneContainer.textContent = '';

 
    // console.log('is Show All', isShowAll)


    // show all button
    const showAllButton = document.getElementById('show-all-container');
    if (phones.length > 10 && !isShowAll) {
        showAllButton.classList.remove('hidden');
    }
    else {
        showAllButton.classList.add('hidden');
    }





    // console.log(phones.length)

    // display only first 10 phones

    if(!isShowAll){
        phones = phones.slice(0, 10)

    }




    phones.forEach(phone => {
        // console.log(phone);

        // 2: Create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-base-100 p-4 shadow-xl`;
        // 3: set inner html
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}" alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title">${phone.phone_name
            }</h2>
          <p>If a dog chews shoes whose shoes does he choose?</p>
          <div class="card-actions justify-center">
            <button onclick= "handleShowDetail('${phone.slug}')" class="btn btn-secondary">Show Details</button>
          </div>
        </div>
        `
        // 4: append child
        phoneContainer.appendChild(phoneCard);
    });

        
    // stop loading spinner 
toggleLoadingSpinner(false);

}

const handleShowDetail = async(id) =>{
    // console.log('clicked details button', id);
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showPhoneDetails(phone);
}


const showPhoneDetails = (phone) =>{
    console.log(phone);
    const phoneName = document.getElementById('show-detail-phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML  = `
        <img src="${phone.image}" alt=""</img>
        <p><span class="font-bold">Storage : </span>${phone?.mainFeatures?.storage}</p>
        <p><span class="font-bold">GPS : </span> ${phone.others?.GPS || 'no GPS available'}</p>

    `


    // show modal 
    show_details_modal.showModal();
}






// handle search button
const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);

}

// loading spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
   if(isLoading) {
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () =>{
    handleSearch(true);
}




loadPhone();