document.addEventListener("DOMContentLoaded", () => {
  const quoteElm = document.getElementById("quote");
  const authorElm = document.getElementById("author");
  const svgFrameElm = document.getElementById("svgFrame");
  const colors = ["#eeb76b", "#FFC720", "#a4ebf3", "#c6ebc9", "#fbe0c4", "#9ecca4", "#b4aee8", "#f2b4b4", "#ffab73", "#b8b5ff"];

  async function getQuote() {
    var generateColor = Math.floor(Math.random() * colors.length);
    try {
      const response = await fetch('/api/quote');
      const data = await response.json();
      quoteElm.textContent = data.quote.body;
      authorElm.textContent = `- ${data.quote.author}`;
      svgFrameElm.innerHTML = `<rect x="10" y="38" width="514.577" height="195.012" fill="${colors[generateColor]}"></rect>`;
    } catch (error) {
      quoteElm.textContent = "An error occurred while fetching the quote.";
      console.log(error);
    }
  }

  async function searchQuote(author) {
    try {
      const response = await fetch(`/api/quote/search?author=${author}`);
      const data = await response.json();
      if (data.quotes && data.quotes.length > 0) {
        const randomQuote = data.quotes[Math.floor(Math.random() * data.quotes.length)];
        quoteElm.textContent = randomQuote.body;
        authorElm.textContent = `- ${randomQuote.author}`;
      } else {
        quoteElm.textContent = "No quotes found for this author.";
      }
    } catch (error) {
      quoteElm.textContent = "An error occurred while fetching the quote.";
      console.log(error);
    }
  }

  document.getElementById("button").addEventListener("click", getQuote);
  document.getElementById("searchButton").addEventListener("click", () => {
    const author = document.getElementById("authorInput").value;
    searchQuote(author);
  });

  getQuote();
});
