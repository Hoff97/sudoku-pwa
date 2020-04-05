cd ./sudoku-generator/
wasm-pack build

cd ../website/
npm install

# Has to be set for now, because wasm can only be imported as a critical
# dependency.
export CI=false
npm run build
export CI=true