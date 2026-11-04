#!/bin/zsh
set -e
cd -- "$(dirname -- "$0")"
echo 'The Diwali Showdown: http://127.0.0.1:4173'
exec python3 -m http.server 4173 --directory dist --bind 127.0.0.1
