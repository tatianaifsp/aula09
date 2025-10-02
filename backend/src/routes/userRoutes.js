// backend/src/routes/userRoutes.js
const express = require("express");                 // Importa o Express
const router = express.Router();                    // Cria um router isolado para as rotas de usuários
const User = require("../models/User");             // Importa o modelo User (Mongoose)

// CREATE: cria um novo usuário
router.post("/", async (req, res) => {              // POST /api/users
  const user = await User.create(req.body);         // Cria documento no MongoDB com os dados do body
  res.json(user);                                   // Retorna o usuário criado em JSON
});                                                 // Fim da rota POST

// READ: lista todos os usuários
router.get("/", async (req, res) => {               // GET /api/users
  const users = await User.find();                  // Busca todos os documentos da coleção
  res.json(users);                                  // Retorna o array de usuários
});                                                 // Fim da rota GET (lista)

// UPDATE: atualiza um usuário por ID
router.put("/:id", async (req, res) => {            // PUT /api/users/:id
  const user = await User.findByIdAndUpdate(        // Atualiza o documento com o ID informado
    req.params.id,                                  // ID recebido na URL
    req.body,                                       // Dados novos enviados no body
    { new: true }                                   // new:true → retorna o documento já atualizado
  );                                                // Fim do findByIdAndUpdate
  res.json(user);                                   // Retorna o usuário atualizado
});                                                 // Fim da rota PUT

// DELETE: remove um usuário por ID
router.delete("/:id", async (req, res) => {         // DELETE /api/users/:id
  await User.findByIdAndDelete(req.params.id);      // Remove o documento com o ID informado
  res.json({ message: "Usuário deletado" });        // Retorna mensagem de sucesso
});                                                 // Fim da rota DELETE

module.exports = router;                            // Exporta o router para ser usado no server

