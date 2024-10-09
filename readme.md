*Create Git Repository setup (github.com/new)
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/shaik27/nodejsProject.git
git branch -M main
git push -u origin main

*steps to create this project
-> npm init (to initialize the project which generates the package.json file)

*Dependencies
-> npm i express

*To ignore the particular files to push into the repository 
-> Create .gitignore file



-> https://www.npmjs.com/package/mongodb    refer this site for code
-> https://collabnix.com/how-to-install-and-configure-nvm-on-mac-os/  to update node version
-> cmds: to update the node version
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)" && 
brew install nvm && source $(brew --prefix nvm)/nvm.sh && nvm install node
