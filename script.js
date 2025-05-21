//importing axios and cheerio depe
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
        try {
            const response = await axios.get(this.url);
            const $ = cheerio.load(response.data)

            const title = $(".athing").first().find(".titleline a ").text()
            console.log("first title: ", title)
        } catch (error) {
            console.error("faiiiiled", error.message)
        }
    }

}
const crawler = new HackerNewsCrawler("https://news.ycombinator.com/")
crawler.fetchData()

