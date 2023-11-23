//target to store tasks
targets = [
            {
                task:'importing doserode and Clutch',
                department:'Technique',
                dueDate:'05/11/2023'
            },
            {
                task:'importing Cleaning machine spareparts',
                department:'technique',
                dueDate:'06/11/2023'
            }
]
let listed = []
//container for storing the tasks
const tasks = document.querySelector('.tasks');
let k=1

for (let i=0; i<=targets.length-1;i++){
    let values = targets[i];
    let subContainer = document.createElement('div');
    subContainer.classList = `liContainer${k}`
    k++
    let ul = document.createElement('ul');
    tasks.appendChild(subContainer);
    subContainer.appendChild(ul);
    for (let val in values){
        let set = values[val];
        let li = document.createElement('li');
        li.innerHTML = set;
        ul.appendChild(li);
    }
}
console.log(tasks);


const form = document.getElementById('sheetDbForm');
form.addEventListener("submit", e => {
  e.preventDefault();
  fetch(form.action, {
      method : "POST",
      body: new FormData(form),
  }).then(
      response => response.json()
  ).then((html) => {
   //you can put any JS code here
  });
  alert('success');
  form.reset();
});


const params = {
    limit:100,
    apiKey: "5NMubZFzK7dgCWXPYAMQhXwvBlwNXU8nytnPuvvY9Y1mpq6Nlgcmedd9vQY",
    spreadsheetId: "14fsBRp1Mnes7CDHToV5yqvnforSt6kcJHD3JOUEemq0"
  };
  const url = new URL("https://api.sheetson.com/v2/sheets/table");
  
  Object.keys(params).forEach((key) => url.searchParams.append(key, encodeURIComponent(params[key])));
  
  fetch(url)
  .then((response) => response.json())
  .then((result) => {
    console.log("Fetched Data:", result);

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
  
    // Create a table for each week
    Object.keys(groupedData).forEach((weekNumber) => {
      const table = document.createElement("table");
      table.classList.add('rwd-table');
  
      // Extracting headers from the first row of data for the current week
      const headers = Object.keys(groupedData[weekNumber][0]);
  
      // Exclude 'week' and 'rowIndex' from headers
      const filteredHeaders = headers.filter(header => header.toLowerCase() !== 'week' && header.toLowerCase() !== 'rowindex');
  
      // Create table header row
      //const headerRow = document.createElement("tr");
      filteredHeaders.forEach(header => {
        const th = document.createElement("th");
        th.textContent = header;
        table.appendChild(th);
      });
      //table.appendChild(headerRow);
  
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
      console.log(table);
  
      // Append the table to the container
      tablesContainer.appendChild(table);
    });
  }
  
  function groupDataByWeek(data) {
    // Assuming the data has a 'week' field
    const groupedData = {};
  
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
  
    return groupedData;
  }