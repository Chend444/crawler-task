// Importing the function 'scrapeLinks' from the 'utils/scraper' module
import { scrapeLinks } from './utils/scraper';

// Definition of an interface 'Repository' that outlines the required methods for a repository
export interface Repository {
  save: (path: string, links: string[]) => Promise<void>; // Method to save links given a path
}

// Implementation of the 'Repository' interface as an in-memory data store
export class InMemoryRepository implements Repository {
  private data: Record<string, string[]> = {}; // Internal data structure to store links

  async save(path: string, links: string[]): Promise<void> {
    this.data[path] = links; // Saves the provided links to the data store under a specific path
  }

  getLinks(path: string): string[] | undefined {
    return this.data[path]; // Retrieves links associated with a given path from the data store
  }
}

// Class 'EventManager' to manage subscriptions and emit events
export class EventManager {
  private subscribers: ((links: string[]) => void)[] = []; // Array to store subscribed functions

  // Method to subscribe to events by adding a callback function to the subscribers array
  subscribe(callback: (links: string[]) => void) {
    this.subscribers.push(callback);
  }

  // Method to emit events by calling all subscribed callback functions with provided links
  emit(links: string[]) {
    this.subscribers.forEach(subscriber => subscriber(links));
  }
}

// Function 'crawlUrls' to perform crawling of links with specified depth
export async function crawlUrls(
  paths: string[], // Array of initial paths to start crawling
  depth: number, // Depth limit for crawling
  http: boolean, // Flag indicating whether HTTP requests should be made
  repository: Repository, // Instance of the repository for storing links
  eventManager: EventManager // Instance of the event manager for emitting events
): Promise<void> {
  const visited: Record<string, boolean> = {}; // Keeps track of visited paths

  // Recursive function to crawl links with specified depth
  async function crawlRecursive(path: string, currentDepth: number) {
    if (currentDepth > depth || visited[path]) return; // Stop conditions for recursion

    visited[path] = true; // Mark the path as visited
    const links = await scrapeLinks(path, http); // Fetch links from the current path
    await repository.save(path, links); // Save the fetched links in the repository
    eventManager.emit(links); // Emit an event with the crawled links

    if (currentDepth < depth) {
      for (const link of links) {
        await crawlRecursive(link, currentDepth + 1); // Recursive call to crawl further links
      }
    }
  }

  for (const path of paths) {
    await crawlRecursive(path, 1); // Start crawling from each initial path with depth 1
  }
}
