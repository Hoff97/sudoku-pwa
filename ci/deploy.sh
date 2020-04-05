cd ./website/

git remote remove origin
git remote add origin git@github.com:Hoff97/sudoku-pwa.git

git branch --set-upstream-to origin master
git checkout gh-pages
git branch --set-upstream-to origin gh-pages
git checkout master

# Has to be set for now, because wasm can only be imported as a critical
# dependency.
export CI=false
npm run deploy
export CI=true