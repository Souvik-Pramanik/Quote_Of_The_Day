document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const quoteElm = document.getElementById("quote");
  const authorElm = document.getElementById("author");
  const svgFrameElm = document.getElementById("svgFrame");
  const button = document.getElementById("button");
  const searchButton = document.getElementById("searchButton");
  const authorInput = document.getElementById("authorInput");

  // Colors for the background
  const colors = [
    "#eeb76b",
    "#FFC720",
    "#a4ebf3",
    "#c6ebc9",
    "#fbe0c4",
    "#9ecca4",
    "#b4aee8",
    "#f2b4b4",
    "#ffab73",
    "#b8b5ff",
  ];

  // Function to get a random quote or by author
  async function getQuote(author = "") {
    try {
      // Use relative path as per Vercel configuration for API routes
      let url = "/api/quote";

      // If searching by author, adjust the URL
      if (author) {
        url = `/api/quote/search?author=${encodeURIComponent(author)}`;
      }

      // Fetch the data from the API
      const response = await fetch(url);

      // Check if response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      // If a single quote is returned, display it
      if (data.quote) {
        quoteElm.textContent = data.quote.body;
        authorElm.textContent = `- ${data.quote.author}`;
      } 
      // Handle search results for multiple quotes
      else if (data.quotes && data.quotes.length > 0) {
        const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
        quoteElm.textContent = randomQuote.body;
        authorElm.textContent = `- ${randomQuote.author}`;
      } else {
        quoteElm.textContent = "No quotes found for the given author.";
        authorElm.textContent = "";
      }

      // Update SVG background color
      svgFrameElm.innerHTML = `<rect x="10" y="38" width="514.577" height="195.012" fill="${colors[Math.floor(Math.random() * colors.length)]}"></rect>`;
    } catch (error) {
      // Handle any errors during fetch
      quoteElm.textContent = "An error occurred while fetching the quote.";
      authorElm.textContent = "";
      console.error("Error fetching quote:", error);
    }
  }

  // Event listeners for buttons
  button.addEventListener("click", () => getQuote());  // Random quote button

  // Author search button
  searchButton.addEventListener("click", () => {
    const author = authorInput.value.trim();
    if (author) {
      getQuote(author);  // Fetch quote by author
    } else {
      quoteElm.textContent = "Please enter an author name.";
      authorElm.textContent = "";
    }
  });

  getQuote(); // Load a random quote on page load
});
