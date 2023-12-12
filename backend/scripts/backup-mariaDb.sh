display_black_text_white_background() {
  local text="$1"
  local padding_length="$2"
  local padding=$(printf '%*s' "$padding_length" '')

  # ANSI escape sequences for black letters and white background
  local black="\033[30m"
  local white_background="\033[47m"
  local reset="\033[0m"

  echo -e "${black}${white_background}${text}${padding}${reset}"
}

echo
display_black_text_white_background " Start Backup" 65
echo

docker exec my-mariadb sh -c 'exec mariadb-dump --all-databases -ukonakia-booking -pkonakia-booking' > /workspaces/konakiaBooking/backend/init.sql

echo
display_black_text_white_background " Backup Completed" 61
echo
