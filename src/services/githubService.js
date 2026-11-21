/* GitHub API Service
   Fetches and caches repository statistics for projects.
   Includes in-memory and localStorage caching to respect GitHub unauthenticated rate limits (60 req/hr).
*/

const GITHUB_USERNAME = 'merajtalha';
const CACHE_KEY = 'portfolio-github-repos-v1';
const CACHE_DURATION_MS = 15 * 60 * 1000; // 15 minutes

// Colors for primary programming languages
export const LANGUAGE_COLORS = {
    'Verilog': '#848bf5',
    'SystemVerilog': '#2f4f4f',
    'Python': '#3572A5',
    'Java': '#b07219',
    'Assembly': '#6E4C13',
    'MIPS': '#6E4C13',
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'C': '#555555',
    'C++': '#f34b7d',
    'HTML': '#e34c26',
    'CSS': '#563d7c',
    'Logisim': '#00979d',
    'Default': '#3b82f6'
};

export function getLanguageColor(languageName) {
    if (!languageName) return LANGUAGE_COLORS.Default;
    return LANGUAGE_COLORS[languageName] || LANGUAGE_COLORS.Default;
}

/**
 * Extract repository name from a GitHub repository URL
*/
export function extractRepoName(url) {
    if (!url) return null;
    const parts = url.trim().replace(/\/+$/, '').split('/');
    if (parts.length < 5) return null;
    return parts[parts.length - 1].toLowerCase();
}

/**
 * Fetch all public repositories for the configured user.
*/
export async function fetchGitHubRepos() {
    // Check local storage cache
    let cached = null;
    try {
        const raw = localStorage.getItem(CACHE_KEY);
        if (raw) {
            cached = JSON.parse(raw);
        }
    } catch {
        // Ignore JSON parse / storage errors
    }

    const isCacheValid = cached && cached.timestamp && (Date.now() - cached.timestamp < CACHE_DURATION_MS);

    // If cache is fresh, return immediately
    if (isCacheValid && cached.data) {
        return {
            reposMap: cached.data,
            status: 'cached',
            lastFetched: cached.timestamp
        };
    }

    // Fetch live data from GitHub REST API
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`GitHub API responded with HTTP ${response.status}`);
        }

        const repoList = await response.json();
        const reposMap = {};

        if (Array.isArray(repoList)) {
            for (const repo of repoList) {
                const key = repo.name.toLowerCase();
                reposMap[key] = {
                    name: repo.name,
                    fullName: repo.full_name,
                    primaryLanguage: repo.language || null,
                    stars: repo.stargazers_count || 0,
                    forks: repo.forks_count || 0,
                    openIssues: repo.open_issues_count || 0,
                    pushedAt: repo.pushed_at || repo.updated_at || null,
                    updatedAt: repo.updated_at || null,
                    htmlUrl: repo.html_url,
                    description: repo.description
                };
            }
        }

        // Persist to localStorage
        try {
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                timestamp: Date.now(),
                data: reposMap
            }));
        } catch {
            // LocalStorage might be disabled or full
        }

        return {
            reposMap,
            status: 'live',
            lastFetched: Date.now()
        };
    } catch (err) {
        console.warn('GitHub API fetch failed, checking fallback cache:', err);

        // If network fetch fails but we had an older cache, return the stale cache
        if (cached && cached.data) {
            return {
                reposMap: cached.data,
                status: 'cached',
                lastFetched: cached.timestamp,
                warning: 'Showing cached data (network unavailable or rate limit reached).'
            };
        }

        // Fallback: network unavailable and no cache
        return {
            reposMap: {},
            status: 'offline',
            lastFetched: null,
            error: 'GitHub stats currently unavailable. Please check your network or try again later.'
        };
    }
}

// In-memory cache for repository language breakdowns to avoid redundant requests
const languagesCache = new Map();

/**
 * Fetch detailed language breakdown for a specific repository.
 * Returns an array of { name, bytes, percentage, color } sorted from highest percentage to lowest.
 */
export async function fetchRepoLanguages(repoName, fallbackPrimaryLanguage = null) {
    if (!repoName) {
        return buildFallbackLanguages(fallbackPrimaryLanguage);
    }

    const cleanName = repoName.toLowerCase();
    if (languagesCache.has(cleanName)) {
        return languagesCache.get(cleanName);
    }

    try {
        const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}/languages`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch languages (HTTP ${response.status})`);
        }

        const data = await response.json();
        const totalBytes = Object.values(data).reduce((acc, bytes) => acc + bytes, 0);

        if (!totalBytes || totalBytes === 0) {
            const fallback = buildFallbackLanguages(fallbackPrimaryLanguage);
            languagesCache.set(cleanName, fallback);
            return fallback;
        }

        const list = Object.entries(data).map(([name, bytes]) => ({
            name,
            bytes,
            percentage: Math.round((bytes / totalBytes) * 1000) / 10, // 1 decimal place, e.g. 84.5%
            color: getLanguageColor(name)
        })).sort((a, b) => b.bytes - a.bytes);

        languagesCache.set(cleanName, list);
        return list;
    } catch {
        // Fallback to single primary language bar
        const fallback = buildFallbackLanguages(fallbackPrimaryLanguage);
        languagesCache.set(cleanName, fallback);
        return fallback;
    }
}

function buildFallbackLanguages(primaryLanguage) {
    if (!primaryLanguage) return [];
    return [
        {
            name: primaryLanguage,
            percentage: 100,
            color: getLanguageColor(primaryLanguage)
        }
    ];
}