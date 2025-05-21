//importing axios and cheerio depe
const axios = require("axios");
const cheerio = require("cheerio");


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

const entry = new HackerNewsEntry(1, "news title", 123, 45)

console.log(entry.getWordCount())
