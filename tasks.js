const form = document.getElementById('sheetDbForm');
form.addEventListener("submit", e => {
  e.preventDefault();
  fetch(form.action, {
      method : "POST",
      body: new FormData(form),
  }).then(
      response => response.json()
  ).then((html) => {
  });
  alert('success');
  form.reset();
});

//data from the OEE,Availability,Performance and Quality
const toau = {
  limit:100,
  apiKey: "jaz77Itn89EUTuq096fw_s6yynI4g8DJBQumEBgmN0ttjughI-rUVaIIwsyVlw",
  spreadsheetId: "14fsBRp1Mnes7CDHToV5yqvnforSt6kcJHD3JOUEemq0"
};
const link = new URL("https://api.sheetson.com/v2/sheets/WAPQO");

Object.keys(toau).forEach((key) => link.searchParams.append(key, encodeURIComponent(toau[key])));

fetch(link)
.then((response) => response.json())
.then((result) => {
  //console.log("Fetched Data:", result);
  console.log(result.results);
  getDataFromExcel(result.results);
})

function getDataFromExcel(data) {
  const dataToBtm = document.querySelector('.btm');

  let weekValues = {
      "24/14": 14,
      "24/15": 15,
      "24/16": 16,
      "24/17": 17
  };

  // Define arrays of background colors
  let tconBackgroundColors = ["#fee2e2", "#f5d0fe", "#ccfbf1", "#eef2ff"];
  let weekkkBackgroundColors = ["#701a75", "#1e40af", "#16a34a", "#f43f5e"];

  data.forEach((item, index) => {
    console.log(item);
      const cont = document.createElement('div');
      cont.classList.add('tcon');
      cont.style.backgroundColor = tconBackgroundColors[index % tconBackgroundColors.length];

      const coap = document.createElement('div');
      coap.classList.add('coap');
      const couo = document.createElement('div');
      couo.classList.add('couo');

      const weekValue = item.Week;
      const numericWeekValue = weekValues[weekValue];

      if (numericWeekValue !== undefined) {
          const dataToWeek = document.createElement('div');
          dataToWeek.classList.add('weekkk');
          dataToWeek.style.backgroundColor = weekkkBackgroundColors[index % weekkkBackgroundColors.length];
          dataToWeek.textContent = `${numericWeekValue}`;
          cont.appendChild(dataToWeek);

          if ('OEE' in item) {
              const oee = document.createElement('div');
              oee.classList.add('oee');
              oee.textContent = `OEE: ${item.OEE}`;
              couo.appendChild(oee);
          }

          if ('Availability' in item) {
              const availability = document.createElement('div');
              availability.classList.add('ava');
              availability.textContent = `AVA: ${item.Availability}`;
              coap.appendChild(availability);
          }

          if ('Performance' in item) {
              const per = document.createElement('div');
              per.classList.add('per');
              per.textContent = `PER: ${item.Performance}`;
              coap.appendChild(per);
          }

          if ('PL' in item) {
              const udt = document.createElement('div');
              udt.classList.add('udt');
              udt.textContent = `PL: ${item.PL}`;
              couo.appendChild(udt);
          }

          cont.appendChild(coap);
          cont.appendChild(couo);
          dataToBtm.appendChild(cont);
      }
  });
}


//data from the formdata sheet
const parameter = {
  limit:100,
  apiKey: "5NMubZFzK7dgCWXPYAMQhXwvBlwNXU8nytnPuvvY9Y1mpq6Nlgcmedd9vQY",
  spreadsheetId: "1QVtTbCz_7911dG_Xugp9a9sXGZgqW8rib_X6wPA7KlM"
};
const urll = new URL("https://api.sheetson.com/v2/sheets/from-form");

Object.keys(parameter).forEach((key) => urll.searchParams.append(key, encodeURIComponent(parameter[key])));

fetch(urll)
.then((response) => response.json())
.then((result) => {
  console.log("Fetched Data:", result.results);

  displayDataInList(result.results);
})

