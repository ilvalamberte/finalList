
const baseLink2 = "http://petlatkea.dk/2019/hogwarts/families.json";


function getJSON() {
    //console.log("getJSON");
    fetch(baseLink2)
      .then(pro => pro.json())
      .then(makeObject);
    // NOTE: Maybe also call sortByFirst the first time ... Investigate!
  }


  
  