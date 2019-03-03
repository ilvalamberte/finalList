"use strict";
const baseLink = "https://petlatkea.dk/2019/hogwarts/students.json";

const baseLink2 = "http://petlatkea.dk/2019/hogwarts/families.json";


const studentObject = {
  fullname: "-student name-",
  firstname: "-student first name-",
  lastname: "-student last name-",
  image: "-student image-",
  house: "-student house-",
  blood: "-bloodtype"
};


const myObject = {
  fullname: "Ilva Lamberte",
  firstname: "Ilva",
  lastname: "Lamberte",
  image: "....",
  house: "Slytherin",
  blood: "-bloodtype"

}


const BloodObject = {

  bloodtype: "-bloodtype-"

}

//let halfArray = [];
//let pureArray = [];

let bloodFamilies = [];


let squadInq = [];

let arrayOfStudents = [];
let filteredList = [];
let currentFilter;
let filter;
let currentSort;
let expelledArray = [];

window.addEventListener("DOMContentLoaded", init);

function init() {
  document.querySelector("#Gryffindor").addEventListener("click", filterList);
  document.querySelector("#Hufflepuff").addEventListener("click", filterList);
  document.querySelector("#Ravenclaw").addEventListener("click", filterList);
  document.querySelector("#Slytherin").addEventListener("click", filterList);
  document.querySelector("#btnAll").addEventListener("click", filterList);
  document.querySelector("#firstname").addEventListener("click", sortByFName);
  document.querySelector("#lastname").addEventListener("click", sortByLName);
  document.querySelector("#house").addEventListener("click", sortByHouse);
  // TODO: Load JSON, create clones, build list, add event listeners, show modal, find images, and other stuff ...
  
  getJSON2();
}

function getJSON() {
  //console.log("getJSON");
  fetch(baseLink)
    .then(pro => pro.json())
    .then(makeObject);
  // NOTE: Maybe also call sortByFirst the first time ... Investigate!
}


function getJSON2(families) {
  fetch(baseLink2)
    .then(obj => obj.json())
    .then(makeBloodObject);

}









function makeBloodObject(names) {
//assign the parameter to the array
//putting elements from fetched json to global array
  bloodFamilies = names;

  getJSON();

}





function makeObject(studentList) {

  console.log(studentList);
  arrayOfStudents.push(myObject);
  studentList.forEach(stuData => {
    const studentObjectNew = Object.create(studentObject);
    const injectStudent = myObject.fullname;
  console.log(injectStudent);
    const firstSpace = stuData.fullname.indexOf(" ");
    const lastSpace = stuData.fullname.lastIndexOf(" ");
    //console.log(studentObject);

    studentObjectNew.fullname = stuData.fullname;
    studentObjectNew.firstname = stuData.fullname.slice(0, firstSpace);
    studentObjectNew.lastname = stuData.fullname.slice(lastSpace + 1);
    studentObjectNew.house = stuData.house;
    studentObjectNew.image =
      "images/" +
      studentObjectNew.lastname.toLowerCase() +
      "_" +
      stuData.fullname.substring(0, 1).toLowerCase() +
      ".png";


if (bloodFamilies.half.includes(studentObjectNew.lastname)) {
  studentObjectNew.blood = "half";
} else if (bloodFamilies.pure.includes(studentObjectNew.lastname)) {
  studentObjectNew.blood = "pure";
} else { 
  studentObjectNew.blood = "muggle";
  
}

//the string is what is going to be displayed


    //console.log(newStuObject.image);
    arrayOfStudents.push(studentObjectNew);
    
    filteredList = arrayOfStudents;
    //console.log(arrayOfStudents);
  });
  displayList(arrayOfStudents);

  console.log(arrayOfStudents);
}
function filterList() {
  //console.log(this.getAttribute("id"));
  //filteredList = arrayOfStudents;

  currentFilter = this.getAttribute("id");
  if (currentFilter === "btnAll") {
    displayList(arrayOfStudents);
    //filteredList = arrayOfStudents;
  } else {
    function filterByHouse(student) {
      return student.house === currentFilter;
    }

    filteredList = arrayOfStudents.filter(filterByHouse);
    //filtered list is an array the same as array of
    displayList(filteredList);
    console.log(filteredList);
  }
}

// // function sortList() {
// //   currentSort = this.getAttribute("id");
// //   console.log(currentSort);
// //   let sortedList = arrayOfStudents;

