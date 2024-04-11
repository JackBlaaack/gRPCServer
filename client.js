const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');

const packageDefinition = protoLoader.loadSync('D:/gRPСServer/protobuf.proto', {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const peoplePackage = protoDescriptor.peoplePackage;

const client = new peoplePackage.PeopleService('localhost:50051', grpc.credentials.createInsecure());

function addPerson() {
    const person = {
       id: "20",
        name: 'Jack Black',
        age: 20
    };

    client.addPerson(person, (err, response) => {
        if (err) {
            console.error('Error:', err.message);
        } else {
            console.log('Response:', response.message);
        }
    });
}

function findPersonByName() {
    const request = {
        name: 'Jack Black'
    };

    client.findPersonByName(request, (err, response) => {
        if (err) {
            console.error('Error:', err.message);
        } else {
            console.log('Response:', response);
        }
    });
}

function findPersonById() {
    const request = {
        id: '5'
    };

    client.findPersonById(request, (err, response) => {
        if (err) {
            console.error('Error:', err.message);
        } else {
            console.log('Response:', response);
        }
    });
}
function updatePerson() {
    const request = {
        id: "5",
        name: "John",
        age: 22
    }

    client.updatePerson(request, (err, response) => {
        if(err) {
            console.error('Error:', err.message);

        } else {
            console.log('Response:', response);
        }
    })
}

function getAllPeople() {
    const request = {};

    client.getAllPeople(request, (err, response) => {
        if (err) {
            console.error('Error:', err.message);
        } else {
            console.log('Response:', response);
        }
    });
}

function deletePerson() {
    const request = {
        id: "5"
    }

    client.deletePerson(request, (err, response) => {
        if (err) {
            console.error('Error:', err.message);
        } else {
            console.log('Response:', response);
        }
    });
}

addPerson();
// findPersonByName();
// findPersonById();
// updatePerson();
// getAllPeople();
// deletePerson();
