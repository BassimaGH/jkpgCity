
function deleteStore(storeName) {
    const encodedStoreName = encodeURIComponent(storeName);
    fetch(`http://localhost:3001/stores/${encodedStoreName}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        alert('Store deleted successfully');
        window.location.reload();
    })
    .catch(error => {
        console.error('There was a problem with your fetch operation:', error);
        alert('Error deleting store. Please try again.');
    });
}

export { deleteStore };