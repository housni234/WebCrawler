//importing axios and cheerio 
const axios = require("axios");
const cheerio = require("cheerio");

//Class for news hacker entries
class HackerNewsEntry {
    constructor(rank, title, points, comments) {
        this.rank = rank;
        this.title = title;
        this.points = points;
        this.comments = comments
    }

    //calculating the number of words in the title
    getWordCount() {
        return this.title.replace(/[^a-zA-Z0-9\s]/g, "").trim().split(/\s+/).length
    }
}

// Class for news hacker crawler
class HackerNewsCrawler {
    constructor(url) {
        this.url = url;
        this.entries = [];
    }

    // fetching data
    async fetchData() {
        const response = await axios.get(this.url);
        const $ = cheerio.load(response.data)

        $(".athing").each((i, el) => {
            if (i >= 30) return

            // get the rank and title
            const rank = $(el).find(".rank").text().replace(",", "");
            const title = $(el).find(".titleline a").text();

            // get the subtext row
            const subtext = $(el).next().find(".subtext");

            // get points and parse to integer
            const points = parseInt(subtext.find(".score").text().replace(" points", "")) || 0;

            // create comment count from the last <a> element
            const commentsText = subtext.find("a").last().text();
            const commentsMatch = commentsText.match(/(\d+)\scomment/);
            const comments = commentsMatch ? parseInt(commentsMatch[1]) : 0;

            // create a new entry object and add to the array
            this.entries.push(new HackerNewsEntry(rank, title, points, comments));


        });

    }

    // Filter entries based on word count
    filterByWordCount(moreThanFive) {
        return this.entries.filter(entry => {
            const count = entry.getWordCount();
            return moreThanFive ? count > 5 : count <= 5;
        });
    }

    // Sort entries by key points and comments
    sortByKey(entries, key) {
        return [...entries].sort((a, b) => b[key] - a[key]);
    }

    // Print a table to the console
    printTable(entries, title) {
        console.log(`\n=== ${title} ===`);
        console.table(entries.map(e => ({
            Rank: e.rank,
            Title: e.title,
            Points: e.points,
            Comments: e.comments
        })));
    }

    //
    async run() {
        await this.fetchData();

        // print entries
        this.printTable(this.entries, "All Entries");

        // filter and sort subsets
        const moreThan5 = this.sortByKey(this.filterByWordCount(true), 'comments');
        const lessThanOrEqualTo5 = this.sortByKey(this.filterByWordCount(false), 'points');

        // print the subsets
        this.printTable(moreThan5, "More than 5 words (sorted by comments)");
        this.printTable(lessThanOrEqualTo5, "5 words or less (sorted by points)");
    }
}

// Self-invoking function to create and run the crawler
(async () => {
    const crawler = new HackerNewsCrawler("https://news.ycombinator.com/")
    await crawler.run()

})();

