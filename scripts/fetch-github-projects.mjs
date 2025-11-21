#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = 'nanda-kumudhan';
const PROJECTS_TO_EXCLUDE = [
  'latex-personal-portfolio',
  'nanda-kumudhan',
  'team19-make-it-all-system' // archived version
];

console.log('=====================================');
console.log('   GITHUB WEB SCRAPER');
console.log('=====================================\n');

async function fetchGitHubRepos() {
  try {
    console.log(`Fetching repositories from github.com/${GITHUB_USERNAME}...\n`);

    // Fetch from GitHub API (no auth required for public repos)
    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    
    // Filter and process repos
    const filteredRepos = repos
      .filter(repo => !repo.archived && !PROJECTS_TO_EXCLUDE.includes(repo.name))
      .map(repo => ({
        name: repo.name,
        description: repo.description || 'No description',
        url: repo.html_url,
        language: repo.language || 'Unknown',
        stars: repo.stargazers_count,
        updated: repo.updated_at,
        topics: repo.topics || []
      }));

    console.log(`Found ${filteredRepos.length} active repositories:\n`);

    filteredRepos.forEach(repo => {
      console.log(`${repo.name}`);
      console.log(`   URL: ${repo.url}`);
      console.log(`   Language: ${repo.language}`);
      console.log(`   Description: ${repo.description.slice(0, 70)}${repo.description.length > 70 ? '...' : ''}`);
      if (repo.topics.length > 0) {
        console.log(`   Topics: ${repo.topics.join(', ')}`);
      }
      console.log(`   Stars: ${repo.stars} | Updated: ${new Date(repo.updated).toLocaleDateString()}`);
      console.log('');
    });

    // Save to JSON
    const outputPath = path.join(__dirname, '../github-repos.json');
    fs.writeFileSync(outputPath, JSON.stringify(filteredRepos, null, 2));
    console.log(`=====================================`);
    console.log(`Repository data saved to: github-repos.json`);
    console.log(`=====================================\\n`);

    return filteredRepos;

  } catch (error) {
    console.error('Error fetching from GitHub:', error.message);
    process.exit(1);
  }
}

// Run the fetcher
await fetchGitHubRepos();
