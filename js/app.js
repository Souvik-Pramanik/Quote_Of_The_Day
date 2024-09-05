// Function to search quotes by author name
async function searchQuote(author) {
  try {
    // Clear the previous quote and author first to avoid displaying old data
    quoteElm.textContent = "Searching...";
    authorElm.textContent = "";

    // Encode the author name properly
    const encodedAuthor = encodeURIComponent(author);
    
    // Make the API call to search for quotes by the provided author
    const response = await fetch(`/api/quote/search?author=${encodedAuthor}`);
    const data = await response.json();

    // Check if we got any quotes back
    if (data.quotes && data.quotes.length > 0) {
      // Pick a random quote from the list of quotes found
      const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
      quoteElm.textContent = randomQuote.body;
      authorElm.textContent = `- ${randomQuote.author}`;
    } else {
      quoteElm.textContent = "No quotes found for this author.";
      authorElm.textContent = "";
    }
  } catch (error) {
    // Handle any errors that occur during the fetch
    quoteElm.textContent = "An error occurred while fetching the quote.";
    console.log("Error fetching quote:", error);
  }
}

// Event listener for the search button
document.getElementById("searchButton").addEventListener("click", function () {
  const author = document.getElementById("authorInput").value.trim();

  // Only search if there is an author name provided
  if (author) {
    searchQuote(author);
  } else {
    quoteElm.textContent = "Please enter an author's name to search.";
  }
});
