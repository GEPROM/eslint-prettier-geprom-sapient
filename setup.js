#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

// Get the root directory of the project that installed this package
// When installed via npm, this runs in node_modules, so we go up to find the project root
const projectRoot = path.resolve(__dirname, "../../..");

// Read the eslint configuration from this package
const eslintConfig = require("./index.js");

// Prettier configuration
const prettierConfig = require("./prettier-config.js");

// Create .eslintrc.js in the project root
const eslintrcPath = path.join(projectRoot, ".eslintrc.js");
const eslintrcContent = `module.exports = ${JSON.stringify(eslintConfig, null, 2)};`;

try {
   fs.writeFileSync(eslintrcPath, eslintrcContent, "utf8");
   console.log("✓ Created .eslintrc.js");
} catch (error) {
   console.error("Error creating .eslintrc.js:", error.message);
}

// Create .prettierrc.js in the project root
const prettierrcPath = path.join(projectRoot, ".prettierrc.js");
const prettierrcContent = `module.exports = ${JSON.stringify(prettierConfig, null, 2)};`;

try {
   fs.writeFileSync(prettierrcPath, prettierrcContent, "utf8");
   console.log("✓ Created .prettierrc.js");
} catch (error) {
   console.error("Error creating .prettierrc.js:", error.message);
}

// Create .eslintignore if it doesn't exist
const eslintignorePath = path.join(projectRoot, ".eslintignore");
if (!fs.existsSync(eslintignorePath)) {
   const eslintignoreContent = `node_modules/
dist/
build/
coverage/
.next/
out/
`;
   try {
      fs.writeFileSync(eslintignorePath, eslintignoreContent, "utf8");
      console.log("✓ Created .eslintignore");
   } catch (error) {
      console.error("Error creating .eslintignore:", error.message);
   }
}

// Create .prettierignore if it doesn't exist
const prettierignorePath = path.join(projectRoot, ".prettierignore");
if (!fs.existsSync(prettierignorePath)) {
   const prettierignoreContent = `node_modules/
dist/
build/
coverage/
.next/
out/
package-lock.json
yarn.lock
`;
   try {
      fs.writeFileSync(prettierignorePath, prettierignoreContent, "utf8");
      console.log("✓ Created .prettierignore");
   } catch (error) {
      console.error("Error creating .prettierignore:", error.message);
   }
}

// Create .vscode/settings.json if it doesn't exist
const vscodeDir = path.join(projectRoot, ".vscode");
const vscodePath = path.join(vscodeDir, "settings.json");
if (!fs.existsSync(vscodePath)) {
   const vscodeSettings = {
      "eslint.enable": true,
      "eslint.validate": ["javascript", "javascriptreact"],
      "[javascript]": {
         "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
         },
      },
      "[javascriptreact]": {
         "editor.codeActionsOnSave": {
            "source.fixAll.eslint": true,
         },
      },
   };
   try {
      // Create .vscode directory if it doesn't exist
      if (!fs.existsSync(vscodeDir)) {
         fs.mkdirSync(vscodeDir, { recursive: true });
      }
      fs.writeFileSync(vscodePath, JSON.stringify(vscodeSettings, null, 2), "utf8");
      console.log("✓ Created .vscode/settings.json");
   } catch (error) {
      console.error("Error creating .vscode/settings.json:", error.message);
   }
}

// Function to run a command
function runCommand(command, args, description) {
   return new Promise((resolve, reject) => {
      console.log(`\n▶ ${description}...`);
      const child = spawn(command, args, {
         cwd: projectRoot,
         stdio: "inherit",
         shell: true,
      });

      child.on("close", (code) => {
         if (code === 0) {
            console.log(`✓ ${description} completed`);
            resolve();
         } else {
            console.warn(`⚠ ${description} exited with code ${code}`);
            resolve(); // Don't reject, warn instead
         }
      });

      child.on("error", (error) => {
         console.error(`Error running ${description}:`, error.message);
         resolve(); // Don't reject, warn instead
      });
   });
}

// Run prettier and eslint if they're available
async function formatAndLint() {
   try {
      // Try to run prettier
      await runCommand(
         "npx",
         ["prettier", "--write", "."],
         "Formatting with Prettier"
      );

      // Try to run eslint with --fix
      await runCommand("npx", ["eslint", ".", "--fix"], "Fixing with ESLint");

      console.log("\n✓ Setup completed successfully!");
   } catch (error) {
      console.error("Error during formatting/linting:", error.message);
   }
}

// Only run if prettier and eslint are available in the project
const packageJsonPath = path.join(projectRoot, "package.json");
if (fs.existsSync(packageJsonPath)) {
   formatAndLint().catch(() => {
      console.log(
         "\nNote: Prettier and ESLint will format files when run manually."
      );
   });
} else {
   console.log("package.json not found. Skipping auto-formatting.");
}
