import grpc from 'grpc';
const PROTO = `${PROTO_PATH}taglogging.proto`;
// const PROTO_PATH = `../proto/taglogging.proto`;
const taglogging = grpc.load(PROTO).taglogging;

export class MonitorClient {
  constructor(host, port) {
    this.connection = new taglogging.TagLoggingService(
      `${host}:${port}`,
      grpc.credentials.createInsecure()
    );
  }

  async serverList(){
    return new Promise((resolve, reject) => {
      const call = this.connection.serverList({}, (err, response) => {
        if(err) reject(err);
        else resolve(response);
      });
    });
  }
}
