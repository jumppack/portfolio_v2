# Portfolio Generator Usage Guide

This project includes a system to automatically generate your portfolio from a JSON configuration file.

## Directory Structure
- `data/raw/`: Place your resume here (PDF, Text, or Markdown).
- `data/configs/`: JSON configuration files live here (e.g., `karan.json`, `john.json`).
- `data/assets/`: Place your images here.

## Workflow

### 1. Resume to Config
1.  Drop your resume into `data/raw/`.
2.  Ask the AI Agent (me) to "Process my resume".
3.  I will read the resume, extract details, and create a draft JSON config in `data/configs/`.
4.  I will ask you for any missing details (Social links, specific project images).

### 2. Generate Website
Once a config file (e.g., `my-config.json`) is ready, run:

```bash
node src/scripts/generate-portfolio.js my-config.json
```

This will:
- Update `src/resources/content.tsx` with your data.
- (Coming Soon) Update project MDX files and blog posts.
- (Coming Soon) Copy assets to the public folder.

## Manual Configuration
You can also manually edit the JSON files in `data/configs/` following the schema in `sample.json`.
