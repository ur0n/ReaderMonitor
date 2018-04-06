const PROTO_PATH = '../proto/taglogging.proto';

const grpc = require('grpc');
const tagLoggingProto = grpc.load(PROTO_PATH).taglogging;

function main() {
  const client = new tagLoggingProto.Greeter('localhost:50051',
                                       grpc.credentials.createInsecure());

  function tagStream(id){
    const call = client.tagStream();
    call.on('data', message => {
      console.log(message);
    })

    call.write({id: '0.0.0.0:1'});
  }
}

main();
