
FROM node


ENV MONGO_DB_USERNAME admin
ENV MONGO_DB_PWD pass


WORKDIR /home/app


COPY . .


RUN npm install


EXPOSE 3000


CMD ["node", "C:\Docker_\intro.js"]
