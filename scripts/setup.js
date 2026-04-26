#!/usr/bin/env node
/**
 * Setup Script — Applies site-config.json values across the project.
 *
 * AI AGENT: This script reads site-config.json and propagates values into:
 * - src/_data/site.json (site metadata + affiliate tag + social links)
 * - src/_data/navigation.json (nav menu items)
 * - src/css/style.css (CSS custom properties for theme)
 * - CLAUDE.md (project context for AI agents)
 *
 * The script is idempotent — you can run it multiple times safely.
 * It uses regex patterns to find and replace CSS variables, not brittle
 * string matching.
 *
 * Run: npm run setup (or: node scripts/setup.js)
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}i ${msg}${colors.reset}`),
  success: (msg) => console.log(`${colors.green}+ ${msg}${colors.reset}`),
  warn: (msg) => console.log(`${colors.yellow}! ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}x ${msg}${colors.reset}`),
};

function getProjectPath(...parts) {
  return path.resolve(__dirname, '..', ...parts);
}

function readJSON(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    log.error(`Failed to read ${filePath}: ${err.message}`);
    process.exit(1);
  }
}

function writeJSON(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    log.success(`Updated ${path.relative(getProjectPath(), filePath)}`);
  } catch (err) {
    log.error(`Failed to write ${filePath}: ${err.message}`);
    process.exit(1);
  }
}

function readFile(filePath) {
  try {
    return fs.readFileSync(filePath, 'utf-8');
  } catch (err) {
    log.error(`Failed to read ${filePath}: ${err.message}`);
    process.exit(1);
  }
}

function writeFile(filePath, content) {
  try {
    fs.writeFileSync(filePath, content, 'utf-8');
    log.success(`Updated ${path.relative(getProjectPath(), filePath)}`);
  } catch (err) {
    log.error(`Failed to write ${filePath}: ${err.message}`);
    process.exit(1);
  }
}

function replacePlaceholder(content, placeholder, value) {
  const valueStr = String(value || '');
  const regex = new RegExp(`{{${placeholder}}}`, 'g');
  return content.replace(regex, valueStr);
}

/**
 * Main setup function.
 */
