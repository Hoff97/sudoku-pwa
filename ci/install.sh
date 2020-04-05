curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh

eval `ssh-agent -s`
chmod 400 ./deploy_key
cp ./deploy_key ~/.ssh/deploy_key
ssh-add ~/.ssh/deploy_key
echo "IdentityFile ~/.ssh/deploy_key" > ~/.ssh/config