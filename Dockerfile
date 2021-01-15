# Stage 1
FROM node:12.10.0-alpine AS BUILD_IMAGE
LABEL AUTHOR="rushil.rushil.gupta@gmail.com"
WORKDIR /app

RUN apk add --no-cache git && \
    npm install i -g pm2

COPY . ./
ARG ENV=dev
RUN echo $ENV
ENV NODE_ENV=$ENV

RUN cd client && \
    npm install && \
    npm audit fix && \
    if [ "$ENV" = "dev" ]; then npm run build-dev ;else npm run build ; fi


RUN cd server && \
    npm install


EXPOSE 3080

CMD ["pm2-runtime", "server/ecosystem.config.js"]