FROM node:lts

# Create user to limit permissions
# USER node

RUN apt-get update \
	&& apt-get install -y wget gnupg \
	&& wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
	&& sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
	&& apt-get update \
	&& apt-get install -y google-chrome-unstable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf \
	--no-install-recommends \
	&& rm -rf /var/lib/apt/lists/*

RUN npm i -g @nestjs/cli@9.3.0

RUN yarn install

WORKDIR /home/node/app

EXPOSE 3000

#CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]
CMD [ "tail", "-f", "/dev/null" ]

