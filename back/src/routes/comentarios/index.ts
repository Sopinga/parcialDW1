import fastify, { FastifyPluginAsync } from "fastify";
import * as comentarioService from "../../services/comentarios.js";
import { Comentario } from "../../types/comentario.js";
import { Type } from "@sinclair/typebox";

const comentarioRoutes: FastifyPluginAsync = async (
  fastify,
  opts
): Promise<void> => {
  fastify.get("/", {
    schema: {
      summary: "Listado de comentarios completo.",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - response. \n - Solo admin puede ver todas las comentarios.",
      tags: ["comentarios"],
      response: {
        200: {
          description: "Lista de comentarios completo por tema.",
          content: {
            "application/json": {
              schema: Type.Array(Comentario),
            },
          },
        },
      },
    },
    onRequest: [fastify.verifyJWT],
    handler: async function (request, reply) {
      const { id_tema } = request.query as { id_tema: number };
      return comentarioService.findAll(id_tema);
    },
  });

  fastify.post("/", {
    schema: {
      body: Type.Object({
        id_tema: Type.Integer(),
        id_usuario: Type.Integer(),
        descripcion: Type.String(),
      }),
      tags: ["comentarios"],
      summary: "Crear un comentario.",
      description:
        "### Implementar y validar: \n " +
        " - token \n " +
        " - body \n " +
        " - response. \n ",
      response: {
        201: {
          description: "Comentario creado.",
          content: {
            "application/json": {
              schema: Type.Array(Comentario),
            },
          },
        },
      },
    },
    onRequest: [fastify.verifyJWT],
    handler: async function (request, reply) {
      const { id_tema, id_usuario, descripcion } = request.body as {
        id_tema: number;
        id_usuario: number;
        descripcion: string;
      };
      return comentarioService.create(id_tema, id_usuario, descripcion);
    },
  });
};
export default comentarioRoutes;
