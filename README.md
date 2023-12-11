# Node.js Home Task

Welcome to the ------- candidate Node.js task!
In this task you shall build a web crawler and expose it via RESTful API's.

**Important:**
  - Think about the design
  - Feel free to use classes when you feel it is appropriate
  - Separate between concerns
  - Don't repeat yourself where appropriate
  - Write clean code

## Setup

You should download or clone this codebase to your local machine as it is intended that you develop and test yourself by executing the program.

You should have `Node.js` installed and you can use any code editor of your choice.
`Node.js` can be downloaded from [this link](https://nodejs.org/en/download/), you can install the `LTS` version.

Follow these steps to set up the environment and execute the program:

1. `npm install` – install dependencies (one time step)
2. `npm run start:crawl` – run the task related to the crawler program

## Tasks

**NOTE:** the actual scraping logic of reading a file or downloading a URL and extracting links is already implemented for you, this is not the focus of this task.

### Task - Crawler Program

This task focuses on the main entry point file: `crawlTask.ts`.

1. Change `crawlUrls` implementation to return the links according to the specified depth, e.g.
```json
// asuume the following HTML files exist
// every file includes <a href=".."> according to this graph:

A.html (starting point)
|-- B.html
    |-- C.html
|-- D.html
    |-- E.html
        |-- F.html

// crawlUrls('A.html', 2, false):
//   returned links should be ['B.html','C.html','D.html','E.html'] (order does not matter)
//
// Meaning, links should be be processed recursively UP TO the given depth
// In this case, it stops at C.html and E.html
```
2. Depth
    - Implement a configuration utility and get it from an environment variable
    - Default: 2 / Max: 5 (if the configured value exceeds the maximum then take the maximum)
3. Saving results
    - Implement a repository and save the results there
    - Saving the results should be part of the `crawler.ts` work and not in `crawlerTask.ts`
    - For the purpose of this test, a simple in-memory map or object is fine
        - key: path / value: array of links
    - Build it in such a way that using a persistent data store in the future can be replaced easily
        - Extract it to a separate file module
        - The API should be made asynchrnous even if it is currently in memory (replacing it later with a database should require aynchronous calls)
4. Events
    - Currently, `crawlUrls` completes with all the links after the entire hierarchy is crawled
    - Provide a way to subscribe to results once they're ready
    - There's no need to change how the internal work is done, simply for log purposes
    - Implement a simple log utility that uses console.log
    - Subscribe to the event in `crawlTask.ts` and log results as soon as they're ready
    - Beware of memory leaks
    - Use event emitters or install and use any other library you like instead (e.g. rxjs)

## Good Luck!
