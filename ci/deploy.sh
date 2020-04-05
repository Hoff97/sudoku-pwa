cd ./website/

# Has to be set for now, because wasm can only be imported as a critical
# dependency.
export CI=false
npm run deploy
export CI=true