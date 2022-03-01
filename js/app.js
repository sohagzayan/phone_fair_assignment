/*======
all element selecting 
====================================*/
const search_section = document.querySelector(".search_section");
const input = document.querySelector(".search_section input");
const form = document.querySelector("form");
const body = document.querySelector("body");
const row = document.querySelector(".row");
const showMore = document.querySelector(".showMore");
const modal_Overlay = document.querySelector(".modal_Overlay");
const error = document.querySelector('.error')
console.log(input);

/*=========
all function
=============================*/

const fetchigData = (searchValue) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchValue}`;
  fetch(url)
    .then((response) => response.json())
    .then((details) => {
        if( details.data.length <= 0){
            error.classList.add('active')
           error.innerHTML=` <span>( ${searchValue} )</span> ?  this keyword not find any data` 
        }else{
            displayData(details.data)
            error.innerHTML = ''
            error.classList.remove('active')
        }
    } );
};

const displayData = (data) => {
  showMore.addEventListener("click", () => {
    generateHtml(data);
  });
  if (data.length > 20) {
    showMore.style.display = "block";
    generateHtml(data.slice(0, 20));
    return data.slice(0, 20);
  } else {
    return generateHtml(data);
  }
};

const showAllData = () => {
  generateHtml(data);
};

const generateHtml = (data) => {
  const row = document.querySelector(".row");
  row.innerHTML = "";
  data.forEach((item) => {
    const button = document.createElement("button");
    button.addEventListener("click", getDetails);
    const card = document.createElement("div");
    const div = document.createElement("div");
    div.style.position = "relative";

    card.classList.add("card");
    button.classList.add("btn", "btn_details");
    button.innerText = "Details";
    div.classList.add("col-lg-4", "col-md-6", "col-sm-12");
    card.innerHTML = `
                    <img src="${item.image}" alt="" />
                    <div class="card_details">
                      <h4>${item.phone_name}</h4>
                    </div>
        `;
    div.appendChild(card);
    card.appendChild(button);

    function getDetails() {
      // showDwtailsOnModal()
      getDetailsDataFtching(item.slug);
    }

    row.appendChild(div);
    console.log(item);
  });
};

const getShopeData = (e) => {
    e.preventDefault();
    showMore.style.display = 'none'
    row.innerHTML = ''
  const searchValue = input.value;
  if(searchValue){
    input.value = "";
    fetchigData(searchValue);
    console.log(searchValue);
    error.classList.remove('active')
    error.innerHTML = ''
  }else{
      error.classList.add('active')
      error.innerHTML = 'please type your special keyword first'
  }
};

const getDetailsDataFtching = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showDwtailsOnModal(data.data));
};

function showDwtailsOnModal(data) {
  const { brand, image, mainFeatures, name, others, releaseDate } = data;
  console.log(data);

  modal_Overlay.classList.add("active");
  const modal_wrapper = document.createElement("div");
  modal_wrapper.classList.add("modal_cusom");
  modal_wrapper.innerHTML = `
  <div class="modal_container ">
        <div class=" modal_wrapper d-flex align-items-center">
          <div class="phone_image p-5">
            <img src="${image ? image : 'Not Found'}" alt="image" />
            <div class="phone_core_details">
              <h5>
                <strong>Name :</strong>
                <small>${name ? name : 'Not Found'}</small>
              </h5>
              <h5 >
                <strong>Release Date :</strong>
                <small>${releaseDate ? releaseDate : 'Not Found'}</small>
              </h5>
             
            </div>
          </div>
          <div class="mainFuture p-2">
            <h5>
              <strong>chipSet</strong>
              <small>${mainFeatures.chipSet}</small>
            </h5>
            <h5>
              <strong>DisplaySize</strong>
              <small>${mainFeatures.DisplaySize}</small>
            </h5>
            <h5>
              <strong>Memory</strong>
              <small>${mainFeatures.memory}</small>
            </h5>
            <h5>
              <strong>Strorage</strong>
              <small>${mainFeatures.storage}</small>
            </h5>
            <div className="othersFuture">
              <h5>
                <strong>Bluetooth</strong>
                <small>${others.Bluetooth}</small>
              </h5>
              <h5>
                <strong>GPS</strong>
                <small>${others.GPS ? others.GPS : "not found gps"}</small>
              </h5>
              <h5>
                <strong>NFC</strong>
                <small>${others.NFC ? others.NFC : "not found nfc"}</small>
              </h5>
              <h5>
                <strong>Radio</strong>
                <small>${others.Radio ? others.Radio : 'not found radio'}</small>
              </h5>
              <h5>
                <strong>USB</strong>
                <small>${others.USB ? others.USB : "not found usb"}</small>
              </h5>
              <h5>
                <strong>WLAN</strong>
                <small>${others.WLAN ? others.WLAN : 'not found wlan'}</small>
              </h5>
              <h5>
              <strong>Sensors :</strong>
              <small > ${mainFeatures.sensors ? mainFeatures.sensors : 'not found sensors'}</small>
            </h5>
            </div>
            
          </div>
        </div>
        <i onclick="closeModal()" class="close_icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </i>
      </div>
    `;
  modal_Overlay.appendChild(modal_wrapper);
  // body.appendChild(modal_Overlay)
}

function closeModal() {
  modal_Overlay.classList.remove("active");
}

/*=========
all EventListener
=============================*/

input.addEventListener("focus", () => {
  search_section.classList.add("active_border");
});
input.addEventListener("blur", () => {
  search_section.classList.remove("active_border");
});

form.addEventListener("submit", getShopeData);
