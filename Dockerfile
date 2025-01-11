FROM node:20.10

RUN apt update && apt install -y \
  xdg-utils

EXPOSE 5173

WORKDIR /app

# ./my-app/* was populated by:
# - shell in and run:
#     `npm create vite@latest my-app -- --template react`

COPY ./my-app/package.json ./

# One-time (and each time dependencies are changed): 
# -  shell in and run:
#   `npm install` so that my-app/node-modules/ is built out 
