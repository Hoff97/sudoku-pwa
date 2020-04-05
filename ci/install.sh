curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

eval `ssh-agent -s`
chmod 400 ./deploy_key
ssh-add ./deploy_key