function displayDataInList(data) {
  // Assuming there is an HTML element with the id "dataList" where you want to display the data
  const dataListElement = document.getElementById("tasks");
  // Iterate through the data and create list items
  data.forEach((item) => {
    const lists = document.createElement('div');
    lists.classList.add('un');
    Object.entries(item).forEach(([key,value])=>{
        if (key.toLowerCase() !== "rowindex"){
          if (key.toLowerCase() === "duedate") {
            const ti = document.createElement('div');
        
            function updateTimer() {
                future = Date.parse(value);
                now = new Date();
                diff = future - now;
        
                days = Math.floor(diff / (1000 * 60 * 60 * 24));
                hours = Math.floor(diff / (1000 * 60 * 60));
                mins = Math.floor(diff / (1000 * 60));
                secs = Math.floor(diff / 1000);
        
                d = days;
                h = hours - days * 24;
                m = mins - hours * 60;
                s = secs - mins * 60;
        
                ti.innerHTML = d + ' : ' + h + ' : ' + m + ' : ' + s;
                lists.appendChild(ti);
            }
        
            updateTimer();
            setInterval(updateTimer, 1000);
        }
        
        const li = document.createElement("div");
        li.textContent = value; // You can customize this based on your data structure
        lists.appendChild(li);
      }
      
    });
    // Append the unordered list to the dataListElement
       dataListElement.appendChild(lists); 
  });

  
  //console.log(dataListElement);
}


//data from the majordowntime(tohtml) sheet
const params = {
    limit:170,
    apiKey: "KRigaOPTxu3xg6U8kWHsuEr71V8FLXrrtLmN69F0r1aMDDBJ5CVmhWmwJKN1AA",
    spreadsheetId: "14fsBRp1Mnes7CDHToV5yqvnforSt6kcJHD3JOUEemq0"
  };
  const url = new URL("https://api.sheetson.com/v2/sheets/table");
  
  Object.keys(params).forEach((key) => url.searchParams.append(key, encodeURIComponent(params[key])));
  
  fetch(url)
  .then((response) => response.json())
  .then((result) => {
    console.log("Fetched Data:", result.results);

    if (result && result.results && result.results.length > 0) {
      displayDataByWeek(result.results);
    } else {
      console.error("Error: Data array is empty");
    }
  })
  .catch((error) => console.error("Error:", error));
 

  function displayDataByWeek(data) {
    // Container to hold tables for each week
    const tablesContainer = document.getElementById("container");
    // Group data by week
    const groupedData = groupDataByWeek(data);
 //   console.log(groupedData);
    // Create a table for each week
    Object.keys(groupedData).forEach((weekNumber) => {
      const table = document.createElement("table");
      table.classList.add('rwd-table');
      
      // Extracting headers from the first row of data for the current week
      const headers = Object.keys(groupedData[weekNumber][0]);
  
      // Exclude 'week' and 'rowIndex' from headers
      const filteredHeaders = headers.filter(header => header.toLowerCase() !== 'week' && header.toLowerCase() !== 'rowindex');
  
      // Create table header row
      const contain = document.createElement('div');
      const headerRow = document.createElement("h3");
     // console.log(weekNumber);
      headerRow.textContent = "week " + weekNumber;
      filteredHeaders.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        table.appendChild(th);
      });
      contain.appendChild(headerRow);
      contain.appendChild(table);
  
      // Create table rows for the current week
      groupedData[weekNumber].forEach((rowData) => {
        const dataRow = document.createElement("tr");
        filteredHeaders.forEach((header) => {
          const td = document.createElement("td");
          td.textContent = rowData[header];
          dataRow.appendChild(td);
        });
        table.appendChild(dataRow);
      });
     //console.log(contain);
  
      // Append the table to the container
      tablesContainer.appendChild(contain);
    });
  }
  
  function groupDataByWeek(data) {
    // Assuming the data has a 'week' field
    const groupedData = {};
   //  console.log(data);
    // Iterate through each item in the data array
    data.forEach((item) => {
      // Extract the week number from the current item
      const weekNumber = item.week;
  
      // Creating an array for each week if not exists
      if (!groupedData[weekNumber]) {
        groupedData[weekNumber] = [];
      }
  
      // Adding data to the corresponding week's array
      groupedData[weekNumber].push(item);
    });
    
    return reverseObjectKeys(groupedData);
    
  }



function reverseObjectKeys(originalObject) {
  const reversedObject = {};

  Object.keys(originalObject)
    .sort((a, b) => Number(b) - Number(a))
    .forEach((key) => {
      reversedObject[key] = originalObject[key];
    });

  return reversedObject;
}
