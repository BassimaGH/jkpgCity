const source = "http://localhost:3001/allStores";

fetch(source)
  .then((response) => {
    return response.json();
  })
  .then((stores) => {
    console.log(stores);
  });

console.log("work plz");
