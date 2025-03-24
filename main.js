const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4"); 
const btn5 = document.getElementById("btn5");  
const sortOrder = document.getElementById("sortOrder");

const tbl = document.getElementById("tblNumbers");

let numbersArr = [];

function insertNumber() {
    const txtNumber = document.getElementById("txtNum").value;
    let regex = /^[0-9]+$/;

    if (txtNumber.match(regex)) {
        numbersArr.push(parseInt(txtNumber));
        document.getElementById("txtNum").value = "";
    } else {
        alert("Please input a positive number.");
        document.getElementById("txtNum").value = "";
        return;
    }

    iterateNumbers();
}

function deleteNumber(i) {
    numbersArr.splice(i, 1);
    iterateNumbers();
}

function editNumber(i) {
    const newNum = prompt("Enter new number:", numbersArr[i]);
    let regex = /^[0-9]+$/;

    if (newNum && newNum.match(regex)) {
        numbersArr[i] = parseInt(newNum);
        iterateNumbers();
    } else {
        alert("Invalid input!");
    }
}

function iterateNumbers() {

    while (tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    if (numbersArr.length > 0) {
        let total = 0;

        numbersArr.forEach((num, i) => {
            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td");
            const td4 = document.createElement("td");
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.textContent = num;
            td2.textContent = num % 2 === 0 ? "EVEN" : "ODD";
            td2.style.color = num % 2 === 0 ? "green" : "blue";

            btnDelete.textContent = "Remove";
            btnDelete.onclick = () => deleteNumber(i);

            btnEdit.textContent = "Edit";
            btnEdit.onclick = () => editNumber(i);

            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);
            tbl.appendChild(tr);

            total += num;
        });

      
        displayTotal(total);
        document.getElementById("btn4").style.display = "inline";
        console.log(`Total: ${total}`);
    } else {
       
        const tr = document.createElement("tr");
        const td = document.createElement("td");
        td.setAttribute("colspan", "4");
        td.style.color = "red";
        td.textContent = "No numbers available.";
        tr.appendChild(td);
        tbl.appendChild(tr);

        document.getElementById("btn4").style.display = "none";
    }
}


function displayTotal(total) {
    const totalRow = document.createElement("tr");
    totalRow.classList.add("total-row");

    const tdLabel = document.createElement("td");
    tdLabel.setAttribute("colspan", "2");
    tdLabel.style.fontWeight = "bold";
    tdLabel.textContent = "TOTAL";

    const tdValue = document.createElement("td");
    tdValue.setAttribute("colspan", "2");
    tdValue.style.fontWeight = "bold";
    tdValue.style.color = "purple";
    tdValue.textContent = total;

    totalRow.appendChild(tdLabel);
    totalRow.appendChild(tdValue);
    tbl.appendChild(totalRow);
}


function getTotal() {
    if (numbersArr.length === 0) {
        alert("No numbers to calculate.");
        return;
    }

    let total = numbersArr.reduce((acc, val) => acc + val, 0);
    alert(`Total: ${total}`);
}


function identifyMinMax() {
    if (numbersArr.length > 0) {
        const max = Math.max(...numbersArr);
        const min = Math.min(...numbersArr);

  
        document.querySelectorAll(".min-max-row").forEach(row => row.remove());

        const trMax = document.createElement("tr");
        trMax.classList.add("min-max-row");
        trMax.innerHTML = `<td>HIGHEST</td><td>${max}</td>`;

        const trMin = document.createElement("tr");
        trMin.classList.add("min-max-row");
        trMin.innerHTML = `<td>LOWEST</td><td>${min}</td>`;

        tbl.appendChild(trMax);
        tbl.appendChild(trMin);
    } else {
        alert("No numbers available.");
    }
}


function sortNumbers(order) {
    if (numbersArr.length === 0) {
        alert("No numbers available to sort.");
        return;
    }

    if (order === "asc") {
        numbersArr.sort((a, b) => a - b);
    } else if (order === "desc") {
        numbersArr.sort((a, b) => b - a);
    }
    iterateNumbers();
}


btn1.addEventListener("click", insertNumber);
btn2.addEventListener("click", () => (document.getElementById("txtNum").value = ""));
btn3.addEventListener("click", () => {
    numbersArr = [];
    iterateNumbers();
});
btn4.addEventListener("click", getTotal);  
btn5.addEventListener("click", identifyMinMax);
sortOrder.addEventListener("change", () => sortNumbers(sortOrder.value));

document.getElementById("txtNum").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        insertNumber();
    }
});
