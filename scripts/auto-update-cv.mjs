#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const GITHUB_USERNAME = 'nanda-kumudhan';
const CV_PATH = path.join(__dirname, '../data/cv/cv.tex');
const CONFIG_PATH = path.join(__dirname, '../cv-config.json');

// Default config with exclusions
const DEFAULT_CONFIG = {
  excludedProjects: [
    'latex-personal-portfolio',
    'nanda-kumudhan',
    'team19-make-it-all-system',
    'first-contributions'
  ],
  projectsInCV: [
    'Smart Study Assistant',
    'JP Morgan Software Engineering Simulation',
    'CatchUp AI',
    'Team19 Make-It-All System'
  ],
  autoAddProjects: true,
  description: 'Configuration for automatic CV project updates. Add project names to excludedProjects to skip them.'
};

console.log('=====================================');
console.log('   AUTO CV PROJECT UPDATER');
console.log('=====================================\n');

// Load or create config
function loadConfig() {
  if (fs.existsSync(CONFIG_PATH)) {
    try {
      return JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf-8'));
    } catch (err) {
      console.warn('Could not parse config, using defaults');
      return DEFAULT_CONFIG;
    }
  }
  
  fs.writeFileSync(CONFIG_PATH, JSON.stringify(DEFAULT_CONFIG, null, 2));
  console.log(`Created config file: cv-config.json`);
  console.log(`Edit this file to exclude projects or change settings\n`);
  
  return DEFAULT_CONFIG;
}

async function fetchAndUpdateCV() {
  try {
    const config = loadConfig();
    
    console.log(`Fetching repositories from github.com/${GITHUB_USERNAME}...\n`);

    const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`);
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }

    const repos = await response.json();
    
    // Filter repos
    const filteredRepos = repos
      .filter(repo => !repo.archived && !config.excludedProjects.includes(repo.name))
      .filter(repo => !config.projectsInCV.some(p => p.toLowerCase().includes(repo.name.toLowerCase())))
      .map(repo => ({
        name: repo.name,
        description: repo.description || 'No description',
        url: repo.html_url,
        language: repo.language || 'Unknown',
        topics: repo.topics || [],
        updated: repo.updated_at
      }));

    console.log(`Found ${filteredRepos.length} new projects not in CV:\n`);

    if (filteredRepos.length === 0) {
      console.log('CV is up to date. No new projects to add.\n');
      return;
    }

    // Display new projects
    filteredRepos.forEach((repo, index) => {
      console.log(`${index + 1}. ${repo.name}`);
      console.log(`   Language: ${repo.language}`);
      console.log(`   Description: ${repo.description.slice(0, 60)}${repo.description.length > 60 ? '...' : ''}`);
      console.log('');
    });

    // Save recommendations
    const recommendationsPath = path.join(__dirname, '../cv-recommendations.json');
    fs.writeFileSync(recommendationsPath, JSON.stringify(filteredRepos, null, 2));
    
    console.log('=====================================');
    console.log(`Recommendations saved to: cv-recommendations.json`);
    console.log('=====================================\n');
    
    console.log('To add a project to CV:');
    console.log('1. Edit cv-config.json and add project name to projectsInCV');
    console.log('2. Update data/cv/cv.tex with project details');
    console.log('3. Run: npm run build\n');

    if (config.autoAddProjects) {
      console.log('Tip: Set autoAddProjects to false in cv-config.json to disable auto-recommendations\n');
    }

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Display instructions
console.log('Configuration file: cv-config.json');
console.log('Edit this file to:');
console.log('  - Add projects to excludedProjects to skip them');
console.log('  - Update projectsInCV with projects you\'ve added manually');
console.log('  - Set autoAddProjects to false to disable recommendations\n');

// Run update
await fetchAndUpdateCV();