function setup() {
  log.info('Loading site-config.json...');

  const configPath = getProjectPath('site-config.json');
  const config = readJSON(configPath);

  // Extract configuration values
  const siteName = config.site?.name || '';
  const domain = config.site?.domain || '';
  const tagline = config.site?.tagline || '';
  const description = config.site?.description || '';
  const affiliateTag = config.affiliate?.tag || '';
  const googleVerification = config.googleSiteVerification || '';
  const authorName = config.seo?.defaultAuthor || '';
  const keywords = config.seo?.defaultKeywords || '';
  const region = config.region?.name || '';
  const climateZone = config.region?.climateZone || '';
  const primaryAudience = config.audience?.primary || '';
  const niche = config.niche || '';
  const themeColors = config.theme || {};
  const navigation = config.navigation || [];
  const social = config.social || {};

  // Validate required fields
  if (!siteName || siteName.includes('{{')) {
    log.error('site.name in site-config.json must be filled in');
    process.exit(1);
  }
  if (!domain || domain.includes('{{')) {
    log.error('site.domain in site-config.json must be filled in');
    process.exit(1);
  }
  if (!affiliateTag || affiliateTag.includes('{{')) {
    log.warn('affiliate.tag in site-config.json is not set. Affiliate links will not track properly.');
  }

  log.info(`Site: ${siteName} (${domain})`);
  log.info(`Affiliate Tag: ${affiliateTag || '(not set)'}`);

  // ─────────────────────────────────────────────────────────────
  // 1. Update src/_data/site.json
  //    This is the primary data source for all templates.
  //    Includes affiliate tag, social links, and Google Fonts URL
  //    so templates can use {{ site.affiliateTag }}, {{ site.social.facebook }}, etc.
  // ─────────────────────────────────────────────────────────────
  log.info('\nUpdating src/_data/site.json...');
  const siteDataPath = getProjectPath('src', '_data', 'site.json');

  // Build social object, filtering out empty values and internal keys
  const socialData = {};
  if (social) {
    for (const [key, value] of Object.entries(social)) {
      if (key.startsWith('_')) continue; // skip _agentNote etc.
      if (value && typeof value === 'string' && value.trim()) {
        socialData[key] = value.trim();
      }
    }
  }

  const siteData = {
    name: siteName,
    url: `https://${domain}`,
    description: description,
    tagline: tagline,
    affiliateTag: affiliateTag,
    googleSiteVerification: googleVerification,
    social: socialData,
    googleFontsUrl: themeColors.googleFontsUrl || '',
    seo: {
      author: authorName,
      keywords: keywords,
    },
  };
  writeJSON(siteDataPath, siteData);

  // ─────────────────────────────────────────────────────────────
  // 2. Update src/_data/navigation.json
  // ─────────────────────────────────────────────────────────────
  if (navigation && navigation.length > 0) {
    log.info('Updating src/_data/navigation.json...');
    const navDataPath = getProjectPath('src', '_data', 'navigation.json');
    writeJSON(navDataPath, navigation);
  }

  // ─────────────────────────────────────────────────────────────
  // 3. Update CSS variables
  //    Uses regex to find --variable: value; patterns, so it's
  //    idempotent — works whether values are defaults or already set.
  // ─────────────────────────────────────────────────────────────
  log.info('\nUpdating CSS variables in src/css/style.css...');
  const cssPath = getProjectPath('src', 'css', 'style.css');
  let cssContent = readFile(cssPath);

  const cssVarMap = {
    'color-primary': themeColors.primaryColor,
    'color-primary-dark': themeColors.primaryColorDark,
    'color-accent': themeColors.accentColor,
    'color-accent-dark': themeColors.accentColorDark,
    'color-gold': themeColors.goldColor,
    'color-bg': themeColors.backgroundColor,
    'color-cream': themeColors.creamColor,
    'color-text': themeColors.textColor,
    'color-text-dark': themeColors.textDark,
    'color-border': themeColors.borderColor,
    'font-body': themeColors.fontBody,
    'font-serif': themeColors.fontSerif,
    'font-display': themeColors.fontDisplay,
    'max-width': themeColors.maxWidth,
  };

  for (const [varName, value] of Object.entries(cssVarMap)) {
    if (value) {
      // Sanitize CSS value: strip } and ; to prevent breaking out of :root block.
      // Font stacks (with commas, quotes, spaces) are safe; only block rule injection.
      const sanitized = String(value).replace(/[};{]/g, '');
      const regex = new RegExp(`--${varName}:\\s*[^;]+;`);
      cssContent = cssContent.replace(regex, `--${varName}: ${sanitized};`);
    }
  }

  writeFile(cssPath, cssContent);

  // ─────────────────────────────────────────────────────────────
  // 4. Update CLAUDE.md with project context
  // ─────────────────────────────────────────────────────────────
  log.info('Updating CLAUDE.md with project context...');
  const claudeMdPath = getProjectPath('CLAUDE.md');
  if (fs.existsSync(claudeMdPath)) {
    let claudeMdContent = readFile(claudeMdPath);
    claudeMdContent = replacePlaceholder(claudeMdContent, 'SITE_NAME', siteName);
    claudeMdContent = replacePlaceholder(claudeMdContent, 'DOMAIN', domain);
    claudeMdContent = replacePlaceholder(claudeMdContent, 'REGION', region);
    claudeMdContent = replacePlaceholder(claudeMdContent, 'CLIMATE_ZONE', climateZone);
    claudeMdContent = replacePlaceholder(claudeMdContent, 'PRIMARY_AUDIENCE', primaryAudience);
    claudeMdContent = replacePlaceholder(claudeMdContent, 'NICHE', niche);
    claudeMdContent = replacePlaceholder(claudeMdContent, 'AUTHOR_NAME', authorName);
    claudeMdContent = replacePlaceholder(claudeMdContent, 'KEYWORDS', keywords);
    writeFile(claudeMdPath, claudeMdContent);
  }

  // ─────────────────────────────────────────────────────────────
  // 5. Summary
  // ─────────────────────────────────────────────────────────────
  log.success('\nSetup complete!');
  console.log(`
${colors.green}Summary${colors.reset}
--------------------------------------------
Site Name:       ${siteName}
Domain:          ${domain}
Affiliate Tag:   ${affiliateTag || '(not set)'}
Region:          ${region || '(not set)'}
Social Profiles: ${Object.keys(socialData).length} configured

${colors.blue}What was updated${colors.reset}
--------------------------------------------
- src/_data/site.json    (site metadata, affiliate tag, social links)
- src/_data/navigation.json
- src/css/style.css      (CSS custom properties)
- CLAUDE.md              (AI project context)

${colors.blue}Next Steps${colors.reset}
--------------------------------------------
1. Add products to src/_data/products.json (with real Amazon ASINs)
2. Update categories in src/_data/store.json
3. Customize src/index.njk (homepage)
4. Write blog posts in src/blog/
5. Run: npm run dev (start local dev server)
6. Run: npm test (verify everything works)
  `);
}

if (require.main === module) {
  try {
    setup();
  } catch (err) {
    log.error(`Unexpected error: ${err.message}`);
    process.exit(1);
  }
}

module.exports = setup;
