# P5 Phone - Submission Checklist

**Target:** Submit to p5.js official libraries directory  
**New Name:** p5.phone (from mobile-p5-permissions)

---

## Phase 1: Rebranding (Week 1)

### Core Files
- [ ] Rename `src/permissionsAll.js` → `src/p5.phone.js`
- [ ] Update file header comments to reference "p5.phone"
- [ ] Update `package.json` name to `p5.phone` (or available variant)
- [ ] Update `package.json` description
- [ ] Update `package.json` build scripts for new names
- [ ] Rebuild: `npm run build` (creates dist/p5.phone.js and dist/p5.phone.min.js)

### Documentation Updates
- [ ] Update README.md title to "# p5.phone"
- [ ] Replace all "mobile-p5-permissions" with "p5.phone" in README
- [ ] Update CDN links in README to new package name
- [ ] Update CHANGELOG.md references
- [ ] Update CONTRIBUTING.md (if exists)
- [ ] Rename `mobile-p5-permissions.yaml` → `p5.phone.yaml`
- [ ] Update YAML file content with new names

### Repository Settings
- [ ] Update GitHub repository description
- [ ] Update GitHub repository topics/tags
- [ ] Consider renaming repository (optional)

---

## Phase 2: Required Assets (Week 2)

### Featured Image
- [ ] Verify `P5Phone.png` is exactly 1500 x 1000 pixels
- [ ] If not, create/resize image to 1500 x 1000 pixels
- [ ] Ensure image is high quality and showcases library features
- [ ] Rename to `p5.phone.png` (match library name)
- [ ] Place in repository root or assets folder
- [ ] Write descriptive alt text for YAML file

### Examples Organization
- [ ] Create `examples/README.md` with overview
- [ ] Add README.md to each example folder explaining what it does
- [ ] Update all example HTML files to use new library name
- [ ] Test all examples work with new build
- [ ] Ensure live examples are deployed to GitHub Pages

### YAML File Creation
- [ ] Create final `p5.phone.yaml` with all required fields
- [ ] Verify category choice (recommend: "hardware")
- [ ] Add proper author information
- [ ] Add correct npm package name
- [ ] Add npmFilePath: "dist/p5.phone.min.js"
- [ ] Add featuredImage path
- [ ] Add featuredImageAlt description

---

## Phase 3: npm Publishing (Week 3)

### Package Preparation
- [ ] Check npm for name availability: `npm search p5.phone`
- [ ] Choose final package name (p5.phone, p5-phone, or p5phone)
- [ ] Update package.json with final name
- [ ] Run `npm run build` to create fresh dist files
- [ ] Test package locally: `npm pack` then install the tarball

### Publishing
- [ ] Publish to npm: `npm publish`
- [ ] Verify package appears on npmjs.com
- [ ] Test CDN link: `https://cdn.jsdelivr.net/npm/p5.phone/dist/p5.phone.min.js`
- [ ] Test installation: `npm install p5.phone` in test project
- [ ] Verify all files included in package

### Final Testing
- [ ] Create fresh p5.js sketch using npm package
- [ ] Create fresh p5.js sketch using CDN link
- [ ] Test on iOS device (if possible)
- [ ] Test on Android device (if possible)
- [ ] Verify all examples work with published package

---

## Phase 4: Submission (Week 4)

### Pre-Submission Verification
- [ ] All documentation uses correct new name
- [ ] Featured image is ready (1500x1000px)
- [ ] YAML file is complete and correct
- [ ] npm package is published and working
- [ ] Examples are accessible and working
- [ ] README is comprehensive and clear
- [ ] LICENSE file exists and is MIT
- [ ] CODE_OF_CONDUCT.md exists (or reference p5.js CoC)

### Fork & Prepare
- [ ] Fork p5.js-website repository: https://github.com/processing/p5.js-website
- [ ] Clone your fork locally
- [ ] Create new branch: `git checkout -b add-p5-phone-library`

### Add Files
- [ ] Add `p5.phone.yaml` to `src/content/libraries/en/` folder
- [ ] Add `p5.phone.png` to `src/content/libraries/images/` folder
- [ ] Verify file paths are correct in YAML

### Create Pull Request
- [ ] Commit changes with clear message
- [ ] Push to your fork
- [ ] Create Pull Request on p5.js-website
- [ ] Use PR template/description (see report)
- [ ] Link to your repository and examples

### After Submission
- [ ] Respond to reviewer feedback promptly
- [ ] Make requested changes if any
- [ ] Be patient - reviews may take time
- [ ] Thank reviewers!

---

## Quick Reference Links

### Documentation
- Guidelines: https://github.com/processing/p5.js-website/blob/main/docs/contributing_libraries.md
- Tutorial: https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md
- Your report: `P5_SUBMISSION_REPORT.md`

### npm Commands
```bash
# Check name availability
npm search p5.phone

# Build library
npm run build

# Test package locally
npm pack
npm install ./p5.phone-1.4.4.tgz

# Publish
npm publish

# Verify on CDN
curl https://cdn.jsdelivr.net/npm/p5.phone/dist/p5.phone.min.js
```

### Git Commands
```bash
# Fork and setup
git clone https://github.com/YOUR-USERNAME/p5.js-website.git
cd p5.js-website
git checkout -b add-p5-phone-library

# Add files
cp path/to/p5.phone.yaml src/content/libraries/en/
cp path/to/p5.phone.png src/content/libraries/images/

# Commit and push
git add .
git commit -m "Add p5.phone library to libraries directory"
git push origin add-p5-phone-library
```

---

## Notes & Decisions

### Package Name Decision
- **First Choice:** p5.phone
- **Backup:** p5-phone
- **Final Decision:** _________________

### Category Decision
- **Recommended:** hardware
- **Alternative:** ui or utils
- **Final Decision:** _________________

### Featured Image
- **Status:** P5Phone.png exists
- **Dimensions Verified:** [ ] Yes [ ] No
- **Location:** _________________

---

## Timeline

| Phase | Estimated Time | Completion Date |
|-------|---------------|-----------------|
| Phase 1: Rebranding | 3-5 days | _____________ |
| Phase 2: Assets | 3-5 days | _____________ |
| Phase 3: npm | 2-3 days | _____________ |
| Phase 4: Submission | 1-2 days | _____________ |
| **Total** | **2-3 weeks** | _____________ |

---

## Success Criteria

- [ ] Library appears on https://p5js.org/libraries/
- [ ] Can be found via search on p5.js website
- [ ] Featured image displays correctly
- [ ] Links to repository and examples work
- [ ] npm package installs successfully
- [ ] CDN link works in live sketches

---

**Last Updated:** October 16, 2025  
**Version:** 1.0

Good luck! 🚀
