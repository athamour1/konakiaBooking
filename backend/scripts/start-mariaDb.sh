#!/bin/bash

# Function to display text with black letters and white background
display_black_text_white_background() {
  local text="$1"
  local padding_length="$2"
  local padding=$(printf '%*s' "$padding_length" '')

  # ANSI escape sequences for black letters and white background
  local black="\033[30m"
  local white_background="\033[47m"
  local reset="\033[0m"

  echo -e -n "${black}${white_background}${text}${padding}${reset}"
}

container_name="my-mariadb"
existing_container=$(docker ps -aqf "name=$container_name")

if [[ -n "$existing_container" ]]; then
  display_black_text_white_background " Removing Old Container" 55
  echo
  echo
  docker stop "$existing_container" > /dev/null 2>&1
fi
display_black_text_white_background " Start MariaDB" 64
echo
echo
docker run --rm -d --name my-mariadb -e MYSQL_ROOT_PASSWORD=mysecretpassword -e MYSQL_DATABASE=konakia-booking -e MYSQL_USER=konakia-booking -e MYSQL_PASSWORD=konakia-booking -p 3306:3306 mariadb  > /dev/null 2>&1
for ((i = 1; i <= 9; i++)); do
  display_black_text_white_background " # # # #"
  sleep 1
done
display_black_text_white_background " # # #"
echo
echo
display_black_text_white_background " Init MariaDB" 65
echo
echo
docker exec -i my-mariadb sh -c 'exec mariadb -ukonakia-booking -pkonakia-booking' < $PWD/backend/init.sql
