document
  .getElementById("loginForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch(
      `/login?username=${encodeURIComponent(
        username
      )}&password=${encodeURIComponent(password)}`,
      {
        method: "GET", // You might want to change this to POST for security reasons
        credentials: "include", // Necessary for cookies to be sent and received
      }
    );

    if (response.ok) {
      document.getElementById("loginStatus").textContent = "You are logged in.";
      window.location.href = "/"; // Redirect to the home page or protected page
    } else {
      document.getElementById("loginStatus").textContent =
        "Login failed. Please try again.";
    }
  });
