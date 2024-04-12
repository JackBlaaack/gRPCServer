# Инструкция по эксплуатации gRPC сервера

1. Склонировать репозиторий на свой компьютер:


  **git clone https://github.com/JackBlaaack/gRPCServer.git**


3. Установите зависимости для проекта:

   
  **npm install grpc @grpc/proto-loader**


5. Запустите gRPC сервер:

   
   **node server.js**


4.Откройте Postman и создайте gRPC запрос


5.Имплементируйте Protobuf


- Нажмите **Service definition** => **Import a proto.file** => **Choose a File** => Выбрать **gRPCService.proto** => **Import as API** => Create a New API**


6.В адресную строку вводите 0.0.0.0:50051


7.Выбирайте метод, который хотите использовать в **Select a method**


**Надеюсь вам понравится мой gRPC тренажер :)**
