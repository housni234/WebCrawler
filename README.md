# Hacker News Web Crawler

A Node.js-based web crawler that scrapes the top 30 stories from [Hacker News](https://news.ycombinator.com/), analyzes title word counts, and displays filtered and sorted data in the terminal.

## Features

- Scrapes titles, ranks, points, and comments from the Hacker News front page.
- Calculates the word count of each story's title.
- Filters entries based on whether titles have more than 5 words.
- Sorts filtered entries by either number of points or number of comments.
- Outputs formatted tables directly in the console.


##  Technologies Used

- [Node.js](https://nodejs.org/)
- [Axios](https://www.npmjs.com/package/axios) – for making HTTP requests.
- [Cheerio](https://www.npmjs.com/package/cheerio) – for parsing and querying HTML.

