#!/bin/bash

# Default to empty base path (custom domain or root user site)
BASE_PATH=""

# Check if a repo name argument is provided (e.g. "./deploy.sh portfolio")
if [ -n "$1" ]; then
  BASE_PATH="/$1"
  echo "Deploying with base path: $BASE_PATH"
fi

# Export for next.config.mjs
export NEXT_PUBLIC_BASE_PATH=$BASE_PATH

# Build the project
echo "Building project..."
npm run build

if [ $? -ne 0 ]; then
  echo "Build failed. Aborting deployment."
  exit 1
fi

# Deploy to gh-pages branch
echo "Deploying to gh-pages branch..."
# Use git subtree push or a temporary directory approach
# Here we'll use a simple approach compatible with most setups

# Create a temporary directory
rm -rf out/.git
git worktree add -f out gh-pages

if [ $? -ne 0 ]; then
  echo "Creating gh-pages branch if it doesn't exist..."
  git checkout --orphan gh-pages
  git reset --hard
  git commit --allow-empty -m "Init gh-pages"
  git checkout main
  git worktree add -f out gh-pages
fi

# Copy build artifacts
# Next.js 'export' output is in 'out' folder by default, but we need to update the worktree
# Actually, 'npm run build' with 'output: export' puts files in 'out'.
# So we need to be careful not to overwrite the worktree git config.

# Better approach for manual deployment without third-party actions:
# 1. Build to 'out'
# 2. Commit 'out' content to 'gh-pages' branch

# Ensure clean state
if [[ -n $(git status -s) ]]; then
  echo "You have uncommitted changes. Please commit or stash them first."
  exit 1
fi

# Add the 'out' folder (ignoring .gitignore rule for this operation if needed, but usually 'out' is ignored)
# We will use `gh-pages` package approach or manual git commands
# Let's try to use `git subdir` strategy which doesn't require extra packages

# Force add dist folder
git add -f out
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix out origin gh-pages

# Cleanup
git reset HEAD~1
git reset HEAD out

echo "Deployment complete!"
