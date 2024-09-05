document.addEventListener("DOMContentLoaded", () => {
  const quoteElm = document.getElementById("quote");
  const authorElm = document.getElementById("author");
  const svgFrameElm = document.getElementById("svgFrame");
  const button = document.getElementById("button");
  const searchButton = document.getElementById("searchButton");
  const authorInput = document.getElementById("authorInput");

  const colors = [
    "#eeb76b", "#FFC720", "#a4ebf3", "#c6ebc9", 
    "#fbe0c4", "#9ecca4", "#b4aee8", "#f2b4b4", 
    "#ffab73", "#b8b5ff"
  ];

  // Function to get a random quote or by author
  async function getQuote(author = "") {
    try {
      let url = "/api/quote";
      
      if (author && author.trim() !== "") {
        url = `https://favqs.com/api/quotes/?filter=${encodeURIComponent(author)}&type=author`;
        console.log(`Searching for quotes by author: ${author}`);
      }

      const response = await fetch(url, {
        headers: {
          "Authorization": `Token token="d9efc5c19c4876b2ee43d19af4dd2c46"`
        }        
      });

      const responseText = await response.text();
      console.log("Raw API Response:", responseText);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = JSON.parse(responseText);
      console.log("Parsed API Response:", data);

      // Check if quotes by author are returned
      if (author && data.quotes && data.quotes.length > 0) {
        const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
        quoteElm.textContent = randomQuote.body;
        authorElm.textContent = `- ${randomQuote.author}`;
      } 
      // Handle the case where no quotes are found
      else if (author && (!data.quotes || data.quotes.length === 0)) {
        quoteElm.textContent = "No quotes found for the given author.";
        authorElm.textContent = "";
      } 
      // Random quote fallback
      else if (!author && data.quote) {
        quoteElm.textContent = data.quote.body;
        authorElm.textContent = `- ${data.quote.author}`;
      } else {
        quoteElm.textContent = "No quotes found for the given author.";
        authorElm.textContent = "";
      }

      svgFrameElm.innerHTML = `<rect x="10" y="38" width="514.577" height="195.012" fill="${colors[Math.floor(Math.random() * colors.length)]}"></rect>`;
    } catch (error) {
      quoteElm.textContent = "An error occurred while fetching the quote.";
      authorElm.textContent = "";
      console.error("Error fetching quote:", error);
    }
  }

  // Event listeners
  button.addEventListener("click", () => getQuote());
  searchButton.addEventListener("click", () => {
    const author = authorInput.value.trim();
    if (author) {
      getQuote(author);
    } else {
      quoteElm.textContent = "Please enter an author name.";
      authorElm.textContent = "";
    }
  });

  getQuote(); // Load a random quote on page load
});
