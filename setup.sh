#!/bin/bash

# Color variables
RED=`tput setaf 1`
GREEN=`tput setaf 2`
BLUE=`tput setaf 6`
YELLOW=`tput setaf 3`
WHITE=`tput setaf 7`
UNDERLINE=`tput smul`
BOLD=`tput bold`
NOCOLOR=`tput sgr0`

# Check for node.js env
printf "${BLUE}Verifying Node.js installation...${NOCOLOR}\n"

type node >/dev/null 2>&1 && type npm >/dev/null 2>&1 || {
  printf >&2 "${RED}Node.js environment or the Node package manager are not installed!\nPlease install node and re-run this setup. ${NOCOLOR}\n"; 
  printf >&2 "Node.js environment  - ${UNDERLINE}www.nodejs.org\n${NOCOLOR}"
  printf >&2 "Node Package Manager - ${UNDERLINE}www.npmjs.com\n${NOCOLOR}"
  exit 1;
}

printf "${GREEN}Node.js detected.${NOCOLOR}\n\n"

echo "----------------------------------"
echo

# Look for global dependencies
printf "${BLUE}Looking for global node dependencies...${NOCOLOR}\n"


## Verify webpack installation
printf "${YELLOW}- Verifying webpack bundler installation...${NOCOLOR}\n"

type webpack >/dev/null 2>&1 || {
  printf >&2 "${RED}- Webpack installation not found, installing now... ${NOCOLOR}\n"; 
  
  ### Install webpack globally through NPM
  npm install -g webpack
  
  ### Verify installation
  type webpack >/dev/null 2>&1 || {
    printf >&2 "${GREEN}- Webpack install failed!\n${NOCOLOR}\n"; 
    printf >&2 "\n\n webpack installation failed through npm.\n${NOCOLOR}\n"; 
    printf >&2 "please installed webpack manually and re-run the install script.\n${NOCOLOR}\n"; 
    printf >&2 "HINT: ${YELLOW} npm install -g webpack ${NOCOLOR}\n"; 
    exit 1;   
  }
}

printf >&2 "${GREEN}- Webpack installed successfully ${NOCOLOR}\n\n"; 


## Verify webpack dev server installation
printf "${YELLOW}- Verifying webpack dev server installation...${NOCOLOR}\n"

type webpack-dev-server >/dev/null 2>&1 || {
  printf >&2 "${RED}- Webpack dev server installation not found, installing now... ${NOCOLOR}\n"; 
  
  ### Install webpack globally through NPM
  npm install -g webpack-dev-server
  
  ### Verify installation
  type webpack-dev-server >/dev/null 2>&1 || {
    printf >&2 "${GREEN}- Webpack dev server install failed!\n${NOCOLOR}\n"; 
    printf >&2 "\n\n Webpack dev server installation failed through npm.\n${NOCOLOR}\n"; 
    printf >&2 "please installed Webpack dev server manually and re-run the install script.\n${NOCOLOR}\n"; 
    printf >&2 "HINT: ${YELLOW} npm install -g Webpack-dev-server ${NOCOLOR}\n"; 
    exit 1;   
  }
}

printf >&2 "${GREEN}- Webpack dev server installed successfully ${NOCOLOR}\n\n"; 

echo "----------------------------------"
echo


# Verify local dependencies installation
printf "${BLUE}Verifying local development dependencies...${NOCOLOR}\n"

## Check for npm installation status
_install=$(npm install)|tr '\n' ' '
if [[ $_install != "" ]]
then
  printf >&2 "${YELLOW}- Installing missing local dependencies... ${NOCOLOR}\n\n"; 
  _install=$(npm install)|tr '\n' ' '
  if [[ $_install != "" ]]
  then
    printf >&2 "${RED}Local dependencies installation failed did not fully complete successfully.\n Please verify your local NPM package installations. ${NOCOLOR}\n"; 
    exit 1;
  fi
fi

printf >&2 "${GREEN}- Local dependencies installed successfully ${NOCOLOR}\n\n"; 

echo "----------------------------------"
echo


# # Verify local dependencies installation
# printf "${BLUE}Configuring environment...${NOCOLOR}\n"

# ## Configure symlinks
# printf >&2 "${YELLOW}- Setting up requirement symlinks... ${NOCOLOR}\n\n"; 
# ln -s ../resources/templates/ node_modules/
# ln -s ../resources/styles/ node_modules/

# echo "----------------------------------"
# echo


# YAY!!!

printf >&2 "${GREEN}Staance development environment verified. \n${BOLD}Now go kick some JavaScript ass!${NOCOLOR}\n\n"; 
printf >&2 "${WHITE}HINT: To launch the server run ${BOLD}node server${NOCOLOR} or ${BOLD}npm start${NOCOLOR}\n\n";