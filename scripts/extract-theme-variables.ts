import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import process from 'node:process';

// Mapping table: CSS prefix -> Tailwind theme key
const PREFIX_MAPPING: Record<string, string> = {
  '--color-': 'colors',
  '--font-': 'font',
  '--text-': 'text',
  '--font-weight-': 'font-weight',
  '--tracking-': 'tracking',
  '--leading-': 'leading',
  '--breakpoint-': 'breakpoint',
  '--container-': 'container',
  '--spacing-': 'spacing',
  '--radius-': 'radius',
  '--shadow-': 'shadow',
  '--inset-shadow-': 'inset-shadow',
  '--drop-shadow-': 'drop-shadow',
  '--blur-': 'blur',
  '--perspective-': 'perspective',
  '--aspect-': 'aspect',
  '--ease-': 'ease',
  '--animate-': 'animate',
} as const;

interface ExtractedTheme {
  [key: string]: string[]
}

function extractThemeVariables(cssContent: string): ExtractedTheme {
  const extracted: ExtractedTheme = {};

  // Find all @theme blocks (both regular and inline)
  // Matches "@theme" or "@theme inline" followed by optional whitespace and an opening brace
  const themeBlockRegex = /@theme[^{]*\{/g;
  let match = themeBlockRegex.exec(cssContent);

  while (match !== null) {
    // Calculate the start position: after the opening brace of the @theme block
    const startIndex = match.index + match[0].length;
    // Track nested braces to find the matching closing brace
    // Start at 1 because we've already seen the opening brace
    let braceCount = 1;
    let i = startIndex;
    let endIndex = -1;

    // Find the matching closing brace by counting nested braces
    // Increment on '{', decrement on '}', stop when we reach 0
    while (i < cssContent.length && braceCount > 0) {
      if (cssContent[i] === '{') {
        braceCount++;
      } else if (cssContent[i] === '}') {
        braceCount--;
        if (braceCount === 0) {
          endIndex = i;
          break;
        }
      }
      i++;
    }

    if (endIndex !== -1) {
      // Extract the content between the braces
      const themeContent = cssContent.substring(startIndex, endIndex);

      // Extract CSS custom property declarations (e.g., --color-red: #ff0000;)
      // Matches: --property-name: value;
      const customPropertyRegex = /--([^:]+):[^;]+;/g;
      let propMatch = customPropertyRegex.exec(themeContent);

      while (propMatch !== null) {
        // Reconstruct the full property name with the -- prefix
        const fullProperty = `--${propMatch[1]}`;

        // Skip any catch-all patterns (ending with *)
        // These are used for default values and shouldn't be extracted
        if (fullProperty.endsWith('*')) {
          propMatch = customPropertyRegex.exec(themeContent);
          continue;
        }

        // Find which prefix this property matches to determine the theme category
        // Check each prefix in order and map to the corresponding Tailwind theme key
        for (const [prefix, themeKey] of Object.entries(PREFIX_MAPPING)) {
          if (fullProperty.startsWith(prefix)) {
            // Extract the class name by removing the prefix
            // e.g., --color-red -> red
            const className = fullProperty.substring(prefix.length);

            if (!extracted[themeKey]) {
              extracted[themeKey] = [];
            }

            // Only add if not already present to avoid duplicates
            if (!extracted[themeKey].includes(className)) {
              extracted[themeKey].push(className);
            }
            break;
          }
        }
        propMatch = customPropertyRegex.exec(themeContent);
      }
    }

    // Continue searching for the next @theme block
    match = themeBlockRegex.exec(cssContent);
  }

  // Sort arrays for consistent output
  Object.keys(extracted).forEach((key) => {
    extracted[key].sort();
  });

  return extracted;
}

function generateThemeConfig(extracted: ExtractedTheme): string {
  // Filter out empty categories and format each entry as a TypeScript array
  const configEntries = Object.entries(extracted)
    .filter(([, values]) => values.length > 0)
    .map(([key, values]) => {
      // Format each value as a string literal in the array
      const formattedValues = values.map((value) => `        '${value}',`).join('\n');

      // Return the formatted theme key with its array of values
      return `      ${key}: [\n${formattedValues}\n      ],`;
    })
    .join('\n');

  // Generate the TypeScript config file content
  // This creates a Tailwind config extension object
  return `// This file is auto-generated. Do not edit manually.
// Run 'npm run extract-theme-variables' to regenerate.

export const generatedThemeConfig = {
  extend: {
    theme: {
${configEntries}
    },
  },
} as const;
`;
}

function main() {
  try {
    // Read the CSS file
    const cssPath = join(process.cwd(), 'src/styles/index.css');
    const cssContent = readFileSync(cssPath, 'utf-8');

    // Extract theme variables from CSS
    const extracted = extractThemeVariables(cssContent);

    // Generate the TypeScript config
    const configContent = generateThemeConfig(extracted);

    // Write the generated file
    const outputPath = join(process.cwd(), 'src/lib/helpers/tailwind-theme.gen.ts');
    writeFileSync(outputPath, configContent, 'utf-8');

    console.log('✅ Theme variables extracted successfully!');
    console.log(`📁 Generated file: ${outputPath}`);
    console.log('\n📊 Extracted variables:');
    Object.entries(extracted).forEach(([key, values]) => {
      console.log(`  ${key}: ${values.length} variables`);
    });
  } catch (error) {
    console.error('❌ Error extracting theme variables:', error);
    process.exit(1);
  }
}

main();
