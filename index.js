const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const AWS = require("aws-sdk");
const Eureka = require("eureka-js-client").Eureka;

const QUEUE_URL =
  "https://sqs.ap-northeast-2.amazonaws.com/262981387273/JudgeRT.fifo";
const PORT = 5000;

new Eureka({
  instance: {
    app: "RT-SERVICE",
    hostName: "10.178.0.3",
    ipAddr: "10.178.0.3",
    port: PORT,
    port: {
      $: PORT,
      "@enabled": true,
    },
    vipAddress: "RT-SERVICE",
    dataCenterInfo: {
      name: "MyOwn",
    },
  },
  eureka: {
    host: "10.178.0.3",
    port: 8761,
    servicePath: "/eureka/apps",
  },
});

AWS.config.update({
  accessKeyId: "AKIAT2OXJQQESOXLJ4X3",
  secretAccessKey: "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",
  region: "ap-northeast-2",
});

var sqs = new AWS.SQS();
const param = {
  QueueUrl: QUEUE_URL,
};

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

class SubmitMap {
  constructor() {
    this.map = new Map();
  }

  register(submitId, socket) {
    const list = this.map.get(submitId);
    if (list) {
      list.push(socket);
    } else {
      this.map.set(submitId, [socket]);
    }
  }

  sendInfo(submitId, info) {
    console.log("sendInfo", submitId, info);
    const list = this.map.get(submitId);
    if (list) {
      list.forEach((socket) => {
        socket.emit("newInfo", info);
      });
    }
  }

  cleanUp(submitId) {
    if (!this.map.has(submitId)) return;
    this.map.get(submitId).forEach((socket) => {
      socket.disconnect(true);
      socket = null;
    });
    this.map.delete(submitId);
  }

  disconnectSocket(socketId) {
    this.map.forEach((list, submitId) => {
      const idx = list.findIndex((socket) => socket.id === socketId);
      if (idx !== -1) {
        list.splice(idx, 1);
        if (list.length === 0) {
          this.map.delete(submitId);
        }
      }
    });
  }
}

const submitMap = new SubmitMap();

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("requestSubmitList", (msg) => {
    console.log("requestSubmitList", msg);
    msg.forEach((submitId) => {
      // console.log("register", submitId);
      submitMap.register(submitId, socket);
    });
  });

  socket.on("chat message", (msg) => {
    io.emit("newInfo", msg);
  });

  socket.on("disconnect", () => {
    submitMap.disconnectSocket(socket.id);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});

setInterval(() => {
  sqs.receiveMessage(param, (err, data) => {
    if (data.Messages.length > 0) {
      console.log("receiveMessage Length: ", data.Messages.length);
      data.Messages.forEach((msg) => {
        const body = JSON.parse(msg.Body);
        console.log("receiveMessage: ", body);

        submitMap.sendInfo(body.id, body);
        if (body.result !== 1 || body.tc_total === body.tc_cur) {
          submitMap.cleanUp(body.id);
        }

        const deleteParam = {
          QueueUrl: QUEUE_URL,
          ReceiptHandle: msg.ReceiptHandle,
        };
        sqs.deleteMessage(deleteParam, (err, data) => {});
      });
    }
  });
}, 25);
