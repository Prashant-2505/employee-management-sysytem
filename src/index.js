
// (async function () {
//     try {
//         const data = await fetch("data.json");
//         const response = await data.json();

//         let employees = response;
//         let selectedEmployeeId = employees[0].id;
//         let selectedEmployee = employees[0];

//         const employeeList = document.querySelector('.employees__names--list');
//         const employeeInfo = document.querySelector('.employees__single--info'); // Fix: Added dot before class name

//         // add employ logic
//         const createEmployee = document.querySelector('.createEmployee');
//         const addEmployeeModal = document.querySelector('.addEmployee');
//         const addEMployeeForm = document.querySelector('.addEmployee_create');

//         createEmployee.addEventListener("click", () => {
//             addEmployeeModal.style.display = 'flex'
//         })

//         addEmployeeModal.addEventListener("click", (e) => {
//             if (e.target.className === 'addEmployee') {
//                 addEmployeeModal.style.display = 'none'
//             }
//         })



//         addEMployeeForm.addEventListener("submit", (e) => {
//             e.preventDefault()
//             const formData = new FormData(addEMployeeForm);
//             const values = [...formData.entries()]

//             let empData = {}
//             values.forEach((val) => {
//                 empData[val[0]] = val[1]
//             })
//             empData.id = employees[employees.length - 1].id + 1
//             empData.age = new Date().getFullYear() - parseInt(empData.dob.slice(0, 4), 10)
//             empData.imageUrl = empData.imageUrl || "https://cdn-icons-png.flaticon.com/512/0/93.png";
//             employees.push(empData)

//             renderEmployees()
//             addEMployeeForm.reset()
//             addEmployeeModal.style.display = 'none'

//         })

//         // select employee logic
//         employeeList.addEventListener('click', (e) => {
//             if (e.target.tagName === 'SPAN' && selectedEmployeeId !== e.target.id) {
//                 selectedEmployeeId = e.target.id;
//                 renderEmployees();
//                 renderSingleEmployee();
//             }

//             // Employee Delete Logic - START
//             if (e.target.tagName === "I") {
//                 employees = employees.filter(
//                     (emp) => String(emp.id) !== e.target.parentNode.id
//                 );
//                 if (String(selectedEmployeeId) === e.target.parentNode.id) {
//                     selectedEmployeeId = employees[0]?.id || -1;
//                     selectedEmployee = employees[0] || {};
//                     renderSingleEmployee();
//                 }
//                 renderEmployees();
//             }
//             // Employee Delete Logic - END

//         });

//         const renderEmployees = () => {
//             employeeList.innerHTML = "";
//             employees.forEach(emp => {
//                 const employee = document.createElement('span');
//                 employee.classList.add("employees__names--item");

//                 if (parseInt(selectedEmployeeId, 10) === emp.id) {
//                     employee.classList.add("selected");
//                     selectedEmployee = emp;
//                 }
//                 employee.setAttribute('id', emp.id);
//                 employee.innerHTML = `${emp.firstName} ${emp.lastName} <i class="employeeDelete">X</i>`;

//                 employeeList.append(employee);
//             });
//         }

//         const renderSingleEmployee = () => {

//             // delete employee


//             if (selectedEmployeeId === -1) {
//                 employeeInfo.innerHTML = "";
//                 return;
//             }

//             employeeInfo.innerHTML = `
//               <img src="${selectedEmployee.imageUrl}" />
//               <span class="employees__single--heading">
//               ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
//               </span>
//               <span>${selectedEmployee.address}</span>
//               <span>${selectedEmployee.email}</span>
//               <span>Mobile - ${selectedEmployee.contactNumber}</span>
//               <span>DOB - ${selectedEmployee.dob}</span>
//             `;
//         };

//         renderEmployees();
//         renderSingleEmployee();

//     } catch (error) {
//         console.error("Error fetching data:", error);
//     }
// })();


(async function () {
    const response = await fetch('data.json');
    const data = await response.json();

    const employeeList = document.querySelector('.employees__names--list');
    const singlEmployeeInfo = document.querySelector('.employees__single--info');

    let selectedEmployee = data[0]; // Use let instead of const

    const renderList = () => {
        employeeList.innerHTML = "";
        data.forEach((emp) => {
            const employee = document.createElement('span');
            employee.classList.add("employees__names--item");
            employee.innerHTML = `${emp.firstName}`;
            employee.id = emp.id; // Set id attribute
            employeeList.appendChild(employee);

            employee.addEventListener("click", () => {
                selectedEmployee = emp; 
                renderSingleEmployee();
            });
        });
    }

    const renderSingleEmployee = () => {
        singlEmployeeInfo.innerHTML = `
            <img src="${selectedEmployee.imageUrl}" />
            <span class="employees__single--heading">
                ${selectedEmployee.firstName} ${selectedEmployee.lastName} (${selectedEmployee.age})
            </span>
            <span>${selectedEmployee.address}</span>
            <span>${selectedEmployee.email}</span>
            <span>Mobile - ${selectedEmployee.contactNumber}</span>
            <span>DOB - ${selectedEmployee.dob}</span>
        `;
    }

    renderList();
    renderSingleEmployee();
})();
