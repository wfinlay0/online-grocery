FROM node:20.9 AS builder

COPY . /code

WORKDIR /code

RUN npm install

RUN sed -i -Ee '/basePath/s/\/online-grocery//' next.config.mjs

RUN npm run build


FROM nginx:1.27-alpine AS release

ARG GIT_BRANCH
ARG VERSION

ENV GIT_BRANCH=${GIT_BRANCH}
ENV VERSION=${VERSION}

COPY --from=builder /code/out/ /usr/share/nginx/html
WORKDIR /usr/share/nginx/html

# 1
