let userData = users;

const totalElement = document.querySelector(".page-header h3");
const userList = document.querySelector(".contact-list");
const pagination = document.querySelector(".pagination");
const numberOfUsersPerPage = 10;
const numberOfPages = Math.ceil(userData.length/numberOfUsersPerPage);

//Set the total number of users in html
totalElement.textContent += userData.length;

//Set page numbers in html
//Class of first element set to active
for(var i=0; i<numberOfPages; i++) {
    if(i === 0)
        pagination.innerHTML += `<li><a href="#" class="active" onClick="changePage(`+ (i+1) +`)">`+ (i+1) +`</a></li>`;
    else
        pagination.innerHTML += `<li><a href="#" onClick="changePage(`+ (i+1) +`)">`+ (i+1) +`</a></li>`;
}

/**
 * Onclick function of page numbers.
 * This will make the clicked page number active and render the users of particular page number.
 * @param {*} pageNumber
 */
changePage = (pageNumber) => {
    for(var i=0; i<numberOfPages; i++) {
        const childNode = pagination.childNodes[i+1];
        
        if(pageNumber === (i+1))
            childNode.querySelector("a").setAttribute("class", "active");
        else 
            childNode.querySelector("a").setAttribute("class", "");
    }

    renderPage(pageNumber);
}

/**
 * Set the html of with the contact list of the selected page number
 * @param {*} pageNumber 
 */
renderPage = (pageNumber) => {
    const firstIndex = numberOfUsersPerPage*(pageNumber-1);
    const lastIndex = numberOfUsersPerPage*pageNumber;
    const filteredUsers = userData.slice(firstIndex, lastIndex);

    userList.innerHTML = '';

    filteredUsers.map(u => {
        userList.innerHTML += `<li class="contact-item cf">
            <div class="contact-details">
                <img class="avatar" src="`+ u.image +`">
                <h3>`+ u.name +`</h3>
                <span class="email">`+ u.email +`</span>
            </div>
            <div class="joined-details">
                <span class="date">Joined `+ u.joined +`</span>
            </div>
        </li>`
    });

}

//Set the contact list of first page at the first render
renderPage(1);

