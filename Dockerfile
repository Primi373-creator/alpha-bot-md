FROM quay.io/cipher/inrl
RUN git clone https://github.com/Primi373-creator/inrl-bot-md /Alpha
WORKDIR /Alpha/
RUN npm install
EXPOSE 4600
CMD ["npm", "start"]
