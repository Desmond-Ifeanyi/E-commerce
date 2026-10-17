
// ============PAGINATION==============

const propertiesPerPage = 5;
let propertyCurrentPage = 1;

const propertyContainer = document.getElementById("propertyContainer");

const propertyPrevious =  document.getElementById("property-previous");
   

const propertyNext =  document.getElementById("property-next");
   

const propertyPageNumbers =  document.querySelectorAll(".property-page-number");

   

function showProperties(page) {

    const properties = propertyContainer.querySelectorAll(".img-container");
        

    const totalPages =  Math.ceil(properties.length / propertiesPerPage);

       

    // Don't go below page 1
    if (page < 1) {
        page = 1;
    }

    // Don't go beyond last page
    if (page > totalPages) {
        page = totalPages;
    }

    propertyCurrentPage = page;


    // Hide/show properties
    const start =  (propertyCurrentPage - 1) * propertiesPerPage;

       
    const end =  start + propertiesPerPage;
       


    properties.forEach((property, index) => {

        if (index >= start && index < end) {
            property.classList.add("show-property");
        } else {
            property.classList.remove("show-property");
        }

    });


    updatePropertyPagination(totalPages);
}


function updatePropertyPagination(totalPages) {

    const isMobile = window.innerWidth <= 600;

    // 3 numbers on mobile, 4 on desktop
    const numbersToShow = isMobile ? 3 : 4;


    let startPage =
        Math.max(1, propertyCurrentPage - 2);


    if (startPage + numbersToShow - 1 > totalPages) {

        startPage =
            Math.max(1, totalPages - numbersToShow + 1);

    }


    propertyPageNumbers.forEach((number, index) => {

        if (index >= numbersToShow) {

            number.style.display = "none";
            return;

        }


        const pageValue =
            startPage + index;


        if (pageValue <= totalPages) {

            number.textContent = pageValue;
            number.style.display = "flex";

        } else {

            number.style.display = "none";

        }


        // Active page
        if (pageValue === propertyCurrentPage) {

            number.classList.add("active");

        } else {

            number.classList.remove("active");

        }

    });


    // Previous
    if (propertyCurrentPage === 1) {

        propertyPrevious.style.opacity = "0.5";
        propertyPrevious.style.pointerEvents = "none";

    } else {

        propertyPrevious.style.opacity = "1";
        propertyPrevious.style.pointerEvents = "auto";

    }


    // Next
    if (
        propertyCurrentPage === totalPages ||
        totalPages === 0
    ) {

        propertyNext.style.opacity = "0.5";
        propertyNext.style.pointerEvents = "none";

    } else {

        propertyNext.style.opacity = "1";
        propertyNext.style.pointerEvents = "auto";

    }

}


// Click page number
propertyPageNumbers.forEach((number) => {

    number.addEventListener("click", () => {

        const page =
            Number(number.textContent);

        showProperties(page);

    });

});


// Next
propertyNext.addEventListener("click", () => {

    showProperties(propertyCurrentPage + 1);

});


// Previous
propertyPrevious.addEventListener("click", () => {

    showProperties(propertyCurrentPage - 1);

});


// Start at page 1
showProperties(1);


// Update when screen changes
window.addEventListener("resize", () => {

    const properties =
        propertyContainer.querySelectorAll(".img-container");

    const totalPages =
        Math.ceil(properties.length / propertiesPerPage);

    updatePropertyPagination(totalPages);

});



// ============================

