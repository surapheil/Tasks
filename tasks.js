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
const container = document.querySelector('.container');
let k=1

for (let i=0; i<=targets.length-1;i++){
    let values = targets[i];
    let subContainer = document.createElement('div');
    subContainer.classList = `liContainer${k}`
    k++
    let ul = document.createElement('ul');
    container.appendChild(subContainer);
    subContainer.appendChild(ul);
    for (let val in values){
        let set = values[val];
        let li = document.createElement('li');
        li.innerHTML = set;
        ul.appendChild(li);
    }
}
console.log(container);