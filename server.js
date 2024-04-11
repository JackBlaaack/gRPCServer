const grpc = require("grpc");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync("D:/gRPСServer/protobuf.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const peopleProto = protoDescriptor.peoplePackage;

const people = [];

function checkAge(age) {
  const maxAge = 100;
  if (age <= 0 || age > maxAge) {
    throw new Error(`Invalid age: ${age}`);
  }
}
function addPerson(call, callback) {
  const person = call.request;
  try {
    console.log(person.age);
    checkAge(person.age);
    people.push(person);
    callback(null, { message: "Person added successfully" });
  } catch (error) {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: error.message,
    });
  }
}

function findPersonByName(call, callback) {
  const name = call.request.name;
  const foundPerson = people.find((person) => person.name === name);

  if (foundPerson) {
    callback(null, foundPerson);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: "Person not found",
    });
  }
}

function findPersonById(call, callback) {
  const id = call.request.id;
  const foundPerson = people.find((person) => person.id === id);
  if (foundPerson) {
    callback(null, foundPerson);
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: "Person not found",
    });
  }
}
function updatePerson(call, callback) {
  const person = call.request;
  try {
    checkAge(person.age)
    const index = people.findIndex((person) => person.id === person.id);
    if (index !== -1) {
      people[index].name = person.name;
      people[index].age = person.age;
      const updatedData = {
        id: people[index].id,
        name: people[index].name,
        age: people[index].age,
      };
      callback(null, {
        message: "Person updated successfully",
        person: updatedData,
      });
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        details: "Person not found",
      });
    }
  } catch (error) {
    callback({
      code: grpc.status.INVALID_ARGUMENT,
      details: error.message,
    });
  }
}
function getAllPeople(call, callback) {
  callback(null, { people: people });
}

function deletePerson(call, callback) {
  const idToDelete = call.request.id;

  const index = people.findIndex((person) => person.id === idToDelete);

  if (index !== -1) {
    people.splice(index, 1); // Удалить пользователя из массива
    callback(null, { message: "Person deleted successfully" });
  } else {
    callback({
      code: grpc.status.NOT_FOUND,
      details: "Person not found",
    });
  }
}

function main() {
  const server = new grpc.Server();
  server.addService(peopleProto.PeopleService.service, {
    addPerson: addPerson,
    findPersonByName: findPersonByName,
    findPersonById: findPersonById,
    updatePerson: updatePerson,
    getAllPeople: getAllPeople,
    deletePerson: deletePerson,
  });

  server.bind("0.0.0.0:50051", grpc.ServerCredentials.createInsecure());
  console.log("Server running at http://0.0.0.0:50051");
  server.start();
}

main();