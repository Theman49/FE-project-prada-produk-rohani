#!/usr/sbin/bash
cat ~/Github/token.txt
rm -r 404.html assets/ index.html
cp -r ~/Downloads/dist/* ./
git add .
git commit -m "update"
git push
