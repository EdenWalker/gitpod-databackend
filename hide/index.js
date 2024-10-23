// document.addEventListener('DOMContentLoaded', function () {
//     // Get all edit buttons and attach event listeners
//     const editButtons = document.querySelectorAll('.edit-btn');
//     editButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             const customerId = this.closest('li').getAttribute('data-customer-id');
//             location.href = `/edit-customer/${customerId}`;
//         });
//     });

//     // Get all delete buttons and attach event listeners
//     const deleteButtons = document.querySelectorAll('.delete-btn');
//     deleteButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             const customerId = this.closest('li').getAttribute('data-customer-id');
//             if (confirm('Are you sure you want to delete this customer?')) {
//                 location.href = `/delete-customer/${customerId}`;
//             }
//         });
//     });
// });