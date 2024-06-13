# build environment
FROM node:current-slim as react-build

# install node modules and build assets
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH /home/node/.npm-global/bin:$PATH
RUN npm i --unsafe-perm -g npm@latest expo-cli@latest
WORKDIR /app
ADD . ./
RUN yarn
RUN npx expo-optimize

RUN npx expo export -p web

# server environment
FROM nginx:alpine
ADD nginx.conf /etc/nginx/conf.d/configfile.template
COPY --from=react-build /app/dist /usr/share/nginx/html
ENV PORT 8080
ENV HOST 0.0.0.0
EXPOSE 8080
CMD sh -c "envsubst '\$PORT' < /etc/nginx/conf.d/configfile.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"