//   if (currentSort === currentSort) {
//     function sortEach(a, b) {
//       if (a.currentSort < b.currentSort) {
//         return -1;
//       } else {
//         return 1;
//       }
//     }
// //     sortedList = arrayOfStudents.sort(sortEach);
// //     //displayList(sortedList);
// //     console.log(sortedList);
// //   }
// // }

function sortByFName() {
  function sort(a, b) {
    //console.log(arrayOfStudents);
    if (a.firstname < b.firstname) {
      return -1;
    } else {
      return 1;
    }
  }
  filteredList.sort(sort);
  document.querySelector("#wrapperMain").innerHTML = "";
  displayList(filteredList);
  console.log(filteredList);
}

function sortByLName() {
  function sort(a, b) {
    //console.log(arrayOfStudents);
    if (a.lastname < b.lastname) {
      return -1;
    } else {
      return 1;
    }
  }

  document.querySelector("#wrapperMain").innerHTML = "";
  filteredList.sort(sort);
  displayList(filteredList);
  console.log(filteredList);
}

function sortByHouse() {
  //document.querySelector("#wrapperMain").innerHTML = "";
  function sort(a, b) {
    //console.log(arrayOfStudents);
    if (a.house < b.house) {
      return -1;
    } else {
      return 1;
    }
  }
  document.querySelector("#wrapperMain").innerHTML = "";
  filteredList.sort(sort);
  displayList(filteredList);
  console.log(filteredList);
}


function displayList(arrayOfStudents) {
  //console.log(arrayOfStudents);
  document.querySelector("#wrapperMain").innerHTML = "";
  arrayOfStudents.forEach(student => {
    //console.log(student.firstname);
    const template = document.querySelector("#studentFirstNTemplate").content;
    const clone = template.cloneNode(true);

    clone
      .querySelector(".details-button")
      .addEventListener("click", () => showOneStudent(student));

    clone.querySelector(".firstN").textContent = student.firstname;
    clone.querySelector(".surname1").textContent = student.lastname;
    clone.querySelector(".house").textContent = student.house;



    clone.querySelector("li").id = student.firstname;
    //the id attribute is going to be the name
    clone
      .querySelector(".expled-button")
      .addEventListener("click", () => expel(student));

    document.querySelector("#wrapperMain").appendChild(clone);
  });
}

function showOneStudent(student) {
  //console.log(student.firstname);
  //console.log("working");

  const modal = document.querySelector(".modal");

  const modalImg = document.getElementById('imgs');

  if (student.firstname === "Ilva") {
    modalImg.src = "/Users/ilva/Desktop/done_List/extraimgs/imgme.jpg"
    
  } else {
    modalImg.src = student.image;
    
  }

  //modal.querySelector(".modal-content").id= student.fullname;
  //modal.getElementById("imgs").src = student.image;
  modal.querySelector(".name").textContent = student.firstname;
  modal.querySelector(".surname").textContent = student.lastname;
  modal.querySelector(".bloodt").textContent = student.blood;

  if (student.house === "Gryffindor") {

document.querySelector(".modal1").style.background = "red";   

  } else if(student.house === "Slytherin") {

    document.querySelector(".modal1").style.background = "green";
    
  } else if(student.house === "Hufflepuff") {
    document.querySelector(".modal1").style.background = "yellow";

  } else if (student.house === "Ravenclaw") {
document.querySelector(".modal1").style.background = "blue";
  }


  modal.classList.remove("hide");
  modal.addEventListener("click", () => modal.classList.add("hide"));
}

// TODO: Create scaffolding functions for the rest!

function expel(student) {
  //console.log(student.firstname);
  
  if (student.firstname === "Ilva") {
    let modalExpelled = document.querySelector(".modal3");
    modalExpelled.style.display = "block";
    let closeModal = document.querySelector(".closeButton");

    closeModal.addEventListener("click", function() {
      console.log("working");
      modalExpelled.style.display - "none";
    })
    
  } else {
    

  let onestudent = document.querySelector("#" + student.firstname);
  //onestudent.style.display = "none";




  onestudent.querySelector(".firstN").textContent = student.firstname;
  onestudent.querySelector(".surname1").textContent = student.lastname;
  onestudent.querySelector(".house").textContent = student.house;




  expelledArray.push(onestudent);
console.log(expelledArray.push(onestudent));



document.getElementById("insertcount").innerHTML = expelledArray.length;
 

  //document.querySelector("#expeld").appendChild(onestudent);
}  }
