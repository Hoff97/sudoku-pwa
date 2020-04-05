cd ./website/

git remote remove origin
git remote add origin git@github.com:Hoff97/sudoku-pwa.git

git fetch
git branch --set-upstream-to origin/master master
git fetch origin gh-pages:gh-pages
git branch --set-upstream-to origin/gh-pages gh-pages

# Has to be set for now, because wasm can only be imported as a critical
# dependency.
export CI=false
npm run deploy
export CI=true