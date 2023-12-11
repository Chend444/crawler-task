import { crawlUrls, InMemoryRepository, EventManager } from './crawler';

const depth = 2; // This should be fetched from environment variable ideally

const repository = new InMemoryRepository();
const eventManager = new EventManager();

eventManager.subscribe((links) => {
  console.log('Crawled links:', links);
});

// Modify the crawl function call to pass all required arguments
async function crawl(paths: string[], depth: number,http: boolean, repository: InMemoryRepository, eventManager: EventManager) {
  await crawlUrls(paths, depth, http, repository, eventManager);
}

// Call the crawl function with the necessary arguments
(async () => {
  try {
    await crawl(['htmls/1.html'], depth ,false, repository, eventManager);
//     await crawl(['htmls/2.html', 'htmls/3.html'], false, depth, repository, eventManager);
  } catch (error) {
    console.error('Crawling error:', error);
  }
})();


